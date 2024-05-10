#!/bin/bash

GITHUB_USERNAME=$1
GITHUB_PASSWORD=$2
CONTAINER_RELEASE_IMAGE="ghcr.io/${GITHUB_USERNAME}/patch-hub-server:latest"

# Print each command and exit on error
set -xe

# Login to registry
echo '🗝️  Login to github registry'
echo $GITHUB_PASSWORD | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Build and push image
echo '🐳  Building docker image with tag latest'
docker build --platform "linux/amd64" -t ${CONTAINER_RELEASE_IMAGE} -f Dockerfile .

echo '🚀  Pushing docker image to github registry'
docker push ${CONTAINER_RELEASE_IMAGE}
