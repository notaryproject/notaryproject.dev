---
title: Ratify Joins the Notary Project - Strengthening Software Supply Chain Security Together!
author:  "Notary Project Community"
date: 2025-06-02
draft: false
---

![notary project welcomes ratify](/notation-ratify.svg)

We’re excited to announce that [Ratify](https://ratify.dev/) has officially joined the Notary Project as a subproject after the [vote](https://github.com/notaryproject/.github/issues/81) passed in the community! 🎉 This marks a significant step forward in our shared mission to deliver **secure, transparent, and trusted** software supply chain for the cloud-native ecosystem.

The Notary Project is building a set of specifications and reference implementations to secure the integrity of container images and other OCI artifacts. With Ratify’s addition, we expand our surface to policy-based verification and extensibility, helping organizations validate signatures, SBOM, vulnerability scanning report, and other security metadata of container images in CI/CD and before deploying to Kubernetes.

## Why Ratify?

[Ratify](https://ratify.dev/) is an extensible verification framework for container images and other artifacts that can examine and author policies to audit existing resources in Kubernetes and CI/CD. Ratify can use and manage any number of custom verifiers for image metadata like signatures, SBOMs, vulnerability scan reports, and so on.

Ratify has been widely adopted by cloud providers and organizations to enforce verification of OCI artifacts across environments. As part of the Notary Project, Ratify brings:

* An end-to-end policy-driven verification capabilities
* Extensible plugin support for different verifiers (e.g., Notation, Cosign, SBOM, vulnerability report, custom plugins) and various cloud providers (AWS, Azure, Alibaba Cloud, Venafi, etc.)
* Enforcement at admission control when users deploying an untrusted application in Kubernetes 
* Cross-tool ecosystem support for Gatekeeper, Trivy, etc.

These Ratify repositories have been transferred to Notary Project organization:

- [Ratify core framework](https://github.com/notaryproject/ratify)
- [Ratify Go Library](https://github.com/notaryproject/ratify-go)
- [Ratify Verifier Go](https://github.com/notaryproject/ratify-verifier-go)
- [Ratify Website](https://github.com/notaryproject/ratify-web)
- [Ratify containerd plugin](https://github.com/notaryproject/ratify-containerd)

## What This Means for the Community

By welcoming Ratify as an official subproject, the Notary Project now offers a broader and more opinionated solution stack for securing software supply chain:

- Notation enables signing of OCI artifacts in CI/CD pipelines.
- Ratify enforces signature and other supply chain metadata verification policies by working with Gatekeeper in runtime, Kubernetes, and CI/CD.

![notation-ratify-e2e](/notation-ratify-e2e.png)

We also want to thank the contributors from Microsoft, Alibaba Cloud, and the wider community for their work on Ratify—and for their continued commitment to open governance by donating the project to Notary Project.

## What Should Ratify Users Know

For Ratify users, the Helm repo of Ratify has been changed from `https://ratify-project.github.io/ratify` to `https://notaryproject.github.io/ratify`. Please refer to [Ratify documentation](https://ratify.dev/docs/quick-start) to use the latest repo.

## What’s Next?

The Ratify maintainers has been collaborating with Notary Project maintainers to align roadmaps, documentation, and release processes. You can expect:

* Continued development under the [Notary Project GitHub org](https://github.com/notaryproject)
* Unified communication channels in Notary Project including commmunity meetings, Slack channel, social media, etc.
* Closer integration between Ratify and Notation. 

Please join us in welcoming Ratify to the community! 🙌

Follow us on [GitHub](https://github.com/notaryproject) and join us on [Slack channel](https://cloud-native.slack.com/archives/CQUH8U287), and stay tuned for more updates.
