# Instructions
The following steps are performed in a Linux environment:

1. To establish connection to your cluster follow the steps here 
[here](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough#connect-to-the-cluster)
2. Make sure [helm]( https://helm.sh/docs/using_helm/#from-script) is installed 
3. If RBAC follow the steps [here](https://helm.sh/docs/rbac/)
4. make sure you have **dos2unix** installed . E.G. on Ubuntu based distributions run "*sudo apt-get install dos2unix*"
5. Download a [release](https://github.com/microsoft/Application-Insights-K8s-Codeless-Attach/releases) 
6. Test the connection to the cluster using *kubectl get nodes*
7. Execute **init.sh** from the [release](https://github.com/microsoft/Application-Insights-K8s-Codeless-Attach/releases) in a linux terminal, 
   
8. Update the newly created "**values.yaml**" file with your values for namespaces
9. Run "**helm install ./helm-*version*.tgz -f values.yaml**" (optionally you can name the release as described here https://v2.helm.sh/docs/using_helm/#helm-install-installing-a-package )
