variable "resource_group_location" {
  type        = string
  default     = "eastasia"
  description = "Location of the resource group."
}

variable "sql_db_name" {
  type        = string
  description = "The name of the SQL Database."
  default     = "QuizHero"
}

variable "admin_username" {
  type        = string
  description = "The administrator username of the SQL logical server."
  default     = "azureadmin"
}

variable "admin_password" {
  type        = string
  description = "The administrator password of the SQL logical server."
  sensitive   = true
  default     = null
}

variable "certificate_password" {
  type        = string
  description = "Passphrase to open the AuthServer certificates."
  sensitive   = true
  default     = "e7bd9340-dcb8-41a0-bd7b-255bf2632750"
}
