---
title: "Notation directory structure for system configuration"
description: "How to configure the directory structure"
type: docs
weight: 7
---

Notation CLI requires local file systems support for the following components. They should be stored in different places per different operating system.

- Notation binary
- Plugins
- Configurations
- Trust stores
- Trust policies
- Signing key store
- Caches

This documentation specifies the recommended directory structure for those components.

## Category

The directories for various components are classified into the following catagories.

| Alias              | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `NOTATION_BIN`     | Directory for executable binaries                                                   |
| `NOTATION_LIBEXEC` | Directory for binaries not meant to be executed directly by users' shell or scripts |
| `NOTATION_CONFIG`  | Directory for configurations                                                        |
| `NOTATION_CACHE`   | Directory for caches, such as Certificate Revocation List (CRL) caches              |


On Unix systems, `notation` follows [XDG Base Directory Specification][XDG] for user level directories. On Windows, [Known Folders][KF] and [App Settings][AS] are followed equivalently. On Darwin, [macOS File System][macOS_FS] with [System Integrity Protection][SIP] is followed equivalently. 

{{% alert title="Note" color="primary" %}}
Default directory paths in Notation 0.12.0-beta.1 only supports user level.
{{% /alert %}}

### User Level

Default directory paths for various operating systems at user level are specified as below.

| Directory          | Unix                        | Windows                   | Darwin                                   |
| ------------------ | --------------------------- | ------------------------- | ---------------------------------------- |
| `NOTATION_LIBEXEC` | `$XDG_CONFIG_HOME/notation` | `%AppData%/notation`      | `~/Library/Application Support/notation` |
| `NOTATION_CONFIG`  | `$XDG_CONFIG_HOME/notation` | `%AppData%/notation`      | `~/Library/Application Support/notation` |
| `NOTATION_CACHE`   | `$XDG_CACHE_HOME/notation`  | `%LocalAppData%/notation` | `~/Library/Caches/notation`              |

On Unix, `$XDG_CONFIG_HOME` is default to `~/.config` and `$XDG_CACHE_HOME` is default to `~/.cache` if XDG environment variables are empty.

There is no default `NOTATION_BIN` path at user level since the `notation` binary can be put anywhere as long as it in the `PATH` environment variable. Common directories on Unix/Darwin are `~/bin` and `~/.local/bin` where manual `PATH` update by users may be required.

## Structure

The overall directory structure for `notation` is summarized as follows.

```
{NOTATION_BIN}
└── notation
{NOTATION_CACHE}
└── crl
    └── {sha256-hash-of-the-CRL-downloading-URL}
{NOTATION_CONFIG}
├── config.json
├── localkeys
│   ├── {key-name}.crt
│   └── {key-name}.pem
├── signingkeys.json
├── trustpolicy.json
└── truststore
    └── {trust-store-type}
        └── {named-store}
            └── {cert-file}
{NOTATION_LIBEXEC}
└── plugins
    └── {plugin-name}
        └── notation-{plugin-name}
```

### Notation Binary

The path for the `notation` binary is as follows.

```console
{NOTATION_BIN}/notation
```

On Windows, the `.exe` extension is required for executables.

```console
{NOTATION_BIN}/notation.exe
```

### Plugin

[Plugins][Plugin] are binaries not meant to be executed directly by users' shell or scripts. The path of a plugin follows the pattern below.

```console
{NOTATION_LIBEXEC}/plugins/{plugin-name}/notation-{plugin-name}
```

On Windows, the `.exe` extension is required for executables.

```console
{NOTATION_LIBEXEC}/plugins/{plugin-name}/notation-{plugin-name}.exe
```

### General Configuration

The path of the general configuration file of the `notation` CLI is as follows.

```console
{NOTATION_CONFIG}/config.json
```

### Trust Store
A trust store is a directory located within the filesystem that contains multiple collections of certificates, which are used to validate signatures. The Notary Project trust store currently support three types of certificates: 
- Certificates from Certificate Authorities (CAs), which are stored in the `X509/ca` directory.
- Signing Authority certificates, stored in the `X509/signingAuthority` directory. 
- Time Stamping Authority (TSA) certificates, which will be supported in future releases and will be stored in the `X509/tsa` directory.

These sub-directories also known as named stores support certificate files with the .pem, .crt, and .cer extensions.

The path of a certificate file in a [Trust Store][TS] follows the pattern below:

```console
{NOTATION_CONFIG}/truststore/{trust-store-type}/{named-store}/{cert-file}
```

### Trust Policy
Developers can create a trust policy to verify artifact signatures from a registry. A trust policy is a policy language which specifies which identities are trusted to validate an artifact signature and the level of signature verification to be used. Typically, a trust policy is written in JSON and located within the notation configuration directory.

The path of the [Trust Policy][TP] file is as follows.

```console
{NOTATION_CONFIG}/trustpolicy.json
```

### Signing Key Store

