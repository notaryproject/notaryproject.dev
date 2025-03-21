---
title: Announcing Notation v2.0.0-alpha.1 to enable signing and verification of any arbitrary blob files!
author:  "Notary Project Community"
date: 2025-03-18
draft: false
---

![blog cover](/v2.0-alpha.svg)

We are thrilled to announce the release of [Notation v2.0.0-alpha.1](https://github.com/notaryproject/notation/releases/tag/v2.0.0-alpha.1), marking a significant milestone in our commitment to enhancing artifact signing and verification. This alpha release also introduces several improvements designed to provide a more versatile and efficient experience for our users.

## Key Highlights

### Breaking Changes

In `notation v1.x`, the `notation sign` command defaults to storing signatures using the [OCI referrers tag schema](https://github.com/opencontainers/distribution-spec/blob/v1.1.1/spec.md#referrers-tag-schema) for maximum compatibility. As of this release, the default behavior has changed to use the [OCI referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.1/spec.md#listing-referrers) since most of the popular registries are compliant with OCI v1.1. However, users can still opt for the referrers tag schema using `--force-referrers-tag true` if needed.

### Expanded support for signing any arbitrary blob files

In addition to container images and OCI artifacts, Notation now enables signing and verification of arbitrary blob files. This enhancement broadens the scope of artifacts you can securely manage, offering greater flexibility in your workflows. The new `notation blob` command, along with its subcommands (sign, verify, policy, and inspect), facilitates these operations. It enables users to sign and verify arbitrary files such as SBOMs, GitHub release assets, tarballs, and other archive files.

<iframe width="560" height="315" src="https://www.youtube.com/embed/u3m5w8ED2aY?si=WUkGKuciCDG_VwvD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Compliant with OCI v1.1 Standard

Aligning with the latest OCI specifications v1.1, Notation v2.0.0-alpha.1 adopts the OCI Referrers API for storing signatures by default. This shift ensures seamless integration with OCI v1.1-compliant registries, enhancing compatibility, portability, and adherence to industry standards. Unlike traditional method of storing signature separately as an additional tag `sha-xxx` using Referrers Tag Schema, referrers API allow signatures to be linked to the signed artifact in the registry. The Referrers API also provides a structured way to query signatures (and other related metadata) for a given artifact. Instead of listing all blobs in a registry, tools can directly fetch only the relevant signatures using the referrers API, improving signing and verification efficiency.

For registries requiring the previous referrers tag schema, users can still opt-in using the `--force-referrers-tag` flag during the signing process. Notation will fallback to Referrers Tag Schema if the registry doesn't support Referrers API.

The Notary Project signature is now a referrer of the subject image signed by `notation`. Refer to this [conceptual doc](https://oras.land/docs/concepts/reftypes#listing-referrers) for more details.

See a sample signature using the Referrers API below:

```
$ notation list ghcr.io/ratify-project/ratify@sha256:5b7efcef535eff574e064b2c0682b8a86abbeff03569a7ec78e9110fff1d8730
ghcr.io/ratify-project/ratify@sha256:5b7efcef535eff574e064b2c0682b8a86abbeff03569a7ec78e9110fff1d8730
└── application/vnd.cncf.notary.signature
    └── sha256:d3c2a0b8a30aec45558f97da8577d633e5cc09bd0bf8c622896c890bf7828752
```

Notary Project signature manifest:

```json
{
   schemaVersion: 2,
   mediaType: "application/vnd.oci.image.manifest.v1+json",
   config: {
      mediaType: "application/vnd.cncf.notary.signature",
      digest: "sha256:44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a",
      size: 2,
   },
   layers: [
      {
         mediaType: "application/cose",
         digest: "sha256:a9dfe9f9a8c19c164642630454e0e1bf2ec0df9e385e8f4be2dda5ee322a2cb7",
         size: 2378,
      },
   ],
   subject: {
      mediaType: "application/vnd.oci.image.index.v1+json",
      digest: "sha256:5b7efcef535eff574e064b2c0682b8a86abbeff03569a7ec78e9110fff1d8730",
      size: 2385,
   },
   annotations: {
      "io.cncf.notary.x509chain.thumbprint#S256": "[\"2d71bdf96b97ee0189350a583164b7f278a9fcbb1908bc1de115e6f70d860014\"]",
      "org.opencontainers.image.created": "2025-01-30T23:39:00Z",
   },
}
```

### Delta CRL Support

To optimize security and performance, this release introduces support for Delta [Certificate Revocation Lists (CRLs)](https://en.wikipedia.org/wiki/Certificate_revocation_list). Delta CRLs allow Notation to process only the changes since the last CRL update, resulting in faster and more efficient revocation checks. This enhancement reduces bandwidth usage and accelerates the verification process, ensuring up-to-date validation of certificates.

## Getting Started with Notation v2.0.0-alpha.1

We encourage you to explore these new features and enhancements by downloading [Notation v2.0.0-alpha.1](https://github.com/notaryproject/notation/releases/tag/v2.0.0-alpha.1) from our GitHub releases page. You can also follow the [installation guidance](/docs/user-guides/installation/cli) for detailed instruction. As this is an alpha release, we welcome your feedback to help us refine and improve the maturity. Please report any issues or suggestions on our GitHub issues page.

Thank you for your continued support and contributions to the Notary Project. Together, we're advancing the security and integrity of software supply chains.