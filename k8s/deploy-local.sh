#!/usr/bin/env bash
# One-Click Automated Kubernetes Local Deployment Script (Bash)

set -e

echo "========================================="
echo "🚀 CODE WALA — Local Kubernetes Setup"
echo "========================================="

# 1. Check Docker
echo "[1/5] Checking Docker status..."
if ! docker info >/dev/null 2>&1; then
  echo "❌ Error: Docker is not running. Please start Docker and try again."
  exit 1
fi
echo "✅ Docker is running."

# 2. Build Docker Image
echo "[2/5] Building Docker image (dev-vibes:latest)..."
cd "$(dirname "$0")/.."
docker build -t dev-vibes:latest .
echo "✅ Docker image built successfully."

# 3. Check / Start K8s
echo "[3/5] Checking Kubernetes cluster connection..."
CURRENT_CONTEXT=$(kubectl config current-context 2>/dev/null || echo "none")

if [ "$CURRENT_CONTEXT" = "none" ]; then
  echo "⚠️ No active Kubernetes cluster context found."
  echo "Starting Minikube..."
  minikube start --driver=docker
  CURRENT_CONTEXT=$(kubectl config current-context)
fi
echo "✅ Connected to Kubernetes context: $CURRENT_CONTEXT"

# 4. Load Image into Cluster
if [[ "$CURRENT_CONTEXT" == *"minikube"* ]]; then
  echo "Loading image into Minikube..."
  minikube image load dev-vibes:latest
elif [[ "$CURRENT_CONTEXT" == *"kind"* ]]; then
  echo "Loading image into Kind..."
  kind load docker-image dev-vibes:latest
fi

# 5. Apply Manifests
echo "[5/5] Deploying Kubernetes manifests..."
kubectl apply -k "$(dirname "$0")"

echo "========================================="
echo "🎉 Deployment Complete!"
echo "To view running pods:"
echo "  kubectl get pods -n dev-vibes"
echo "To port-forward service to http://localhost:8080:"
echo "  kubectl port-forward svc/dev-vibes-service 8080:80 -n dev-vibes"
echo "========================================="
