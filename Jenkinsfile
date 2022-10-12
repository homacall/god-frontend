pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.jenkinsAgent'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
}
