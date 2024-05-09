#!/bin/bash

# Create docker network
docker network create patch_hub_network

# Create docker volume
docker volume create patch_hub_db_volume

docker volume create \
  --driver local \
  --opt type=none \
  --opt device=~/home/bls/volumes/patch-hub \
  --opt o=bind \
  patch_hub_resource_volume

# Run docker-compose
docker-compose up -d
