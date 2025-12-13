pipeline {
    agent any

    environment {
        // ---- Account & Region ----
        AWS_ACCOUNT_ID = '391061376449'
        AWS_REGION     = 'us-east-1'

        // ---- ECR repository URIs ----
        FRONTEND_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/devops-challenge-frontend"
        BACKEND_REPO  = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/devops-challenge-backend"

        // ---- ECS cluster & services ----
        ECS_CLUSTER      = 'devops-challenge-cluster'
        FRONTEND_SERVICE = 'devops-challenge-frontend-service'
        BACKEND_SERVICE  = 'devops-challenge-backend-service'
    }

    stages {
        stage('Checkout code') {
            steps {
                checkout scm
            }
        }
        // ... rest of your stages ...
    }
}


        stage('Build Docker images') {
            steps {
                script {
                    sh 'docker build -t frontend:latest ./frontend'
                    sh 'docker build -t backend:latest ./backend'
                }
            }
        }

        stage('Authenticate to ECR') {
            steps {
                // NOTE: credentialsId MUST match the ID of the AWS credentials
                // you created in Jenkins (Kind: AWS Credentials)
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: AWS-Admin]]) {
                    script {
                        sh '''
                            aws --version
                            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $FRONTEND_REPO
                            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $BACKEND_REPO
                        '''
                    }
                }
            }
        }

        stage('Tag and Push images to ECR') {
            steps {
                script {
                    sh '''
                        docker tag frontend:latest $FRONTEND_REPO:latest
                        docker tag backend:latest $BACKEND_REPO:latest

                        docker push $FRONTEND_REPO:latest
                        docker push $BACKEND_REPO:latest
                    '''
                }
            }
        }

        stage('Update ECS services') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: AWS-Admin]]) {
                    script {
                        sh '''
                            aws ecs update-service --cluster $ECS_CLUSTER --service $FRONTEND_SERVICE --force-new-deployment --region $AWS_REGION
                            aws ecs update-service --cluster $ECS_CLUSTER --service $BACKEND_SERVICE --force-new-deployment --region $AWS_REGION
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
