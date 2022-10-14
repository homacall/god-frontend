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
     sh 'scp -r -o StrictHostKeyChecking=no deploymentservice.yml root@95.216.63.203:/root'
script{
      try{
       sh 'ssh root@95.216.63.203 kubectl apply -f /root/deploymentservice.yml --kubeconfig=/root/kube_config_cluster.yml'
}catch(error)
       {
}
     }
    }
    }
}

