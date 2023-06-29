---
title: "Securely develop plugins for Notation"
description: "Best practices for securely developing and distributing plugins for Notation"
type: docs
weight: 2
---

{{% alert title="Important" color="important" %}}
Best practices for developing and distributing plugins for Notation are covered in the [Notary Project specification for plugins](https://github.com/notaryproject/notaryproject/blob/main/specs/plugin-extensibility.md). Carefully review that specification before developing and distributing plugins for Notation.

The following guidance is not a substitute for the Notary Project specification for plugins. It is intended to highlight key security considerations for developing and distributing plugins for Notation.
{{% /alert %}}

## General security guidance

In general when developing your plugin, ensure you strictly adhere to the [Notary Project specification for plugins](https://github.com/notaryproject/notaryproject/blob/main/specs/plugin-extensibility.md).

Plugins run as a binary and are invoked by Notation. This means that the plugin has access to the same resources as the user running Notation. This includes access to the filesystem, network, and other resources. Ensure you are only accessing resources that are required for your plugin to function.

In some cases, your plugin may have access to sensitive data such as private keys. Ensure that you are not leaking this data to the filesystem, network, or other resources, including `stdout` and `stderr`.

If using the `pluginConfig` key/value store, do not store sensitive data in as the data is not encrypted and is stored as plaintext.

## Securely distributing plugins

Ensure that you are distributing your plugin from a secure location and over a secure channel. For example, using a website or server you control and using HTTPS. If you are using a public repository, ensure it is a known, reputable repository that uses HTTPS, such as GitHub.

It is strongly recommended that you provide some way for users to verify the integrity of the plugin binary, such as providing a checksum or signature. This allows users to verify that the plugin binary has not been corrupted or tampered with.
