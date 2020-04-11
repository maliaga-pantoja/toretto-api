node {
    stage('Install node modules'){
                sh 'pwd'
                ws('/home/roswell/toreto/') {
                  sh 'pwd'
                }
        }
        stage('Checkout SCM'){
                sh "echo 'hola mundo en:'"
                sh 'pwd'
                git branch: 'master',
                    url: 'git@github.com:yacafx/toreto-api.git',
                    credentialsId: '7c0e4441-3a29-464a-9512-5dab69fab340'
        }
         
}
