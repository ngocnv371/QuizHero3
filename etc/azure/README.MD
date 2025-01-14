# Deploy to Azure using Terraform

Do this with a student account for easy $100 credits.

# Setup Local Terraform

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

Since I'm using a Students account, it does not support `az login` in Github Actions, hence no straight `az deploy`.

But we can deploy an Azure Webapp using the provided Publish Profile, so that's what we do with Github Actions.

# Deployment

- Run `terraform init` and `terraform apply` to apply the infrastructure on Azure.
  - SQL Server
    - Random password for admin account
    - Database
      - Connection String
    - Firewall rules to allow inter-services
  - Web App
    - Stack: .NET 9
    - Connection String from SQL Server
    - Specify we can load certificates
    - Set the app URLs
- Setup Github Actions Secrets
  - `HOST_PUBLISH_PROFILE`: get the Publish Profile from the Web App
  - `CONNECTION_STRING`: from `terraform output -raw connection_string`
  - `CERTIFICATE_PASSWORD`: from [variables.tf]
  - `APP_NAME`: from [variables.tf]
- Github Actions are configured to run on push to `master`
  - Generate 2 certificates using the same passphrase
    - `server-encryption-certificate.pfx`
    - `server-signing-certificate.pfx`
  - As part of ABP CLI deployment, `abp install-libs` is required to create `libs` folder for the host site (mostly for default UI and swagger)
- Migrator can't be securely executed here since the SQL Server firewall.
  - So we need to run it manually
