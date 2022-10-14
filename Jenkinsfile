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
       stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry 
        }
      }
    }
       stage('Deploy Image') {
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
    sshagent(['kuber'])
    {

script{
      try{
       sh 'ssh root@95.216.63.203 -p 3031 kubectl rollout restart deployment/nginx-god'
}catch(error)
       {
}
     }
    }
   }
  }
  }
}
