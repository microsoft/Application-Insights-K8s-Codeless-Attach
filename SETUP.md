# Setup
1. install **azure cli** ( https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest )
2. install **azure aks cli** ( https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-install-cli )
3. get **aks credentials** ( https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-get-credentials )
4. install **helm** ( https://github.com/helm/helm )
    a. if RBAC is enabled here is an example of commands to properly enable helm 
       kubectl create serviceaccount tiller --namespace kube-system
       kubectl create clusterrolebinding tiller-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller --namespace kube-system
       helm init --service-account tiller --upgrade

5. run **helm init** ( https://helm.sh/docs/using_helm/#quickstart-guide)
   **NOTE** : if the cluster has **RBAC** enabled you will need to ensure **TILLER** is properly configured to perform its actions. 
6. make sure you have **dos2unix** installed 
6. go to **./scripts** and execute **gen-cert.sh** from a linux terminal, 
   **NOTE** : ensure az and the above mentioned cli are installed and you have obtained credentials
7. in the **./helm_package** folder update the "**values.yaml**" file with your values for namespaces or create a new file to override the value
8. in the **./helm** folder run "**helm install .\helm-*version*.tgz -f values.yaml --name *some name***"
