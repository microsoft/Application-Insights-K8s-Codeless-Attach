#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
cd `dirname $0`
SCRIPTDIR=`pwd`
cd ${SCRIPTDIR}/../../src
npm run clean 
npm run build 
npm run test 
npm run lint 
