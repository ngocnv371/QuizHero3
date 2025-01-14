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

We got closer, still failed when running migrator, since it can't reach the SQL server behind the firewall. We either run a self hosted and add the host to whitelist, or run it behind the firewall somehow.

For now, skip it.

Problem: loading the certs in Azure returns error "wrong password", the same certs can be loaded locally just fine.

The file deployed to WebApp is not the same as in the artifact (checksum wrong)

Check certificate against password

```bash
openssl pkcs12 -in server-encryption-certificate.pfx -password pass:e7bd9340-dcb8-41a0-bd7b-255bf2632750 -info -nokeys
```

Now added the certificates in the code base to skip the hassle.

Yep, we got in. But hit another problem `Interop+Crypto+OpenSslCryptographicException: error:10000080:BIO routines::no such file`

Just found out that the github action deploy the app to `/apihost` instead of `/` so that's why it never works.

Fixed that by removing the path from checkout action.

Problem: 'missing libs', caused by `abp install-libs` skipped installing libs for the host project.

Try manually.

Turns out the error is 

```log
error Error: ENOENT: no such file or directory, open '/home/runner/.cache/yarn/v6/npm-reusify-1.0.4-90da382b1e126efc02146e90845a88db12925d76-integrity/node_modules/reusify/.yarn-tarball.tgz' 
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```

Clean cache and it works.

Now the app is in status 500.

No logs.