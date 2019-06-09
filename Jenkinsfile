node {

        stage('Install node modules'){
                sh "npm install"
        }
        stage('Deploy'){
                sh "echo 'Stoping...'"
                sh "pm2 stop toreto"
        }
}
