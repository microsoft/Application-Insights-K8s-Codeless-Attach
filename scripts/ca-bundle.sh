#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

export CA_BUNDLE=$(kubectl get configmap -n kube-system extension-apiserver-authentication -o=jsonpath='{.data.client-ca-file}' | base64 | tr -d '\n')

cat ./webhook-config.yaml | envsubst > ../helm/templates/webhook-config-ca.yaml
