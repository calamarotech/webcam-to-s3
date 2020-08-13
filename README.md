# webcam to s3

## purpose

allows user to take a picture from their webcam and upload to an s3 bucket

## pre-requisites

1. AWS Cognito Identity Pool created (note Identity Pool ID)
2. AWS S3 bucket with CORS configured

## usage

1. add region, identity pool ID, and S3 bucket in app.js
2. serve from webserver
