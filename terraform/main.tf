# Configure the Okta Provider
terraform {
  required_version = ">= 1.0"
  required_providers {
    okta = {
      source  = "okta/okta"
      version = "~> 5.3"
    }
  }
}

# Configure the Okta Provider
provider "okta" {
  org_name  = var.okta_org_name
  base_url  = var.okta_base_url
  api_token = var.okta_api_token
}

# Create Okta Application
resource "okta_app_oauth" "healthcare_portal" {
  label                      = "Healthcare Portal"
  type                       = "web"
  grant_types                = ["authorization_code"]
  redirect_uris              = ["${var.app_url}/authorization-code/callback"]
  response_types             = ["code"]
  token_endpoint_auth_method = "client_secret_basic"
  client_basic_secret        = var.client_secret
  
  lifecycle {
    ignore_changes = [client_basic_secret]
  }
}

# Create Okta Group for Healthcare Admins
resource "okta_group" "healthcare_admins" {
  name        = "Healthcare Admins"
  description = "Administrators for the Healthcare Portal"
}

# Create Okta Group for Healthcare Users
resource "okta_group" "healthcare_users" {
  name        = "Healthcare Users"
  description = "Users for the Healthcare Portal"
}

# Assign users to groups (example)
resource "okta_user_group_memberships" "admin_users" {
  count = length(var.admin_users)
  user_id = var.admin_users[count.index]
  groups  = [okta_group.healthcare_admins.id]
}

# Create Okta Policy for Healthcare Portal
resource "okta_policy_rule_signon" "healthcare_policy" {
  policy_id = okta_group_policy_rule_signon.healthcare_policy.id
  name      = "Healthcare Portal Sign-On Policy"
  
  conditions {
    network {
      connection = "ANYWHERE"
    }
  }
}

# Create Okta Group Policy
resource "okta_group_policy_rule_signon" "healthcare_policy" {
  group_id = okta_group.healthcare_admins.id
  name     = "Healthcare Portal Policy"
  
  conditions {
    network {
      connection = "ANYWHERE"
    }
  }
} 