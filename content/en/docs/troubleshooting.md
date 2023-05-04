---
title: "Troubleshooting"
description: "Troubleshooting common problems with Notary"
type: docs
weight: 7
---

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
