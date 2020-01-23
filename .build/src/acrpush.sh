#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:latest