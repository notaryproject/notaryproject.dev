---
title: Notary Project announces the first major release!
author:  "Notary Project Release Team"
date: 2023-08-15
draft: false
---

The Notary Project maintainers are thrilled to announce the first major release, including [Notary Project specifications v1.0.0](https://github.com/notaryproject/specifications/releases/tag/v1.0.0), [notation v1.0.0](https://github.com/notaryproject/notation/releases/tag/v1.0.0), [notation-go v1.0.0](https://github.com/notaryproject/notation-go/releases/tag/v1.0.0), and [notation-core-go v1.0.0](https://github.com/notaryproject/notation-core-go/releases/tag/v1.0.0) which are ready for production use!

## What is Notary Project and Notation

As containers and cloud native artifacts become common deployment units, users want to be sure that the artifacts in their environments are authentic and unmodified. The Notary Project is a set of specifications and tools intended to provide cross-industry standards for securing software supply chains through signing and verification, signature portability, and key/certificate management. 

Notation is a sub-project of the Notary Project GitHub organization. It has `notation` CLI and two Golang libraries, which are implemented from the latest [Notary Project specifications](https://github.com/notaryproject/specifications/releases/tag/v1.0.0). Notation was started in [Dec 2019](https://github.com/notaryproject/meeting-notes/blob/main/meeting-notes-2019.md#notary-v2-kickoff-meeting) and the code  has matured through a series of minor and RC releases over the last few years, the first release [v0.7.0-alpha.1](https://notaryproject.dev/blog/2021/announcing-notation-alpha1/) was available in Oct 2021 and reached [v1.0.0-RC.7](https://notaryproject.dev/blog/2023/announcing-notation-rc6/) in May 2023.

To learn more about the overall Notary Project and terminologies, see [Notary Project Overview](https://github.com/notaryproject/.github#notary-project-overview) and [FAQ - Notary Project Terms](https://notaryproject.dev/docs/faq/#notary-project-terms).

## Highlights

There are some remarkable new features and updates in the first major release. This blog post walks through the major updates in this release.

### Specifications

[Notary Project specifications](https://github.com/notaryproject/specifications/releases/tag/v1.0.0) reach its first major release. All specifications, requirements, scenarios, threat model, and security audit reports are available in this release. To interoperate with Notary Project tooling or develop your own reference implementation, follow the latest Notary Project specifications for details.

### Signing and verification functionalities

From the software producer's perspective, signing a software artifact is the way to ensure authenticity and trust when distributing a software to consumers. Notary Project provides the following core capabilities for the signing experience.

- Sign artifacts using signing keys stored securely in key management system (KMS) using vendor or customer specific plugins
- Sign and verify artifacts as well as list and inspect signatures stored in OCI-compliant registries
    - Compliant with [`image-spec v1.0.2`](https://github.com/opencontainers/image-spec/tree/v1.0.2)
    - Compliant with [`distribution-spec v1.0.1`](https://github.com/opencontainers/distribution-spec/tree/v1.0.1)
    - Compatible with [`image-spec v1.1.0-rc4`](https://github.com/opencontainers/image-spec/tree/v1.1.0-rc4)
    - Compatible with [`distribution-spec v1.1.0-rc3`](https://github.com/opencontainers/distribution-spec/tree/v1.1.0-rc3) (limited to [referrers tag schema](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc3/spec.md#referrers-tag-schema))
- Support two signature envelope formats - [JWS](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-jws.md) and [COSE](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-cose.md) for interoperability

From the software consumer's perspective, verifying the signature of a signed artifact ensure the integrity and authenticity. Notary Project provides the following core capabilities for verification experience:

- Verify signatures using [trust store and trust policy](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/trust-store-trust-policy.md) with fine-tuned OCI repository specific trust policies, and support for various enforcement levels for signature verification (e.g. `enforce`, `permissive`, `audit`) to enable a wide range of scenarios.  [notation policy](https://notaryproject.dev/docs/cli-reference/notation_policy/) command is also introduced in v1 release to simplify importing and inspecting the trust policy.

### Enhanced debug and troubleshooting experience

[notation inspect](https://notaryproject.dev/docs/cli-reference/notation_inspect/) command is available to get detailed information of signatures associated with the signed artifact in a human readable view.

In addition, `--verbose` flag with all CLI commands, providing troubleshooting capability for developers and users respectively.

### Experimental features

Experimental features are intended for testing and evaluation purposes only and should not be used in production environments. Users can enable experimental features in Notation CLI by setting the environment variable `NOTATION_EXPERIMENTAL` to 1. 

There are two major features which are marked as experimental stage but might be useful in some specific scenarios.
 
- Support [signing, listing and verification with OCI image layout](https://notaryproject.dev/docs/how-to/oci-image-layout/) for signing images before they are pushed to a registry. It enables users to sign and verify images in an air-gapped environment.
- Support [OCI distribution referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc2/spec.md#enabling-the-referrers-api), which allows Notation CLI to fetch a list of referrers in an efficient and clean manner.

### Better extensibility and more plugins support

Notation has an [extensible plugin framework design](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/plugin-extensibility.md) which provides plugin interfaces for users and vendors to implement their own integrations with the key/certificate management solutions or signing service. Notation has the following plugins available for use now.

- [AWS Signer plugin](https://docs.aws.amazon.com/signer/latest/developerguide/Welcome.html)
- [Azure Key Vault plugin](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tutorial-sign-build-push)

### Integration with admission controller for Kubernetes usage

To enable users to verify and secure image deployment on Kubernetes, the Notary Project maintainers worked with the [Ratify](https://github.com/deislabs/ratify) and [Kyverno](https://kyverno.io/) team respectively to provide solutions for verifying images signed by Notation before deploying them to Kubernetes. Users will have two different options to build a complete end-to-end image integrity workflow for their environments. See the following two guides for details.

- [Sign and verify an image with Notation, Ratify, and OPA Gatekeeper](https://ratify.dev/blog/sign-and-verify-image-with-notation-ratify)
- [Verify CNCF Notary Project signatures with Kyverno](https://kyverno.io/docs/writing-policies/verify-images/notary/)

![e2e workflow](https://hackmd.io/_uploads/rkI9Krqn2.png)

## Security audit

The Notary Project also completed fuzzing audit and security audit in 2023. All vulnerabilities found during the audit are fixed in Notation v1.0.0 (and also present in the prior v1.0.0 RC-7 release). You can find two security audit reports as follows.

- [Notation Security Audit Report 2023](https://github.com/notaryproject/notaryproject/blob/main/security/reports/audit/ADA-notation-security-audit-23.pdf)
- [Notary Project fuzzing audit report 22-23](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf)

## What's the next

The following new features are planned for the upcoming milestones. Feel free to let us know of your ideas or use cases in the Slack channel or GitHub issues.

- Sign and verify any file, even if distributed outside of an OCI registry
- [GitHub Actions](https://github.com/notaryproject/notation-action) and other CI/CD integration for signing and verification
- [HashiCorp Vault plugin](https://github.com/notaryproject/notation-hashicorp-vault) (experimental)
- Plugin lifecycle management
- Timestamping support
- Manage trust policy via CLI commands

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this major milestone.

## Try it now

You can follow this [interactive tutorial](https://killercoda.com/notaryproject/scenario/notation) to try Notation CLI v1.0.0 in an online cloud playground or follow the [quick start](https://notaryproject.dev/docs/quickstart/).