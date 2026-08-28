output "cloud_run_url" {
  description = "The public HTTPS URL of the Cloud Run serverless service."
  value       = google_cloud_run_service.app.status[0].url
}

output "gcs_static_website_url" {
  description = "The public GCS static bucket URL."
  value       = "https://storage.googleapis.com/${google_storage_bucket.static_site.name}/index.html"
}

output "artifact_registry_repository" {
  description = "The Artifact Registry Docker repository path."
  value       = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.repo.repository_id}"
}
