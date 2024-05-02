# Services

- **Users**

    Running on port `8000`

- **Articles**

    Running on port `8001`

- **Comments**

    Running on port `8002`

- **Media**

    Running on port `8003`

- **Search**

    Running on port `8004`

- **Moderator**

    Running on port `8005`

- **Notifications**

    Running on port `8006`

## Some helps

- **Error** :  Exiting due to MK_ADDON_ENABLE: run callbacks: running callbacks: [waiting for app.kubernetes.io/name=ingress-nginx pods: timed out waiting for the condition]

  **How to fix**

  - docker exec -it minikube /bin/bash
  - docker pull k8s.gcr.io/ingress-nginx/controller:v1.2.1@sha256:5516d103a9c2ecc4f026efbd4b40662ce22dc1f824fb129ed121460aaa5c47f8
  - minikube addons enable ingress
