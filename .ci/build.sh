#!/bin/sh

# Please create a .credentials file in the home directory with the following content:
# GITHUB_USERNAME=your_github_username
# GITHUB_PASSWORD=your_github_personal_access_token
source ~/.credentials

GITHUB_USERNAME=$GITHUB_USERNAME
GITHUB_PASSWORD=$GITHUB_PASSWORD

DOCKER_IMAGE_NAME="ghcr.io/${GITHUB_USERNAME}/patch-hub-server"

APP_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Login to registry
echo ''
echo ''
echo '     ooo,    .---.'
echo '    o`  o   /    |\________________'
echo '   o`   `oooo()  | ________   _   _)'
echo '   `oo   o` \    |/        | | | |'
echo '     `ooo`   `---`         "-" |_|'
echo ''
echo "🗝️  Login to github registry"
echo $GITHUB_PASSWORD | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Build and push image

echo ''
echo ''
echo ''
echo '                 ##         .'
echo '           ## ## ##        =='
echo '        ## ## ## ## ##    ==='
echo '    /"""""""""""""""""\___/ ==='
echo '   {                       /  ===-'
echo '    \______ O           __/'
echo '      \    \         __/'
echo '       \____\_______/'
echo ''
echo "🐳  Build docker image with tag latest & ${APP_VERSION}"

docker build \
  --platform 'linux/amd64' \
  -t ${DOCKER_IMAGE_NAME}:latest \
  -t ${DOCKER_IMAGE_NAME}:${APP_VERSION} \
  -f Dockerfile . || exit 1

echo ''
echo ''
echo ''
echo '          !'
echo '          ^'
echo '         / \'
echo '        /___\'
echo '       |=   =|'
echo '       |     |'
echo '       |     |'
echo '       |     |'
echo '       |     |'
echo '       |     |'
echo '       |     |'
echo '      /|##!##|\'
echo '     / |##!##| \'
echo '    /  |##!##|  \'
echo '   |  / ^ | ^ \  |'
echo '   | /  ( | )  \ |'
echo '   |/   ( | )   \|'
echo '       ((   ))'
echo '      ((  :  ))'
echo '       ((   ))'
echo '        (( ))'
echo '         ( )'
echo ''
echo "🚀  Push docker image to github container registry"

docker push ${DOCKER_IMAGE_NAME}:latest || exit 1
docker push ${DOCKER_IMAGE_NAME}:${APP_VERSION} || exit 1

# Manually run command
# docker build -t "ghcr.io/blogic-datht/patch-hub-server:latest" -f Dockerfile .

echo "🪠  Clean up"
docker rmi ${DOCKER_IMAGE_NAME}:latest
docker rmi ${DOCKER_IMAGE_NAME}:${APP_VERSION}
