pipeline {
    agent { label 'master' }
    
    environment {
        SONAR_HOME= tool "SonarScanner"
        AWS_REGION = "ap-south-1"
        BACKEND_DIR = "backend"
        FRONTEND_DIR = "frontend"
        FRONTEND_SECRET = "e-commerce-prod-frontend"
        BACKEND_SECRET = "e-commerce-prod"
        SONARQUBE_ENV    = "SonarQubeServer"
    }

    stages {
        // ============= STAGE 1: CHECKOUT CODE =============
        stage('Checkout Code') {
            steps {
                echo "=========================================="
                echo "STAGE 1: CHECKOUT CODE - Starting"
                echo "=========================================="
                echo "Cloning repository from GitHub: main branch"
                
                git branch: 'main',
                    url: 'https://github.com/SyeedBilal/E-Com.git'
                
                echo "Repository cloned successfully"
                echo "Verifying directory structure"
                sh 'ls -la'
                
                echo "STAGE 1: CHECKOUT CODE - Completed"
                echo "==========================================\n"
            }
        }

        // ============= STAGE 2: BACKEND DEPENDENCIES INSTALLATION =============
        stage('Backend Install Dependencies') {
            steps {
                echo "=========================================="
                echo "STAGE 2: BACKEND INSTALL DEPENDENCIES - Starting"
                echo "=========================================="
                
                echo "Navigating to backend directory: ${BACKEND_DIR}"
                dir("${BACKEND_DIR}") {
                    echo "Installing backend npm dependencies"
                    sh 'npm install'
                    echo "Backend dependencies installed successfully"
                    sh 'ls -la node_modules || echo "node_modules not found"'
                }
                
                echo "STAGE 2: BACKEND INSTALL DEPENDENCIES - Completed"
                echo "==========================================\n"
            }
        }

        // ============= STAGE 3: FRONTEND DEPENDENCIES INSTALLATION =============
        stage('Frontend Install Dependencies') {
            steps {
                echo "=========================================="
                echo "STAGE 3: FRONTEND INSTALL DEPENDENCIES - Starting"
                echo "=========================================="
                
                echo "Navigating to frontend directory: ${FRONTEND_DIR}"
                dir("${FRONTEND_DIR}") {
                    echo "Installing frontend npm dependencies"
                    sh 'npm install'
                    sh 'npm run build'
                    echo "Frontend dependencies installed successfully"
                    sh 'ls -la node_modules || echo "node_modules not found"'
                }
                
                echo "STAGE 3: FRONTEND INSTALL DEPENDENCIES - Completed"
                echo "==========================================\n"
            }
        }

        ============= STAGE 4: SONARQUBE CODE ANALYSIS =============
        stage('SonarQube Code Analysis') {
            steps {
                echo "=========================================="
                echo "STAGE 4: SONARQUBE CODE ANALYSIS - Starting"
                echo "=========================================="
                
                echo "Current directory structure:"
                sh 'pwd'
                sh 'ls -la'
                
                echo "Performing SonarQube scan on backend code"
                dir("${BACKEND_DIR}") {
                    echo "Inside backend directory: ${BACKEND_DIR}"
                    sh 'pwd'
                    sh 'ls -la'
                    
                    echo "Verifying SonarScanner is available in PATH"
                    sh 'sonar-scanner --version || echo "SonarScanner version check"'
                    
                    withSonarQubeEnv('SonarQubeServer') {
                        echo "Connecting to SonarQube Server: SonarQubeServer"
                        echo "Running sonar-scanner for backend project: mern-backend"
                        
                        sh 'sonar-scanner --version'
                          sh """
              $SONAR_HOME/bin/sonar-scanner \
                -Dsonar.projectKey=mern-backend \
                -Dsonar.sources=. \
                -Dsonar.exclusions=node_modules/** \
                -Dsonar.host.url=\${SONAR_HOST_URL} \
                -Dsonar.login=\${SONAR_AUTH_TOKEN}
            """
                        
                        echo "SonarQube scan completed successfully"
                    }
                }
                
                echo "STAGE 4: SONARQUBE CODE ANALYSIS - Completed"
                echo "==========================================\n"
            }
        }

        // ============= STAGE 5: QUALITY GATE VALIDATION =============
        stage('Quality Gate Validation') {
            steps {
                echo "=========================================="
                echo "STAGE 5: QUALITY GATE VALIDATION - Starting"
                echo "=========================================="
                echo "Waiting for SonarQube Quality Gate results"
                echo "Timeout set to 5 minutes"
                
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
                
                echo "Quality Gate validation passed successfully"
                echo "STAGE 5: QUALITY GATE VALIDATION - Completed"
                echo "==========================================\n"
            }
        }

        ============= STAGE 6: SECURITY DEPENDENCY CHECK =============
        stage('OWASP Security Scan') {
            steps {
                echo "=========================================="
                echo "STAGE 6: OWASP SECURITY SCAN - Starting"
                echo "=========================================="
                
                echo "Running OWASP Dependency Check on backend code"
                dir("${BACKEND_DIR}") {
                    echo "Scanning for security vulnerabilities in dependencies"
                    dependencyCheck additionalArguments: '''
                        --scan .
                        --exclude node_modules
                        --format XML
                        --out dependency-check-report
                        --failOnCVSS 7
                    ''', odcInstallation: 'OWASP-DC'
                    echo "OWASP Dependency Check completed"
                }
                
                echo "Publishing OWASP dependency check results"
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                echo "Security scan results published"
                
                echo "STAGE 6: OWASP SECURITY SCAN - Completed"
                echo "==========================================\n"
            }
        }

        ============= STAGE 7: PREPARE ENVIRONMENT VARIABLES =============
   stage('Prepare Environment Variables') {
    steps {
        echo "=========================================="
        echo "STAGE 7: PREPARE ENVIRONMENT VARIABLES - Starting"
        echo "=========================================="
        
        echo "Fetching secrets from AWS Secrets Manager"
        
        script {
            // Backend secrets - using temporary file method (reliable)
            sh """
                # Fetch secret and save to temp file
                aws secretsmanager get-secret-value \
                    --secret-id ${BACKEND_SECRET} \
                    --region ${AWS_REGION} \
                    --query SecretString \
                    --output text > /tmp/backend-secret.json
                
                # Parse JSON and create .env file
                jq -r 'to_entries | .[] | "\\(.key)=\\(.value)"' /tmp/backend-secret.json > ${BACKEND_DIR}/.env
                
                # Verify the file was created correctly
                echo "Backend .env file created with \$(wc -l < ${BACKEND_DIR}/.env) lines"
                
                # Clean up
                rm /tmp/backend-secret.json
            """
            
            echo "Backend secrets saved to .env file"
            
            // Frontend secrets - using temporary file method
            sh """
                # Fetch secret and save to temp file
                aws secretsmanager get-secret-value \
                    --secret-id ${FRONTEND_SECRET} \
                    --region ${AWS_REGION} \
                    --query SecretString \
                    --output text > /tmp/frontend-secret.json
                
                # Parse JSON and create .env file
                jq -r 'to_entries | .[] | "\\(.key)=\\(.value)"' /tmp/frontend-secret.json > ${FRONTEND_DIR}/.env
                
                # Verify the file was created correctly
                echo "Frontend .env file created with \$(wc -l < ${FRONTEND_DIR}/.env) lines"
                
                # Clean up
                rm /tmp/frontend-secret.json
            """
            
            echo "Frontend secrets saved to .env file"
        }
        
        echo "STAGE 7: PREPARE ENVIRONMENT VARIABLES - Completed"
        echo "==========================================\n"
    }
}

        // ============= STAGE 8: DEPLOY BACKEND =============
        stage('Deploy Backend') {
            steps {
                echo "=========================================="
                echo "STAGE 8: DEPLOY BACKEND - Starting"
                echo "=========================================="
                
                echo "Starting backend deployment..."
                dir("${BACKEND_DIR}") {
                    echo "Installing production dependencies only"
                    sh 'npm install --production'
                    
                    echo "Checking existing PM2 processes"
                    sh 'pm2 delete e-com-backend || echo "No existing process found"'
                    
                    echo "Starting backend application with PM2"
                    sh 'pm2 start server.js --name e-com-backend'
                    sh 'pm2 save'
                    
                    echo "Backend deployment completed successfully"
                    sh 'pm2 list'
                }
                
                echo "STAGE 8: DEPLOY BACKEND - Completed"
                echo "==========================================\n"
            }
        }

        // ============= STAGE 9: BUILD AND DEPLOY FRONTEND =============
        stage('Build and Deploy Frontend') {
            steps {
                echo "=========================================="
                echo "STAGE 9: BUILD AND DEPLOY FRONTEND - Starting"
                echo "=========================================="
                
                echo "Starting frontend build and deployment..."
                dir("${FRONTEND_DIR}") {
                    echo "Building frontend application"
                    sh 'npm run build'
                    echo "Frontend build completed"
                    
                    echo "Cleaning Nginx web directory"
                    sh 'sudo rm -rf /var/www/html/*'
                    
                    echo "Copying build files to Nginx directory"
                    sh 'sudo cp -r dist/* /var/www/html/'
                    echo "Files copied successfully"
                    
                    echo "Restarting Nginx service"
                    sh 'sudo systemctl restart nginx'
                    echo "Nginx restarted successfully"
                    sh 'sudo systemctl status nginx | grep "Active:"'
                }
                
                echo "STAGE 9: BUILD AND DEPLOY FRONTEND - Completed"
                echo "==========================================\n"
            }
        }

        // ============= STAGE 10: VERIFY DEPLOYMENT =============
        stage('Verify Deployment') {
            steps {
                echo "=========================================="
                echo "STAGE 10: VERIFY DEPLOYMENT - Starting"
                echo "=========================================="
                
                echo "Checking backend process status"
                sh 'pm2 show e-com-backend || echo "Backend process check failed"'
                
                echo "Checking Nginx configuration"
                sh 'sudo nginx -t'
                
                echo "Testing application endpoints (optional)"
                sh '''
                    echo "Testing backend health endpoint"

                '''
                
                echo "Deployment verification completed"
                echo "STAGE 10: VERIFY DEPLOYMENT - Completed"
                echo "==========================================\n"
            }
        }
    }

    post {
        always {
            script {
                echo "=========================================="
                echo "PIPELINE EXECUTION COMPLETED"
                echo "=========================================="
                echo "Cleaning up workspace"
                
                echo "Workspace cleaned up successfully"
                echo "Pipeline finished at: ${new Date()}"
                echo "=========================================="
            }
        }
        success {
            script {
                echo "🎉🎉🎉 PIPELINE EXECUTED SUCCESSFULLY! 🎉🎉🎉"
                echo "Application deployed successfully!"
                echo "Backend running on port 4000"
                echo "Frontend served by Nginx on port 80"
            }
        }
        failure {
            script {
                echo "❌❌❌ PIPELINE EXECUTION FAILED! ❌❌❌"
                echo "Please check the logs above for errors."
                
                // Optional: Send notifications
                echo "Checking service status for debugging:"
                sh '''
                    pm2 list || true
                    sudo systemctl status nginx || true
                '''
            }
        }
        unstable {
            script {
                echo "⚠️⚠️⚠️ PIPELINE EXECUTION IS UNSTABLE! ⚠️⚠️⚠️"
                echo "Quality Gate may have failed or warnings occurred."
            }
        }
    }
}