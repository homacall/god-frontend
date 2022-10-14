pipeline{
    agent any
    options{
        buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '5'))
        timestamps()
    }
    environment{
        
        registry = "asetcoservice/test"
        registryCredential = 'dockerhub'        
    }
    
    stages{
       stage('Build image') {
      steps{
        script {
          dockerImage = docker.build registry 
        }
      }
    }
       stage('Publish Image') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }
stage('Deploy to K8s')
  {
   steps{
    sshagent(['kuberstage'])
    {

script{
      try{
        
       sh 'ssh stage@95.216.63.203 -p 3031 kubectl rollout restart deployment/nginx-god'
       sh 'echo "DEPLOY On Kubernetes..."'
}catch(error)
       {
}
     }
    }
   }
  }
  }
}
