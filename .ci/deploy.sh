#!/bin/bash
echo "🚀  Deploying via remote SSH"

SERVER_IP='192.168.1.194'
CONTAINER_NAME='patch-hub-server'

ssh -i "/var/jenkins_home/.ssh/id_rsa" "bls@${SERVER_IP}" \
  "docker pull ghcr.io/blogic-datht/${CONTAINER_NAME} \
  && docker compose -f composes/${CONTAINER_NAME}/docker-compose.yaml down \
  && docker compose -f composes/${CONTAINER_NAME}/docker-compose.yaml up -d \
  && docker system prune -f"

echo "🎉 Successfully deployed, hooray!"
