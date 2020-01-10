#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update

# install docker 
# apt-get -y -q remove docker docker-engine docker.io
apt-get -y -q install docker.io
sudo usermod -aG docker ${USER}
service docker restart

# install node 10.0
apt-get install curl 
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get -y -q install nodejs

# run npm install
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
npm install