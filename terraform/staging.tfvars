# Staging Environment Variables
environment = "staging"
app_url     = "https://staging-healthcare-portal.example.com"

# Okta Configuration (these should be set via environment variables)
# okta_org_name = "your-org"
# okta_api_token = "your-api-token"
# client_secret = "your-client-secret"

# Admin users for staging
admin_users = [
  # Add staging admin user IDs here
]

# Tags for staging
tags = {
  Environment = "staging"
  Project     = "Healthcare Portal"
  ManagedBy   = "Terraform"
  Team        = "DevOps"
} 