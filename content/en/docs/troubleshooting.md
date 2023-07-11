---
title: "Troubleshooting"
description: "Troubleshooting common problems with Notary"
type: docs
weight: 3
---

{{% alert title="Important" color="primary" %}}
To suggest a troubleshooting item, [create a pull request PR with your suggested item](https://github.com/notaryproject/notaryproject.dev/edit/main/content/en/docs/troubleshooting.md)
{{% /alert %}}


## How do I troubleshoot issues with signatures?

`oras manifest fetch` fetches information about an artifact; such as mediatype, config, layers, and annotations. By using the `--descriptor` flag, you can fetch only the descriptor of an artifact. Inspect the descriptor of a remote artifact sent for signing using `oras manifest fetch --descriptor`. For example: 

```console
$ oras manifest fetch --descriptor IMAGE:TAG
{"mediaType":"...","digest":"sha256:...","size":...}
```

Confirm the details, such as the *mediaType* and *digest* match the details of the artifact sent for signing.

Inspect the signatures of a remote artifact using `notation inspect` with the digest value for the artifact. For example:

```console
$ notation inspect localhost:5001/net-monitor@sha256:cae906b84806687f02272d00a7000ff31a6be6281bb72f16bdef2fcd67d41786

Inspecting all signatures for signed artifact
localhost:5001/net-monitor@sha256:cae906b84806687f02272d00a7000ff31a6be6281bb72f16bdef2fcd67d41786
└── application/vnd.cncf.notary.signature
    ├── sha256:1bf07b33089e65e9e83a780c7f405ba36aa4ef2b2fb031535cc6e89042ac0a0f
    │   ├── media type: application/jose+json
    │   ├── signature algorithm: RSASSA-PSS-SHA-256
    │   ├── signed attributes
    │   │   ├── signingScheme: notary.x509
    │   │   └── signingTime: Sun Jun 11 19:56:47 2023
    │   ├── user defined attributes
    │   │   └── (empty)
    │   ├── unsigned attributes
    │   │   └── signingAgent: Notation/1.0.0
    │   ├── certificates
    │   │   └── SHA256 fingerprint: 3f32321edede5df5bb02e88749217ef10c6c4ce8a5d62bb2136257a0ade6e832
    │   │       ├── issued to: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
    │   │       ├── issued by: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
    │   │       └── expiry: Mon Jun 12 18:56:09 2023
    │   └── signed artifact
    │       ├── media type: application/vnd.docker.distribution.manifest.v2+json
    │       ├── digest: sha256:cae906b84806687f02272d00a7000ff31a6be6281bb72f16bdef2fcd67d41786
    │       └── size: 942
    └── sha256:e503cadaa2ffee0272acc8ec1dcb4f737a7245b01491e86b9a382ca3fed88297
        ├── media type: application/cose
        ├── signature algorithm: RSASSA-PSS-SHA-256
        ├── signed attributes
        │   ├── signingScheme: notary.x509
        │   └── signingTime: Sun Jun 11 19:57:14 2023
        ├── user defined attributes
        │   └── (empty)
        ├── unsigned attributes
        │   └── signingAgent: Notation/1.0.0
        ├── certificates
        │   └── SHA256 fingerprint: 3f32321edede5df5bb02e88749217ef10c6c4ce8a5d62bb2136257a0ade6e832
        │       ├── issued to: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       ├── issued by: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       └── expiry: Mon Jun 12 18:56:09 2023
        └── signed artifact
            ├── media type: application/vnd.docker.distribution.manifest.v2+json
            ├── digest: sha256:cae906b84806687f02272d00a7000ff31a6be6281bb72f16bdef2fcd67d41786
            └── size: 942
```

The output contains all the certificate information used for signing the artifact. You can use this information to validate the signing certificates and certificate chain.

The output also contains details about the artifact that was signed, such as the digest. You can use this information to confirm that the correct artifact was signed.


## Enabling notation CLI commands logging

To troubleshoot issues with the notation CLI, you can use the `--verbose` or `-v` flag for more detailed logging. Using the `--verbose` flag gives more detailed information about the notation CLI command. This is useful in identifying and resolving issues effectively. 

Use the `--verbose` flag to enable verbose logging when running a notation CLI command. For example:

```shell
notation verify --verbose localhost:5000/net-monitor@sha256:xxx
```

In addition, there is `--debug`, which is intended for developers to debug the notation CLI. It is not recommended to use `--debug` for end-user troubleshooting.

## When I verify an artifact, I get the error 'Error: open $HOME/.config/notation/trustpolicy.json: no such file or directory'

This error is likely related to trust policy configuration. Verify you have a trust policy set up before you attempt to verify an artifact. For more details, see [Manage trust policies]({{< ref "/docs/notation/how-to/manage-trust-policy" >}})

## When I verify an artifact, I get the error '"$HOME/.config/notation/truststore/x509/ca/mytruststore" does not exist'

This error indicates the trust store doesn't exist or the trust store name is not correct. Trust store typically contains a set of certificate files, where the trust identities are retrieved to verify signatures. You can use `notation cert add` to add trust stores.

The above error shows that the type of trust store is `ca`, and the trust store name is `mytruststore`. Aside `ca` trust store type, X.509 also supports other types of trust stores such as, the `x509/signingAuthority` and  `x509/tsa`. For more details,  please refer to the [trust store and trust policy specification](https://github.com/notaryproject/notaryproject/blob/v1.0.0-rc.2/specs/trust-store-trust-policy.md#trust-store-and-trust-policy-specification)

To verify `ca` and `mytruststore` exist, use `notation cert list`, then confirm whether the type of store `ca` and store name `mytruststore` are in the list with the right certificate file stored.

If `ca` and `mytruststore` are not in the list, use `notation cert add` to add them. For example:

```console
notation cert add --type ca --store mytruststore mycertfile.crt
```

## When I verify an artifact, I get the error 'signature is not produced by a trusted signer'

Assuming the trust store and trust policy are configured correctly, this is a verification failure and that artifact should not be used.

Specifically, this error indicates that the artifact is signed by an unknown identity, which should not be trusted, based on the trust policy. In this case, the verification should fail and users should not use the artifact.

To confirm the trust store and trust policy are configured correctly:

1. If you have multiple trust policies in `trustpolicy.json` file, confirm you are using the correct trust policy for this artifact.
2. Check the `trustStores` property and confirm the value is correctly configured.
3. Check the `trustedIdentities` property and confirm the value is correctly configured. 
  - If the value is `"*"`, it means all the certificates stored in the trust stored (configured in `trustStores`) are trusted.  then you need to make sure the certificates in the trust stores can be used to verify the signatures. 
  - If the value is in the format of x509 subject info, like `"x509.subject: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US"`, then you need to make sure it is the identity that produces the signature. 

Use `notation cert show` to show the details of the certificate in the trust store. For example:

```console
notation cert show --type ca --store mytruststore mycertificate.crt
```

An example of output:

```console
Certificate details
--------------------------------------------------------------------------------
Issuer: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US
Subject: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US
Valid from: 2023-01-15 07:55:01 +0000 UTC
Valid to: 2023-01-16 07:55:01 +0000 UTC
IsCA: false
SHA1 Thumbprint: xxx
```

Check the `Subject` info in the output. If it is the identity that signs the artifact, you need to add the `Subject` info into `trustedIdentities`.

## I have configured trust policy, but I still get the error 'no applicable trust policy'

This error indicates that the `registryScopes` property is not correctly configured. This property contains a list of repository URIs, where the artifacts are stored. Verify the signing artifact is stored in one of the listed repositories. If not, add the missing repository URI in `registryScopes`, or you can add a new trust policy for the missing repository.

The repository URI is in the format of `${registry-name}/${namespace}/${repository-name}`. For example, if the artifact to be verified is `registry.acme-rockets.io/software/net-monitor@sha256:xxx`, then the value for `registryScopes` should be `registry.acme-rockets.io/software/net-monitor`.

The following values are not correct:

- `registry.acme-rockets.io`
- `registry.acme-rockets.io/software`

{{% alert title="Important" color="primary" %}}
Wildcards are not supported in `registryScopes` property. Each repository URI should be listed explicitly.
{{% /alert %}}

## When I verify an artifact, I get the error 'malformed trustpolicy.json file'

This is usually an encoding problem of `trustpolicy.json` file. Notation expects `utf-8 without BOM` or `ascii` encoding for `trustpolicy.json` file.

Windows PowerShell (prior to v6) uses the Unicode `UTF-16LE` encoding by default, and `utf-8 without BOM` is not supported. If you are building `trustpolicy.json` file in Windows PowerShell (prior to v6), make sure you change the file encoding to `ascii`.

## When I verify an artifact, I get the error 'Failed to unmarshal the payload content in the signature blob to envelope.Payload'

This is usually an encoding problem of payload content in the signature envelope. Notary signatures can be produced by different tools per [signature specification](https://github.com/notaryproject/notaryproject/blob/v1.0.0-rc.2/specs/signature-specification.md). The payload content is a `JSON` document defined in the signature specification, and the encoding should be `utf-8 without BOM` or `ascii`.

Windows PowerShell (prior to v6) uses the Unicode `UTF-16LE` encoding by default, and `utf-8 without BOM` is not supported. If you are building payload content in Windows PowerShell (prior to v6), make sure you change the payload content encoding to `ascii`.