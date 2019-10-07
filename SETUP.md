# Setup
1. install azure cli ( https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest )
2. install azure aks cli ( https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-install-cli )
3. get aks credentials ( https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-get-credentials )
4. install helm ( https://github.com/helm/helm )
5. run helm init ( https://helm.sh/docs/using_helm/#quickstart-guide)
6. go to ./scripts and execute gen-cert.sh from a linux terminal
7. in the ./helm folder update the "values.yaml" file with your values for ikey or create a new file to override the value
8. in the ./helm folder run "helm install . --name <some name>"