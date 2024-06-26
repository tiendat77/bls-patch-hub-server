#!/bin/bash

SERVER_IP='192.168.1.194'

echo
echo "                 %%%%%                            "
echo "              %%%%%%%%  *                         "
echo "             %%%%%%%%%  *****                     "
echo "             %%%% %%%%  ********                  "
echo "         %%  %%%  %%%%  ******+**                 "
echo "       %%%%  %%%  %%%%  ***  +***                 "
echo "       %%%%  %%%  %%%%  ***  ****                 "
echo "       %%%%  %%%  %%%%  *+*  ****                 "
echo "       %%%%  %%%  %%%%  ***  +***                 "
echo "       %%%%  %%%  %%%%  ***  ****                 "
echo "       %%%%  %%%  %%%%  ***  ****                 "
echo "       %%%%%%%%%  %%%%  ***                       "
echo "        %%%%%%%%  %%%%  ***                       "
echo "           %%%%%  %%%%  +**                       "
echo "              %%  %%%%  **                        "
echo "                  %%%%                            "
echo
echo "🚀 Deploying via remote SSH ${SERVER_IP}          "


ssh "bls@${SERVER_IP}" \
  "docker compose -f composes/patch-hub/docker-compose.yaml pull \
  && docker compose -f composes/patch-hub/docker-compose.yaml down \
  && docker compose -f composes/patch-hub/docker-compose.yaml up -d \
  && docker system prune -f" || exit 1

echo
echo "🎉 Successfully deployed, hooray!"