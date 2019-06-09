node {
        stage('Checkout SCM'){
                git branch: 'master',
                    url: 'git@github.com:yacafx/toreto-api.git',
                    credentiaslID: '7c0e4441-3a29-464a-9512-5dab69fab340'
        }
         stage('Install node modules'){
                sh "echo 'hola mundo'"
                sh "npm install"
        }
}
