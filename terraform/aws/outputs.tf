output "cloudfront_distribution_url" {
  description = "The CloudFront CDN domain URL for global static hosting."
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "s3_website_endpoint" {
  description = "The direct S3 static website endpoint."
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "ecr_repository_url" {
  description = "The ECR repository URL to push Docker images."
  value       = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  description = "The name of the AWS ECS Fargate cluster."
  value       = aws_ecs_cluster.main.name
}
