provider "aws" {
  region = "ap-southeast-1"
  profile = "quizhero"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "subnet1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1a"
}

resource "aws_subnet" "subnet2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-southeast-1b"
}

resource "aws_elastic_beanstalk_application" "quizhero" {
  name        = "quizhero"
  description = "Elastic Beanstalk Application for .NET Core on Linux"
}

resource "aws_elastic_beanstalk_environment" "quizhero_env" {
  name                = "quizhero-env"
  application         = aws_elastic_beanstalk_application.quizhero.name
  solution_stack_name = "64bit Amazon Linux 2023 v3.2.2 running .NET 8"
  
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "LoadBalanced"
  }
  
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBAllocatedStorage"
    value     = "20"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBDeletionPolicy"
    value     = "Delete"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "HasCoupledDatabase"
    value     = "true"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBEngine"
    value     = "sqlserver-ex"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBEngineVersion"
    value     = "15.00.4415.2.v1"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBInstanceClass"
    value     = "db.t3.micro"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBPassword"
    value     = "foobarbaz"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBUser"
    value     = "foobarbaz"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.main.id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", [aws_subnet.subnet1.id, aws_subnet.subnet2.id])
  }
}

output "url" {
  value = aws_elastic_beanstalk_environment.quizhero_env.endpoint_url
}