pipeline
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
        sh 'docker build -t asetcoservice/test:latest .'
      }
    }

    stage('login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u DOCKERHUB_CREDENTIALS_USER --passwoed-stdin'
      }
    }

    stage('push') {
      steps {
        sh 'docker push asetcoservice/test:latest'
      }
    }
    post {
      always {
        sh 'docker logout'
      }
    }
  }
  }
