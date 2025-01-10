provider "aws" {
  region = "ap-southeast-1"
  profile = "quizhero"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "ig-main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ig-main.id
  }
}

resource "aws_subnet" "subnet1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1a"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "subnet1_association" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_subnet" "subnet2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-southeast-1b"
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table_association" "subnet2_association" {
  subnet_id      = aws_subnet.subnet2.id
  route_table_id = aws_route_table.private.id
}

resource "aws_security_group" "subnet2_access" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.subnet1.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "quizhero_db" {
  allocated_storage    = 20
  engine               = "sqlserver-ex"
  engine_version       = "15.00.4415.2.v1"
  instance_class       = "db.t3.micro"
  username             = "foobarbaz"
  password             = "foobarbaz"
  parameter_group_name = "default.sqlserver-ex-15.0"
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.subnet2_access.id]
  db_subnet_group_name = aws_db_subnet_group.quizhero_db_subnet_group.name
}

resource "aws_db_subnet_group" "quizhero_db_subnet_group" {
  name       = "quizhero-db-subnet-group"
  subnet_ids = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
  description = "QuizHero DB subnet group"
}

resource "aws_elastic_beanstalk_application" "quizhero" {
  name        = "quizhero"
  description = "Elastic Beanstalk Application for .NET Core on Linux"
}

resource "aws_iam_role" "role-quizhero" {
  name = "role-quizhero"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_instance_profile" "ec2-role-quizhero" {
  name = "ec2-role-quizhero"

  role = aws_iam_role.role-quizhero.name
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
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.ec2-role-quizhero.name
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