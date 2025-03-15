# Signing and Verifying Docker Images with Notation and Harbor

Ensuring the authenticity and integrity of modern deployment units is becoming increasingly important as software distribution relies heavily on trusted sources. For software creators, signing artifacts acts as a safeguard against tampering, giving consumers the assurance that the software originates from a reliable source. This not only prevents unauthorized changes but also establishes credibility during distribution.

For users, verifying the signatures of these artifacts confirms their legitimacy and ensures they remain unaltered. Solutions like Notation simplify the process by enabling the signing and verification of Open Container Initiative (OCI) artifacts, such as container images. By integrating with platforms like Harbor, producers can securely sign images, while consumers validate them before use, making deployments to Kubernetes or other environments more secure.

The process typically includes generating cryptographic Certificates, attaching signatures to images, and configuring trust policies that define trusted entities and verification protocols. Such practices are essential to building a resilient software supply chain, ensuring secure deployments, and maintaining confidence in the artifacts being used.

# Explanation of Simple Terms

## What is a Docker Image?

A **Docker image** is a file used to execute code in a Docker container. Docker images act as a set of instructions to build a Docker container, much like a template. They also serve as the starting point when using Docker, comparable to a snapshot in virtual machine (VM) environments.

Docker is an open-source project used to create, run, and deploy applications in containers. A Docker image contains application code, libraries, tools, dependencies, and other files needed to make an application run. When a user runs an image, it can create one or many instances of a container. 

A **Docker daemon** operates in the background to oversee images, containers, and related tasks. Communication between the client and the daemon is facilitated through sockets or a RESTful API.

---

## What is Notation?

**Notation** is an open-source, standards-based tool designed to digitally sign and verify container images and other Open Container Initiative (OCI) artifacts. Its primary purpose is to provide a cryptographic guarantee of authenticity and integrity for software artifacts.

- When a container image is signed using Notation, a cryptographic signature is generated using private keys held securely by the software producer.
- This signature acts as a "seal of trust," ensuring the artifact has not been tampered with and originates from the claimed source.

