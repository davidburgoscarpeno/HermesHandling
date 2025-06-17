# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar los archivos .csproj del proyecto Server y Data
COPY HermesHandling.Server/HermesHandling.Server.csproj HermesHandling.Server/
COPY HermesHandling.Data/HermesHandling.Data.csproj HermesHandling.Data/

# Restaurar paquetes solo para el proyecto Server
RUN dotnet restore HermesHandling.Server/HermesHandling.Server.csproj

# Copiar todo el código fuente de la solución
COPY . .

# Publicar en modo Release y salida en /app/publish
RUN dotnet publish HermesHandling.Server/HermesHandling.Server.csproj -c Release -o /app/publish

# Etapa runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiar la aplicación publicada desde la etapa build
COPY --from=build /app/publish .

# Exponer el puerto 8080 para Fly.io
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Ejecutar la aplicación
ENTRYPOINT ["dotnet", "HermesHandling.Server.dll"]

