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

Create and run an OCI-compatible registry on your development computer using the [distribution/distribution](https://github.com/distribution/distribution) with the [image deletion](https://docs.docker.com/registry/spec/api/#deleting-an-image) enabled. The following command creates a registry that is accessible at `localhost:5001`. 

```console
docker run -d -p 5001:5000 -e REGISTRY_STORAGE_DELETE_ENABLED=true --name registry registry
```

{{% alert title="Note" color="primary" %}}
If the host port 5001 is already in use, you can use another host port. 
{{% /alert %}}

If you want to use Notation with other registries, refer to [which registries are compatible with Notary]({{< ref "/docs/faq#what-registries-are-compatible-with-notary" >}}) for more alternatives. See [Authenticate with OCI-compliant registries]({{< ref "/docs/how-to/registry-authentication" >}}) when you log in to another OCI registry.

## Add an image to the OCI-compatible registry

The following commands build and push the [wabbit-networks/net-monitor](https://github.com/wabbit-networks/net-monitor#main) container image to your container registry.

```console
docker build -t localhost:5001/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5001/net-monitor:v1
```

Get the digest value of the *localhost:5001/net-monitor:v1* image using `docker inspect`. For example:

```console
docker inspect localhost:5001/net-monitor:v1 -f '{{ .Id }}'
sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

In the above example, the digest value is `sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`. The reference to the container image using the digest value is `localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`.

{{% alert title="Note" color="primary" %}}
Notation resolves the tag to the digest before signing if a tag is used to identify the container image. Always reference and use the image digest instead of a tag since digest is immutable.
{{% /alert %}}

## List the signatures associated with the container image

Use `notation ls` to show any signatures associated with the container image you built and pushed in the previous section.

```console
IMAGE=localhost:5001/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
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
localhost:5001/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

To verify the container image, configure the trust policy to specify trusted identities that sign the artifacts, and level of signature verification to use. For more details, see [trust policy spec](https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-policy).

Create a JSON file with the following trust policy, for example:

```shell
cat <<EOF > ./trustpolicy.json
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
notation policy import ./trustpolicy.json
```

Use `notation policy show` to view the applied policy configuration. For example:

```shell
notation policy show
```

The above JSON creates a trust policy named `wabbit-networks-images`. The policy has `registryScopes` set to `*`, which applies the policy to all the artifacts of any registry. The `signatureVerification` is set to `strict`, which checks all validations and any failure will fail the signature verification. This policy uses the `wabbit-networks.io` trust store of type `ca` which was created in the previous step. For more details on trust policies, see [trust policy spec](https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-policy).

To enable trust policy for specific repositories, set the `registryScopes` to those specific repositories. For example:

```json
"registryScopes": [ 
    "localhost:5001/net-monitor",
    "localhost:5001/nginx",
    "localhost:5001/hello-world"
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
docker rm -f registry
```

To reset your `notation` configuration, remove the notation configuration directory. For more details, see [Remove the configuration files]({{< ref "/docs/installation/uninstall" >}}).