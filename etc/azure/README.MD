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

Even with a successful deployment, the app won't just start yet.

It will say `FileNotFoundException: Signing Certificate couldn't found: openiddict.pfx`

Setup Github Actions credentials

We use the default AZ CLI client id `04b07795-8ddb-461a-bbee-02f9e1bf7b46`

```json
{
    "tenantId": "808cc83e-a546-47e7-a03f-73a1ebba24f3",
    "subscriptionId": "c485c316-1495-42da-9c30-9260cd8fa5b6"
}
```

we can't us username & password in github actions

so let's add a self hosted runner

ugggh, so problematic