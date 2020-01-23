#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update

# install node 10.0
apt-get install curl 
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get -y -q install nodejs

# install helm 
wget https://get.helm.sh/helm-v3.0.2-linux-amd64.tar.gz
tar xvf helm-v3.0.2-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin/
helm version

#install docker 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y -q docker-ce

#install az
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# run npm install
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
npm install