---
title: Notation v1.0.0-RC.4 is available!
author:  "Notation Release Team"
date: 2023-04-21
draft: false
---

The Notation maintainers are pleased to announce the release of Notation CLI v1.0.0-rc.4, notation-go v1.0.0-rc.4, and notation-core-go v1.0.0-rc.3. This blog walks you through the major updates of this release.

## What's new

This release adds the following significant enhancements:

- Validate Certificate revocation with OSCP
- Support experimental features
- Introduce new CLI command `notation policy` for managing trust policy configuration
- Support OCI distribution referrers API
- Introduce experimental feature of signing and verifying images as OCI image layout

### Validate Certificate revocation with OSCP

### Support experimental features

Experimental features are intended for testing and evaluation purposes only and should not be used in production environments. You can now enable experimental features in Notation CLI by setting the `NOTATION_EXPERIMENTAL` environment variable to `1`. Here's an example of how to set the environment variable in Linux or macOS:

```shell
export NOTATION_EXPERIMENTAL=1
```

And here's an example of how to set the environment variable in Windows PowerShell:

```powershell
$env:NOTATION_EXPERIMENTAL = "1"
```

Once you've set the environment variable, you can use Notation with experimental features enabled. Here is the list of experimental features that Notation introduced:

- Store signatures using artifact manifest (Require Registry support)
- Signing and verifying images as OCI image layout

### Use notation policy command to manage trust policy configuration

To simplify the user experience of managing trust policy configuration, we have introduced two new commands in the v1.0.0-rc.4 release: `notation policy import` and `notation policy show`.

Previously, users had to follow several steps to configure trust policy configuration in a JSON file, save the file with a specific name, ensure the file encoding was utf-8, and put the file in a specific directory that varied across different operating systems. With the `notation policy import` command, users can now import trust policy configuration directly from the JSON file after completing the first step above. Additionally, a health check is performed on the trust policy configuration during import to avoid configuration issues that may arise later. For example:

```shell
notation policy import mypolicy.json
```

The `notation policy show` command allows users to easily view trust policy configuration and redirect the output to a file for sharing, updating, or other purposes. For example:

```shell
notation policy show
```

We will be introducing more commands in future releases. Stay tuned for updates on how we're making it easier for you to manage your trust policy configuration.

### Support OCI distribution 1.1 referrers API

The Referrers API is a new feature added in [OCI distribution spec v1.1-rc.1](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc1/spec.md#listing-referrers), which allows clients to fetch a list of referrers in an efficient and clean manner. In the context of Notation, referrers are signatures that refer to the container image. Since this release, Notation verifies whether the Referrers API is available in the registry when pushing signatures into the registry. If the Referrers API is not available, Notation follows the [fallback procedure](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc1/spec.md#unavailable-referrers-api) and updates the image index pushed to a tag described by the referrers tag schema.

### Sign and verify images as OCI image layout

Typically, images are pushed to registries before they are signed. However, if the registries are compromised, the images you signed could already be tampered with. These images could pass signature verification and be deployed in the production environment. To address this issue, we have introduced an experimental feature that allows users to sign images before pushing them to registries. This is especially valuable if the registries are not within your trust boundaries. The OCI image layout is a standard defined in the [OCI image spec 1.0](https://github.com/opencontainers/image-spec/blob/v1.0/image-layout.md). It is essentially a directory structure that contains files and folders that refer to an OCI image. Here's a glimpse of the experience on Linux, and we will release a tutorial for this feature soon.

```shell
# Enable experimental feature
export NOTATION_EXPERIMENTAL=1
# Create oci image layout as tarball file
docker buildx build . -f Dockerfile -o type=oci,dest=hello-world.tar -t hello-world:v1
# Extract tarball to a directory named hello-world, 
# so that the signatures can be associated with the image
tar -xf ./hello-world.tar -C hello-world
# Sign OCI image layout
notation sign --oci-layout ./hello-world:v1
# List signatures
notation list --oci-layout ./hello-world:v1
```

After signing OCI image layout successfully, you can use tools like [oras](https://oras.land/) to push OCI image layout including signatures from local to remote registries.

```shell
# Use oras CLI to push OCI image layout to remote registries
oras cp --from-oci-layout -r ./hello-world:v1 ghcr.io/$username/hello-world:v1
# List the signature, which is exactly the same as you signed locally
notation list ghcr.io/$username/hello-world:v1
# Verify the image before deployment
notation verify ghcr.io/$username/hello-world:v1
```

Please give it a try and let us know your feedback. We will continue to iterate on it.

## Other updates

- Support username and password prompt using `notation login` command
- Bug fixes

## Credits

We would like to specially thank the Notation maintainers, contributors, and the broader Notation community for helping us throughout the release process with timely feedback, reviews, community testing and for all your support to help ensure a timely release. Sending credits to the following contributors who made great contributions to Notation RC.4.

- [@FeynmanZhou](https://github.com/FeynmanZhou)
- [@JeyJeyGao](https://github.com/JeyJeyGao)
- [@kody-kimberl](https://github.com/kody-kimberl)
- [@ningziwen](https://github.com/ningziwen)
- [@priteshbandi](https://github.com/priteshbandi)
- [@patrickzheng200](https://github.com/patrickzheng200)
- [@qweeah](https://github.com/qweeah)
- [@shizhMSFT](https://github.com/shizhMSFT)
- [@vaninrao10](https://github.com/vaninrao10)
- [@yizha1](https://github.com/yizha1)

## Download and give it a try

Follow this [hands-on guide](https://notaryproject.dev/docs/quickstart/) to get started.
