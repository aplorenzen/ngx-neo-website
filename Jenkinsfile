#!groovy

node {
  /* Requires the Docker Pipeline plugin to be installed */

  checkout scm

  String buildDockerfile = 'src/docker/chrome-test.Dockerfile'
  def buildImage

  /* Local varables for holding the docker image and the image name */
  def targetDockerImage
  String targetImageName
  String targetDockerRegistry

  /* Building customer container for building and testing the project */
  stage('Prepare Build Container') {
    buildImage = docker.build("node-builder:9", "-f ${buildDockerfile} ./src/docker")
  }

  /* Before we can start, we need to secure that the dependencies of the project are in installed */
  stage('Install Dependencies') {

    buildImage.inside {
      /* The 'npm rebuild node-sass --force' script should be executed if the last 'npm install' was run on a different platform, eg. alpine, and now debian */
      /* TODO: Figure out if this can be detected or perhaps handled in a try catch */
      // sh 'npm rebuild node-sass --force'
      sh 'npm install'
    }
  }

  /* This step replaces constants in the environments.ts files for the Angular project, making them available in the
     build output if used in the source code */
  stage('Update Build Information') {

    /* Set the registry that we will push the built docker image to */
    /* TODO: This should be determined from config in the package.json */
    targetDockerRegistry = 'https://registry.hub.docker.com'
    /* Determine the image name with the helper script */
    targetImageName = sh returnStdout: true, script: './get_docker_image_name.sh'

    buildImage.inside {
      sh 'export IMAGE_NAME=' + targetImageName + ' && ' + 'npm run jenkins:buildinfo'
    }
  }

  /* This step runs the unit tests for the angular project */
  stage('Test Application') {
    parallel 'End to End Tests': {
      buildImage.inside {
        sh 'npm run e2e'
      }
    },
    'Unit Tests (CI)': {
      buildImage.inside {
        sh 'npm run test:ci'
      }

      /* Archive the test results */
      junit 'reports/junit/*.xml'

      /* Archive the test coverage results */
      publishHTML(
        [allowMissing: true,
         alwaysLinkToLastBuild: false,
         keepAll: true,
         reportDir: 'reports/coverage',
         reportFiles: 'index.html',
         reportName: 'Test Coverage Report',
         reportTitles: ''])
    }
  }

  /* This step builds the angular application, leaves it in the default dist/ directory */
  stage('Build Application') {
    buildImage.inside {
      sh 'echo $RUN_DISPLAY_URL'

      sh 'npm run build:ci'
    }
  }

  /* This step just builds the image, and leaves it in the local image cache, tagged */
  stage('Build Docker Image') {
    /* Build the docker image, from the project root directory, with the dist/ directory as the build context */
    /* docker build -t <imagename> dist/ */
    targetDockerImage = docker.build(targetImageName, "dist/")
  }

  stage('Push Docker Image') {
    /* Push the container to the custom Registry */

    /* Finally, we'll push the image with two tags:
       * First, the incremental build number from Jenkins
       * Second, the 'latest' tag.
       * Pushing multiple tags is cheap, as all the layers are reused. */
    docker.withRegistry(targetDockerRegistry, 'aplorenzen-dockerhub') {
      targetDockerImage.push()
    }
  }

  stage('Deploy') {
    // sh "docker -H unix:///var/run/docker.sock run --name test_image_web -e DB_URI=123 docker.neoprime.it/neo/neo-website:${env.BUILD_ID}"
    sh 'export IMAGE_NAME=' + targetImageName + ' && ' + 'docker-compose -f src/docker/docker-compose.yml up -d'
  }
}

//  stage('SonarQube analysis') {
//    docker.image('docker.neoprime.it/neo/website-build-image:1.1').inside {
//      withSonarQubeEnv('sonar.neoprime.it') {
//        // requires SonarQube Scanner for Gradle 2.1+
//        // It's important to add --info because of SONARJNKNS-281
//        sh 'mvn --batch-mode sonar:sonar'
//      }
//    }
//  }
