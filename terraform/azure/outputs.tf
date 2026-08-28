output "container_app_fqdn" {
  description = "The public FQDN URL of the Azure Container App."
  value       = "https://${azurerm_container_app.app.ingress[0].fqdn}"
}

output "storage_static_website_endpoint" {
  description = "The public primary web endpoint of Azure Storage Account."
  value       = azurerm_storage_account.sa.primary_web_endpoint
}

output "acr_login_server" {
  description = "The Azure Container Registry login server URI."
  value       = azurerm_container_registry.acr.login_server
}
