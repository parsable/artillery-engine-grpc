#!/usr/bin/env groovy
@Library('parsable') _

flow(name: 'component-library')
    .jsComponent()
    .onBuild({
      stage('Setup') {
        sh "yarn"
      }
    //   stage('Formatting & Linter') {
    //     sh "yarn lint"
    //   }
      stage('Run Tests') {
        sh "yarn test"
      }
    })
    .run()
