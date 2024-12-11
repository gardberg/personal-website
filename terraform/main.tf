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

# IAM policy for unauthenticated access
resource "google_cloud_run_service_iam_member" "noauth" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# VPC Network
resource "google_compute_network" "lb_network" {
  name                    = "lb-network"
  auto_create_subnetworks = false  # This is what makes it "custom" subnet mode
}

# Subnet
resource "google_compute_subnetwork" "lb_subnet" {
  name          = "lb-subnet"
  ip_cidr_range = "10.1.2.0/24"
  region        = "europe-north1"
  network       = google_compute_network.lb_network.id
}

# Proxy-only subnet
resource "google_compute_subnetwork" "proxy_only_subnet" {
  name          = "proxy-only-subnet"
  ip_cidr_range = "10.129.0.0/23"
  region        = "europe-north1"
  network       = google_compute_network.lb_network.id
  purpose       = "REGIONAL_MANAGED_PROXY"
  role          = "ACTIVE"
}

resource "google_compute_address" "lb_ip" {
  name         = "personal-website-regional"  # new name to distinguish from global IP
  region       = "europe-north1"
  network_tier = "STANDARD"
}

output "regional_lb_ip" {
  value = google_compute_address.lb_ip.address
  description = "The IP address of the regional load balancer"
}

# SSL Certificate
resource "google_compute_managed_ssl_certificate" "default" {
  name = "mcrt-e5c134e0-8c58-431e-b388-20725b51741f"
  managed {
    domains = ["gardberg.xyz", "www.gardberg.xyz"]
  }
}

# URL Map
resource "google_compute_region_url_map" "default" {
  name            = "personal-website-url-map"
  region          = "europe-north1"
  default_service = google_compute_region_backend_service.default.id
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
    capacity_scaler = 1
    balancing_mode = "UTILIZATION"
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
resource "google_compute_region_target_https_proxy" "default" {
  name             = "personal-website-target-https-proxy"
  url_map          = google_compute_region_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

# HTTP Proxy (for redirect)
resource "google_compute_region_target_http_proxy" "default" {
  name    = "personal-website-target-http-proxy"
  region  = "europe-north1"
  url_map = google_compute_region_url_map.http_redirect.id
}

resource "google_compute_forwarding_rule" "https" {
  name       = "personal-website-fw-rule"
  region     = "europe-north1"
  port_range = "443"
  target     = google_compute_region_target_https_proxy.default.id
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address = google_compute_address.lb_ip.address
  depends_on = [google_compute_subnetwork.proxy_only_subnet]
}

resource "google_compute_forwarding_rule" "http" {
  name       = "personal-website-http-fw-rule"
  region     = "europe-north1"
  port_range = "80"
  target     = google_compute_region_target_http_proxy.default.id
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address = google_compute_address.lb_ip.address
  depends_on = [google_compute_subnetwork.proxy_only_subnet]
}

# URL Map for HTTP to HTTPS redirect
resource "google_compute_region_url_map" "http_redirect" {
  name = "personal-website-http-redirect"
  region = "europe-north1"
  default_url_redirect {
    https_redirect = true
    strip_query   = false
  }
}
