#!/bin/bash

docker run \
  --name neo-website \
  -d \
  --network neo-nginx-back \
  -e VIRTUAL_HOST=neoprime.it \
  -e VIRTUAL_PORT=80 \
  ngx-neo-website:0.1.0-skills
