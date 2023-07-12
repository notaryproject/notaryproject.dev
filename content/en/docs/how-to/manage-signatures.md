---
title: "Manage signatures"
description: "How to list, inspect, and delete a signature on an artifact"
type: docs
weight: 10
---

{{% alert title="Important" color="important" %}}
When managing signatures on artifacts in remote repositories that require authentication, you must authenticate using `notation login` before you can manage signatures on artifacts in those repositories. For more information, see [Authenticate to a remote repository]({{< ref "/docs/how-to/registry-authentication" >}}).
{{% /alert %}}

## List signatures on an artifact

Use `notation list` to show the signatures associated with an artifact.

{{% alert title="Important" color="important" %}}
When using `notation list`, use the fully qualified artifact reference, including the digest. For example, `localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445`. You can use `notation list` with a tag, for example, `localhost:5001/net-monitor:latest`. Using a tag is not recommended since a tag is mutable and may be updated to point to a different version of the artifact. A digest is not mutable and always points to the same version of the artifact.

To find the digest of an artifact, use `notation list` with the artifact reference. For example, `notation list localhost:5001/net-monitor:v1`. You can also use `oras manifest fetch --descriptor` on OCI registries. For example, `oras manifest fetch --descriptor REGISTRY/IMAGE:TAG`.
{{% /alert %}}

```console
IMAGE=localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
notation list $IMAGE
```

The following example shows an artifact with one signature:

```output
$ notation list $IMAGE
localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
└── application/vnd.cncf.notary.v2.signature
    └── sha256:ba3a68a28648ba18c51a479145fca60d96b43dc96c6ab22f412c89ac56a9038b
```

## Inspect a signature on an artifact

Use `notation inspect` to inspect the signatures of an artifact. For example:

```console
$ notation inspect $IMAGE

Inspecting all signatures for signed artifact
localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
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
    │       ├── digest: sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
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
            ├── digest: sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
            └── size: 942
```

The output contains all the certificate information used for signing the artifact. You can use this information to validate the signing certificates and certificate chain.

The output also contains details about the artifact that was signed, such as the digest. You can use this information to confirm that the correct artifact was signed.


## Delete a signature on an artifact

Use `notation list` to list signatures associated with an artifact. For example:

```console
notation list $IMAGE
localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
└── application/vnd.cncf.notary.signature
    └── sha256:fffeeedddcccbbbbaaa000999888777666555444333222111000fff000eee0000
```

In the above example, the digest of the signature is `sha256:fffeeedddcccbbbbaaa000999888777666555444333222111000fff000eee0000`.

Use the [oras](https://oras.land/docs/CLI/installation) CLI to delete the signature with `oras manifest delete`. For example:

```console
oras manifest delete --distribution-spec v1.1-referrers-tag localhost:5001/net-monitor@sha256:fffeeedddcccbbbbaaa000999888777666555444333222111000fff000eee0000
Are you sure you want to delete the manifest "sha256:fffeeedddcccbbbbaaa000999888777666555444333222111000fff000eee0000" and all tags associated with it? [y/N] y
Deleted localhost:5001/net-monitor@sha256:fffeeedddcccbbbbaaa000999888777666555444333222111000fff000eee0000
```

Confirm that the signature is deleted with `notation list`. For example:

```console
notation list $IMAGE
localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445 has no associated signature
```

The above example shows that the only signature associated with the artifact is deleted.