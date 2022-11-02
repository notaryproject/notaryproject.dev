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
docker run -d -p ${PORT}:5000 ghcr.io/oras-project/registry:v1.0.0-rc.2
```

## Add an image to the OCI-compatible registry

Add an image to the registry. The following commands build and push the `wabbit-networks/net-monitor` container image to your container registry.

```console
export REPO=${REGISTRY}/net-monitor
export IMAGE=${REPO}:v1
docker build -t $IMAGE https://github.com/wabbit-networks/net-monitor.git#main
docker push $IMAGE
```

## List the signatures associated with the container image

Use `notation list` to show any signatures associated with the container image you built and pushed in the previous section.

```console
notation list --plain-http $IMAGE
```

Confirm there are no signatures.

## Generate a test key and self-signed certificate

Use `notation cert generate-test` to generate a test RSA key for signing artifacts, and a self-signed test certificate for verifying artifacts.

**IMPORTANT**: Self-signed certificates should be used for development purposes only and should not be used in production environments.

The following command generates a test key and a self-signed X.509 certificate under the `$HOME/.config/notation/localkeys` directory. The test key is set as a default signing key using `--default` flag. The self-signed certificate is added to a named trust store `wabbit-networks.io` of type `ca`.

```console
notation cert generate-test --default "wabbit-networks.io"
```

Use `notation key list` to confirm the signing key. Key name with a `*` prefix is the default key.

```console
notation key list
```

Use `notation certificate list` to confirm the certificate is stored in the trust store.

```console
notation cert list
```

## Sign the container image

Use `notation sign` to sign the container image with COSE signature format.

```console
notation sign --plain-http --signature-format cose $IMAGE
```

Use `notation list` to show the signatures associated with the container image.

```console
notation list --plain-http $IMAGE
```

Confirm there is one signature, for example:

```output
$ notation list --plain-http $IMAGE
localhost:5000/net-monitor@sha256:073b75987e95b89f187a89809f08a32033972bb63cda279db8a9ca16b7ff555a
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Create a trust policy

In order to verify the container image, you need to configure the trust policy to specify trusted identities which sign the artifacts, and level of signature verification to use. The trust policy is a JSON document with the name `trustpolicy.json` under `$HOME/.config/notation/`.

Once the trust policy file is executed as below, it creates one trust policy named `wabbit-networks-images`. This policy only applies to the repository `$REPO`. The level of signatureVerification is `strict`, which enforces a full validation. Any validation failure will fail the whole signature verification process. The trust store used for this policy is named `wabbit-networks.io` of type `ca`, which is created in previous step. Use `notation cert show` to get trust identity info from the subject field of the self-signed certificate.

```console
cat <<EOF > $HOME/.config/notation/trustpolicy.json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "$REPO" ],
            "signatureVerification": {
                "level" : "strict" 
            },
            "trustStores": [ "ca:wabbit-networks.io" ],
            "trustedIdentities": [
                "x509.subject: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US"
            ]
        }
    ]
}
EOF
```

## Verify the container image

Use `notification verify` to verify any signatures on your container image.

```console
notation verify --plain-http $IMAGE
```

## Next steps

For additional examples on using Notary, see:

* [Build, sign, and verify container images using Notary and Azure Key Vault](https://learn.microsoft.com/azure/container-registry/container-registry-tutorial-sign-build-push)
