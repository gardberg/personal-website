
# Artifact Registry Repository
resource "google_artifact_registry_repository" "personal-repo" {
  location      = "europe-north1"
  repository_id = "personal-repo"
  description   = "Docker repository for personal website"
  format        = "DOCKER"
}

# IAM - Allow Cloud Run to pull images
# resource "google_artifact_registry_repository_iam_member" "cloud_run_pull" {
#   location    = google_artifact_registry_repository.personal-repo.location
#   repository  = google_artifact_registry_repository.personal-repo.name
#   role        = "roles/artifactregistry.reader"
#   member      = "serviceAccount:${google_cloud_run_service.default.template[0].spec[0].service_account_name}"
# }

# Add permissions for CI/CD service account to push images
resource "google_artifact_registry_repository_iam_member" "ci_admin" {
  location    = google_artifact_registry_repository.personal-repo.location
  repository  = google_artifact_registry_repository.personal-repo.name
  role        = "roles/artifactregistry.admin"
  member      = "serviceAccount:personal-dev-service-account@${var.project_id}.iam.gserviceaccount.com"
}
