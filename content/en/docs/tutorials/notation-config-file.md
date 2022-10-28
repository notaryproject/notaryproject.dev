---
title: "Notation Configuration"
description: "How to configure Notation in differenct OS platforms"
type: docs
weight: 4
---

To enable persisted configuration, simplifying the execution of the `notation` cli, the following configuration file will be available

> Note: there will be a policy based configuration that will come at a later point.

## Location

The default location and configuration file is different in multiple OS environments as follows. You can Notation CLI or libraries to alternate locations through the `XDG_CONFIG_HOME` environment variable.

> Note: You can find the details of Notation directory structure for system configuration in this [guide](directory-structure.md).

### Linux

The default location and file will be stored at: `~/.config/notation/config.json`. 

### Windows

The default location and file will be stored at: `C:/Users/AppData/Roaming/notation/config.json`.

### Darwin 

The default location and file will be stored at: `~/Users/exampleuser/Library/Application Support/notation/config.json`.

## Properties

| Property                  | Type     | Value                                                                                                                                                     |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verificationCerts.certs` | _array_  | collection of name/value pairs for a collection of public certs that are used for verification. These may be replaced with a future policy configuration. |
| `cert.name`               | _string_ | a named reference to the certificate                                                                                                                      |
| `cert.path`               | _string_ | a location by which the certificate can be found by the notation cli or notation libraries                                                                |
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
    "verificationCerts": {
        "certs": [
            {
                "name": "wabbit-networks",
                "path": "/home/demo/.config/notation/localkeys/wabbit-networks.crt"
            },
            {
                "name": "import.acme-rockets",
                "path": "/home/demo/.config/notation/localkeys/import.acme-rockets.crt"
            }
        ]
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