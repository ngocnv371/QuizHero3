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
