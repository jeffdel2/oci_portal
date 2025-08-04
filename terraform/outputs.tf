# Output the Okta Application ID
output "okta_app_id" {
  description = "ID of the created Okta application"
  value       = okta_app_oauth.healthcare_portal.id
}

# Output the Okta Application Client ID
output "okta_client_id" {
  description = "Client ID of the created Okta application"
  value       = okta_app_oauth.healthcare_portal.client_id
}

# Output the Okta Application Client Secret
output "okta_client_secret" {
  description = "Client secret of the created Okta application"
  value       = okta_app_oauth.healthcare_portal.client_secret
  sensitive   = true
}

# Output the Healthcare Admins Group ID
output "healthcare_admins_group_id" {
  description = "ID of the Healthcare Admins group"
  value       = okta_group.healthcare_admins.id
}

# Output the Healthcare Users Group ID
output "healthcare_users_group_id" {
  description = "ID of the Healthcare Users group"
  value       = okta_group.healthcare_users.id
}

# Output the application URL
output "app_url" {
  description = "Application URL"
  value       = var.app_url
}

# Output the environment
output "environment" {
  description = "Current environment"
  value       = var.environment
}

# Output Okta organization information
output "okta_org_url" {
  description = "Okta organization URL"
  value       = "https://${var.okta_org_name}.${var.okta_base_url}"
} 