```md
# Node Express CI/CD Project

This project demonstrates a simple **Node.js + Express application** deployed using a **CI/CD pipeline on AWS** with:

- **AWS CodeBuild** → Continuous Integration (CI)
- **AWS CodeDeploy** → Continuous Deployment (CD)
- **Amazon ECR** → Docker Image Registry
- **EC2 + Docker** → Application Runtime

The main focus of this repository is **automated build and deployment using Docker containers**.

---

## Application Overview

The application is a minimal Express server with:

- Static file serving from `public/`
- `/health` endpoint for health checks
- `/info` endpoint returning a simple message
- 404 fallback handler
- Configurable port via environment variable

### Endpoints

| Endpoint | Method | Description |
|--------|--------|------------|
| `/health` | GET | Returns status and hostname |
| `/info` | GET | Returns greeting message |
| `*` | ANY | 404 fallback |

---

## Project Structure

```

.
├── app.js
├── public/
├── scripts/
│   ├── start_container.sh
│   └── stop_container.sh
├── appspec.yml
├── buildspec.yml
├── Dockerfile
└── README.md

````

---

# CI/CD Flow

## Continuous Integration (CI) – CodeBuild

**CodeBuild** is responsible for:

1. Logging into Amazon ECR
2. Building Docker Image
3. Tagging Image
4. Pushing Image to Registry

This is defined in `buildspec.yml`.

---

### buildspec.yml Explanation

#### Environment Variables
```yaml
IMAGE_NAME: "prod/node-todo"
REGISTRY_URL: "924358636787.dkr.ecr.us-east-1.amazonaws.com"
````

* `IMAGE_NAME` → Repository name in ECR
* `REGISTRY_URL` → ECR registry URL

---

### Pre-Build Phase

```bash
aws ecr get-login-password | docker login
```

Purpose:

* Authenticate Docker with Amazon ECR
* Required before pushing images

---

### Build Phase

```bash
docker build -t <image>
docker tag <image>
```

Steps:

* Builds Docker image from Dockerfile
* Tags image with:

  * Build number
  * `latest`

---

### Post-Build Phase

```bash
docker push <image>
```

Steps:

* Push versioned image
* Push `latest` image

Result:

* New Docker image available in ECR

---

## Continuous Deployment (CD) – CodeDeploy

**CodeDeploy** handles deployment to EC2 instances.

Defined in `appspec.yml`.

---

### appspec.yml Explanation

#### Files Section

```yaml
files:
  - source: /
    destination: /home/ec2-user/app
```

* Copies project files to EC2 instance

---

### Hooks

Hooks allow custom scripts to run during deployment.

#### BeforeInstall

```yaml
scripts/stop_container.sh
```

Purpose:

* Stops any running container
* Prevents port conflicts

---

#### ApplicationStart

```yaml
scripts/start_container.sh
```

Purpose:

* Pull latest Docker image
* Run container
* Start application

---

# Deployment Workflow

## Step-By-Step Flow

### 1. Developer Pushes Code

Code is pushed to repository.

### 2. CodeBuild Triggered

* Docker image built
* Image pushed to ECR

### 3. CodeDeploy Triggered

* EC2 instance receives deployment event
* Old container stopped
* New container started

### 4. Application Live

New version runs in Docker container on EC2.

---

# Docker Strategy

* Each build generates a unique tag using build number
* `latest` tag always updated
* Rollback possible using older tags

---

# Health Monitoring

Use:

```
/health
```

To verify:

* Container is running
* Instance hostname
* Service availability

---

# Key Benefits of This Setup

* Fully automated pipeline
* Immutable deployments using Docker
* Easy rollback with image tags
* Minimal downtime
* Scalable architecture ready

---


