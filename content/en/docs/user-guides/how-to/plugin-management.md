---
title: Install and manage notation plugins
description: Install and manage notation plugins
weight: 4
---

Plugins for `notation` provide functionality and integration with key stores and signing services. For example:
- The [notation-azure-kv](https://github.com/Azure/notation-azure-kv) plugin allows you to sign a Notation-generated payload with a private key in [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview?wt.mc_id=azurelearn_inproduct_oss_notaryproject).
- The [AWS Signer plugin for Notation](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html) lets you sign and verify images using Notation with keys and certificates managed by [AWS Signer](https://docs.aws.amazon.com/signer/latest/developerguide/Welcome.html), a signing service.

## Install a plugin

To install a plugin, download the plugin binary, create a `{plugin-name}` directory in `{NOTATION_LIBEXEC}/plugins/`, and add the plugin binary to that directory. Alternatively, if you are using an application that bundles a plugin and the `notation` binary together, such as [AWS Signer](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html), see the installation instructions from the vendor.

{{% alert title="Warning" color="warning" %}}
Before creating the `{plugin-name}` directory, confirm you are using a name that follows the [naming structure](#plugin-naming-structure) for plugins. Plugins that do not follow the naming structure will not be recognized by `notation`.
{{% /alert %}}

The following example downloads and installs version 0.6.0 of [notation-azure-kv](https://github.com/Azure/notation-azure-kv) plugin for on macOS with Apple Silicon using the default location for the Notation installation.

{{% alert title="Warning" color="warning" %}}
The following example only works for version 0.6.0 of the *notation-azure-kv* plugin on macOS with Apple Silicon using the default location for the Notation installation. You will need to update the filenames, location, and commands for other plugins, versions, and platforms. For more details on the default location of that directory on each platform, see [Notation directory structure for system configuration]({{< ref "/docs/user-guides/how-to/directory-structure.md" >}}).
{{% /alert %}}

```console
curl -Lo notation-azure-kv_0.6.0_darwin_arm64.tar.gz "https://github.com/Azure/notation-azure-kv/releases/download/v0.6.0/notation-azure-kv_0.6.0_darwin_arm64.tar.gz"
mkdir -p ~/Library/Application\ Support/notation/plugins/azure-kv
tar xvzf notation-azure-kv_0.6.0_darwin_arm64.tar.gz -C ~/Library/Application\ Support/notation/plugins/azure-kv notation-azure-kv
```

To confirm you plugin is installed, run `notation plugin list`. For example:

```console
notation plugin list
```

Confirm the plugin is listed in the output. For example:

```console
$ notation plugin list
NAME                                 DESCRIPTION                                   VERSION   CAPABILITIES                                                             ERROR
azure-kv                             Sign artifacts with keys in Azure Key Vault   0.6.0     [SIGNATURE_GENERATOR.RAW]                                                                     <nil>
com.amazonaws.signer.notation.plugin AWS Signer plugin for Notation                1.0.290   [SIGNATURE_GENERATOR.ENVELOPE SIGNATURE_VERIFIER.TRUSTED_IDENTITY SIGNATURE_VERIFIER.REVOCATION_CHECK] <nil>
```

## Uninstall a plugin

To remove a plugin, delete the entire `{NOTATION_LIBEXEC}/plugins/{plugin-name}/` directory.

To confirm your plugin is uninstalled, run `notation plugin list`. For example:

```console
notation plugin list
```

## Plugin naming structure

The `notation` CLI strictly follows the [Notary Project specification for plugins](https://github.com/notaryproject/specifications/blob/main/specs/plugin-extensibility.md#plugin-mechanism). This includes the naming structure for the plugin binary and the plugin directory. All plugins must be named `notation-{plugin-name}` and placed in the `{NOTATION_LIBEXEC}/plugins/{plugin-name}/` directory. Also, you can't modify the filename of the plugin binary from the `tar.gz` file when installing a plugin.

For example, the full path to the [notation-azure-kv](https://github.com/Azure/notation-azure-kv) plugin is `{NOTATION_LIBEXEC}/plugins/azure-kv/notation-azure-kv`.

If the plugin name or plugin directory does not match the naming structure or the plugin name is altered, `notation` will not recognize the plugin.

## Security best practices for plugins

Plugins are binaries that run on your host and can receive sensitive information from `notation` such as signatures, private keys, and payload data. As a result, it is strongly recommended that you follow these security best practices when using plugins:

- Ensure that you only download plugins and their checksums from known, trusted sources
- When available, use checksum verification or signature verification to confirm the plugin binary is not corrupted

## Available plugins

The following plugins are currently available for `notation`:

- [AWS Signer](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html) plugin for Notation. For more details on using this plugin for sign and verify images, see [Notation with AWS Signer](https://aws.amazon.com/blogs/containers/announcing-container-image-signing-with-aws-signer-and-amazon-eks/)
- [notation-azure-kv](https://github.com/Azure/notation-azure-kv). For more details on using this plugin, see [Sign a Notation-generated payload with a certificate in Azure Key Vault](https://learn.microsoft.com/azure/container-registry/container-registry-tutorial-sign-build-push?wt.mc_id=azurelearn_inproduct_oss_notaryproject).