#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

# ROOT=$(cd $(dirname $0)/../../; pwd)

export CA_BUNDLE=$(kubectl get configmap -n kube-system extension-apiserver-authentication -o=jsonpath='{.data.client-ca-file}' | base64 | tr -d '\n')

cat templates/webhook-config.yaml | envsubst > templates/webhook-config-ca.yaml

#kubectl apply -f k8s/webhook-config-ca.yaml

#rm k8s/webhook-config-ca.yaml