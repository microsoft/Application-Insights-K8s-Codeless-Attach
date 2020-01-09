#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update
apt-get -y -q install docker
cd ./../../src/
npm install