---
title: "Registry Support"
description: "Describe how Notation works against various registries"
type: docs
weight: 2
---

## Overview

Notation aims for enabling users to sign and verify arbitrary artifacts stored in a wide range of registries. This document describes how Notation works against various registries that implements OCI specification partially or completely.

## Artifact references support

Notation stores signatures in the registries and associates the signatures to the signed artifact. With the reference between signatures and signed artifacts, user can easily discover the signatures stored in the registries. Users can use a simple command `notation list` to list the signatures associated with the signed artifacts. For example:

```shell
notation list localhost:5000/net-monitor@sha256:3d403e0e2381245e44579568f470f4fe068fdd076bda7ca5a707c5a6fde86f0b
localhost:5000/net-monitor@sha256:3d403e0e2381245e44579568f470f4fe068fdd076bda7ca5a707c5a6fde86f0b
└── application/vnd.cncf.notary.signature
    └── sha256:066b0b748a9fb73d2ce17dfb68f3cafe42dbbaa4ba62d8b02ffb5da4909c2b2d
```

Today, not all the registries support artifact references, which are defined in [OCI image spec v1.1](https://github.com/opencontainers/image-spec/blob/v1.1.0-rc2/spec.md) and [OCI  distribution specification v1.1](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc1/spec.md). The table below lists the artifact references support status and manifest support of various registries. The registries are sorted alphabetically.

| Registry                    | Artifact references support | Manifest support           |
| --------------------------- | --------------------------- | -------------------------- |
| Azure Container Registry    | Yes                         | OCI artifact manifest      |
| Docker Hub                  | No                          | OCI image manifest        |
| Elastic Container Registry  | No                          | N/A                        |
| GitHub Container Registry   | Yes                         | OCI image manifest         |
| Google Artifact Registry    | Yes                         | OCI image manifest         |
| Harbor                      | Yes                         | OCI image manifest         |
| JFrog                       | No                          | N/A                        |
| Microsoft Artifact Registry | Yes                         | OCI artifact manifest      |
| Quay                        | No                          | N/A                        |
| Zot                         | Yes                         | OCI artifact manifest      |

For registries that support artifact references, and manifest support is `OCI artifact manifest`, Notation stores the signature using `OCi artifact manifest` by default.

For registries that support artifact references, and manifest support is `OCI image manifest`, user SHOULD explicitly pass a flag `--signature-manifest image` to `notation sign` command, so that Notation stores the signature using `OCI image manifest` in the registry.

For registries that don't support artifact references, Notation support will come in the future release.
