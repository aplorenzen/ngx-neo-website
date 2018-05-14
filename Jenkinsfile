#!groovy

node {
  /* Requires the Docker Pipeline plugin to be installed */

  checkout scm

  def buildDockerfile = 'src/docker/chrome-test.Dockerfile'
  def buildImage

  /* Building customer container for building and testing the project */
  stage('Prepare Build Container') {
    buildImage = docker.build("node-builder:9", "-f ${buildDockerfile} ./src/docker")
  }

  /* Before we can start, we need to secure that the dependencies of the project are in installed */
  stage('Install Dependencies') {

    buildImage.inside {
      sh 'npm rebuild node-sass --force'
      sh 'npm install'
    }
  }

  /* This step runs the unit tests for the angular project */
  stage('Test Application') {
    buildImage.inside {
      sh 'npm run test:ci'
      sh 'npm run e2e'
    }

    junit 'reports/junit/*.xml'
  }

  /* This step builds the angular application, leaves it in the default dist/ directory */
  stage('Build Application') {
    buildImage.inside {
      sh 'npm run build'
    }
  }

  /* Local varables for holding the docker image and the image name */
  def imageName
  def dockerImage

  /* This step just builds the image, and leaves it in the local image cache, tagged */
  stage('Build Docker Image') {

    /* Determine the image name */
    imageName = sh returnStdout: true, script: './get_docker_image_name.sh'

    /* Build the docker image, from the project root directory, with the dist/ directory as the build context */
    /* docker build -t <imagename> dist/ */
    dockerImage = docker.build(imageName, "dist/")
  }

//  stage('Push Docker Image') {
//    /* Push the container to the custom Registry */
//
//    /* Finally, we'll push the image with two tags:
//       * First, the incremental build number from Jenkins
//       * Second, the 'latest' tag.
//       * Pushing multiple tags is cheap, as all the layers are reused. */
//    docker.withRegistry('https://registry.hub.docker.com', 'aplorenzen-dockerhub') {
//      dockerImage.push()
//    }
//  }

  stage('Deploy') {
    // sh "docker -H unix:///var/run/docker.sock run --name test_image_web -e DB_URI=123 docker.neoprime.it/neo/neo-website:${env.BUILD_ID}"
    sh 'export IMAGE_NAME=' + imageName + ' && ' + 'docker-compose -f src/docker/docker-compose.yml up -d'
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