Notation adheres to [Notary Project specifications](https://github.com/notaryproject/specifications) for signing and verification, making it interoperable with various platforms and tools. By using cryptographic algorithms, the tool generates a signature based on the [OCI descriptor of the image](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/signature-specification.md#payload). 

### Verification Process:
1. During verification, the consumer or deployment system checks the signature against the corresponding public key and certificates.
2. This ensures the artifact’s contents have not been altered and verifies that the image originates from a trusted source.

---

## What is Harbor?

**Harbor** is a cloud-native, enterprise-grade registry that functions as a central hub for managing container images and OCI artifacts. It is more than just a storage solution, offering advanced features such as:
- **Vulnerability scanning**
- **Access control**
- **Content trust**

Content trust is a critical feature and integrates tightly with tools like Notation to enhance the security of software supply chains.

---

## How Harbor and Notation Work Together:

Through its integration with Notation, Harbor allows users to sign container images with trusted signatures. These signatures provide strong assurances of authenticity, ensuring the origin and integrity of images stored in the registry.

### Key Steps in the Signing Process:
1. **Generating Cryptographic Keys**:
- Software producers use Notation to generate a key pair: a private key for signing and a public key for verification.
- These keys can be securely stored in hardware security modules (HSMs), cloud key management services (KMS), or similar secure environments.

2. **Signing Images**:
- Producers sign container images before pushing them to the Harbor registry.
- The cryptographic signature is attached to the image as image metadata.

3. **Verification Policies**:
- Consumers or deployment systems configure trust policies within Harbor to specify trusted signatures or signers.
- For example, only images signed by specific public keys may be allowed for deployment in Kubernetes clusters.

4. **Signature Verification**:
- When an image is pulled from Harbor, the system verifies its signature using the corresponding public key.
- If the signature is invalid or absent, the image is flagged or rejected, preventing unauthorized or tampered images from being used.

---

## Benefits of Using Notation and Harbor Together

By combining the signing capabilities of Notation with the secure registry features of Harbor:
- Organizations can effectively prevent tampering.
- Only trusted images are used in deployments.
- Software supply chains are strengthened, particularly in environments where security is critical (e.g., Kubernetes deployments).

This approach mitigates risks posed by unsigned or unverified images, ensuring secure and trusted deployments.

![Workflow Representation of Signing and Verifying Container Images](https://www.redhat.com/rhdc/managed-files/styles/wysiwyg_full_width/private/ohc/Signing%20and%20verifying%20container%20images-2.jpeg.webp?itok=Yd-qjm25 "Workflow Representation of Signing and Verifying Container Images")


## Pre-requisites for Setting Up Harbor and Notation 

Before diving into the setup and configuration of Harbor and Notation, it is crucial to ensure that some foundational tools and infrastructure are in place. 

### 1. Docker Engine 
- **Description**: The core component for creating and running containers. It allows for the building, shipping, and running of containerized applications. 
- **Importance**: Docker Engine is required to interact with Harbor and manage the lifecycle of container images. 

### 2. Docker Compose 
- **Description**: A tool that simplifies the process of setting up and managing multi-container applications. 
- **Usage**: In the context of Harbor, Docker Compose will be used to orchestrate the deployment of various Harbor components, ensuring that all services are configured and running correctly. 

> **Note**: Before proceeding with Harbor installation, both Docker Engine and Docker Compose must be properly installed and configured on the host system. 

---

## Setting Up Harbor with HTTPS Domain Configuration 

Harbor is a robust and secure container registry platform that enables organizations to store and manage Docker images in a private environment. Harbor supports both HTTP and HTTPS domain configurations, though HTTPS is recommended for security reasons.
https://goharbor.io/docs/2.0.0/install-config/.

### Steps to Set Up Harbor with HTTPS 

#### 1. Prepare Your Domain Name 
- **Domain Name**: Acquire and register a domain name for your Harbor registry. For example, you may choose `myharbor-registry.online` as the domain. 
- **DNS Configuration**: Ensure that the domain points to the IP address of the Harbor server by configuring an appropriate DNS record. 

#### 2. Install Certbot for SSL Certificates 
Certbot, a tool from Let’s Encrypt, will be used to obtain a free SSL certificate for securing Harbor's domain. 

- **Install Certbot**: 
```bash
sudo apt install --classic certbot

**Obtain the SSL Certificate**: 

Run the following command to obtain an SSL certificate using Certbot: 

```bash
sudo certbot certonly --standalone -d myharbor-registry.online

# Building and Pushing Docker Images to Harbor

After Harbor is set up and Notation is installed, you can begin building and pushing Docker images to your Harbor registry:

## 1. Build the Image:
- Create a Docker image from a repository and tag it with your Harbor registry domain:
```bash
docker build -t myharbor-registry.online/notation-project/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
```

## 2. Push the Image to Harbor:
- Log in to your Harbor registry:
```bash
docker login myharbor-registry.online
```
- Push the image to Harbor:
```bash
docker push myharbor-registry.online/notation-project/net-monitor:v1
```
- After pushing the image, you can check the "Signed" section in Harbor, which will indicate if the image is signed or unsigned.

# Signing and Verifying Docker Images with Notation

To ensure the authenticity and integrity of Docker images, use Notation to sign and verify the images. Here’s how you can do it:

## 1. Generate a Test Key and Self-Signed Certificate:
- To generate a test key and certificate, run the following commands:
```bash
notation cert generate-test --default "wabbit-networks.io"
notation key ls
notation cert ls
```

## 2. Sign the Docker Image:
- Use Notation to sign the Docker image:
```bash
notation sign $IMAGE
```
- Set the image digest as an environment variable:
```bash
export IMAGE=myharbor-registry.online/notation-project/net-monitor@sha256:<digest>
```

## 3. Create a Trust Policy:
- A trust policy defines which signatures are considered valid for a given registry. Save the following JSON as `trustpolicy.json`:
```json
{
"version": "1.0",
"trustPolicies": [
{
"name": "wabbit-networks-images",
"registryScopes": [ "*" ],
"signatureVerification": {
"level": "strict"
},
"trustStores": [ "ca:wabbit-networks.io" ],
"trustedIdentities": [ "*" ]
}
]
}
```
- Import the trust policy into Notation:
```bash
notation policy import ./trustpolicy.json
```

## 4. Verify the Signed Image:
- To verify the signature of an image, use the following command:
```bash
notation verify $IMAGE
```
- You can inspect the image’s signature and certificate information:
```bash
notation inspect $IMAGE
```
## Viewing Notary Project Signatures in Harbor
To view Notary Project signatures in Harbor and configure content trust to prevent unsigned images from being pulled, refer to:
- [Enforce Content Trust in Harbor](https://goharbor.io/docs/main/working-with-projects/project-configuration/implementing-content-trust/#enforce-content-trust)
- [Use Notation to Sign and Verify Artifacts in Harbor](https://goharbor.io/docs/main/working-with-projects/working-with-images/sign-images/#use-notation-to-sign-and-verify-artifacts-with-distribution-spec-v11-mode)


# Conclusion

This tutorial provided a comprehensive guide for setting up Harbor with HTTPS, installing Notation CLI, and using these tools to sign and verify Docker images. By following the outlined steps, software developers and IT teams can implement a robust security mechanism to ensure the authenticity and integrity of containerized applications. The use of SSL certificates for Harbor and cryptographic signatures for Docker images helps create a secure environment for managing and deploying images in production, ultimately ensuring that only trusted artifacts are used, thereby fortifying the software supply chain.
