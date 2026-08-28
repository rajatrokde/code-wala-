# 🔷 Azure Terraform Deployment Guide — CODE WALA

This Terraform module provisions production-ready infrastructure for **CODE WALA / CODE & SUKOON** on **Microsoft Azure**.

---

## 🏗️ Architecture Provisioned

1. **Azure Resource Group**: Logical container for all project cloud resources.
2. **Azure Storage Account (Static Website)**: Blob storage configured for static web hosting.
3. **Azure Container Registry (ACR)**: Managed private container registry.
4. **Azure Container Apps**: Serverless container platform with built-in HTTPS ingress and scaling.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) v1.5+
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) logged in (`az login`)

### 2. Initialize Terraform
```bash
cd terraform/azure
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

### 5. Upload Static Website Bundle to Azure Storage
```bash
# Build Vite project in root directory
npm run build

# Upload built assets to $web container in Azure Storage
az storage blob upload-batch \
  --account-name codewalasa production \
  --destination '$web' \
  --source ../../dist
```

---

## 📋 Outputs

- `container_app_fqdn`: Public HTTPS endpoint of Azure Container App
- `storage_static_website_endpoint`: Direct Azure Storage Account static web URL
- `acr_login_server`: Container Registry server URI for Docker pushes
