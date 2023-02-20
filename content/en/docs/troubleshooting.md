---
title: "Troubleshooting"
description: "Troubleshooting common problems with Notation"
type: docs
weight: 7
---

> NOTE:
>
> Suggest a troubleshooting item by raising a PR to our [documentation repository](https://github.com/notaryproject/notaryproject.dev)

## Enabling notation CLI commands logging

Printing log messages for debugging the problems can be enabled using the `--debug` or `-d` flag. Using the `--verbose` or `-v` flag to set verbosity level will be enough for most cases.

For example:

```shell
# Enable the debugging logs
notation sign -d localhost:5000/net-monitor@sha256:sha256:xxx

# Enable the verbose logs
notation verify -v localhost:5000/net-monitor@sha256:sha256:xxx
```

## When I verify an artifact, I get the error 'Error: open $HOME/.config/notation/trustpolicy.json: no such file or directory'

Users need to configure trust policies before verifying artifacts. The trust policies are configured in a file named `trustpolicy.json`, which is stored under notation configuration directory.

For Linux, the notation configuration directory is `${HOME}/.config/notation/`. For macOS, the notation configuration directory is `${HOME}/Library/Application Support/notation/`. For Windows, the notation configuration folder is `%AppData%\Roaming\notation\`.

Using CLI command to configure trust policies is planned in Notation future release. Before that, you can refer to this [guide](https://github.com/notaryproject/notation/blob/v1.0.0-rc.1/specs/commandline/verify.md#configure-trust-policy) to configure trust policies manually.

## When I verify an artifact, I get the error '"$HOME/.config/notation/truststore/x509/ca/mytruststore" does not exist'

This error indicates the trust store doesn't exist or the trust store name is not correct. Trust store typically contains a set of certificate files, where the trust identities are retrieved to verify signatures. Normally you use command `notation cert add` to add trust stores.

Based on the error log, the type of trust store is `ca`, and the trust store name is `mytruststore`. First, you can use `notation cert list` to list all the certificate files. Second, you can check whether the type of store `ca` and store name `mytruststore` are in the list with the right certificate file stored.

## When I verify an artifact, I get the error 'signature is not produced by a trusted signer'

Assuming the trust store and trust policy are configured correctly, this error indicates that the signature is signed by an unknown identity, which should not be trusted. The verification should fail. On the other hand, Notation detects the problematic signature. Users should not use the artifact.

Follow the steps to make sure the trust store and trust policy are configured correctly:

1. Confirm the trust policy that you are using if you have multiple trust policies in `trustpolicy.json` file.
2. Check the `trustStores` property, and make sure the value is correctly configured.
3. Check the `trustedIdentities` property, and make sure the value is correctly configured. If the value is `"*"`, it means all the certificates stored in the trust stored (configured in `trustStores`) are trusted, then you need to make sure the certificates in the trust stores can be used to verify the signatures. If the value is in the format of x509 subject info, like `"x509.subject: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US"`, then you need to make sure it is the identity that produces the signature. You can use command `notation cert show` to show the details of the certificate in the trust store. For example:

```shell
notation cert show --type ca --store mytruststore mycertificate.crt
```

An example of output:

```text
Certificate details
--------------------------------------------------------------------------------
Issuer: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US
Subject: CN=example.io,O=Notary,L=Seattle,ST=WA,C=US
Valid from: 2023-01-15 07:55:01 +0000 UTC
Valid to: 2023-01-16 07:55:01 +0000 UTC
IsCA: false
SHA1 Thumbprint: xxx
```

Check the `Subject` info in the output. If it is the identity that signs the artifact, you need to add the `Subject` info into `trustedIdentities`.

## I have configured trust policy, but I still get the error 'no applicable trust policy'

This error indicates that the `registryScopes` property is not correctly configured. This property contains a list of repository URIs, where the artifacts are stored. You need to make sure the signing artifact is stored in one of the listed repositories. If not, you need to add the missing repository URI in `registryScopes`, or you can add a new trust policy for the missing repository.

The repository URI is in the format of `${registry-name}/${namespace}/${repository-name}`. For example, if the artifact to be verified is `registry.acme-rockets.io/software/net-monitor@sha256:xxx`, then the value for `registryScopes` should be `registry.acme-rockets.io/software/net-monitor`, the following values are wrong

- `registry.acme-rockets.io`
- `registry.acme-rockets.io/software`

## When I verify an artifact, I get the error 'malformed trustpolicy.json file'

This is normally an encoding problem of `trustpolicy.json` file. Notation expects `utf-8 without BOM` or `ascii` encoding for `trustpolicy.json` file.

For Windows user, Windows PowerShell (prior to v6) uses the Unicode `UTF-16LE` encoding by default, and `utf-8 without BOM` is not supported. If you are building `trustpolicy.json` file in Windows PowerShell (prior to v6), make sure you change the file encoding to `ascii`.

## When I verify an artifact, I get the error 'Failed to unmarshal the payload content in the signature blob to envelope.Payload'

This is normally an encoding problem of payload content in the signature envelope. Notary v2 signatures could be produced by different tools per [signature specification](https://github.com/notaryproject/notaryproject/blob/v1.0.0-rc.1/specs/signature-specification.md). The payload content is a `JSON` document defined in the signature specification, and the encoding should be `utf-8 without BOM` or `ascii`.

For Windows user, Windows PowerShell (prior to v6) uses the Unicode `UTF-16LE` encoding by default, and `utf-8 without BOM` is not supported. If you are building payload content in Windows PowerShell (prior to v6), make sure you change the payload content encoding to `ascii`.
