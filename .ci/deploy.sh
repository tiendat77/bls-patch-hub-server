#!/bin/bash

# Please create a .credentials file in the home directory with the following content:
# GITHUB_USERNAME=your_github_username
# GITHUB_PASSWORD=your_github_personal_access_token
source ~/.credentials

GITHUB_USERNAME=$GITHUB_USERNAME
GITHUB_PASSWORD=$GITHUB_PASSWORD

SERVER_IP_ADDRESS="bls@192.168.1.194"
SERVER_KEY_PATH="~/.ssh/id_rsa"
SERVER_COMPOSE_PATH="~/composes/patch-hub/docker-compose.yaml"

echo '                         .-.'
echo '                        ( ('
echo '                         `-`'
echo ''
echo ''
echo '                    .   ,- To the Moon!'
echo '                   .`.'
echo '                   |o|'
echo '                  .`o`.'
echo '                  |.-.|'
echo '                  `   `'
echo '                   ( )'
echo '                    )'
echo '                   ( )'
echo ''
echo '               ____'
echo '          .-"""p 8o""`-.'
echo '       .-`8888P`Y.`Y[ ` `-.'
echo '     ,`]88888b.J8oo_      ``.'
echo '   ,` ,88888888888["        Y`.'
echo '  /   8888888888P            Y8\'
echo ' /    Y8888888P`             ]88\'
echo ':     `Y88`   P              `888:'
echo ':       Y8.oP `- >            Y88:'
echo '|          `Yb  __             ``|'
echo ':            ``d8888bo.          :'
echo ':             d88888888ooo.      ;'
echo ' \            Y88888888888P     /'
echo '  \            `Y88888888P     /'
echo '   `.            d88888P`    ,`'
echo '     `.          888PP`    ,`'
echo '       `-.      d8P`    ,-`   '
echo '          `-.,,_`__,,.-`'
echo ''
echo "🚀  Deploying via remote SSH"

ssh -i ${SERVER_KEY_PATH} ${SERVER_IP_ADDRESS} \
  "echo $GITHUB_PASSWORD | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin" || exit 1

ssh -i ${SERVER_KEY_PATH} ${SERVER_IP_ADDRESS} \
  "docker compose -f ${SERVER_COMPOSE_PATH} pull && \
   docker compose -f ${SERVER_COMPOSE_PATH} up -d && \
   docker image prune -f" || exit 1

echo "🎉 Successfully deployed, hooray!"
