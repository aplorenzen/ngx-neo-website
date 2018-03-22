SET IMAGE_NAME=$1
SET IMAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed -e 's/[ ",]//g')

echo $VERSION

docker build -t $IMAGE_NAME:$IMAGE_VERSION dist/
