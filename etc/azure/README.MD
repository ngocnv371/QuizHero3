# Deploy to Azure using Terraform

Do this with a student account for easy $100 credits.

# Setup

Install CLI

```ps1
$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; Remove-Item .\AzureCLI.msi
```

Login

```ps1
az login
```

Fill in the credentials

```ps1
az account show
```

Copy the tenant and subscription to `provider.tf`

Deploy

```ps1
terraform apply
```

# CI/CD

Since I'm using a Students account, it does not support `az login` in Github Actions, hence no CI/CD.

# Deployment

Manually deploy this solution with Terraform.

# Certs

Generate a new GUID: `e7bd9340-dcb8-41a0-bd7b-255bf2632750` and put to Github Secrets & WebApp vars