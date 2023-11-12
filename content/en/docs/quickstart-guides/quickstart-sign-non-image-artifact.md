---
title: "Quickstart: Sign and validate a non-image artifact"
description: "Quickly set up an OCI-based registry and use notation to sign and validate an SBOM for a container image"
type: docs
weight: 2
---

## Prerequisites

Before you begin, you need:

* Docker installed and running, such as [Docker desktop](https://www.docker.com/products/docker-desktop/).
* [Notation CLI]({{< ref "/docs/user-guides/installation/cli" >}}) installed and configured.

## Create an OCI-compatible registry

Create and run an OCI-compatible registry on your development computer using the [distribution/distribution](https://github.com/distribution/distribution) with the [image deletion](https://docs.docker.com/registry/spec/api/#deleting-an-image) enabled. The following command creates a registry that is accessible at `localhost:5001`. 

```console
docker run -d -p 5001:5000 -e REGISTRY_STORAGE_DELETE_ENABLED=true --name registry registry
```

{{% alert title="Note" color="primary" %}}
If the host port 5001 is already in use, you can use another host port. 
{{% /alert %}}

If you want to use Notation with other registries, refer to [which registries are compatible with the Notary Project]({{< ref "/docs/faq#what-registries-are-compatible-with-notary" >}}) for more alternatives. See [Authenticate with OCI-compliant registries]({{< ref "/docs/user-guides/how-to/registry-authentication" >}}) when you log in to another OCI registry.

## Add an image to the OCI-compatible registry

The following commands build and push the [wabbit-networks/net-monitor](https://github.com/wabbit-networks/net-monitor#main) container image to your container registry.

```console
docker build -t localhost:5001/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5001/net-monitor:v1
```

Get the digest value of the *localhost:5001/net-monitor:v1* image using `docker inspect`. For example:

```console
docker inspect --format='{{index .RepoDigests 0}}' localhost:5001/net-monitor:v1
```

Output:

```console
localhost:5001/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

In the above example, the digest value is `sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`. The reference to the container image using the digest value is `localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`.

{{% alert title="Note" color="primary" %}}
Notation resolves the tag to the digest before signing if a tag is used to identify the container image. Always reference and use the image digest instead of a tag since digest is immutable.
{{% /alert %}}

Use an environment variable to store the digest value of the container image. This environment variable is used in later steps. For example:

```console
IMAGE=localhost:5001/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

## Generate an SBOM for the container image

Use `docker sbom` to generate an SBOM for the container image. For example:

```console
docker sbom --output SBOM.txt $IMAGE
```

## Attach the SBOM to the container image

Use `oras attach` to attach the SBOM to the container image. For example:

```console
oras attach $IMAGE SBOM.txt --artifact-type example/sbom
```

Use `oras discover` to confirm the SBOM is attached to the container image. For example:

```console
oras discover $IMAGE -o tree
```

Confirm the SBOM is attached to the container image. For example:

```console
localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── example/sbom
    └── sha256:6cbf7cc5ffa82b030b57ff820d49a86c143d8c6ac483b8e5eead81be8b223fc4
```

Use an environment variable to store the digest value of the SBOM. This environment variable is used in later steps. For example:

```console
SBOM=localhost:5000/net-monitor@sha256:6cbf7cc5ffa82b030b57ff820d49a86c143d8c6ac483b8e5eead81be8b223fc4
```

## List the signatures associated with the SBOM

Use `notation ls` to show any signatures associated with the SBOM you attached in the previous section.

```console
notation ls $SBOM
```

Confirm there are no signatures shown in the output.

## Generate a test key and self-signed certificate

Use `notation cert generate-test` to generate a test RSA key for signing artifacts, and a self-signed X.509 test certificate for verifying artifacts.

{{% alert title="Warning" color="warning" %}}
A self-signed certificate should be used for testing or development purposes only.
{{% /alert %}}

The following command generates a test key and a self-signed X.509 certificate. With the `--default` flag, the test key is set as a default signing key. The self-signed X.509 certificate is added to a named trust store `wabbit-networks.io` of type `ca`.

```console
notation cert generate-test --default "wabbit-networks.io"
```

{{% alert title="Note" color="note" %}}
At this time, test key and self-signed certificate files created using `notation cert generate-test` can't be removed using only `notation key delete` and `notation cert delete`. For more details on fully removing the test key and self-signed certificate files, see [Remove the test key and self-signed certificate]({{< ref "/docs/user-guides/installation/uninstall#remove-the-test-key-and-self-signed-certificate" >}}).
{{% /alert %}}

Use `notation key ls` to confirm the signing key is correctly configured. Key name with a `*` prefix is the default key.

```console
notation key ls
```

Use `notation cert ls` to confirm the certificate is stored in the trust store.

```console
notation cert ls
```

## Sign the SBOM

Use `notation sign` to sign the SBOM.

```console
notation sign $SBOM
```

By default, the signature format is `JWS`. Use `--signature-format` to use [COSE](https://datatracker.ietf.org/doc/html/rfc8152/) signature format.

```console
notation sign --signature-format cose $SBOM
```

The generated signature is pushed to the registry and the digest of the SBOM is returned.

Use `notation ls` to show the signature associated with the SBOM.

```console
notation ls $SBOM
```

Confirm there is one signature, for example:

```output
$ notation ls $SBOM
localhost:5001/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

To verify the SBOM, configure the trust policy to specify trusted identities that sign the artifacts, and level of signature verification to use. For more details, see [trust policy spec](https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-policy).

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

Use `notation verify` to verify signatures associated with the SBOM.

```console
notation verify $SBOM
```

The digest of the supplied artifact is returned upon successful verification.

## Cleanup

To remove the sample registry running on your development computer:

```console
docker rm -f registry
```

To reset your `notation` configuration, remove the notation configuration directory. For more details, see [Remove the configuration files]({{< ref "/docs/user-guides/installation/uninstall" >}}).