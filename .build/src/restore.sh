#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update
# install docker 
apt-get -y -q remove docker docker-engine docker.io
apt-get -y -q install docker.io
systemctl start docker
systemctl enable docker

# install node 10.0
apt-get install curl 
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get -y -q install nodejs

cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
npm install