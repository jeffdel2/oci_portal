# Okta Provider Variables
variable "okta_org_name" {
  description = "Okta organization name"
  type        = string
  sensitive   = true
}

variable "okta_base_url" {
  description = "Okta base URL"
  type        = string
  default     = "okta.com"
}

variable "okta_api_token" {
  description = "Okta API token"
  type        = string
  sensitive   = true
}

# Application Variables
variable "app_url" {
  description = "Application URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "client_secret" {
  description = "OAuth client secret"
  type        = string
  sensitive   = true
}

# User Management Variables
variable "admin_users" {
  description = "List of admin user IDs"
  type        = list(string)
  default     = []
}

variable "environment" {
  description = "Environment (staging/production)"
  type        = string
  default     = "staging"
  
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be either 'staging' or 'production'."
  }
}

# Tags
variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {
    Environment = "staging"
    Project     = "Healthcare Portal"
    ManagedBy   = "Terraform"
  }
} 