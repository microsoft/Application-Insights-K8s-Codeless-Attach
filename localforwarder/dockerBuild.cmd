setlocal
call docker build -t local-forwarder . --no-cache
call az acr login --name applicationinsights
call docker tag local-forwarder applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
call docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
endlocal

