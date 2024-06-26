#!/bin/bash

source ~/.credentials

GITHUB_USERNAME=$GITHUB_USERNAME
GITHUB_PASSWORD=$GITHUB_PASSWORD

CONTAINER_RELEASE_IMAGE="ghcr.io/${GITHUB_USERNAME}/patch-hub-server"

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Print each command and exit on error
set -xe

# Login to registry
echo '🗝️  Login to github registry'
echo $GITHUB_PASSWORD | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Build and push image
echo '🐳  Building docker image with tag latest'
docker build \
  --platform "linux/amd64" \
  -t ${CONTAINER_RELEASE_IMAGE}:latest \
  -t ${CONTAINER_RELEASE_IMAGE}:${VERSION} \
  -f Dockerfile . || exit 1

echo '🚀  Pushing docker image to github registry'
docker push ${CONTAINER_RELEASE_IMAGE}:latest || exit 1
docker push ${CONTAINER_RELEASE_IMAGE}:${VERSION} || exit 1

# Manually run command
# docker build -t "ghcr.io/blogic-datht/patch-hub-server:latest" -f Dockerfile .
