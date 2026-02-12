#!/bin/bash

CONTAINER_NAME=my-app-container

echo "Stopping existing container..."
docker stop $CONTAINER_NAME || true

echo "Removing existing container..."
docker rm $CONTAINER_NAME || true
