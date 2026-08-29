# One-Click Automated Kubernetes Local Deployment Script (PowerShell)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🚀 CODE WALA — Local Kubernetes Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Check if Docker is running
Write-Host "[1/5] Checking Docker daemon status..." -ForegroundColor Yellow
$dockerStatus = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker is running." -ForegroundColor Green

# 2. Build local Docker Image
Write-Host "[2/5] Building Docker image (dev-vibes:latest)..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot/.."
docker build -t dev-vibes:latest .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker image build failed." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker image built successfully." -ForegroundColor Green

# 3. Check / Start Local Kubernetes Cluster (Minikube / Kind / Docker Desktop)
Write-Host "[3/5] Checking Kubernetes cluster connection..." -ForegroundColor Yellow
$k8sContext = kubectl config current-context 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Warning: No active Kubernetes context found." -ForegroundColor Yellow
    Write-Host "Attempting to start Minikube..." -ForegroundColor Yellow
    minikube start --driver=docker
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Could not connect to Kubernetes cluster. Ensure Minikube, Kind, or Docker Desktop K8s is running." -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Connected to Kubernetes context: $k8sContext" -ForegroundColor Green

# 4. Load Image into Cluster (Minikube / Kind support)
if ($k8sContext -like "*minikube*") {
    Write-Host "Loading image into Minikube cluster..." -ForegroundColor Yellow
    minikube image load dev-vibes:latest
} elseif ($k8sContext -like "*kind*") {
    Write-Host "Loading image into Kind cluster..." -ForegroundColor Yellow
    kind load docker-image dev-vibes:latest
}

# 5. Apply Kubernetes Manifests
Write-Host "[5/5] Deploying Kubernetes manifests to namespace 'dev-vibes'..." -ForegroundColor Yellow
kubectl apply -k "$PSScriptRoot"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: kubectl apply failed." -ForegroundColor Red
    exit 1
}

Write-Host "=========================================" -ForegroundColor Green
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "To view running pods:" -ForegroundColor Cyan
Write-Host "  kubectl get pods -n dev-vibes" -ForegroundColor White
Write-Host "To port-forward service to localhost:" -ForegroundColor Cyan
Write-Host "  kubectl port-forward svc/dev-vibes-service 8080:80 -n dev-vibes" -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Green
