---
title: "Authenticate with OCI-compliant registries"
description: "How to use notation to authenticate with OCI-compliant registries"
type: docs
weight: 1
---

You can use `notation` to authenticate to an OCI-compliant registry. This is useful for pushing and pulling signed artifacts, as well as inspecting artifacts in registries that do not offer public access.

> **Important** Currently, `notation` relies on Docker Credential Store for authentication, which is included in Docker Desktop. For more information, see [Docker Credential Store](https://github.com/notaryproject/notation/blob/main/specs/registry-auth.md#credential-store)

## Use `notation login` to authenticate to an OCI-compliant registry

To authenticate to an OCI-compliant registry, use the `notation login` command with your registry, username, and password. For example:

```console
notation login -u <username> -p <password> <registry>
```

> **Note:** If `notation login` is failing, you may need to configure [Docker Credential Store](https://github.com/notaryproject/notation/blob/main/specs/registry-auth.md#credential-store) for your environment.

## Use `notation logout` to log out of an OCI-compliant registry

To log out of an OCI-compliant registry, use the `notation logout` command with your registry. For example:

```console
notation logout <registry>
```