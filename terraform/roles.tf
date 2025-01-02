# Grant Compute Engine admin permissions to service account
resource "google_project_iam_member" "compute_admin" {
  project = var.project_id
  role    = "roles/compute.admin"
  member  = "serviceAccount:personal-dev-service-account@${var.project_id}.iam.gserviceaccount.com"
}
