output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}
output "container_registry_name" {
  value = azurerm_container_registry.acr.name
}
output "container_registry_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "sql_server_name" {
  value = azurerm_mssql_server.server.name
}

output "admin_password" {
  sensitive = true
  value     = local.admin_password
}
output "webapp_url" {
  sensitive = true
  value     = azurerm_linux_web_app.webapp.default_hostname
}