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
                 docker build -t asetcoservice/asetcoyadak-frontend:latest 
                 docker push asetcoservice/asetcoyadak-frontend:latest
                 echo "PUSH On DOCKER HUB..."
            }
        }
    }
}
