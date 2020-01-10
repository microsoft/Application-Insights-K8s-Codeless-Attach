#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update
apt-get -y -q install docker
apt-get install curl 
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get -y -q install nodejs
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
npm install