---
title: "Create a trust policy and verify artifacts"
description: "How to create a trust policy and use it to verify artifacts"
type: docs
weight: 1
---

As part of the process to verify a container image with notary, you need to configure the trust policy to specify trusted identities that sign the artifacts, and the level of signature verification to use. For more details, see [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy" >}}).

This tutorial shows you how to create a trust policy with different trusted identities and levels of signature verification. 

## Create an example registry with an image

**WARNING:** The following example creates a registry with [oras-project/registry](https://github.com/oras-project/distribution/pkgs/container/registry). This registry should only be used for development purposes. When using other registries, ensure the registry is compatible with OCI Image specification v1.1.0. Starting with `v1.0.0-rc.1` of `notation`, by default, signatures are stored using [OCI Artifact Manifest](https://github.com/opencontainers/image-spec/blob/v1.1.0-rc2/artifact.md), which is defined in [OCI Image spec v1.1.0](https://github.com/opencontainers/image-spec/tree/v1.1.0-rc2)).

```console
docker run -d -p 5000:5000 ghcr.io/oras-project/registry:v1.0.0-rc.3
```

**NOTE:** For Apple silicon, add the `--platform linux/arm64` parameter.

Use `docker buildx build` and `docker push` to build and push a sample image to your registry.

```console
docker buildx build -t localhost:5000/net-monitor:v1 https://github.com/wabbit-networks/net-monitor.git#main
docker push localhost:5000/net-monitor:v1
```

Save the digest value of the image from the output of `docker push`. For example:

```output
The push refers to repository [localhost:5000/net-monitor]
2556c54bfdf3: Pushed
fb6ca4f9c8d3: Pushed
ded7a220bb05: Pushed
v1: digest: sha256:1111111111111111111111111111111111111111111111111111111111111111 size: 942
```

In the above example, the digest value of the image is *sha256:1111111111111111111111111111111111111111111111111111111111111111*.

## Create example certificates and sign the image

Use `notation cert generate-test` to generate three example certificates and trust stores for signing the image. 

```console
notation cert generate-test valid-example
notation cert generate-test expired-example
notation cert generate-test missing-example
```

- The *valid-example* certificate and trust store will be used to sign the image with a valid signature.
- The *expired-example* certificate and trust store will be used to sign the image with an expired signature.
- The *missing-example* certificate and trust store will not be used to sign the image, but will be used to demonstrate the trust policy.

Use `notation ls` to list the current signatures for your image. The following example sets the value of *$IMAGE* to the name of the image and its digest value.

**IMPORTANT**: Always use the digest value of an image when signing since they are immutable. Tag values are mutable and can reference a different container image than the original signed container image.

```console
IMAGE=localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
notation ls $IMAGE
```

Confirm there are no signatures listed.

Use `notation sign` to sign the image with two different signatures.

```console
notation sign $IMAGE -k valid-example 
notation sign $IMAGE --expiry 30s -k expired-example
```

Use `notation ls` to confirm there are two signatures.

```console
notation ls $IMAGE
localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
└── application/vnd.cncf.notary.v2.signature
    ├── sha256:2222222222222222222222222222222222222222222222222222222222222222
    ├── sha256:3333333333333333333333333333333333333333333333333333333333333333
```

## Create a trust policy

Create a `trustpolicy.json` with the following trust policy in the notation configuration directory.

**NOTE:** For Linux, the notation configuration directory is `${HOME}/.config/notation/`. For macOS, the notation configuration directory is `${HOME}/Library/Application\ Support/notation/`. For Windows, the notation configuration folder is `%USERPROFILE%\AppData\Roaming\notation\`.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "trust-policy-example",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "strict" 
            },
            "trustStores": [ "ca:valid-example" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```

The above example has a verification level of *strict* and uses the *valid-example* trust store.

## Verify image signatures using the trust policy

The trust policy you created in the previous step uses a verification level of *strict* but there's also *permissive*, *audit*, and *skip*. For more details on see [trust policy spec]({{< ref "/docs/concepts/trust-store-trust-policy-specification#trust-policy" >}}).

Use `notation verify` to verify the image using the *strict* verification level and *valid-example* trust store and confirm it succeeds.

```console
$ notation verify $IMAGE
Successfully verified signature for localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
```

Update the trust store to use the *expired-example* trust store.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "trust-policy-example",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "strict" 
            },
            "trustStores": [ "ca:expired-example" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```

Use `notation verify` to verify the image using the *strict* verification level and *expired-example* trust store and confirm it fails.

```console
$ notation verify $IMAGE
Error: signature verification failed for all the signatures associated with localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
```

This example fails because the *strict* verification level does not allow expired certificates. When creating the *expired-example* certificate and trust store, the certificate's expiration was set for 30 seconds.

Update the trust policy to use the *permissive* verification level, which only logs if there is an expired certificate.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "trust-policy-example",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "permissive" 
            },
            "trustStores": [ "ca:expired-example" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```

Use `notation verify` to verify the image using the *permissive* verification level and *expired-example* trust store and confirm it succeeds while logging the expired certificate.

```console
$ notation verify $IMAGE
Warning: expiry was set to "logged" and failed with error: digital signature has expired on "Fri, 09 Dec 2022 16:30:07 -0600"
Successfully verified signature for localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
```

Update the trust policy to use the *missing-example* trust store.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "trust-policy-example",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "permissive" 
            },
            "trustStores": [ "ca:missing-example" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```

Use `notation verify` to verify the image using the *permissive* verification level and *missing-example* trust store and confirm it fails.

```console
$ notation notation verify $IMAGE
Error: signature verification failed for all the signatures associated with localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
```

This example fails because the *permissive* verification level does not allow missing certificates. When creating the *missing-example* certificate and trust store, the certificate was not used to sign the image.

Update the trust store to use the *audit* verification level.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "trust-policy-example",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "audit" 
            },
            "trustStores": [ "ca:missing-example" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```

Use `notation verify` to verify the image using the *audit* verification level and *missing-example* trust store and confirm it succeeds while logging the missing certificate.

```console
$ notation verify $IMAGE
Warning: authenticity was set to "logged" and failed with error: signature is not produced by a trusted signer
Successfully verified signature for localhost:5000/net-monitor@sha256:1111111111111111111111111111111111111111111111111111111111111111
```

## Cleanup

### Remove the notation configuration

To remove local keys, self-signed certificates, and notation configurations, remove the notation configuration directory.
  
For linux:

```console
rm -r ${HOME}/.config/notation/
```

For macOS:

```console
rm -r ${HOME}/Library/Application\ Support/notation/
```

For Windows, delete the directory `%USERPROFILE%\AppData\Roaming\notation\`

### Remove the registry

To remove the registry running on your development computer:

```console
docker rm -f $(docker ps -q)
```