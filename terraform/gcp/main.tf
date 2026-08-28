terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# -----------------------------------------------------------------------------
# 1. Google Artifact Registry (Docker Container Repository)
# -----------------------------------------------------------------------------
resource "google_artifact_registry_repository" "repo" {
  location      = var.gcp_region
  repository_id = "${var.app_name}-docker-repo"
  description   = "Docker repository for ${var.app_name}"
  format        = "DOCKER"
}

# -----------------------------------------------------------------------------
# 2. Google Cloud Storage Bucket for Static Web Hosting
# -----------------------------------------------------------------------------
resource "google_storage_bucket" "static_site" {
  name          = "${var.gcp_project_id}-${var.app_name}-static"
  location      = "US"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.static_site.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# -----------------------------------------------------------------------------
# 3. Google Cloud Run Service (Fully-managed Serverless Container)
# -----------------------------------------------------------------------------
resource "google_cloud_run_service" "app" {
  name     = "${var.app_name}-cloud-run"
  location = var.gcp_region

  template {
    spec {
      containers {
        image = var.container_image

        ports {
          container_port = 80
        }

        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1000m"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_service.app.location
  project  = google_cloud_run_service.app.project
  service  = google_cloud_run_service.app.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
