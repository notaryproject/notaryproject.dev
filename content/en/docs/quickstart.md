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
docker run -d -p 5000:5000 ghcr.io/oras-project/registry:v1.0.0-rc.2
```

## Add an image to the OCI-compatible registry

The following commands build and push the `wabbit-networks/net-monitor` container image to your container registry.

```console
docker build -t localhost:5000/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5000/net-monitor:v1
```

## List the signatures associated with the container image

Use `notation list` to show any signatures associated with the container image you built and pushed in the previous section.

```console
notation list $IMAGE
```

Confirm there are no signatures showed in the output.

## Generate a test key and self-signed certificate

Use `notation cert generate-test` to generate a test RSA key for signing artifacts, and a self-signed test certificate for verifying artifacts.

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
notation sign $IMAGE
```

By default, the signature format is `JWS`. Use `--signature-format` to use `COSE` signature format.

```console
notation sign --signature-format cose $IMAGE
```

Upon successful signing, the generated signature is pushed to the registry with the digest of the container image returned. Use `notation list` to show the signature associated with the container image.

```console
notation list $IMAGE
```

Confirm there is one signature, for example:

```output
$ notation list $IMAGE
localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

In order to verify the container image, you need to configure the trust policy to specify trusted identities which sign the artifacts, and level of signature verification to use. See [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification" >}}) to understand more about trust policy.

Create a JSON file named `trustpolicy.json` with the following content:

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

For a Linux user, store file `trustpolicy.json` under directory `$HOME/.config/notation/`.

For a Mac user, store file `trustpolicy.json` under directory `$HOME/Library/Application Support/notation/`.

For a Window user, store file `trustpolicy.json` under directory `C:\Users\<username>\AppData\Roaming\notation\`.

The above trust policy with the name 'wabbit-networks-images' has `registryScopes` set to `*`, which means it applies to all the artifacts of any registry. The `signatureVerification` is set to `strict` which means notation will perform all the validations and any failure in validation will lead to the failure of signature verification. This policy uses the `wabbit-networks.io` trust store of type `ca` which was created in the previous step. For more details please read [trust-policy]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy" >}}) to fine tune the policies for specific security requirements.

For users want to enable trust policy for specific repositories, set the `registryScopes` as following

```json
registryScopes": [ 
    "localhost:5000/net-monitor",
    "localhost:5000/nginx",
    "localhost:5000/hello-world"
]
```

## Verify the container image

Use `notification verify` to verify signatures associated with the container image.

```console
notation verify $IMAGE
```

The digest of the supplied artifact is returned upon successful verification.

## Reset

To resetting the environment

* Remove local keys, self-signed certificates and notation configurations
  
For linux user,

```console
rm -r $HOME/.config/notation/
```

For a Mac user

```console
rm -r $HOME/Library/Application Support/notation/
```

For a Window user, delete the directory `C:\Users\<username>\AppData\Roaming\notation\`

* Remove the local registry

```console
docker rm -f $(docker ps -q)
```

## What's Next

Notation can do much more than what is discussed in the quick start. Learn more information from other sections of this site.
