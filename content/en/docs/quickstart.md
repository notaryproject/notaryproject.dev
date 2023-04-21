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

## Create an OCI-compatible registry

> **Warning:** The following example creates a registry with [oras-project/registry](https://github.com/oras-project/distribution/pkgs/container/registry). This registry should only be used for testing or development purposes. Refer to [registries are compatible with Notary]({{< ref "/docs/faq#what-registries-are-compatible-with-notary" >}}) for more alternatives. See [Authenticate with OCI-compliant registries]({{< ref "/docs/how-to/registry-authentication" >}}) when you log in to another OCI registry. 

Create and run an OCI-compatible registry on your development computer using Docker and the [oras-project/registry](https://github.com/oras-project/distribution/pkgs/container/registry) container image. The following command creates a registry that is accessible at `localhost:5000`.

```console
docker run -d -p 5000:5000 ghcr.io/oras-project/registry:v1.0.0-rc.4
```

> **Note:** For Apple silicon, add the `--platform linux/arm64` parameter.

## Add an image to the OCI-compatible registry

The following commands build and push the [wabbit-networks/net-monitor](https://github.com/wabbit-networks/net-monitor#main) container image to your container registry.

```console
docker build -t localhost:5000/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5000/net-monitor:v1
```

Save the digest value of the image from the output of the `docker push` command.

*Important*: Always use the digest value of an image when signing since they are immutable. Tag values are mutable and can reference a different container image than the original signed container image.

An example output of `docker push`:

```output
The push refers to repository [localhost:5000/net-monitor]
2556c54bfdf3: Pushed
fb6ca4f9c8d3: Pushed
ded7a220bb05: Pushed
v1: digest: sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a size: 942
```

In the above example, the reference to the container image using the digest value is `localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`.

## List the signatures associated with the container image

Use `notation ls` to show any signatures associated with the container image you built and pushed in the previous section.

```console
IMAGE=localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
notation ls $IMAGE
```

Confirm there are no signatures shown in the output.

## Generate a test key and self-signed certificate

Use `notation cert generate-test` to generate a test RSA key for signing artifacts, and a self-signed X.509 test certificate for verifying artifacts. Please note the self-signed certificate should be used for testing or development purposes only.

The following command generates a test key and a self-signed X.509 certificate. With the `--default` flag, the test key is set as a default signing key. The self-signed X.509 certificate is added to a named trust store `wabbit-networks.io` of type `ca`.

```console
notation cert generate-test --default "wabbit-networks.io"
```

Use `notation key ls` to confirm the signing key is correctly configured. Key name with a `*` prefix is the default key.

```console
notation key ls
```

Use `notation cert ls` to confirm the certificate is stored in the trust store.

```console
notation cert ls
```

## Sign the container image

Use `notation sign` to sign the container image.

```console
notation sign $IMAGE
```

By default, the signature format is `JWS`. Use `--signature-format` to use [COSE](https://datatracker.ietf.org/doc/html/rfc8152/) signature format.

```console
notation sign --signature-format cose $IMAGE
```

The generated signature is pushed to the registry and the digest of the container image returned.

Use `notation ls` to show the signature associated with the container image.

```console
notation ls $IMAGE
```

Confirm there is one signature, for example:

```output
$ notation ls $IMAGE
localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

To verify the container image, configure the trust policy to specify trusted identities that sign the artifacts, and level of signature verification to use. For more details, see [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy" >}}).

Create a JSON file with the following trust policy, for example:

```shell
cat <<EOF > ./my_policy.json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "*" ],
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
EOF
```

Use `notation policy import` to import the trust policy configuration from a JSON file. For example:

```shell
notation policy import ./my_policy.json
```

Use `notation policy show` to view the applied policy configuration. For example:

```shell
notation policy show
```

The above JSON creates a trust policy named `wabbit-networks-images`. The policy has `registryScopes` set to `*`, which applies the policy to all the artifacts of any registry. The `signatureVerification` is set to `strict`, which checks all validations and any failure will fail the signature verification. This policy uses the `wabbit-networks.io` trust store of type `ca` which was created in the previous step. For more details on trust policies, see [trust policy spec]({{< ref "https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-policy" >}}).

To enable trust policy for specific repositories, set the `registryScopes` to those specific repositories. For example:

```json
registryScopes": [ 
    "localhost:5000/net-monitor",
    "localhost:5000/nginx",
    "localhost:5000/hello-world"
]
```

## Verify the container image

Use `notation verify` to verify signatures associated with the container image.

```console
notation verify $IMAGE
```

The digest of the supplied artifact is returned upon successful verification.

## Cleanup

To remove the sample registry running on your development computer:

```console
docker rm -f $(docker ps -q)
```

To reset your `notation` configuration, remove the notation configuration directory. For more details, see [Remove the configuration files]({{< ref "/docs/installation/uninstall" >}}).