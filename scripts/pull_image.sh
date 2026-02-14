#!/bin/bash

IMAGE_NAME=924358636787.dkr.ecr.us-east-1.amazonaws.com/prod/node-todo:latest

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${REGISTRY_URL}
echo "Pulling latest image..."
docker pull $IMAGE_NAME
