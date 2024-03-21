#!/bin/bash
echo '🐳  Build docker image with tag latest'

IMAGE_NAME='ghcr.io/blogic-datht/patch-hub-server'
docker build --platform "linux/amd64" -t "$IMAGE_NAME:latest" . || exit 1

echo '🚀  Build done!\n'

USERNAME='blogic-datht'
CR_PAT='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'

# login to github registry
echo $CR_PAT | docker login ghcr.io -u $USERNAME --password-stdin

# push image to github registry
docker push $IMAGE_NAME:latest || exit 1
echo '🌏  Published image to Github registry'