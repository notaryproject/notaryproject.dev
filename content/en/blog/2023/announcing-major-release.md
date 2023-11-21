---
title: Notary Project announces a major release!
author:  "Notary Project Release Team"
date: 2023-08-22
draft: false
---

The Notary Project maintainers are proud to announce a major release, including [Notary Project specifications v1.0.0](https://github.com/notaryproject/specifications/releases/tag/v1.0.0), [notation v1.0.0](https://github.com/notaryproject/notation/releases/tag/v1.0.0), [notation-go v1.0.0](https://github.com/notaryproject/notation-go/releases/tag/v1.0.0), and [notation-core-go v1.0.0](https://github.com/notaryproject/notation-core-go/releases/tag/v1.0.0) which are ready for production use!

## What is Notary Project and Notation?

As containers and cloud native artifacts become common deployment units, users want to make sure that they are authentic in their environments. The Notary Project is a set of specifications and tools intended to provide cross-industry standards for securing software supply chains through signing and verification, signature portability, and key/certificate management. 

Notation is a sub-project of Notary Project, which consists of the `notation` CLI and two Golang libraries which implement the latest [Notary Project specifications](https://github.com/notaryproject/specifications/releases/tag/v1.0.0). Notation was started in [Dec 2019](https://github.com/notaryproject/meeting-notes/blob/main/meeting-notes-2019.md#notary-v2-kickoff-meeting) and the code  has matured through a series of minor and RC releases over the last few years; The first version of the CLI and libraries [v0.7.0-alpha.1](https://notaryproject.dev/blog/2021/announcing-notation-alpha1/) was released in Oct 2021. Several alpha, beta, and RC releases later, the binaries reached the final [v1.0.0-RC.7](https://notaryproject.dev/blog/2023/announcing-notation-rc6/) release in May 2023.

To learn more about the Notary Project, see the [Notary Project Overview](https://github.com/notaryproject/.github#notary-project-overview) and the [FAQ](https://notaryproject.dev/docs/faq/#notary-project-terms).

## Notable Capabilities in this Release

Here are some of the major capabilities and features included in this release.

### Specifications

[Notary Project specifications](https://github.com/notaryproject/specifications/releases/tag/v1.0.0) reached its major release. All specifications, requirements, scenarios, threat model, and security audit reports are available in this release. ISVs and tool developers that want to interoperate with the Notary Project signatures and tooling should use the specifications to ensure compatibility.

- [Notary Project OCI signature specification](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signature-specification.md)
- [Notary Project OCI COSE signature envelope](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signature-envelope-cose.md)
- [Notary Project OCI JWS signature envelope](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signature-envelope-jws.md)
- [Notary Project OCI signing and verification workflow](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signing-and-verification-workflow.md)
- [Notary Project signing scheme](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signing-scheme.md)
- [Notary Project Trust Store and Trust Policy](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/trust-store-trust-policy.md)
- [Notation Plugin specification](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/plugin-extensibility.md)

### Signing and verification functionalities

From the software producer's perspective, signing a software artifact enables their consumers to detect tampering and ensure authenticity of the artifact. Signing software can also increase trust when distributing software artifacts to consumers. Notary Project provides the following core capabilities for the signing experience:

- Sign artifacts using signing keys stored securely in a key management system (KMS) or a signing service. See the available plugins in the section [Extensibility: plugin support for Notation](#extensibility-plugin-support-for-notation)
- Sign artifacts as well as list and inspect signatures stored in OCI-compliant registries
    - Compliant with [`image-spec v1.0.2`](https://github.com/opencontainers/image-spec/tree/v1.0.2)
    - Compliant with [`distribution-spec v1.0.1`](https://github.com/opencontainers/distribution-spec/tree/v1.0.1)
    - Compatible with [`image-spec v1.1.0-rc4`](https://github.com/opencontainers/image-spec/tree/v1.1.0-rc4)
    - Compatible with [`distribution-spec v1.1.0-rc3`](https://github.com/opencontainers/distribution-spec/tree/v1.1.0-rc3) (limited to [referrers tag schema](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc3/spec.md#referrers-tag-schema))
- Support two signature envelope formats 
    - [COSE](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-cose.md): COSE is an efficient, binary envelope format that can be used for variety of scenarios ranging from signing traditional software to IoT workloads running on low-powered devices.
    - [JWS](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-envelope-jws.md): JWS is a widely used JSON-based envelope format that can be used for interoperability with existing applications and various authentication schemes including OIDC.

From the software consumer's perspective, verifying the signature of a signed artifact ensures its integrity and authenticity. Notary Project provides the following core capabilities for verification experience:

- Verify signatures using [trust store and trust policy](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/trust-store-trust-policy.md). This also includes fine-tuned OCI repository specific trust policies and support for various enforcement levels (e.g. `enforce`, `permissive`, `audit`) to enable a wide range of scenarios. 
- [`notation policy`](/docs/user-guides/cli-reference/notation_policy/) command can be used to simplify the experience of importing and inspecting the trust policy.

### Experimental features

Experimental features are intended for testing and evaluation purposes only and should not be used in production environments. Users can enable experimental features in Notation CLI by setting the environment variable `NOTATION_EXPERIMENTAL` to 1 as shown below.

```
export NOTATION_EXPERIMENTAL=1
```

There are two major features which are marked as experimental.
 
- [Signing, listing, and verifying artifacts with OCI image layout](/docs/user-guides/how-to/oci-image-layout/) before they are pushed to a registry. This enables users sign and verify artifacts stored on the local file system.
- [OCI distribution referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc2/spec.md#enabling-the-referrers-api). This allows the Notation CLI to fetch a list of signatures in an efficient and clean manner.

### Extensibility: plugin support for Notation

Notation has an [extensible design based on a plugin framework](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/plugin-extensibility.md). This framework provides plugin interfaces for users and vendors to implement their own integrations with key/certificate management solutions or signing services. Currently, Notation has the following plugins available.

- [AWS Signer plugin for Notation](https://docs.aws.amazon.com/signer/latest/developerguide/Welcome.html)
- [Azure Key Vault for Notation](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tutorial-sign-build-push)

### Integration with admission controller for Kubernetes usage

To enable users to verify and secure image deployment on Kubernetes, the Notary Project maintainers worked with the [Ratify](https://github.com/deislabs/ratify) and [Kyverno](https://kyverno.io/) teams to provide solutions for verifying images signed by Notation before deploying them to Kubernetes. Users have two different options to build a complete end-to-end image integrity workflow for their environments. For more details, see:

- [Sign and verify an image with Notation, Ratify, and OPA Gatekeeper](https://ratify.dev/blog/sign-and-verify-image-with-notation-ratify)
- [Verify CNCF Notary Project signatures with Kyverno](https://kyverno.io/docs/writing-policies/verify-images/notary/)

![e2e workflow](/e2e-workflow.png)

## Built-in security

As part of our commitment to security, the Notary Project maintainers engaged with CNCF to set up continuous fuzzing of the source code and completed a security audit in 2023. All vulnerabilities found during the testing and the audit were fixed before the release of the libraries and the CLI. Below are links to the security reports:

- [Notation Security Audit Report 2023](https://github.com/notaryproject/notaryproject/blob/main/security/reports/audit/ADA-notation-security-audit-23.pdf)
- [Notary Project fuzzing audit report 22-23](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf)

## What's next

The Notary Project maintainers are considering the following features for future milestones. Feel free to reach out on the [Slack channel](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) or [GitHub issues](https://github.com/notaryproject/.github/issues) to ask questions, provide feedback, or share ideas.

- Sign and verify arbitrary blobs
- [GitHub Actions](https://github.com/notaryproject/notation-action) and other CI/CD integration for signing and verification
- [HashiCorp Vault plugin](https://github.com/notaryproject/notation-hashicorp-vault) (experimental)
- Plugin lifecycle management
- Timestamping support
- Manage trust policy via CLI commands

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this major milestone.

## Try it now

You can follow this [interactive tutorial](https://killercoda.com/notaryproject/scenario/notation) to try Notation CLI v1.0.0 in an online cloud playground or follow the [quick start](https://notaryproject.dev/docs/quickstart/) on your computer.
