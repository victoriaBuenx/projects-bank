#!/bin/sh
set -e

echo "Running EF Core migrations..."
cd /app/src
dotnet-ef database update --project ResidenceService.Api.Infrastructure/ResidenceService.Api.Infrastructure.csproj --startup-project ResidenceService.Api/ResidenceService.Api.csproj

echo "Migrations completed. Starting residence-service..."
cd /app
dotnet ResidenceService.Api.dll
