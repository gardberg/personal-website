output "website_ip" {
  description = "The reserved IP address for the website"
  value       = google_compute_address.default.address
}
