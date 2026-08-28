terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# -----------------------------------------------------------------------------
# 1. Resource Group
# -----------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.azure_location

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

# -----------------------------------------------------------------------------
# 2. Azure Storage Account (Static Website Hosting)
# -----------------------------------------------------------------------------
resource "azurerm_storage_account" "sa" {
  name                     = "${var.app_name}sa${var.environment}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

# -----------------------------------------------------------------------------
# 3. Azure Container Registry (ACR)
# -----------------------------------------------------------------------------
resource "azurerm_container_registry" "acr" {
  name                = "${var.app_name}acrrepo"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    Environment = var.environment
    Project     = var.app_name
  }
}

# -----------------------------------------------------------------------------
# 4. Azure Container Apps Environment & App
# -----------------------------------------------------------------------------
resource "azurerm_log_analytics_workspace" "logs" {
  name                = "${var.app_name}-logs"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "env" {
  name                       = "${var.app_name}-container-env"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.logs.id
}

resource "azurerm_container_app" "app" {
  name                         = "${var.app_name}-app"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name   = var.app_name
      image  = var.container_image
      cpu    = 0.5
      memory = "1.0Gi"
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}
