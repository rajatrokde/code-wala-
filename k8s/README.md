# ☸️ Kubernetes Deployment & Troubleshooting Guide — CODE WALA

This directory contains production-grade Kubernetes (K8s) manifests and automated 1-click deployment scripts for **CODE WALA (코드 & सुकून)**.

---

## 🚨 Troubleshooting Common Kubernetes Errors

### Error 1: `Unable to connect to the server: dial tcp [::1]:8080: connectex: No connection could be made...`
- **Cause**: Kubernetes cluster is not running or `kubectl` context is unconfigured.
- **Solution**: Start your local cluster:
  - **Minikube**: Run `minikube start`
  - **Docker Desktop**: Open Docker Desktop → Settings → Kubernetes → Check **Enable Kubernetes**
  - **Kind**: Run `kind create cluster --name dev-vibes`

### Error 2: `ImagePullBackOff` or `ErrImagePull`
- **Cause**: The container image `dev-vibes:latest` is local and not loaded into your Kubernetes node.
- **Solution**: Run:
  ```bash
  # For Minikube:
  minikube image load dev-vibes:latest

  # For Kind:
  kind load docker-image dev-vibes:latest
  ```

---

## 🛠️ Manual Deployment Steps

### 1. Build Local Container Image
```bash
docker build -t dev-vibes:latest .
```

### 2. Apply Kubernetes Manifests
```bash
kubectl apply -k k8s/
```

### 3. Check Pod Status
```bash
kubectl get pods -n dev-vibes
```

### 4. Access Web Application
- **NodePort URL**: [http://localhost:30080](http://localhost:30080)
- **Port Forwarding**:
  ```bash
  kubectl port-forward svc/dev-vibes-service 8080:80 -n dev-vibes
  ```
  Open **[http://localhost:8080](http://localhost:8080)** in browser.

---

## 📄 Manifests Overview

- `namespace.yaml`: Creates isolated `dev-vibes` Kubernetes namespace.
- `deployment.yaml`: Rolling update deployment (2 replicas, probes, resources).
- `service.yaml`: NodePort 30080 service for local & cloud routing.
- `ingress.yaml`: Ingress controller routing rules.
- `configmap.yaml`: Environment variables configuration.
- `hpa.yaml`: Horizontal Pod Autoscaler (scales pods automatically from 2 to 10 on high CPU).
- `kustomization.yaml`: Kustomize bundle configuration.
