node {
    stage('Checkout SCM'){
      sh "echo 'hola mundo en: 1'"
                sh 'pwd'
      sh 'whoami'
                ws("/home/roswell/apps/toreto/") {
                   git branch: 'master',
                    url: 'git@github.com:yacafx/toreto-api.git',
                    credentialsId: '7c0e4441-3a29-464a-9512-5dab69fab340'
                }
        }
        stage('Install node modules'){
                sh "npm i"
        }
}
