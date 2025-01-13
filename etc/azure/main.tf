resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = "rg-${var.app_name}"
}

resource "random_password" "admin_password" {
  count       = var.admin_password == null ? 1 : 0
  length      = 20
  special     = false
  min_numeric = 1
  min_upper   = 1
  min_lower   = 1
  min_special = 1
}

locals {
  admin_password = try(random_password.admin_password[0].result, var.admin_password)
}

resource "azurerm_mssql_server" "server" {
  name                         = "mssql-${var.app_name}"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  administrator_login          = var.admin_username
  administrator_login_password = local.admin_password
  version                      = "12.0"
}

resource "azurerm_mssql_database" "db" {
  name      = var.sql_db_name
  server_id = azurerm_mssql_server.server.id
}

locals {
  connection_string = "Server=tcp:${azurerm_mssql_server.server.fully_qualified_domain_name},1433;Initial Catalog=${var.sql_db_name};Persist Security Info=False;User ID=${var.admin_username};Password=${local.admin_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
}

# Create the Linux App Service Plan
resource "azurerm_service_plan" "appserviceplan" {
  name                = "asp-${var.app_name}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

locals {
  webapp_url = "https://webapp-${var.app_name}.azurewebsites.net"
}

# Create the web app, pass in the App Service Plan ID
resource "azurerm_linux_web_app" "webapp" {
  name                  = "webapp-${var.app_name}"
  location              = azurerm_resource_group.rg.location
  resource_group_name   = azurerm_resource_group.rg.name
  service_plan_id       = azurerm_service_plan.appserviceplan.id
  depends_on            = [azurerm_service_plan.appserviceplan]
  https_only            = true
  site_config { 
    minimum_tls_version = "1.2"
    application_stack {
      dotnet_version = "9.0"
    }
  }
  connection_string {
    name  = "default"
    type  = "SQLServer"
    value = local.connection_string
  }
  app_settings = {
    "AuthServer__Authority" = local.webapp_url
    "App__SelfUrl" = local.webapp_url
    "WEBSITE_LOAD_CERTIFICATES" = "*"
    "AuthServer__CertificatePassPhrase" = var.certificate_password
  }
}
