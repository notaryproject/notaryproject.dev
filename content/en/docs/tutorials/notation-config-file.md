---
title: "Notation Configuration"
description: "How to configure Notation in differenct OS platforms"
type: docs
weight: 4
---

To enable persisted configuration, simplifying the execution of the `notation` CLI, the following configuration file will be available

> Note: there will be a policy based configuration in Notation 0.12.0-Beta.1.

## Location

The default location and configuration file is different in multiple OS environments as follows. You can Notation CLI or libraries to alternate locations through the `XDG_CONFIG_HOME` environment variable.

> Note: You can find the details of Notation directory structure for system configuration in this [guide]({{< ref "/docs/tutorials/directory-structure" >}}).

### Linux

The default location and file will be stored at: `~/.config/notation/config.json`. 

### Windows

The default location and file will be stored at: `C:/Users/AppData/Roaming/notation/config.json`.

### Darwin 

The default location and file will be stored at: `~/Users/exampleuser/Library/Application Support/notation/config.json`.

## Properties

| Property                  | Type     | Value                                                                                                                                                     |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `credsStore` | _string_  | default trust store name. |
| `credHelpers`  | _string_ | a registry host name address to trust store name map                  |
| `signatureFormat`               | _string_ |  define the signature envelope format, support jws or cose  |
| `signingKeys.default`     | _string_ | the signing key to be used when `notation sign` is called without `--name`                                                                                |
| `signingKeys.keys`        | _array_  | a collection of name/value pairs of signing keys.                                                                                                         |
| `key.name`                | _string_ | a named reference to the key                                                                                                                              |
| `key.keyPath`             | _string_ | a location by which the key can be found by the notation cli or notation libraries                                                                        |
| `key.certPath`            | _string_ | a location by which the paired certificate can be found by the notation cli or notation libraries                                                         |
| `insecureRegistries`      | _array_  | a list of registries that may be used without https                                                                                                       |

## Samples

See the a sample configuration in a Linux environment: `~/.config/notation/config.json`. 

```json
{
    "credsStore": "pass",
    "credHelpers": {
    "registry.io": "pass"
    },
    "insecureRegistries": [
        "registry.wabbit-networks.io"
    ]
}
```

`~/.config/notation/signingkeys.json`

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