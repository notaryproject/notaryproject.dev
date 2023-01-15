---
title: "Troubleshooting"
description: "Troubleshooting common problems with Notation"
type: docs
weight: 7
---

> NOTE:
>
> Suggest an troubleshooting item by raising a PR to our [documentation repository](https://github.com/notaryproject/notaryproject.dev)

## Enabling notation CLI commands logging

Printing log messages for debugging the problems can be enabled using the `--debug` or `-d` flag. Using the `--verbose` or `-v` flag to set verbosity level will be enough for most cases.

For example:

```shell
# Enable the debugging logs
notation sign -d localhost:5000/net-monitor@sha256:sha256:xxx

# Enable the verbose logs
notation verify -v localhost:5000/net-monitor@sha256:sha256:xxx
```

## TODO: trust store is not configured

## TODO: trust policy is not configured

## TODO: trust policy and payload.json encoding issues

## TODO: wrong certificate is used

## TODO: registry scope is wrongly configured
