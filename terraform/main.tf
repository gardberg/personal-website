# SSL Certificate
resource "google_compute_managed_ssl_certificate" "default" {
  name = "mcrt-e5c134e0-8c58-431e-b388-20725b51741f"
  managed {
    domains = ["gardberg.xyz", "www.gardberg.xyz"]
  }
}

# URL Map
resource "google_compute_url_map" "default" {
  name            = "personal-website-url-map"
  default_service = google_compute_backend_service.default.id
}

# Backend Service
resource "google_compute_backend_service" "default" {
  name        = "personal-website-backend-service"
  protocol    = "HTTP"
  port_name   = "http"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  timeout_sec = 30

  backend {
    group = google_compute_region_network_endpoint_group.serverless_neg.id
  }
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

# HTTPS Proxy
resource "google_compute_target_https_proxy" "default" {
  name             = "personal-website-target-https-proxy"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

# Global Forwarding Rules
resource "google_compute_global_forwarding_rule" "https" {
  name       = "personal-website-fw-rule"
  target     = google_compute_target_https_proxy.default.id
  port_range = "443"
  ip_address = "34.149.55.251"
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

resource "google_compute_global_forwarding_rule" "http" {
  name       = "personal-website-http-fw-rule"
  target     = google_compute_target_http_proxy.default.id
  port_range = "80"
  ip_address = "34.149.55.251"
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

# HTTP Proxy (for redirect)
resource "google_compute_target_http_proxy" "default" {
  name    = "personal-website-target-http-proxy"
  url_map = google_compute_url_map.http_redirect.id
}

# URL Map for HTTP to HTTPS redirect
resource "google_compute_url_map" "http_redirect" {
  name = "personal-website-http-redirect"
  default_url_redirect {
    https_redirect = true
    strip_query   = false
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