# Deploy to AWS with Terraform


# Prepare

- On IAM create a user group `quizhero`

```bash
# Create IAM group
aws iam create-group --group-name quizhero

# Attach policies to the group
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AWSLambda_FullAccess
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator
aws iam attach-group-policy --group-name quizhero --policy-arn arn:aws:iam::aws:policy/IAMFullAccess

# Create IAM user
aws iam create-user --user-name quizhero-user

# Add user to the group
aws iam add-user-to-group --user-name quizhero-user --group-name quizhero

# Create access keys for the user
aws iam create-access-key --user-name quizhero-user
```

Initialize terraform with

```bash
terraform init
```


