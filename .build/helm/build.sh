#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# run helm package
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../helm
helm lint 
helm package . -d ..\helm_package --app-version 0.1.2 --version 0.1.2