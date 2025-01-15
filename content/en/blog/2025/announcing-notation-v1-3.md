---
title: Notary Project announces Notation v1.3.0 and tspclient-go v1.0.0!
author:  "Notary Project Release Team"
date: 2025-01-17
draft: false
---

The Notary Project maintainers are thrilled to announce the latest releases, including [notation v1.3.0](https://github.com/notaryproject/notation/releases/tag/v1.3.0), [notation-go v1.3.0](https://github.com/notaryproject/notation-go/releases/tag/v1.3.0), [notation-core-go v1.2.0](https://github.com/notaryproject/notation-core-go/releases/tag/v1.2.0) and [tspclient-go v1.0.0](https://github.com/notaryproject/tspclient-go/releases/tag/v1.0.0)!

These new versions are production ready and have successfully completed a comprehensive [security audit](https://blogpost). Check out the [security audit report](https://) for more details. Our commitment to providing secure and high-quality signing and verification tools for our users has never been stronger!

## Notable Capabilities in these Releases

Here are the major capabilities and features included in these releases.

### The first major release of `tspclient-go` library

Looking for a robust implementation of [RFC 3161](https://datatracker.ietf.org/doc/html/rfc3161) Timestamp Protocol Client in Go? The library [tspclient-go](https://github.com/notaryproject/tspclient-go) is the answer. Here is why:

- **RFC 3161 Compliance**: Adheres to the specification RFC 3161 for timestamping clients. Supports timestamping with popular public TSAs like DigiCert and GlobalSign
- **Secure**: Implements secure communication protocols, ensuring the integrity and authenticity of timestamps.
- **Minimal Dependencies**: Uses only standard Go libraries. Less dependencies, more secure.
- **High Test Coverage**: Boasts up to 95% test coverage.
- **Security Audited**: Passed a comprehensive security audit with no advisories, ensuring a high quality bar.
- **Ease of Use**: Seamlessly integrates into Go applications with a straightforward API.

Notary Project's [timestamping feature](/docs/user-guides/how-to/timestamping/) is built on this library.

### Certificate Revocation checking using Certificate Revocation List (CRL)

Certificate revocation checking enhances security by ensuring that compromised or expired certificates are not used, thereby maintaining the integrity and trustworthiness of digital signatures. It also helps organizations comply with security standards and regulations. With this release, Notation implements the [Notary Project CRL specification](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/trust-store-trust-policy.md#crls) with CRL cache support. Notation now supports two certificate revocation checking methods: Online Certificate Status Protocol (OCSP) and CRL. OCSP is preferred, but if unavailable, CRLs are used as a fallback. For more details on CRL cache directories, visit [this link](../../docs/user-guides/how-to/directory-structure.md). 

By default, Notary Project trust policies enforce revocation checking, so users do not need to configure it. For more details on fine-tuning revocation settings, visit [this link](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/trust-store-trust-policy.md#trust-policy-properties).

## Get started with Notation v1.3.0

You can follow the [quick start guide](/docs/quickstart-guides/quickstart-sign-image-artifact/) to try Notation v1.3.0 for basic signing and verification workflow.

## What's next

The Notary Project maintainers are considering the following features for future milestones. Feel free to reach out on the [Slack channel](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) or [GitHub issues](https://github.com/notaryproject/notation/issues) to ask questions, provide feedback, or share ideas.

- Sign and verify arbitrary blobs
- Attestations

And more!

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this milestone. 

We are especially grateful to the CNCF for funding the security audit, the OSTIF for arranging it, and Quarkslab for conducting and releasing the audit report.