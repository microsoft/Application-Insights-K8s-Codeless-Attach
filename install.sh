#!/bin/bash
kubectl apply -f ./k8s/namespace.yaml
./scripts/gen-cert.sh
helm install ./helm/ --name "AKS Codeless Attach"
