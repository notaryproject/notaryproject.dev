---
title: "Sign and verify artifacts in CI/CD and GitOps"
description: "How to sign and verify artifacts in CI/CD and GitOps with Notation"
type: docs
weight: 2
---

## CI/CD

Notary Project provides solutions to help users sign and verify artifacts in CI/CD pipelines with Notation GitHub Actions and Azure DevOps. Follow the guidance below to get started Notation in CI/CD.

- [Notation GitHub Actions](https://github.com/marketplace/actions/notation-actions)
- [Sign and verify a container image with Notation in Azure Pipeline](https://learn.microsoft.com/en-us/azure/security/container-secure-supply-chain/articles/notation-ado-task-sign)

## GitOps

In addition, Notary Project collaborates with the Flux community to enable signature verification in GitOps. The Flux source-controller supports verifying the authenticity of OCI artifacts signed with Notation. See [Signatures verification with Notation in Flux](https://fluxcd.io/blog/2024/05/flux-v2.3.0/) for details.