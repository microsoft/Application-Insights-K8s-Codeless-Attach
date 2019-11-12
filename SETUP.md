# Instructions
The following steps are performed in a Linux environment

1. Follow the steps **here** (https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough#connect-to-the-cluster)
2. install **helm** ( https://github.com/helm/helm )
3. If RBAC follow the steps **here** (https://helm.sh/docs/rbac/)
4. make sure you have **dos2unix** installed . E.G. on Ubuntu based distributions run "*sudo apt-get install dos2unix*"
5. Execute **init.sh** from a linux terminal, 
   **NOTE** : ensure az and the above mentioned cli are installed and you have obtained credentials
6. Update the "**values.yaml**" file with your values for namespaces or create a new file to override the value
7. in the **./helm** folder run "**helm install .\helm-*version*.tgz -f values.yaml --name *some name***"
