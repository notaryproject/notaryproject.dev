---
title: "Customize the Notation configuration file"
description: "How to customize Notation configuration in differenct OS platforms"
type: docs
weight: 4
---

This guide demonstrates how to customize the Notation system configuration in `config.json` and signing key in `signingkeys.json` respectively. By default, you don't need to create or modify them since Notation has default system settings and signing key configuration unless you want to customize them. 

## Location

The configuration file `config.json` location is different per operating system. `signingkeys.json` will be generated and stored in the same directory with `config.json`. You can use the Notation CLI or libraries to alter locations through the `XDG_CONFIG_HOME` environment variable.

> Note: You can find the details of Notation directory structure for system configuration in this [guide]({{< ref "/docs/tutorials/directory-structure" >}}).

### Linux

`config.json` should be mannually created and placed in `~/.config/notation/config.json`. 

### Windows

`config.json` should be mannually created and placed in in `C:/Users/exampleuser/AppData/Roaming/notation/config.json`.

### Darwin 

`config.json` should be mannually created and placed in in `~/Users/exampleuser/Library/Application Support/notation/config.json`.

## Sample of config.json

You can follow the example below to customize the Notation configuration in `config.json`

```json
{
    "credsStore": "pass",
    "credHelpers": {
        "registry.io": "pass"
    },
    "signatureFormat": "jws",
    "insecureRegistries": [
        "registry.wabbit-networks.io"
    ]
}
```

This table exlains the properties in `config.json`. 

| Property | Type | Value |
| --- | --- | ---|
| `credsStore` | _string_  | default trust store name. Notation will read the configuration from Docker Credential Store by default unless you configure this filed in `config.json` |
| `credHelpers`  | _string_ | a registry host name address to trust store name map. Notation will read the configuration from Docker Credential Store by default unless you configure this filed in `config.json` |
| `signatureFormat`  | _string_ |  define the signature envelope format, support jws or cose  |
| `insecureRegistries` | _array_  | a list of registries that may be used without https  |

## Sample of signingkeys.json

The `signingkeys.json` will generated as the following example:

```json
{
    "default": "wabbit-networks",
    "keys": [
        {
            "name": "wabbit-networks",
            "keyPath": "/home/demo/.config/notation/localkeys/wabbit-networks.key",
            "certPath": "/home/demo/.config/notation/localkeys/wabbit-networks.crt"
        },
        {
            "name": "import.acme-rockets",
            "keyPath": "/home/demo/.config/notation/localkeys/import.acme-rockets.key",
            "certPath": "/home/demo/.config/notation/localkeys/import.acme-rockets.crt"
        }
    ]
}
```

This table exlains the properties in `signingkeys.json`. 

| Property | Type | Value |
| --- | --- | ---|
| `signingKeys.default` | _string_ | the signing key to be used when `notation sign` is called without `--name`   |
| `signingKeys.keys` | _array_  | a collection of name/value pairs of signing keys.   |
| `key.name` | _string_ | a named reference to the key      |
| `key.keyPath` | _string_ | a location by which the key can be found by the notation cli or notation libraries   |
| `key.certPath`| _string_ | a location by which the paired certificate can be found by the notation cli or notation libraries |

