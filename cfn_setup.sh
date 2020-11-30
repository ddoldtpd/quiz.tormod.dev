#! /bin/bash

case "$1" in
        "s3")
            echo Creating s3 stack
            aws cloudformation deploy --template-file ./cfn/websiteS3.yml --stack-name=quiz-tormod-dev-stack --region eu-west-1
            ;;
        *)
            echo "Invalid argument"
esac
