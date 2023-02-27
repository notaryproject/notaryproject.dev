---
title: Notation v1.0.0-RC.2 is available, a big step closer to the stable v1 release!
author:  "Notation Release Team"
date: 2023-02-27
draft: false
---

The Notary v2 project maintainers are pleased to announce the release of Notation v1.0.0-RC.2, including Notation CLI, Notation-go, and Notation-core-go library. This is the first Notation release of 2023. This blog walks you through the major updates of this release.

## What's new

This release adds enhancements including inspecting signatures associated with signed artifacts, storing signatures in the registry using OCI image manifest, adding user-defined metadata to signature payload, and more!  

### Improved usability and troubleshooting capability

For example, you can use `notation inspect` to get detailed information of signatures associated with the signed artifact in a human readable view. 

```
$ notation inspect sample.registry.io/ratify-sample-repo:v1
Warning: Always inspect the artifact using digest(@sha256:...) rather than a tag(:v1) because resolved digest may not point to the same signed artifact, as tags are mutable.
Inspecting all signatures for signed artifact
sample.registry.io/ratify-sample-repo@sha256:5d7a0742f9c17400d21b29d2f27ed1b3429f0a71c5f53fb2a9ca3eff7850d2a6
└── application/vnd.cncf.notary.signature
    └── sha256:d9d98d2b56b77f56ebe8e917643c6484017a39b89ff65e8b3449598d6b1adda5
        ├── media type: application/cose
        ├── signature algorithm: RSASSA-PSS-SHA-256
        ├── signed attributes
        │   ├── signingScheme: notary.x509
        │   ├── signingTime: Sun Feb 19 15:29:47 2023
        │   └── expiry: Mon Jan  1 00:00:00 0001
        ├── user defined attributes
        │   └── io.wabbit-networks.buildId: 123
        ├── unsigned attributes
        │   └── signingAgent: Notation/1.0.0 kms/v0.4.0-beta.1
        ├── certificates
        │   └── SHA1 fingerprint: def4344f733f1f57af3efd759b47c4576a10a723
        │       ├── issued to: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       ├── issued by: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       └── expiry: Mon Feb 12 16:13:48 2024
        └── signed artifact
            ├── media type: application/vnd.docker.distribution.manifest.v2+json
            ├── digest: sha256:5d7a0742f9c17400d21b29d2f27ed1b3429f0a71c5f53fb2a9ca3eff7850d2a6
            └── size: 942
```

When verifying signatures associated with a signed artifact, users may want to get a list of the signed metadata included with the signature and use it evaluate additional decisions before using the signed image. A new flag `--user-metadata` was introduced to `notation sign` and `notation verify` in this release. Similar to annotations, you can easily add user-defined metadata to signature payload when signing an artifact or verify that provided key-value pairs are present in the payload of the valid signature. 

```
$ notation verify --user-metadata io.wabbit-networks.buildId=123 sample.registry.io:5000/net-monitor@sha256:b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
Successfully verified signature for sample.registry.io:5000/net-monitor@sha256:b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
The artifact is signed with the following user metadata.

KEY                         VALUE
io.wabbit-networks.buildId  123
```

In addition, storing signatures in the registry using OCI image manifest was added into RC.3, you can use a flag `--signature-format image` to explicitly specify uploading image manifest to a registry when signing an artifact.

Last but not least, `--debug` and `--verbose` flags were added to all CLI commands, providing debug and troubleshooting capability for Notation CLI.

### Ecosystem integration

[Ratify](https://github.com/deislabs/ratify) is a verification engine for Kubernetes which enables verification of artifact security metadata and admits for deployment only those that comply with policies you create. It integrated Notation-go v1.0.0-rc.2 which allows you to verify a container image signed by Notation.

[Zot registry](http://zotregistry.io/) also integrates notation-go and supports storing signatures associated with the artifact. See this [demo](https://github.com/project-zot/zot/tree/main/demos#notation) for details.

Going forward, Notation maintainers will work the community to support more ecosystem tooling and deliver consistent signing and verification experience, such as HashiCorp Vault KMS plugin, support Kyverno for Kubernetes policy management, and being compatible with more OCI registries.

### Enhanced stability with more testing coverage

As the second RC release for v1.0.0, we aim to deliver a production-ready security product.  Comparing with RC.1, the E2E testing framework built on [ginkgo](https://onsi.github.io/ginkgo/) was set up in RC.2 and major test cases were added to Notation CLI. Meanwhile, unit test coverage was also increased by [5.92%](https://app.codecov.io/gh/notaryproject/notation-go?search=&trend=3%20months). It definitely enhanced the program robustness and project stability.

## Credits

We would like to specially thank the Notation maintainers, contributors, and the broader Notation community for helping us throughout the release process with timely feedback, reviews, community testing and for all your support to help ensure a timely release. Sending credits to the following contributors who made great contributions to RC.2.

@toddysm
@priteshbandi
@byronchien
@mintbomb27
@FeynmanZhou
@JeyJeyGao
@patrickzheng200
@yizha1
@vaninrao10
@iamjesh
@zr-msft
@thisisobate
@iamsamirzon
@shizhMSFT

## Download and give it a try

You can also view the [Release Notes of Notation v1.0.0-RC.2](https://github.com/notaryproject/roadmap/tree/main/RELEASENOTES) to learn more about this release. 

Start your container secure supply chain journey with Notation as it helps you safeguard your software supply chain and ensure integrity. Follow this [hands-on guide](https://notaryproject.dev/docs/quickstart/) to install and try Notation CLI v1.0.0-RC.2.