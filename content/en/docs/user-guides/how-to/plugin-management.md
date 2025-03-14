---
title: Install and manage notation plugins
description: Install and manage notation plugins
weight: 4
---

Plugins for `notation` provide functionality and integration with key stores and signing services. For example:
- The [notation-azure-kv](https://github.com/Azure/notation-azure-kv) plugin allows you to sign a Notation-generated payload with a private key in [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview?wt.mc_id=azurelearn_inproduct_oss_notaryproject).
- The [AWS Signer plugin for Notation](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html) lets you sign and verify images using Notation with keys and certificates managed by [AWS Signer](https://docs.aws.amazon.com/signer/latest/developerguide/Welcome.html), a signing service.
- The [Venafi CodeSign Protect plugin for Notation](https://github.com/Venafi/notation-venafi-csp) enables the secure signing and verification of images using the [Venafi CodeSign Protect](https://venafi.com/codesign-protect/) platform.

## Install a plugin

To install a plugin, run the `notation plugin install` command to directly install a plugin either from a URL or from the host file system. This will create a `{plugin-name}` directory in `{NOTATION_LIBEXEC}/plugins/` if the directory does not exist. The supported plugin file formats are `.zip, .tar.gz` and `single plugin executable file`. Alternatively, if you are using an application that bundles a plugin and the `notation` binary together, such as [AWS Signer](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html), see the installation instructions from the vendor.

{{% alert title="Warning" color="warning" %}}
Before creating the `{plugin-name}` directory, confirm you are using a name that follows the [naming structure](#plugin-naming-structure) for plugins. Plugins that do not follow the naming structure will not be recognized by `notation`.
{{% /alert %}}

## Usage

Remember to replace the variables below with the desired plugin version and checksum.

### Install a plugin from file system:

`notation plugin install --file <file_path>`

### Install a plugin from URL: 

`notation plugin install --sha256sum <digest> --url <HTTPS_URL>`

{{% alert title="plugin" color="info" %}}
The following examples show how to install each plugin on a Linux AMD64 machine. To install a plugin on other operating systems and architectures, please get the URL or plugin binary file from plugin vendors' website.
{{% /alert %}}

## Install Notation AWS Signer plugin

To find out more about the AWS Signer plugin, please refer to their official [documentation](https://docs.aws.amazon.com/signer/latest/developerguide/image-signing-prerequisites.html).

### Install from file system

```console
wget https://d2hvyiie56hcat.cloudfront.net/linux/amd64/plugin/latest/notation-aws-signer-plugin.zip
```

```console
notation plugin install --file notation-aws-signer-plugin.zip
```

Here is the sample output:

```console
Successfully installed plugin com.amazonaws.signer.notation.plugin, version 1.0.298
```

Upon successful execution, the plugin is copied to Notation's plugin directory.

## Install Notation Azure Key Vault Plugin

To find out more about the Azure Key Vault Plugin, please refer to this [GitHub repository](https://github.com/Azure/notation-azure-kv).

### Install from URL:

```console
notation plugin install --url https://github.com/Azure/notation-azure-kv/releases/download/${VERSION_AKV_PLUGIN}/notation-azure-kv_${VERSION_AKV_PLUGIN}_linux_amd64.tar.gz --sha256sum ${SHA256SUM_AKV_PLUGIN}
```

Here is the sample output:

```console
Downloading plugin from https://github.com/Azure/notation-azure-kv/releases/download/${VERSION_AKV_PLUGIN}/notation-azure-kv_${VERSION_AKV_PLUGIN}_linux_amd64.tar.gz
Download completed
Successfully installed plugin azure-kv, version ${VERSION_AKV_PLUGIN}
```

### Install from local file:

```console
notation plugin install --file notation-azure-kv_${VERSION_AKV_PLUGIN}_linux_amd64.tar.gz
```

Here is the sample output:

```
Successfully installed plugin azure-kv, version ${VERSION_AKV_PLUGIN}
```

## Install Notation Venafi Plugin

To find out more about the Venafi Plugin, please refer to this [GitHub repository](https://github.com/Venafi/notation-venafi-csp).

### Install from URL:

```console
notation plugin install --url https://github.com/Venafi/notation-venafi-csp/releases/download/${VERSION_VENAFI_PLUGIN}/notation-venafi-csp-linux-amd64.tar.gz --sha256sum ${SHA256SUM_VENAFI_PLUGIN}
```

Here is the sample output:

```console
Successfully installed plugin venafi-csp, version ${VERSION_VENAFI_PLUGIN}
```

### Install from local file:

```console
notation plugin install --file notation-venafi-csp-linux-amd64.tar.gz
```

Here is the sample output:

```console
Successfully installed plugin venafi-csp, version ${VERSION_VENAFI_PLUGIN}
```

To confirm you plugin is installed, run `notation plugin list`. For example:

```console
notation plugin list
```

Confirm the plugin is listed in the output. A sample output is as follows:

```console
notation plugin list
```

Here is the sample output:

```
NAME                                 DESCRIPTION                                           VERSION          CAPABILITIES                                                             ERROR


azure-kv                             Sign artifacts with keys in Azure Key Vault           1.0.2            [SIGNATURE_GENERATOR.RAW]                                                                     <nil>
com.amazonaws.signer.notation.plugin AWS Signer plugin for Notation                        1.0.298          [SIGNATURE_GENERATOR.ENVELOPE SIGNATURE_VERIFIER.TRUSTED_IDENTITY SIGNATURE_VERIFIER.REVOCATION_CHECK] <nil>
venafi-csp                           Sign artifacts with keys in Venafi CodeSign Protect   0.3.2-release    [SIGNATURE_GENERATOR.ENVELOPE SIGNATURE_VERIFIER.TRUSTED_IDENTITY] <nil>
```

## Uninstall a plugin
To uninstall a plugin, use `notation plugin uninstall`.

```console
notation plugin uninstall <plugin_name>
```

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
- [Venafi CodeSign Protect](https://github.com/Venafi/notation-venafi-csp) plugin for Notation that leverages the [Venafi CodeSign Protect](https://venafi.com/codesign-protect/) platform.  For more details on using this plugin, see the usage [instructions](https://github.com/Venafi/notation-venafi-csp/blob/main/README.md).