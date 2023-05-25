---
title: Notation v1.0.0-RC.3 is available!
author:  "Notation Release Team"
date: 2023-03-08
draft: false
---

The Notation maintainers are pleased to announce the release of Notation CLI v1.0.0-RC.3. This blog walks you through the major updates of this release.

## What's new

This release introduces a change to how signatures are stored in the registries to align with the OCI direction to use image manifest. The default type of signature manifest is changed to image manifest. The flag `--signature-manifest` for `notation sign` command is experimental for users who want to store signatures using artifact manifest. This change does not impact the validation of signatures.

Signing experience is continuously improved in this release. Less configuration steps were required before users run `notation sign` command.

### About signature manifest

The signature is stored associated with signed artifacts in the OCI conformant registry. Since this release, the default type of signature manifest is changed from artifact manifest to [image manifest](https://github.com/opencontainers/image-spec/blob/v1.1.0-rc2/manifest.md). The signatures of the artifacts signed by previous releases of Notation (v1.0.0-RC.1 and v1.0.0-RC.2) can still be validated using the new release.

Users can still store signatures using artifact manifest by using an experimental flag `--signature-manifest`, for example:

```console
notation sign --signature-manifest artifact localhost:net-monitor@sha256:xxx
```

There are no changes on signature verification. Use `notation verify` command as usual, for example:

```console
notation verify localhost:net-monitor@sha256:xxx
```

Image manifest is commonly supported by a wide range of registries in the market. Users are strongly recommended to update to this release for using image manifest by default.

### Sign artifacts using on-demand keys

This release introduces a new experience of signing artifacts using on-demand keys. Here are the steps of signing:

1. Create a private key and get the key identity from the Key Management System (KMS)
2. Sign artifacts with a single command, for example:

   ```console
   notation sign --id <key_id> --plugin <KMS_plugin> localhost:5000/net-monitor@sha256:xxx
   ```

Now users can pass the signing key to the `notation sign` command directly. This experience reduces the number of configuration steps required to setup signing.

## Credits

We would like to specially thank the Notation maintainers, contributors, and the broader Notation community for helping us throughout the release process with timely feedback, reviews, community testing and for all your support to help ensure a timely release. Sending credits to the following contributors who made great contributions to RC.3.

- [@FeynmanZhou](https://github.com/FeynmanZhou)
- [@JeyJeyGao](https://github.com/JeyJeyGao)
- [@kody-kimberl](https://github.com/kody-kimberl)
- [@priteshbandi](https://github.com/priteshbandi)
- [@patrickzheng200](https://github.com/patrickzheng200)
- [@shizhMSFT](https://github.com/shizhMSFT)
- [@vaninrao10](https://github.com/vaninrao10)
- [@yizha1](https://github.com/yizha1)

## Download and give it a try

Follow this [hands-on guide](https://notaryproject.dev/docs/quickstart/) to get started.
