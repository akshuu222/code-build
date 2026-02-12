#!/bin/bash

REGISTRY_URL=924358636787.dkr.ecr.us-east-1.amazonaws.com
IMAGE_NAME=${REGISTRY_URL}/prod/node-todo:latest
CONTAINER_NAME=my-app-container

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${REGISTRY_URL}

echo "Starting new container...."
docker run -d \
  --name $CONTAINER_NAME \
  -p 80:3000 \
  --restart always \
  $IMAGE_NAME
