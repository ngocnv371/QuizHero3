output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "sql_server_domain" {
  value = azurerm_mssql_server.server.fully_qualified_domain_name
}

output "admin_password" {
  sensitive = true
  value     = local.admin_password
}

output "connection_string" {
  sensitive = true
  value     = local.connection_string
}

output "webapp_url" {
  sensitive = true
  value     = azurerm_linux_web_app.webapp.default_hostname
}