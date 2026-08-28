# 🌍 Multi-Cloud Terraform Infrastructure — CODE WALA

Welcome to the multi-cloud infrastructure repository for **CODE WALA (코드 & सुकून)**. This directory contains production-grade, modular Terraform code for deploying the application across **AWS**, **GCP**, and **Azure**.

---

## 📁 Directory Layout & Cloud Providers

```
terraform/
├── README.md                      # Master Multi-Cloud Terraform Deployment Guide
├── aws/                           # Amazon Web Services (AWS) Infrastructure
│   ├── main.tf                    # S3, CloudFront CDN, ECR, ECS Fargate
│   ├── variables.tf               # Region, app_name, container specs
│   ├── outputs.tf                 # CloudFront URL, ECR URL, S3 Endpoint
│   ├── terraform.tfvars.example   # Example variables
│   └── README.md                  # AWS Deployment Guide
├── gcp/                           # Google Cloud Platform (GCP) Infrastructure
│   ├── main.tf                    # GCS Static Bucket, Cloud Run, Artifact Registry
│   ├── variables.tf               # Project ID, region, container image
│   ├── outputs.tf                 # Cloud Run URL, GCS Static URL
│   ├── terraform.tfvars.example   # Example variables
│   └── README.md                  # GCP Deployment Guide
└── azure/                         # Microsoft Azure Infrastructure
    ├── main.tf                    # Resource Group, Storage Account Static Web, Container App
    ├── variables.tf               # Location, resource_group_name, app_name
    ├── outputs.tf                 # Container App FQDN, Storage Endpoint
    ├── terraform.tfvars.example   # Example variables
    └── README.md                  # Azure Deployment Guide
```

---

## ⚡ Multi-Cloud Architecture Summary

| Cloud Provider | Static Web Hosting | CDN / Routing | Container Registry | Container Runtime |
| :--- | :--- | :--- | :--- | :--- |
| **AWS** | Amazon S3 Bucket | Amazon CloudFront | AWS ECR | AWS ECS Fargate |
| **GCP** | Google Cloud Storage (GCS) | Cloud CDN / Load Balancer | Artifact Registry | Google Cloud Run |
| **Azure** | Azure Storage ($web blob) | Azure Front Door / Ingress | Azure Container Registry (ACR) | Azure Container Apps |

---

## 🚀 How to Deploy to Your Cloud Provider

### 1. Amazon Web Services (AWS)
```bash
cd terraform/aws
terraform init
terraform apply -auto-approve
```
👉 Detailed guide: [terraform/aws/README.md](aws/README.md)

### 2. Google Cloud Platform (GCP)
```bash
cd terraform/gcp
terraform init
terraform apply -auto-approve
```
👉 Detailed guide: [terraform/gcp/README.md](gcp/README.md)

### 3. Microsoft Azure
```bash
cd terraform/azure
terraform init
terraform apply -auto-approve
```
👉 Detailed guide: [terraform/azure/README.md](azure/README.md)

---
*Created with ❤️ for multi-cloud deployment automation.*
