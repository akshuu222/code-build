#!/bin/bash

IMAGE_NAME=924358636787.dkr.ecr.us-east-1.amazonaws.com/prod/node-todo:latest

echo "Pulling latest image..."
docker pull $IMAGE_NAME
