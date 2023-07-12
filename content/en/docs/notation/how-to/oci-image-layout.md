---
title: Manage images as OCI image layout
description: Build, sign, push, and verify images as OCI image layout
weight: 5
---

OCI image layout is a directory structure that contains files and folders that refer to an OCI image. OCI image layout is defined in [OCI image spec](https://github.com/opencontainers/image-spec/blob/v1.1.0-rc2/image-layout.md).

When you sign an image after it is pushed to a registry, it is possible that you are not signing the correct image. You also may not be certain that the image hasn't been altered. Using OCI image layout, you can sign images on local disk before pushing them to the remote registry. Signing an image before you push it a registry provides helps ensure you are signing the correct image, and consumers of that image can verify that same image.

{{% alert title="Important" color="primary" %}}
This feature is experimental. It is not recommended for production use.
{{% /alert %}}


## Create OCI image layout for an image

Use `docker buildx build` with the `--output type=oci` flag to create an OCI image layout for an image.

For example, create a Dockerfile with the following content:

```dockerfile
FROM alpine
CMD echo 'hello world!'
```

Use `docker buildx create` and `docker buildx build` to create an OCI image layout for the image defined in the Dockerfile.

```console
docker buildx create --use
docker buildx build . -f Dockerfile -o type=oci,dest=hello-world.tar -t hello-world:v1
```

The above example sets `output=hello-world.tar` to save the OCI image layout as a tar file named `hello-world.tar`. To view the OCI image layout as a directory structure, extract the tar file.

```console
mkdir hello-world
tar -xf ./hello-world.tar -C hello-world
```

{{% alert title="Important" color="primary" %}}
You must extract the tar file before you can sign an image as an OCI image layout.
{{% /alert %}}

## Sign an image as an OCI image layout

To sign an existing image as an OCI image layout, enable the `NOTATION_EXPERIMENTAL` environment variable and use the `notation sign` command with the `--oci-layout` flag. The following example enables the `NOTATION_EXPERIMENTAL` environment variable, creates a self-signed certificate, and signs the image `hello-world:v1` as an OCI image layout.

```console
export NOTATION_EXPERIMENTAL=1
notation cert generate-test wabbit-networks.io --default
notation sign --oci-layout ./hello-world:v1
```

{{% alert title="Note" color="primary" %}}
Signatures are stored in the same OCI image layout directory, and associated with OCI image.
{{% /alert %}}

Use `notation list --oci-layout` to list signatures associated with an OCI image layout.

```shell
notation list --oci-layout ./hello-world:v1
```

## Verify an image as an OCI image layout

You can verify an image as an OCI image layout using `notation verify --scope` and setting `registryScopes` in your trust policy. For example, the following trust policy has `registryScopes` set to `local/hello-world`:

```json
{
 "version": "1.0",
 "trustPolicies": [
    {
         "name": "local-images-policy",
         "registryScopes": [ "local/hello-world" ],
         "signatureVerification": {
             "level" : "strict"
         },
         "trustStores": [ "ca:wabbit-networks.io" ],
         "trustedIdentities": [
             "*"
         ]
     }
 ]
}
```

The following command imports `permissive-trustpolicy.json`:

```console
notation policy import ./permissive-trustpolicy.json
```

Use `notation verify` with `--scope` set to the same value you set in your trust policy to verify the image against signatures:

```shell
notation verify --oci-layout ./hello-world:v1 --scope "local/hello-world"
```

## Push an OCI image layout to a remote registry

You can push an image to a remote registry as an OCI image layout on local disk using the [oras](https://oras.land/docs/CLI/installation) CLI. 

If you need a remote registry, you can create and run an OCI-compatible registry on your development computer using the [distribution/distribution](https://github.com/distribution/distribution) with the [image deletion](https://docs.docker.com/registry/spec/api/#deleting-an-image) enabled. The following command creates a registry that is accessible at `localhost:5001`.

```console
docker run -d -p 5001:5000 -e REGISTRY_STORAGE_DELETE_ENABLED=true --name registry registry
```

Use `oras cp` to push the OCI image layout to the remote registry. For example:

```console
oras cp ./hello-world:v1 --from-oci-layout -r localhost:5001/hello-world:v1
```

{{% alert title="Important" color="primary" %}}
You must use the flag `-r` so that the signatures are copied together with the image.
{{% /alert %}}

Use `notation list` and `notation verify` to list and verify the image signatures. For example:

```console
notation list localhost:5001/hello-world:v1
notation verify localhost:5001/hello-world:v1
```

## OCI-compliant registries

For a full list of OCI-compliant registries compatible with `notation`, see [OCI-compliant registries]({{< ref "/docs/faq#what-registries-are-compatible-with-notary" >}}).