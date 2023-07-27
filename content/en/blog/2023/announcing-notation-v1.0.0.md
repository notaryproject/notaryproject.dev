---
title: Notation v1.0.0 is available!
author:  "Notation Release Team"
date: 2023-07-15
draft: false
---

The Notary Project maintainers are thrilled to announce the first stable release of Notation, including [notation v1.0.0](https://github.com/notaryproject/notation/releases/tag/v1.0.0), [notation-go v1.0.0](https://github.com/notaryproject/notation-go/releases/tag/v1.0.0), [notation-core-go v1.0.0](https://github.com/notaryproject/notation-core-go/releases/tag/v1.0.0) which are ready for production use! 


## What is Notation

As containers and cloud native artifacts become the common unit of deployment, users want to know the artifacts in their environments are authentic and unmodified. The Notary Project is a set of specifications and tools intended to provide a cross-industry standard for securing software supply chains through signing and verification, signature portability, and key management. It aims to solve the core issue of trusting content within, and across registries. 

Notation (previously known as Notary v2) is a sub-project of Notary Project. It has notation CLI and two Golang libraries, which are implemented from the Notary Project specifications. Notation was started in [Dec 2019](https://github.com/notaryproject/meeting-notes/blob/main/meeting-notes-2019.md#notary-v2-kickoff-meeting) and the code case has matured through a series of minor and RC releases over the last four years, the first release [v0.7.0-alpha.1](https://notaryproject.dev/blog/2021/announcing-notation-alpha1/) was available in Oct 2021 and reached [v1.0.0-RC.7](https://notaryproject.dev/blog/2023/announcing-notation-rc6/) in May 2023.

## Highlights

There are some remarkable new features and updates in Notation v1.0.0. This blog post walks through the major updates in this release.

### Improved signing and verification functionalities

From the software producer's perspective, signing an artifact is the way to ensure authenticity and trust when distributing a software to consumers. Notation v1.0.0 added new capabilities to signing experience. 

- Sign artifacts using signing keys stored securely in key management system (KMS)
- Store signatures using [OCI Image Manifest](https://github.com/opencontainers/image-spec/blob/v1.1.0-rc3/spec.md) for standarization and better portability
- Support two signature envelope formats - [JWS](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-jws.md) and [COSE](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-cose.md)

From the software consumer's perspective, verifying the signature of a signed artifact is the key method to ensure the integrity and security. Notation v1.0.0 added new capabilities to verification experience.

- Verify signatures using trust store and trust policy with fine-tuned configurations. [notation policy](https://notaryproject.dev/docs/cli-reference/notation_policy/) command was introduced to simplify the trust policy management.
- Support validating certificate revocation with [Online Certificate Status Protocol (OCSP)](https://datatracker.ietf.org/doc/html/rfc6960)

### Enhanced debug and troubleshooting experience

[notation inspect](https://notaryproject.dev/docs/cli-reference/notation_inspect/) command was introduced to get detailed information of signatures associated with the signed artifact in a human readable view.

In addition, `--verbose` flag was added to all CLI commands, providing debug and troubleshooting capability for Notation developers and users respectively.

### Introduced experimental features and switch

Experimental features are intended for testing and evaluation purposes only and should not be used in production environments. Users can enable experimental features in Notation CLI by setting the environment variable `NOTATION_EXPERIMENTAL` to 1. 

There are two major features which are marked as experimental stage but might be useful in some specific scenarios.
 
- Support [signing, listing and verification with OCI image layout](https://notaryproject.dev/docs/how-to/oci-image-layout/) for signing images before they are pushed to a registry. It enables users to sign and verify images in an air-gapped environment.
- Support [OCI distribution referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc2/spec.md#enabling-the-referrers-api), which allows Notation CLI to fetch a list of referrers in an efficient and clean manner.

### Better extensibility and more plugins support

Notation has an [extensible plugin framework design](https://github.com/notaryproject/notaryproject/blob/main/specs/plugin-extensibility.md) which provides plugin interfaces for users, and vendors to implement their own integrations with the solutions they use. Notation has the following plugins available to use now. 

- AWS Signer plugin
- Azure Key Vault plugin
- HashiCorp Vault plugin (Alpha)

### Integration with admission controller for Kubernetes usage

As more and more users are requesting to verify and secure image deployment on Kubernetes, the Notary Project maintainers worked with the [Ratify](https://github.com/deislabs/ratify) and [Kyverno](https://kyverno.io/) team respectively to provide solutions for verifying images signed by Notation before deploying them to Kubernetes. Users will have two different options to build a complete end-to-end image integrity workflow for their environments. See the following two guides for details.

- [Sign and verify an image with Notation, Ratify, and OPA Gatekeeper](https://ratify.dev/blog/sign-and-verify-image-with-notation-ratify)
- [Verify CNCF Notary Project signatures with Kyverno](https://kyverno.io/docs/writing-policies/verify-images/notary/)

![](https://hackmd.io/_uploads/S1bow5HO2.png)


## Security audit report

The Notary project also completed fuzzing audit and security audit in 2023. Some known vulnerabilities had been fixed by the Notary Project maintainers before Notation v1.0.0. You can find two audit reports as follows.

- [Notation Security Audit Report 2023](https://github.com/notaryproject/notaryproject/blob/main/security/reports/audit/ADA-notation-security-audit-23.pdf)
- [Notary Project fuzzing audit report 22-23](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf)

## Community status

Add CNCF annual review report (PR link, TBD)

## What's the next

(TBD) Introduce new features planned for the upcoming milestone.

- GitHub Actions and CI/CD integration
- Plugin lifecycle management
- Sign and verify arbitrary file
- Timestamping

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this major milestone.

## Try it now

You can follow this [interactive tutorial](https://killercoda.com/notaryproject/scenario/notation) to try Notation CLI v1.0.0 in an online cloud playground or follow the [quick start](https://notaryproject.dev/docs/quickstart/).