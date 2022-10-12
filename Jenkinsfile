pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
}
