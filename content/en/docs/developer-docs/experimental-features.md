---
title: "Experimental features"
description: "Explanation of experimental features"
type: docs
weight: 3
---

Starting in version `v1.0.0-rc.4`, Notation began introducing experimental features. Experimental features are features that are not yet ready for production use but are available for testing and evaluation. Experimental features may change significantly in later releases or be completely removed. Experimental features are not enabled by default and are not supported.

Currently, Notation has the following experimental features:

- [Signing, listing and verifying images as OCI image layout]({{< ref "/docs/notation/how-to/oci-image-layout" >}})
- Store signatures using artifact manifest (requires registry support). Deprecated in `v1.0.0-rc.5`.
- Use [Referrers API](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc2/spec.md#enabling-the-referrers-api)

To enable experimental features, set the `NOTATION_EXPERIMENTAL` environment variable to `1`, for example:

```console
export NOTATION_EXPERIMENTAL=1
```