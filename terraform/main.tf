# Reserved static IP
resource "google_compute_address" "default" {
  name = "personal-website"
}

# VPC Network
resource "google_compute_network" "default" {
  name                    = "lb-network-${var.environment}"
  auto_create_subnetworks = false  # Custom mode VPC
}

# Subnet
resource "google_compute_subnetwork" "default" {
  name          = "lb-subnet-${var.environment}"
  network       = google_compute_network.default.id
  ip_cidr_range = "10.1.2.0/24"  # You can adjust this range
  region        = "europe-north1"
}

# Proxy-only subnet
resource "google_compute_subnetwork" "proxy_subnet" {
  name          = "proxy-subnet-${var.environment}"
  network       = google_compute_network.default.id
  ip_cidr_range = "10.129.0.0/23"
  region        = "europe-north1"
  purpose       = "REGIONAL_MANAGED_PROXY"
  role          = "ACTIVE"
}

# SSL Certificate
resource "google_compute_managed_ssl_certificate" "default" {
  name = var.environment == "prod" ? "mcrt-e5c134e0-8c58-431e-b388-20725b51741f" : "personal-website-ssl-cert-${var.environment}"
  managed {
    domains = var.environment == "dev" ? [
      "dev.gardberg.xyz",
      "www.dev.gardberg.xyz"
    ] : [
      "gardberg.xyz",
      "www.gardberg.xyz"
    ]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Backend Service
resource "google_compute_region_backend_service" "default" {
  name        = "personal-website-backend-service"
  region      = "europe-north1"
  protocol    = "HTTP"
  port_name   = "http"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  timeout_sec = 30

  backend {
    group = google_compute_region_network_endpoint_group.serverless_neg.id
    capacity_scaler = 1.0
  }
}

# Regional URL Map
resource "google_compute_region_url_map" "default" {
  name            = "personal-website-url-map"
  region          = "europe-north1"
  default_service = google_compute_region_backend_service.default.id
}

# Regional HTTP Proxy
resource "google_compute_region_target_http_proxy" "default" {
  name    = "personal-website-http-proxy"
  region  = "europe-north1"
  url_map = google_compute_region_url_map.default.id
}

# Regional Forwarding Rule
resource "google_compute_forwarding_rule" "http" {
  name                  = "website-http-rule-${var.environment}"
  region                = "europe-north1"
  port_range           = "80"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  network_tier         = "STANDARD"
  target               = google_compute_region_target_http_proxy.default.id
  ip_address          = google_compute_address.default.address
  network              = google_compute_network.default.id
  subnetwork           = google_compute_subnetwork.default.id
}

# Network Endpoint Group for Cloud Run
resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  name                  = "personal-website-serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region               = "europe-north1"
  cloud_run {
    service = google_cloud_run_service.default.name
  }
}

# Cloud Run Service
resource "google_cloud_run_service" "default" {
  name     = "personal-website"
  location = "europe-north1"

  template {
    spec {
      containers {
        image = "${var.image_repository}:${var.image_tag}"
        startup_probe {
          http_get {
            path = "/api/healthz"
          }
          initial_delay_seconds = 10
          timeout_seconds = 30
          period_seconds = 60
          failure_threshold = 3
        }
        liveness_probe {
          http_get {
            path = "/api/healthz" 
          }
          timeout_seconds = 10
          period_seconds = 30
        }
      }
    }
  }
}

# IAM policy to allow public access to Cloud Run service
resource "google_cloud_run_service_iam_member" "public" {
  location = google_cloud_run_service.default.location
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

