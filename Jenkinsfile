node {

        stage('Install node modules'){
                sh "npm install"
        }
        stage('Deploy'){
                sh "pm2 restart all"
        }
}
