---
title: Notary Project announces Specification v1.1.0 and Notation v1.2.0!
author:  "Notary Project Release Team"
date: 2024-08-30
draft: false
---

The Notary Project maintainers are excited to announce new releases, including [Notary Project specifications v1.1.0](https://github.com/notaryproject/specifications/releases/tag/v1.1.0), [notation v1.2.0](https://github.com/notaryproject/notation/releases/tag/v1.2.0), [notation-go v1.2.0](https://github.com/notaryproject/notation-go/releases/tag/v1.1.0), and [notation-core-go v1.1.0](https://github.com/notaryproject/notation-core-go/releases/tag/v1.1.0). These versions are now ready for production use!

## Deprecation

The experimental flag `--allow-referrers-api` used by `notation sign` and `notation verify` commands is now deprecated. See [Support OCI specification v1.1.0](#support-oci-specification-v110) for details.

## Notable Capabilities in this Release

Here are some of the major capabilities and features included in this release.

### Notary Project specifications

The Notary Project specifications now include support for [RFC 3161](https://www.rfc-editor.org/rfc/rfc3161) timestamping and introduce Notation plugin conventions in the [plugin specification](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/plugin-extensibility.md).

### Support OCI specification v1.1.0

In Feb 2024, the Open Container Initiative (OCI) community released version 1.1.0, which includes the [OCI image specification v1.1.0](https://github.com/opencontainers/image-spec/releases/tag/v1.1.0) and the [OCI distribution specification v1.1.0](https://github.com/opencontainers/distribution-spec/releases/tag/v1.1.0). Notation now adheres to the OCI spec v1.1.0, leading to the deprecation of the experimental flag `--allow-referrers-api`. A new flag, `--force-referrers-tag` (default to `true`), has been introduced to the `notation sign` command. Using the default `true` value, the referrers tag schema is always used for storing signatures in registries. You can set the value to `false` to use the [referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.0/spec.md#enabling-the-referrers-api) for signature storage if the target registry supports the referrers API (if it does not, the referrers tag fallback will be used). In contrast, the `notation verify/list/inspect` commands will attempt to use the referrers API first and automatically fall back to the [referrers tag schema](https://github.com/opencontainers/distribution-spec/blob/v1.1.0/spec.md#referrers-tag-schema) if the referrers API is not supported by the registry.

> [!NOTE]
> We will change the default value of `--force-referrers-tag` to `false` in Notation v2.0 release, making referrers API usage as the default.

### Support for RFC 3161 compliant timestamping

Since this release, Notation supports RFC 3161 compliant timestamping. Digital signatures must be generated within the certificate's validity period, as expired certificates compromise the signature's trustworthiness. Timestamping extends the trust of signatures created within certificate validity, allowing successful signature verification even after certificates have expired. Notation's timestamping feature is built on top of the [tspclient-go](https://github.com/notaryproject/tspclient-go) library.

Learn more at the document [how to sign and verify artifacts in OCI-compliant registries with timestamping](/docs/user-guides/how-to/timestamping/).

### Other changes

Notation CLI now offers the `armv7` binary, enabling its usage in environments such as Internet of Things (IoT) or embedded systems.

## Get started with Notation v1.2.0

You can follow the [quick start guide](/docs/quickstart-guides/quickstart-sign-image-artifact/) to try Notation v1.2.0 for basic signing and verification workflow.

## What's next

The Notary Project maintainers are considering the following features for future milestones. Feel free to reach out on the [Slack channel](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) or [GitHub issues](https://github.com/notaryproject/notation/issues) to ask questions, provide feedback, or share ideas.

- Revocation checking using Certificate Revocation List (CRL)
- Sign and verify arbitrary blobs
- Attestations

And more!

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this milestone.
