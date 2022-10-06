---
title: "Quickstart: Sign and validate a container image"
description: "Quickly set up a OCI-based registry and use notation to sign and validate a container image"
type: docs
weight: 2
---

## Prerequisites

Before you begin, you need:

* Docker installed and running, such as [Docker desktop](https://www.docker.com/products/docker-desktop/).
* [Notation CLI]({{< ref "/docs/installation/cli" >}}) installed and configured.

## Create a OCI-compatible registry

Create and run an OCI-compatible registry on your development computer using Docker and the `oras-project/registry` contain image. The following command creates a registry that is accessible at `localhost:5000`.

```console
export PORT=5000
export REGISTRY=localhost:${PORT}
docker run -d -p ${PORT}:5000 ghcr.io/oras-project/registry:v0.0.3-alpha
```

## Add an image to the OCI-compatible registry

Add an image to the registry. The following commands build and push the `wabbit-networks/net-monitor` container image to your container registry.

```console
export REPO=${REGISTRY}/net-monitor
export IMAGE=${REPO}:v1
docker build -t $IMAGE https://github.com/wabbit-networks/net-monitor.git#main
docker push $IMAGE
```

## List the image signature

Use `notation list` to show any signatures associated with the container image you built and pushed in the previous section.

```console
notation list --plain-http $IMAGE
```

Confirm there are no signatures.

## Generate a certificate

Use `notation cert generate-test` to generate a self-signed test certificate for signing artifacts. The following generates a self-signed X.509 certificate under the `~/config/notation/` directory.

**IMPORTANT**: Self-signed certificates should be used for development purposes only and should not be used in production environments.

```console
notation cert generate-test --default "wabbit-networks.io"
```

The output of the above command shows the location of the public and private key generated. For example:

```output
$ notation cert generate-test --default "wabbit-networks.io"
generating RSA Key with 2048 bits
generated certificates expiring on 2022-10-01T20:18:37Z
wrote key: <EXAMPLE_PATH>/notation/localkeys/wabbit-networks.io.key
wrote certificate: <EXAMPLE_PATH>/notation/localkeys/wabbit-networks.io.crt
wabbit-networks.io: added to the key list
wabbit-networks.io: marked as default
```

## Sign the image

Use `notation sign` to sign the container image.

```console
notation sign --plain-http $IMAGE
```

Use `notation list` to show the signatures for your container image.

```console
notation list --plain-http $IMAGE
```

Confirm there is one listed, for example:

```output
$ notation list --plain-http $IMAGE
sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

## Verify the signature of an image

Use `notification verify` to verify any signatures on your container image.

```console
notation verify --plain-http $IMAGE
```

Confirm your container image fails validation. For example:

```output
$ notation verify --plain-http $IMAGE
Error: trust certificate not specified
2022/09/30 15:24:14 trust certificate not specified
```

This verification fails because you have not trusted the public key for your container image.

## Add a trusted public key

Add the public from the certificate you generated earlier as a trusted certificate.

```console
notation cert add --name "wabbit-networks.io" <EXAMPLE_PATH>/notation/localkeys/wabbit-networks.io.crt
```

Adding this public key as a trusted public key allows you to verify any container images that are signed with the corresponding private key. 

```output
$ notation verify --plain-http $IMAGE
sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

The above example shows one trusted signature.

## Next steps

For additional examples on using Notary, see:

- [Build, sign, and verify container images using Notary and Azure Key Vault](https://learn.microsoft.com/azure/container-registry/container-registry-tutorial-sign-build-push)