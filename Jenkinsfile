#!groovy

node {
  /* Requires the Docker Pipeline plugin to be installed */

  checkout scm

  def buildDockerfile = 'src/docker/chrome-test.Dockerfile'
  def buildImage
  /* Local varables for holding the docker image and the image name */
  def targetDockerImage
  def targetImageName

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
    /* Determine the image name */
    targetImageName = sh returnStdout: true, script: './get_docker_image_name.sh'

    buildImage.inside {
      sh 'export IMAGE_NAME=' + targetImageName
      sh 'npm run jenkins:buildinfo'
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

      sh 'npm run build'
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
    docker.withRegistry('https://registry.hub.docker.com', 'aplorenzen-dockerhub') {
      targetDockerImage.push()
    }
  }

  stage('Deploy') {
    // sh "docker -H unix:///var/run/docker.sock run --name test_image_web -e DB_URI=123 docker.neoprime.it/neo/neo-website:${env.BUILD_ID}"
    sh 'export IMAGE_NAME=' + targetImageName + ' && ' + 'docker-compose -f src/docker/docker-compose.yml up -d'
  }
}



// app.push("${env.BUILD_NUMBER}")
// app.push("latest")

//  stage('Push docker image') {
//    docker.withRegistry('https://docker.neoprime.it', 'andreas@docker.neoprime.it') {
//      def customImage = docker.build("neo/neo-website:${env.BUILD_ID}", "-f target/Dockerfile target/")
//      /* Push the container to the custom Registry */
//      customImage.push()
//    }
//  }
//
//  stage('SonarQube analysis') {
//    docker.image('docker.neoprime.it/neo/website-build-image:1.1').inside {
//      withSonarQubeEnv('sonar.neoprime.it') {
//        // requires SonarQube Scanner for Gradle 2.1+
//        // It's important to add --info because of SONARJNKNS-281
//        sh 'mvn --batch-mode sonar:sonar'
//      }
//    }
//  }
//
//  stage('Deploy') {
//    // sh "docker -H unix:///var/run/docker.sock run --name test_image_web -e DB_URI=123 docker.neoprime.it/neo/neo-website:${env.BUILD_ID}"
//    sh "src/main/docker/redeploy.sh ${env.BUILD_ID}"
//  }

//  stage('Code analysis') {
//    docker.image('gradle:4.2.1-alpine').inside {
//      sh './gradlew sonarqube -Dsonar.host.url=https://sonar.neoprime.it -Dsonar.login=7a63cb80baf2d9763738d9fbf2c55888b94c10c6'
//    }
//  }

// stage('Front-end') {
//   docker.image('node:7-alpine').inside {
//            sh 'node --version'
//      }
//}
