---
title: Notary Project announces Notation v1.1.0!
author:  "Notary Project Release Team"
date: 2024-02-08
draft: false
---

The Notary Project maintainers are proud to announce new releases for its sub-projects, including [Notary Project specifications v1.1.0](https://github.com/notaryproject/specifications/releases/tag/v1.1.0), [notation v1.1.0](https://github.com/notaryproject/notation/releases/tag/v1.1.0), [notation-go v1.1.0](https://github.com/notaryproject/notation-go/releases/tag/v1.1.0), and [notation-core-go v1.0.2](https://github.com/notaryproject/notation-core-go/releases/tag/v1.0.2), [Notation GitHub Actions v1.0.1](https://github.com/notaryproject/notation-action/releases/tag/v1.0.1) which are ready for production use! 

Meanwhile, a new library [notation-plugin-framework-go
](https://github.com/notaryproject/notation-plugin-framework-go) released the first minor release v1.1.0. It contains framework required to create notation plugins as per [Notary Project specifications](https://github.com/notaryproject/specifications). 

## Notable Capabilities in this Release

Here are some of the major capabilities and features included in this release.

### Easier plugin management functionalities

Notation has an [extensible design based on a plugin framework](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/plugin-extensibility.md). This framework provides plugin interfaces for users and vendors to implement their own integration with key/certificate management solutions or signing services. 

In this release, Notation offers Notation plugin management capabilities to simplify the plugin user experience.  

- Added new command `notation plugin install`. Users are now able to install a notation plugin directly from a URL or from their file system. Supported plugin installation formats are `.zip`, `.tar.gz`, and single plugin executable file. See an example usage below:

```bash
$ notation plugin install --file <file_path>
```

```bash
$ notation plugin install --sha256sum <digest> --url <HTTPS_URL>
```

- Added new command `notation plugin uninstall`. Users are now able to uninstall a notation plugin by providing the plugin name. See an example usage below:

```bash
notation plugin uninstall <plugin_name>
```

The following plugins have been well tested with Notation plugin commands by Notary Project maintainers:

- [AWS Signer plugin for Notation](https://docs.aws.amazon.com/signer/latest/developerguide/Welcome.html)
- [Azure Key Vault for Notation](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tutorial-sign-build-push)
- [Venafi CodeSign Protect Signing Plugin for Notation](https://github.com/Venafi/notation-venafi-csp)

### Specifications

For plugin vendors who want to package and distribute a Notation plugin,  [Notation Plugin specification](https://github.com/notaryproject/specifications/blob/v1.1.0/specs/plugin-extensibility.md) defines the plugin conventions to ensure plugins are delivered in a consistent format and compatible with `notation plugin` management commands.

### Get started with Notation v1.1.0

You can follow this [quick start](https://notaryproject.dev/docs/quickstart/) to try Notation v1.1.0 on your terminal.

The default Notation CLI setup action in Notation GitHub Actions has also been updated to v1.1.0. It enables users to install Notation and its plugin, sign and verify OCI artifacts in GitHub Actions workflow with ease.

To get started with Notation v1.1.0 in a CI/CD workflow, you can find the Notation GitHub Actions in the [Marketplace](https://github.com/marketplace/actions/notation-actions). 

## What's next

The Notary Project maintainers are considering the following features for future milestones. Feel free to reach out on the [Slack channel](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) or [GitHub issues](https://github.com/notaryproject/.github/issues) to ask questions, provide feedback, or share ideas.

- Sign and verify arbitrary blobs
- Timestamping support
- Improve error messages and verbose logs

And more!

## Acknowledgements

The Notary Project release team wants to thank the entire Notary Project community for all the activity and engagement that has been vital for helping the project grow and reach this major milestone.