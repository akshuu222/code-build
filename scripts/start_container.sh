#!/bin/bash

IMAGE_NAME=akshuu222/web:latest
CONTAINER_NAME=my-app-container

echo "Starting new container...."
docker run -d \
  --name $CONTAINER_NAME \
  -p 80:3000 \
  --restart always \
  $IMAGE_NAME
