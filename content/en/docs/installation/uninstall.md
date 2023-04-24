---
title: Uninstall the notation CLI and its configuration
description: Uninstall the notation CLI, plugins, and configuration files
weight: 2
---

The `notation` CLI uses the following directories for its binaries and configuration files:

- `NOTATION_BIN` is the directory for the `notation` binary.
- `NOTATION_LIBEXEC` is the directory for other binaries, such as plugins, used by the `notation`.
- `NOTATION_CONFIG` is the directory for the configuration files, including trust stores and trust policies.

{{% alert title="Important" color="info" %}}
`notation` has default values for `NOTATION_BIN`, `NOTATION_LIBEXEC`, or `NOTATION_CONFIG`, but `notation` does not set those environment variables. These environment variables are optional, but if you wish to override the default values, you can set them to another value. For more details on each directory as well as the default location of those directories on each platform, see [Notation directory structure for system configuration]({{< ref "/docs/concepts/directory-structure" >}}).
{{% /alert %}}

## Remove the notation CLI

Delete the `NOTATION_BIN` directory to remove the `notation` binary.

## Remove the additional binaries

Delete the `NOTATION_LIBEXEC` directory to remove the additional binaries, including plugins.

## Remove the configuration files

{{% alert title="Important" color="info" %}}
 `notation` automatically creates the `NOTATION_CONFIG` directory if it does not exist. If you remove the `NOTATION_CONFIG` directory, `notation` will recreate the directory the next time you run a command.
{{% /alert %}}

Delete the `NOTATION_CONFIG` directory to remove the configuration files.

## Remove the test key and self-signed certificate

You can generate a sample test key and self-signed certificate using `notation cert generate-test`. For example:

```console
notation cert generate-test --default "wabbit-networks.io"
```

At this time, that key and self-signed certificate files can't be removed using `notation key delete` and `notation cert delete`. To remove this key and self-signed certificate files, remove the key from the signing list and certificate from the trust store using `notation key delete` and `notation cert delete`, then manually delete the key and certificate files.

Use `notation key ls` to show the location of the key and certificate files. For example:

```console
notation key ls
NAME                   KEY PATH                                           CERTIFICATE PATH                                 ID   PLUGIN NAME
* wabbit-networks.io   NOTATION_CONFIG/localkeys/wabbit-networks.io.key   NOTATION_CONFIG/localkeys/wabbit-networks.io.crt
```

Use `notation key delete` to remove the key from the signing list. For example:

```console
notation key delete wabbit-networks.io
```

Remove the key file using the path from `notation key ls`. For example:

```console
rm NOTATION_CONFIG/localkeys/wabbit-networks.io.key
```

Use `notation cert delete` to remove the certificate reference from the trust store. For example:

```console
notation cert delete --type ca --store wabbit-networks.io wabbit-networks.io.crt
```

Remove the certificate file using the path from `notation key ls`. For example to remove certificate file in BASH:

```console
rm NOTATION_CONFIG/localkeys/wabbit-networks.io.crt
```
