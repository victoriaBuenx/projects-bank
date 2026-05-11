FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /app

COPY . .
RUN dotnet restore ResidenceService.Api/ResidenceService.Api.csproj
RUN dotnet publish ResidenceService.Api/ResidenceService.Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:10.0
WORKDIR /app

COPY --from=build /app/out .
COPY --from=build /app ./src 

RUN cd /app/src && dotnet restore ResidenceService.Api/ResidenceService.Api.csproj
RUN dotnet tool install --global dotnet-ef && \
    ln -s /root/.dotnet/tools/dotnet-ef /usr/local/bin/dotnet-ef

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh"]
