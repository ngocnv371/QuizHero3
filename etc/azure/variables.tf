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
