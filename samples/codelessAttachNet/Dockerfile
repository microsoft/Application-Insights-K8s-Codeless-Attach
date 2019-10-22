FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
COPY ./bin/Release/netcoreapp3.0/ /codelessattachNetCore/
WORKDIR /codelessattachNetCore
EXPOSE 5000
CMD ["dotnet", "codelessAttachNet.dll"]