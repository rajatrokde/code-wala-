variable "azure_location" {
  description = "The Azure region to deploy resources into."
  type        = string
  default     = "East US"
}

variable "resource_group_name" {
  description = "Name of the Azure resource group."
  type        = string
  default     = "rg-codewala-prod"
}

variable "app_name" {
  description = "Application name."
  type        = string
  default     = "codewala"
}

variable "environment" {
  description = "Environment identifier."
  type        = string
  default     = "production"
}

variable "container_image" {
  description = "Container image for Azure Container Apps."
  type        = string
  default     = "mcr.microsoft.com/azuredocs/aci-helloworld:latest"
}
