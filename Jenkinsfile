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
    sshagent(['k8s-jenkins'])
    {
     sh 'scp -r -o StrictHostKeyChecking=no node-deployment.yaml username@102.10.16.23:/path'
script{
      try{
       sh 'ssh username@102.10.16.23 kubectl apply -f /path/node-deployment.yaml --kubeconfig=/path/kube.yaml'
}catch(error)
       {
}
     }
    }
   }
  }
  }
}
