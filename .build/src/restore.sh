#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y -q update
apt-get -y -q install docker
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
ls
npm install