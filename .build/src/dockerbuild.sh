#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
docker build -t mutating-webhook . --no-cache