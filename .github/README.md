# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Healthcare Portal project.

## Workflows

### 1. CI (`ci.yml`)
**Triggers:** Push to main/develop, Pull requests
**Purpose:** Continuous Integration with testing and security checks

**Features:**
- Multi-node version testing (16.x, 18.x, 20.x)
- Security audits with npm audit
- Application startup testing
- Environment variable validation
- Sensitive file detection
- Build artifact creation

### 2. Terraform CI (`terraform-ci.yml`)
**Triggers:** Push to main/develop, Pull requests
**Purpose:** Terraform validation and Okta provider testing

**Features:**
- Terraform format checking
- Terraform validation
- Terraform planning
- Okta provider configuration validation
- Security scanning with tfsec
- Okta configuration validation
- Application testing with Okta integration

### 3. Deploy (`deploy.yml`)
**Triggers:** Push to main, Manual workflow dispatch
**Purpose:** Automated deployment to staging and production

**Features:**
- Staging deployment on develop branch
- Production deployment on main branch
- Manual deployment option
- Health checks after deployment
- Automatic rollback on failure
- Environment-specific configurations

### 4. Terraform Deploy (`terraform-deploy.yml`)
**Triggers:** Push to main, Manual workflow dispatch
**Purpose:** Terraform deployment with Okta provider

**Features:**
- Terraform deployment to staging/production
- Okta provider configuration
- Manual Terraform actions (plan/apply/destroy)
- Okta resource validation
- AWS credentials configuration
- Environment-specific Terraform variables

### 5. Security (`security.yml`)
**Triggers:** Daily schedule, Push/PR to main/develop
**Purpose:** Security scanning and vulnerability detection

**Features:**
- Daily security scans
- npm audit checks
- Snyk security scanning
- Secret detection in code
- Dependency update monitoring
- CodeQL analysis

### 6. Okta Security (`okta-security.yml`)
**Triggers:** Daily schedule, Push/PR to main/develop
**Purpose:** Okta-specific security and compliance checks

**Features:**
- Okta secrets detection in code
- Okta environment variable validation
- Okta provider configuration validation
- Okta app configuration validation
- Terraform security scanning for Okta
- Okta compliance checks
- Okta dependency security

### 7. Release (`release.yml`)
**Triggers:** Push of version tags (v*)
**Purpose:** Automated release creation

**Features:**
- Pre-release testing
- Release package creation
- GitHub release creation
- Asset upload
- Team notifications

## Configuration

### Environment Variables
Create the following secrets in your GitHub repository:

- `SNYK_TOKEN`: Snyk API token for security scanning
- `SLACK_WEBHOOK_URL`: Slack webhook for notifications (optional)
- `DEPLOY_SSH_KEY`: SSH key for deployment (if using SSH deployment)
- `DEPLOY_HOST`: Deployment host address
- `DEPLOY_USER`: Deployment user

#### Okta-Specific Secrets
- `OKTA_ORG_URL`: Your Okta organization URL
- `OKTA_API_TOKEN`: Your Okta API token
- `OKTA_ORG_NAME`: Your Okta organization name
- `CLIENT_ID`: Okta OAuth client ID
- `CLIENT_SECRET`: Okta OAuth client secret

#### AWS Secrets (for Terraform)
- `AWS_ACCESS_KEY_ID`: AWS access key for Terraform
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for Terraform
- `AWS_REGION`: AWS region for Terraform

### Environment Protection
Set up environment protection rules for:
- `staging`: Require PR reviews
- `production`: Require PR reviews and status checks

## Customization

### Deployment Commands
Update the deployment steps in `deploy.yml` with your actual deployment commands:

```yaml
- name: Deploy to staging
  run: |
    # Example: SCP deployment
    scp healthcare-portal-staging.tar.gz user@staging-server:/app/
    ssh user@staging-server "cd /app && tar -xzf healthcare-portal-staging.tar.gz"
```

### Health Checks
Update health check URLs in `deploy.yml`:

```yaml
- name: Health check staging
  run: |
    curl -f http://staging-url/health || exit 1
```

### Notifications
Add notification commands for your preferred channels (Slack, email, etc.).

## Dependabot

The `dependabot.yml` configuration automatically:
- Updates npm dependencies weekly
- Updates GitHub Actions weekly
- Creates PRs for dependency updates
- Ignores major version updates for critical packages

## Security Best Practices

1. **Never commit sensitive files** - Ensure `.env`, `.okta.env` are in `.gitignore`
2. **Use environment secrets** - Store sensitive values in GitHub secrets
3. **Regular security scans** - The security workflow runs daily
4. **Dependency updates** - Dependabot keeps dependencies current
5. **Code scanning** - CodeQL analyzes for security vulnerabilities

## Troubleshooting

### Common Issues

1. **Build failures**: Check Node.js version compatibility
2. **Deployment failures**: Verify SSH keys and host configuration
3. **Security scan failures**: Review and fix vulnerability reports
4. **Environment variable errors**: Ensure all required secrets are set

### Debugging

- Check workflow logs in GitHub Actions tab
- Verify environment variables are properly set
- Test deployment commands locally first
- Review security audit results 