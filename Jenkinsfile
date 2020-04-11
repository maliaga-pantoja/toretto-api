node {
    stage('Install node modules'){
      sh "echo 'hola mundo en: 1'"
                sh 'pwd'
      sh 'whoami'
                ws("/home/roswell/apps/toreto/") {
                  sh "echo 'hola mundo en: 2'"
                  sh 'pwd'
                   git branch: 'master',
                    url: 'git@github.com:yacafx/toreto-api.git',
                    credentialsId: '7c0e4441-3a29-464a-9512-5dab69fab340'
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
