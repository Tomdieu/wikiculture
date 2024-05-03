# Services

This repository contains a collection of services that can be run on Kubernetes using Minikube.

## Running in Minikube

To run this project in Minikube, follow these steps:

1. Start Minikube:

    ```bash
    minikube start
    ```

2. Enable Minikube add-on `ingress`:

    ```bash
    minikube addons enable ingress
    ```

3. Apply Kubernetes resources:

    ```bash
    kubectl apply -f kubernetes/
    ```

    or

    Using Skaffold:

    ```bash
    skaffold dev
    ```

4. Get the Ingress IP address and host:

    ```bash
    kubectl get ingress
    ```

5. Open the hosts file:

    ```bash
    sudo nano /etc/hosts
    ```

6. Map the Minikube IP address to `wikiculture.com`:

    ```text
    <minikube ip>   wikiculture.com
    ```

## Services and Their Running Pods

- **Users**: Running on port `8000`
- **Articles**: Running on port `8001`
- **Comments**: Running on port `8002`
- **Media**: Running on port `8003`
- **Search**: Running on port `8004`
- **Moderator**: Running on port `8005`
- **Notifications**: Running on port `8006`

## Troubleshooting

**Error**: Exiting due to MK_ADDON_ENABLE: run callbacks: running callbacks: [waiting for app.kubernetes.io/name=ingress-nginx pods: timed out waiting for the condition]

**How to fix**:

1. Connect to Minikube's Docker daemon:

    ```bash
    docker exec -it minikube /bin/bash
    ```

2. Pull the required image:

    ```bash
    docker pull k8s.gcr.io/ingress-nginx/controller:v1.2.1@sha256:5516d103a9c2ecc4f026efbd4b40662ce22dc1f824fb129ed121460aaa5c47f8
    ```

3. Enable the Ingress add-on again:

    ```bash
    minikube addons enable ingress
    ```
