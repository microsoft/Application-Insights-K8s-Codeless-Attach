[![Build Status](https://github-private.visualstudio.com/microsoft/_apis/build/status/CDPX/Application-Insights-K8s-Codeless-Attach/application-insights-k8s-codeless-attach-Linux-Official-master?branchName=master)](https://github-private.visualstudio.com/microsoft/_build/latest?definitionId=111&branchName=master)
## Purpose 

Allow Kubernetes deployed application written in Java, Node.JS, .Net Core to export telemetry to Azure Application Insights without the need for the application to be instrumented using the Azure SDK.

## How 

By deploying *agents* ( a.k.a libraries ) that are loaded at runtime by the framework underlining the application, data can be uploaded to the customer specified application insights resource. 
The agents are transparently injected at deploy time by leveraging Kubernetes mutating web hooks, to update the deployment definition of the container. 

For existing deployments the webhook will update the pods on restart, or redeploy. Since we do not have visibility into the purpose of deployements, in order to avoid creating problems, we do not interfere with running pods.

## High level workflow description

A developer deploys the an new app to a kubernetes cluster, previously configured as explained in the next section. 

As the application gets deployed to the desired namespace, the mutating web hook gets invoked by Kubernetes with the deployment document as one of the invocation parameters. 

The mutating web hook first performs validation on the document to ensure that it can be updated with the agents information. 

After the validation passes, the following information is added to the deployment document :

    1. environment variables instructing the frameworks to load the agents. 
    2. instructions how to mount the agent binaries
    2. configuration for the agents regarding which Application Insights resource to push data to

All this information is returned to Kubernetes as a response to the call, in the form of a JSON patch. 

From here the deployment proceeds as normal and the pod is initialized with the extra added environment variables. 
    
## Setup 

[Setting it up](SETUP.md)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
