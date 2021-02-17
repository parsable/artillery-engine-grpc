#!/usr/bin/env groovy
@Library('parsable') _

pod(label: 'artillery-engine-grpc-js').container('node').build {
  stage('Checkout') {
    checkout scm
  }
  stage('Setup') {
    npmAuth()
    sh "yarn"
  }
  stage('Run Tests') {
    sh "yarn test"
  }
  stage('Publish') {
    npmPublishArtifactory()
  }
}
