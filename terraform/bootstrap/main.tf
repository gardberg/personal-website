variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

provider "google" {
  project = var.project_id
  region  = "europe-north1"
}

# bucket for storing remote terraform state using in cd
resource "google_storage_bucket" "terraform_state" {
  name          = "${var.project_id}-terraform-state"
  location      = "europe-north1"
  force_destroy = false
  
  versioning {
    enabled = true
  }

  uniform_bucket_level_access = true

  lifecycle_rule {
    condition {
      num_newer_versions = 3
    }
    action {
      type = "Delete"
    }
  }
}
