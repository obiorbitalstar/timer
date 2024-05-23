# Time-Stamp Application

This repository contains the source code and deployment configurations for the Time-Stamp application, which displays the current timestamp.

live app: [link](http://34.171.200.252)

## Description

The Time-Stamp application is a simple Express.js app that displays the current timestamp. It is containerized using Docker and deployed on a GKE cluster using Helm.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Docker](https://www.docker.com/get-started) installed.
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed.
- [Helm](https://helm.sh/docs/intro/install/) installed.

## Usage

### Local Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/obiorbitalstar/timer.git
    cd timer
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

4. Access the application at `http://localhost:3000`.

### Docker Setup

1. Build the Docker image:
    ```bash
    docker build -t time-stamp:latest .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 time-stamp:latest
    ```

3. Access the application at `http://localhost:3000`.

### Deployment on GKE

The application is deployed on a GKE cluster using Helm. The deployment configurations are located in the `helm/timer` directory.

#### Steps

1. Ensure that your GKE cluster is set up and kubectl is configured to interact with it.

2. Create a Kubernetes namespace:
    ```bash
    kubectl create namespace timer-prod-env
    ```

3. Add the application Helm repository:
    ```bash
    helm package helm/timer

    helm install timer ./timer-0.1.0.tgz --namespace timer-prod-env --create-namespace --set projectID=<your-gcp-project-id>

    ```

4. Deploy the application:
    ```bash
    helm upgrade --install timer helm/timer --namespace timer-prod-env --set projectID=<your-gcp-project-id>
    ```

5. Get the external IP of the LoadBalancer:
    ```bash
    kubectl get svc -n timer-prod-env timer -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
    ```

6. Access the application using the external IP address.

## Health Check

A health check step is included in the CI/CD pipeline to ensure the application is up and running after deployment. The health check verifies that the application is accessible at the provided external IP address.

## CI/CD Pipeline

The repository includes a GitHub Actions workflow for building, pushing, and deploying the application to a GKE cluster.

### GitHub Actions Workflow

The GitHub Actions workflow includes the following steps:

1. Checkout code.
2. Set up Docker Buildx.
3. Decode GCP Service Account Key.
4. Authenticate to Google Cloud.
5. Configure Docker to use gcloud as a credential helper.
6. Build and push Docker image.
7. Set up kubectl.
8. Add Google Cloud SDK repository.
9. Install gke-gcloud-auth-plugin.
10. Install Helm.
11. Configure kubectl.
12. Install NGINX Ingress Controller.
13. Deploy with Helm.
14. Get LoadBalancer IP.
15. Health Check.

## Cleanup

To remove the deployed application from the GKE cluster:
```bash
helm uninstall timer --namespace timer-prod-env
```