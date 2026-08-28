# ☁️ AWS Terraform Deployment Guide — CODE WALA

This Terraform module provisions production-ready infrastructure for **CODE WALA / CODE & SUKOON** on **Amazon Web Services (AWS)**.

---

## 🏗️ Architecture Provisioned

1. **AWS S3 Bucket**: Configured for static website hosting.
2. **AWS CloudFront CDN**: Global content delivery network with SSL/TLS encryption.
3. **AWS ECR Repository**: Elastic Container Registry for Docker images.
4. **AWS ECS Fargate Cluster**: Serverless container orchestration for running production containers.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) v1.5+
- [AWS CLI](https://aws.amazon.com/cli/) configured with valid credentials (`aws configure`)

### 2. Initialize Terraform
```bash
cd terraform/aws
terraform init
```

### 3. Review Plan
```bash
cp terraform.tfvars.example terraform.tfvars
terraform plan
```

### 4. Apply Infrastructure
```bash
terraform apply -auto-approve
```

### 5. Deploy Static Web App Files to S3
```bash
# Build Vite project in root directory
npm run build

# Sync built assets to S3
aws s3 sync ../../dist s3://code-wala-production-static-bucket --delete
```

---

## 📋 Outputs

- `cloudfront_distribution_url`: Global CloudFront SSL CDN URL
- `s3_website_endpoint`: Direct S3 website endpoint
- `ecr_repository_url`: Docker repository URL for pushing container images
