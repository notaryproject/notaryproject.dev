---
title: "Delete a signature"
description: "How to delete a signature on an artifact"
type: docs
weight: 5
---



## Delete a signature on an artifact

Use `notation ls` to list signatures associated with an artifact. For example:

```console
notation ls localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
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

Confirm that the signature is deleted with `notation ls`. For example:

```console
notation ls localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445
localhost:5001/net-monitor@sha256:111222333444555666777888999000aaabbbcccdddeeefff0001112223334445 has no associated signature
```

The above example shows that the only signature associated with the artifact is deleted.