Developers sign artifacts using local private keys with associated certificate chain. The signing key information is tracked in a JSON file at:

```console
{NOTATION_CONFIG}/signingkeys.json
```

The signing key store is user-specific. Developers SHOULD consider safe places to store the passphrase-protected key and certificate pairs, or opt to remote signing.

For testing purpose, the following directory structure is suggested.

```console
{NOTATION_CONFIG}/localkeys/{key-name}.crt
{NOTATION_CONFIG}/localkeys/{key-name}.pem
```

Since `signingkeys.json` takes references in absolute paths, it is not required to copy the private keys and certificates used for signing to the above directory structure.

### Caches

Since Notation v1.3.0, CRL files are cached by default to reduce network traffic to the CRL server, thereby minimizing potential server throttling and enhancing performance with lower latency. The path of cached CRLs follows the pattern below.

```
{NOTATION_CACHE}/crl/{sha256-hash-of-the-CRL-downloading-URL}
```

## Examples

Examples are shown on various operating systems where the user `exampleuser` overrides the `notation` config, cache and the trust policy.

### Unix

```
/
└── home
   └── exampleuser
       └── .cache
       |    └── crl
       |       ├── f2ca1bb6c7e907d06dafe4687e579fceceae8f2e6b6b8bdf0abdd33b264e9a0e
       |       └── 05b3abf2579a5eb66403cd78be557fd860633a1fe2103c7642030defe32c657f
       └── .config
           └── notation
               ├── config.json
               ├── localkeys
               │   ├── dev.crt
               │   ├── dev.pem
               │   ├── test.crt
               │   └── test.pem
               ├── plugins
               │   └── com.example.bar
               │       └── notation-com.example.bar
               ├── signingkeys.json
               ├── trustpolicy.json
               └── truststore
                   └── x509
                       ├── ca
                       │   └── acme-rockets
                       │       └── cert4.pem
                       └── tsa
                           └── publicly-trusted-tsa
                               └── tsa-cert2.pem

```

### Windows

```
C:.
└── Users
    └── exampleuser
        └── AppData
            ├── Local
            │   └── notation
            │       └── crl
            │           ├── f2ca1bb6c7e907d06dafe4687e579fceceae8f2e6b6b8bdf0abdd33b264e9a0e
            │           └── 05b3abf2579a5eb66403cd78be557fd860633a1fe2103c7642030defe32c657f
            └── Roaming
                └── notation
                    ├── config.json
                    ├── localkeys
                    │   ├── dev.crt
                    │   ├── dev.pem
                    │   ├── test.crt
                    │   └── test.pem
                    ├── plugins
                    │   └── com.example.bar
                    │       └── notation-com.example.bar.exe
                    ├── signingkeys.json
                    ├── trustpolicy.json
                    └── truststore
                        └── x509
                            ├── ca
                            │   └── acme-rockets
                            │       └── cert4.pem
                            └── tsa
                                └── publicly-trusted-tsa
                                    └── tsa-cert2.pem
```

### Darwin / macOS

```
/
└── Users
   └── exampleuser
       └── Caches
       |    └── crl
       |       ├── f2ca1bb6c7e907d06dafe4687e579fceceae8f2e6b6b8bdf0abdd33b264e9a0e
       |       └── 05b3abf2579a5eb66403cd78be557fd860633a1fe2103c7642030defe32c657f
       └── Library
           └── Application Support
              └── notation
                  ├── config.json
                  ├── localkeys
                  │   ├── dev.crt
                  │   ├── dev.pem
                  │   ├── test.crt
                  │   └── test.pem
                  ├── plugins
                  │   └── com.example.bar
                  │       └── notation-com.example.bar
                  ├── signingkeys.json
                  ├── trustpolicy.json
                  └── truststore
                      └── x509
                          ├── ca
                          │   └── acme-rockets
                          │       └── cert4.pem
                          └── tsa
                              └── publicly-trusted-tsa
                                  └── tsa-cert2.pem
```

[References]::

[FHS]: https://refspecs.linuxfoundation.org/fhs.shtml "Filesystem Hierarchy Standard"
[XDG]: https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html "XDG Base Directory Specification"
[KF]: https://docs.microsoft.com/windows/win32/shell/knownfolderid "Known Folders"
[AS]: https://docs.microsoft.com/windows/apps/design/app-settings/store-and-retrieve-app-data "App Settings"
[macOS_FS]: https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html#//apple_ref/doc/uid/TP40010672-CH2-SW14 "macOS File System"
[SIP]: https://support.apple.com/HT204899 "System Integrity Protection"
[Plugin]: https://github.com/notaryproject/notaryproject/blob/main/specs/plugin-extensibility.md "Notation Extensibility for Signing and Verification"
[TS]: https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-store "Trust Store"
[TP]: https://github.com/notaryproject/notaryproject/blob/main/specs/trust-store-trust-policy.md#trust-policy "Trust Policy"
