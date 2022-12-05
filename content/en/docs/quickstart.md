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

Create and run an OCI-compatible registry on your development computer using Docker and the [oras-project/registry](https://github.com/oras-project/distribution/pkgs/container/registry) container image. The following command creates a registry that is accessible at `localhost:5000`.

```console
docker run -d -p 5000:5000 ghcr.io/oras-project/registry:v1.0.0-rc.3
```

> NOTE:
> Since v1.0.0-rc.1 release, by default, Notation stores signatures using OCI artifact Manifest, which is defined in [OCI Image spec v1.1.0](https://github.com/opencontainers/image-spec/tree/v1.1.0-rc2)). If you choose a different registry, make sure the registry is OCI Image spec v1.1.0 compliant.

## Add an image to the OCI-compatible registry

The following commands build and push the [wabbit-networks/net-monitor](https://github.com/wabbit-networks/net-monitor#main) container image to your container registry.

```console
docker build -t localhost:5000/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5000/net-monitor:v1
```

Tags are mutable and a tag reference can point to a different container image than the one signed. Find out the digest value from the output of `docker push` command.

An example output of `docker push`:

```output
The push refers to repository [localhost:5000/net-monitor]
2556c54bfdf3: Pushed
fb6ca4f9c8d3: Pushed
ded7a220bb05: Pushed
v1: digest: sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a size: 942
```

Use digest to identify the container image as `localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a`.

> Note：
> Tags can be used to reference the container image. In this example, you can use tag `v1` for reference. Notation commands will resolve the tag `v1` to digest `sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a` first. By validating the digest, you can make sure it is the right container image to reference.

## List the signatures associated with the container image

Use `notation list` to show any signatures associated with the container image you built and pushed in the previous section.

```console
notation list localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

Confirm there are no signatures shown in the output.

## Generate a test key and self-signed certificate

Use `notation certificate generate-test` to generate a test RSA key for signing artifacts, and a self-signed X.509 test certificate for verifying artifacts.

**IMPORTANT**: Self-signed certificates should be used for development purposes only and should not be used in production environments.

The following command generates a test key and a self-signed X.509 certificate. With the `--default` flag, the test key is set as a default signing key. The self-signed X.509 certificate is added to a named trust store `wabbit-networks.io` of type `ca`.

```console
notation certificate generate-test --default "wabbit-networks.io"
```

Use `notation key list` to confirm the signing key is correctly configured. Key name with a `*` prefix is the default key.

```console
notation key list
```

Use `notation certificate list` to confirm the certificate is stored in the trust store.

```console
notation certificate list
```

## Sign the container image

Use `notation sign` to sign the container image.

```console
notation sign localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

By default, the signature format is `JWS`. Use `--signature-format` to use [COSE](https://datatracker.ietf.org/doc/html/rfc8152/) signature format.

```console
notation sign --signature-format cose localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

The generated signature is pushed to the registry and the digest of the container image returned.

Use `notation list` to show the signature associated with the container image.

```console
notation list localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

Confirm there is one signature, for example:

```output
$ notation list localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

To verify the container image, configure the trust policy to specify trusted identities that sign the artifacts, and level of signature verification to use. For more details, see [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy" >}}).

Create a `trustpolicy.json` with the following trust policy in the notation configuration directory.

**NOTE:** For Linux, the notation configuration directory is `${HOME}/.config/notation/`. For macOS, the notation configuration directory is `${HOME}/Library/Application Support/notation/`. For Windows, the notation configuration folder is `%USERPROFILE%\AppData\Roaming\notation\`.

```json
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
```

The above JSON creates a trust policy named `wabbit-networks-images`. The policy has `registryScopes` set to `*`, which applies the policy to all the artifacts of any registry. The `signatureVerification` is set to `strict`, which checks all validations and any failure will fail the signature verification. This policy uses the `wabbit-networks.io` trust store of type `ca` which was created in the previous step. For more details on trust policies, see [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy-properties" >}}).

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
notation verify localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
```

The digest of the supplied artifact is returned upon successful verification.

## Cleanup

### Remove the notation configuration

To remove local keys, self-signed certificates, and notation configurations, remove the notation configuration directory.
  
For linux:

```console
rm -r ${HOME}/.config/notation/
```

For macOS:

```console
rm -r ${HOME}/Library/Application Support/notation/
```

For Windows, delete the directory `%USERPROFILE%\AppData\Roaming\notation\`

### Remove the registry

To remove the registry running on your development computer:

```console
docker rm -f $(docker ps -q)
```
