---
title: Notation v1.0.0-RC.5 is available!
author:  "Notation Release Team"
date: 2023-05-18
draft: false
---

The Notation maintainers are pleased to announce v1.0.0-RC.5 for [notation](https://github.com/notaryproject/notation) and [notation-go](https://github.com/notaryproject/notation-go). This blog walks you through the major updates of this release.

## Major updates in notation and notation-go

Notation is a CLI tool to sign and verify OCI artifacts. The v1.0.0-RC.5 changes include but not limited to the following items. See the [v1.0.0-RC.5 release notes](https://github.com/notaryproject/notation-go/releases/tag/v1.0.0-rc.5) for details.

* Improve output message when there is no signature associated
* Compatible with the [OCI Distribution Spec 1.1.0-RC.2](https://github.com/opencontainers/distribution-spec/releases/tag/v1.1.0-rc2) and [OCI image-spec v1.1.0-rc.3](https://github.com/opencontainers/image-spec/releases/tag/v1.1.0-rc.3)
* Use SHA256 instead of insecure SHA1 for certificate thumbprint in `notation inspect`
* Bump github.com/opencontainers/image-spec from 1.1.0-rc2 to 1.1.0-rc.3

Notation-go is a collection of Golang libraries to support signing and verifying OCI artifacts. It is based on Notary standard. Notation-go v1.0.0-RC.5 removes OCI artifact manifest type from [Sign](https://pkg.go.dev/github.com/notaryproject/notation-go@main#Sign) function.

### Deprecate flag `--signature-manifest` in notation sign

Since v1.0.0-RC.5, Notation no longer supports create signatures with OCI artifact manifest type in the signing process and deprecated the flag `--signature-manifest` from `notation sign`. Please note this is a breaking change in Notation v1.0.0-RC.5. We chose to make this deprecation before the stable v1 release due to the upstream [OCI image-spec v1.1.0-rc.3](https://github.com/opencontainers/image-spec/releases/tag/v1.1.0-rc.3) removed OCI artifact manifest.

To mitigate the impact to Notation users, Notation v1.0.0-RC.5 is still able to read and verify the existing signatures stored with the OCI artifact manifest type in OCI v1.1.0-RC.1 compliant registries. If you upgrade Notation to v1.0.0-RC.5 from a previous RC release, you don't need to concern too much about the OCI artifacts signed by Notation as they are still verifiable.

### Change default behavior and introduce a new flag `--allow-referrers-api`

As Notation is close to the first stable v1 release, we are trying to make Notation as stable as possible and avoid breaking changes going forward. Considering the OCI Image Spec and Distribution Spec are still in RC status, the [Referrers Tag Schema](https://github.com/opencontainers/distribution-spec/blob/main/spec.md#referrers-tag-schema) is relatively stable and potable so it has been used as the default behavior since Notation v1.0.0-RC.5. Most of the registries are compatible with the tag described by the Referrers Tag Schema. However, the [Referrers API](https://github.com/opencontainers/distribution-spec/blob/main/spec.md#enabling-the-referrers-api) and its fallback strategy is relatively instable according to recent OCI Distribution Spec changes, so it is marked as experimental in Notation v1.0.0-RC.5.

In this context, Notation v1.0.0-RC.5 introduces a new experimental flag `--allow-referrers-api` to the following commands:

- notation sign
- notation verify
- notation inspect
- notation list

Specifically, users need to set the environment variable `NOTATION_EXPERIMENTAL=1` to enable this new flag, then Notation attempts the Referrers API and fallback to Referrers Tag Schema on failure when using with OCI registry. Otherwise, Notation has deterministic behavior and uses Referrers Tag Schema by default.

Please note that users need to add this experimental flag `--allow-referrers-api` when verifying legacy signatures with OCI v1.1 compliant registry after upgrading Notation from v1.0.0 RC.4.

## Credits

We would like to specially thank the Notary maintainers, contributors, and the broader Notary community for helping us throughout the release process with timely feedback, reviews, testing, and support to help ensure a timely release. Sending credits to the following contributors who made great contributions to v1.0.0-RC.5.

- [@FeynmanZhou](https://github.com/FeynmanZhou)
- [@iamsamirzon](https://github.com/iamsamirzon)
- [@JeyJeyGao](https://github.com/JeyJeyGao)
- [@ningziwen](https://github.com/ningziwen)
- [@priteshbandi](https://github.com/priteshbandi)
- [@shizhMSFT](https://github.com/shizhMSFT)
- [@Two-Hearts](https://github.com/Two-Hearts)
- [@toddysm](https://github.com/toddysm)
- [@vaninrao10](https://github.com/vaninrao10)
- [@yizha1](https://github.com/yizha1)
- [@zr-msft](https://github.com/zr-msft)

## Download and give it a try

Follow this [hands-on guide](https://notaryproject.dev/docs/quickstart/) to get started.
