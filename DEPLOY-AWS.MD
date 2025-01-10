# Deploy to AWS with Terraform


# Prepare

- On IAM create a user group `quizhero`

Run this script using cloudshell or local CLI.

```bash
# Create IAM group
aws iam create-group --group-name quizhero

# Attach policies to the group
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/IAMFullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonVPCFullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AdministratorAccess-AWSElasticBeanstalk
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonRDSFullAccess

# Create IAM user
aws iam create-user --user-name quizhero-user

# Add user to the group
aws iam add-user-to-group --user-name quizhero-user --group-name quizhero

# Create access keys for the user
aws iam create-access-key --user-name quizhero-user
```

# Create a new AWS Profile

Open aws config ([~/.aws/credentials]) and add a new section

```
[quizhero]
aws_access_key_id=abc
aws_secret_access_key=def
aws_region = ap-southeast-1
```

# Run terraform

Initialize terraform with

```bash
terraform init
```


