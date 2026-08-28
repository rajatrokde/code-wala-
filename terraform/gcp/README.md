# 🌐 GCP Terraform Deployment Guide — CODE WALA

This Terraform module provisions production-ready infrastructure for **CODE WALA / CODE & SUKOON** on **Google Cloud Platform (GCP)**.

---

## 🏗️ Architecture Provisioned

1. **Google Cloud Run**: Serverless container execution platform with automatic scaling.
2. **Google Cloud Storage (GCS)**: Multi-regional bucket configured for static web asset hosting.
3. **Artifact Registry**: Next-generation Docker container registry on GCP.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) v1.5+
- [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install) authenticated (`gcloud auth login`)

### 2. Initialize Terraform
```bash
cd terraform/gcp
terraform init
```

### 3. Review Plan
```bash
cp terraform.tfvars.example terraform.tfvars
# Update gcp_project_id in terraform.tfvars
terraform plan
```

### 4. Apply Infrastructure
```bash
terraform apply -auto-approve
```

### 5. Deploy Static Web App Files to GCS
```bash
# Build Vite project in root directory
npm run build

# Upload built static bundle to GCS bucket
gcloud storage cp -r ../../dist/* gs://<YOUR_PROJECT_ID>-code-wala-static/
```

---

## 📋 Outputs

- `cloud_run_url`: Public HTTPS endpoint of your Cloud Run service
- `gcs_static_website_url`: Direct GCS storage static website URL
- `artifact_registry_repository`: Docker repository URI for pushing images
