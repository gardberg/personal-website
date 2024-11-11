provider "google" {
  project = "fleet-tractor-432310-d8"
  region  = "europe-north1"
}

resource "google_storage_bucket" "terraform_state" {
  name          = "fleet-tractor-432310-d8-terraform-state"
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
