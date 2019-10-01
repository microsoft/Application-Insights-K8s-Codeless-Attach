#!/bin/bash
AKS_RESOURCE_GROUP=gearama-aks-1
AKS_CLUSTER_NAME=gearama-aks-2
ACR_RESOURCE_GROUP=gearama-aks-1
ACR_NAME=gearamaaks

# Get the id of the service principal configured for
AKSCLIENT_ID=$(az aks show --resource-group $AKS_RESOURCE_GROUP --name $AKS_CLUSTER_NAME --query "servicePrincipalProfile.clientId")
echo $CLIENT_ID

# Get the ACR registry resource id
ACR_ID=$(az acr show --name $ACR_NAME --resource-group $ACR_RESOURCE_GROUP --query "id")
echo $ACR_ID

# Create role assignment
az role assignment create --assignee $CLIENT_ID --role acrpull --scope $ACR_ID
echo 6
