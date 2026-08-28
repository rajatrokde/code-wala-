variable "aws_region" {
  description = "The AWS region to deploy infrastructure into."
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "The name of the application."
  type        = string
  default     = "code-wala"
}

variable "environment" {
  description = "Deployment environment (production, staging, dev)."
  type        = string
  default     = "production"
}

variable "container_port" {
  description = "Port exposed by the Docker container."
  type        = number
  default     = 80
}

variable "container_image" {
  description = "Docker image to run on ECS Fargate or ECR."
  type        = string
  default     = "nginx:alpine"
}
