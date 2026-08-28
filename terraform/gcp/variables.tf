variable "gcp_project_id" {
  description = "The Google Cloud Platform (GCP) Project ID."
  type        = string
  default     = "code-wala-prod"
}

variable "gcp_region" {
  description = "The GCP region to deploy resources into."
  type        = string
  default     = "us-central1"
}

variable "app_name" {
  description = "Application name."
  type        = string
  default     = "code-wala"
}

variable "environment" {
  description = "Environment identifier."
  type        = string
  default     = "production"
}

variable "container_image" {
  description = "Container image for Cloud Run."
  type        = string
  default     = "gcr.io/cloudrun/hello"
}
