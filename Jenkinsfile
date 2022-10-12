pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') { 
            steps {
              sh 'docker build -t asetcoservice/test:latest .'
              sh 'docker push asetcoservice/test:latest'
              echo "PUSH On DOCKER HUB..."
            }
        }
    }
}
