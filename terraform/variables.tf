variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "environment" {
  description = "Environment (dev/prod)"
  type        = string
}

variable "image_tag" {
  description = "The tag for the Cloud Run container image"
  type        = string
}

variable "image_repository" {
  description = "The repository path for the Cloud Run container image registry"
  type        = string
  default     = "europe-north1-docker.pkg.dev/fleet-tractor-432310-d8/personal-repo/gardberg/personal-website"
}
