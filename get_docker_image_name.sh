#!/bin/bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# echo $BRANCH_NAME

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g')

# echo $PACKAGE_VERSION

PROJECT_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g')

# echo $PROJECT_NAME

if [ -n "$1" ]; then
  ENVIRONMENT=$1;
fi

IMAGE_NAME="$PROJECT_NAME:$PACKAGE_VERSION-$BRANCH_NAME"

if [ -n "$ENVIRONMENT" ]; then
  IMAGE_NAME="$IMAGE_NAME-$ENVIRONMENT";
fi

printf "$IMAGE_NAME"
