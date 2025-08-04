# Production Environment Variables
environment = "production"
app_url     = "https://healthcare-portal.example.com"

# Okta Configuration (these should be set via environment variables)
# okta_org_name = "your-org"
# okta_api_token = "your-api-token"
# client_secret = "your-client-secret"

# Admin users for production
admin_users = [
  # Add production admin user IDs here
]

# Tags for production
tags = {
  Environment = "production"
  Project     = "Healthcare Portal"
  ManagedBy   = "Terraform"
  Team        = "DevOps"
} 