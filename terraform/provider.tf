terraform {
  required_version = ">= 0.13"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "fleet-tractor-432310-d8-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "fleet-tractor-432310-d8"
  region  = "europe-north1"
}