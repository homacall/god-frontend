pipeline
  agent any
  environment {
     DOCKERHUB_CREDENTIALS=credentials('dockerhub')
  }  
  stages {
    stage('gitclone') {
      steps {
        git 'git@github.com:homacall/god-frontend.git'
      }
    }

    stage('Build') {
      steps {
        sh 'sudo docker build -t asetcoservice/test:latest .'
      }
    }
    stage('login') {
      steps {
        sh 'sudo echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u DOCKERHUB_CREDENTIALS_USER --passwoed-stdin'
      }
    }
    stage('push') {
      steps {
        sh 'sudo docker push asetcoservice/test:latest'
      }
    }
} 

