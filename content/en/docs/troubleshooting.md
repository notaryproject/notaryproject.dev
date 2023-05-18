---
title: "Troubleshooting"
description: "Troubleshooting common problems with Notary"
type: docs
weight: 7
---

{{% alert title="Important" color="primary" %}}
To suggest a troubleshooting item, [create a pull request PR with your suggested item](https://github.com/notaryproject/notaryproject.dev/edit/main/content/en/docs/troubleshooting.md)
{{% /alert %}}


## How do I troubleshoot issues with signatures?

Inspect the descriptor of a remote artifact sent for signing using  `oras manifest fetch`. For example:

```console
$ oras manifest fetch --descriptor IMAGE:TAG
{"mediaType":"...","digest":"sha256:...","size":...}
```

Confirm the details, such as the *mediaType* and *digest* match the details of the artifact sent for signing.

Inspect the signatures of a remote artifact using `notation inspect` with the digest value for the artifact. For example:

```console
$ notation inspect IMAGE@sha256:111222333444555666777888999000aaaabbbbcccddddeeeeffff00011122233

Inspecting all signatures for signed artifact
IMAGE@sha256:111222333444555666777888999000aaaabbbbcccddddeeeeffff00011122233
└── application/vnd.cncf.notary.signature
    ├── sha256:febdbbf995cb87d48d9e0b9bd39095145a3f253b0d724e3c7a6457eb22a0a793
    │   ├── media type: application/jose+json
    │   ├── signature algorithm: RSASSA-PSS-SHA-256
    │   ├── signed attributes
    │   │   ├── signingScheme: notary.x509
    │   │   ├── signingTime: Fri Apr 28 10:05:17 2023
    │   │   └── expiry: Mon Jan  1 00:00:00 0001
    │   ├── user defined attributes
    │   │   └── (empty)
    │   ├── unsigned attributes
    │   │   └── signingAgent: Notation/1.0.0
    │   ├── certificates
    │   │   └── SHA1 fingerprint: ee0201aff38dbd0305672501db781c953a3f2151
    │   │       ├── issued to: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
    │   │       ├── issued by: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
    │   │       └── expiry: Sat Apr 29 15:05:03 2023
    │   └── signed artifact
    │       ├── media type: application/vnd.oci.image.index.v1+json
    │       ├── digest: sha256:111222333444555666777888999000aaaabbbbcccddddeeeeffff00011122233
    │       └── size: 855
    └── sha256:dce2af55117bc6981e749aa8cf17b52f2747839bb252d4dba75ad429a55cb286
        ├── media type: application/cose
        ├── signature algorithm: RSASSA-PSS-SHA-256
        ├── signed attributes
        │   ├── signingScheme: notary.x509
        │   ├── signingTime: Fri Apr 28 10:05:32 2023
        │   └── expiry: Mon Jan  1 00:00:00 0001
        ├── user defined attributes
        │   └── (empty)
        ├── unsigned attributes
        │   └── signingAgent: Notation/1.0.0
        ├── certificates
        │   └── SHA1 fingerprint: ee0201aff38dbd0305672501db781c953a3f2151
        │       ├── issued to: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       ├── issued by: CN=wabbit-networks.io,O=Notary,L=Seattle,ST=WA,C=US
        │       └── expiry: Sat Apr 29 15:05:03 2023
        └── signed artifact
            ├── media type: application/vnd.oci.image.index.v1+json
            ├── digest: sha256:111222333444555666777888999000aaaabbbbcccddddeeeeffff00011122233
            └── size: 855
```

The output contains all the certificate information used for signing the artifact. You can use this information to validate the signing certificates and certificate chain.

The output also contains details about the artifact that was signed, such as the digest. You can use this information to confirm the correct artifact was signed.


## Enabling notation CLI commands logging

Enabling a more detailed logging using `--verbose` can help troubleshoot issues with the notation CLI. Using `--verbose` or `-v` gives more detailed output for the notation CLI commands that can be used for troubleshooting.

When running a notation CLI command, use the `--verbose` flag to enable verbose logging. For example:

```shell
notation verify --verbose localhost:5000/net-monitor@sha256:sha256:xxx
```

In addition, there is `--debug`, which is intended for developers to debug the notation CLI. It is not recommended to use `--debug` for end-user troubleshooting.

## When I verify an artifact, I get the error 'Error: open $HOME/.config/notation/trustpolicy.json: no such file or directory'

This error is likely related to trust policy configuration. Verify you have a trust policy set up before you attempt to verify an artifact. For more details, see [Manage trust policies]({{< ref "/docs/how-to/manage-trust-policy" >}}

## When I verify an artifact, I get the error '"$HOME/.config/notation/truststore/x509/ca/mytruststore" does not exist'

This error indicates the trust store doesn't exist or the trust store name is not correct. Trust store typically contains a set of certificate files, where the trust identities are retrieved to verify signatures. You can use `notation cert add` to add trust stores.

The above error shows the type of trust store is `ca`, and the trust store name is `mytruststore`. 

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