#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
/usr/bin/docker build -t mutating-webhook . --no-cache
az acr login --name applicationinsights
/usr/bin/docker tag mutating-webhook applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:goqu
/usr/bin/docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:goqu