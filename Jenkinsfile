#!groovy

node {
  /* Requires the Docker Pipeline plugin to be installed */

  checkout scm

  stage('Build') {
    docker.image('node:9-alpine').inside {
      sh 'npm run build'
    }

    junit 'reports/junit/*.xml'
  }

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
}
