########################################
# Global Settings
########################################

variable "aws_region" {
  description = "AWS region where resources will be deployed"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the DevOps challenge project"
  type        = string
  default     = "devops-challenge"
}

variable "environment" {
  description = "Deployment environment (dev, staging, production)"
  type        = string
  default     = "production"
}

########################################
# Networking
########################################

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

########################################
# Frontend Settings
########################################

variable "frontend_port" {
  description = "Container port for frontend service"
  type        = number
  default     = 3000
}

variable "frontend_image" {
  description = "ECR image URI for the frontend container"
  type        = string
  default     = ""
}

variable "frontend_cpu" {
  description = "CPU units for frontend ECS task"
  type        = number
  default     = 512
}

variable "frontend_memory" {
  description = "Memory (MB) for frontend ECS task"
  type        = number
  default     = 1024
}

########################################
# Backend Settings
########################################

variable "backend_port" {
  description = "Container port for backend service"
  type        = number
  default     = 8080
}

variable "backend_image" {
  description = "ECR image URI for backend container"
  type        = string
  default     = ""
}

variable "backend_cpu" {
  description = "CPU units for backend ECS task"
  type        = number
  default     = 512
}

variable "backend_memory" {
  description = "Memory (MB) for backend ECS task"
  type        = number
  default     = 1024
}

########################################
# Autoscaling
########################################

variable "min_tasks" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 1
}

variable "desired_tasks" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 1
}

variable "max_tasks" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 4
}

variable "cpu_threshold" {
  description = "CPU utilization (%) threshold for ECS autoscaling"
  type        = number
  default     = 50
}
