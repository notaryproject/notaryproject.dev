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

Using CLI command to configure trust policies is planned in Notation future release. Before that, users can refer to this [guide](https://github.com/notaryproject/notation/blob/v1.0.0-rc.1/specs/commandline/verify.md#configure-trust-policy) to configure trust policies manually.

## When I verify an artifact, I get the error 'ERRO authenticity validation failed. Failure reason: error while loading the trust store, "$HOME/.config/notation/truststore/x509/ca/mytruststore" does not exist'

This error indicates the trust store doesn't exist or the trust store name is not correct. Trust store typically contains a set of certificate files, where the trust identities are retrieved to verify signatures. Normally users use command `notation cert add` to add trust stores.

Based on the error log, the type of trust store is `ca`, and the trust store name is `mytruststore`. First, users can use `notation cert list` to list all the certificate files. Second, users can check whether the type of store `ca` and store name `mytruststore` are in the list with the right certificate file stored.

## TODO: wrong certificate is used

## TODO: trust policy and payload.json encoding issues

## TODO: registry scope is wrongly configured

## TODO: signing key
