---
title: Notation v1.0.0-RC.7 is available!
author:  "Notation Release Team"
date: 2023-05-28
draft: false
---

The Notation maintainers are pleased to announce the releases of [Notation CLI](https://github.com/notaryproject/notation) v1.0.0-rc.7, [notation-go library](https://github.com/notaryproject/notation-go) v1.0.0-rc.6, and [notation-core-go library](https://github.com/notaryproject/notation-go) v1.0.0-rc.4. This blog walks you through the updates in this release.

NOTE: Both Notation CLI v1.0.0-rc.7 and v1.0.0-rc.6 have the same functionalities. However, v1.0.0-rc.7 included an additional fix for an E2E test case.

## What's new

This release adds the following major changes:

- Fix security advisories
- Notation commands support reading Docker credentials if the [credentials store](https://docs.docker.com/engine/reference/commandline/login/#configure-the-credentials-store) is not configured
- Renamed `--plain-http` to `--insecure-registry`, which should be used only for testing

Other changes:

- Improved error messages
- Bug fixes
- Updated dependencies

### Notation commands support reading docker credentials if credentials store is not installed

Users are required to provide credentials to authenticate with OCI-compliant registries. As a security best practice, it is highly recommended that users configure a credentials store to securely store their credentials, especially in production environments. However, there may be cases where a credentials store is not configured, such as in a test environment. If the credentials store is not present, Docker stores the credentials in the config files by default, see [reference](https://docs.docker.com/engine/reference/commandline/login/#default-behavior). With the release of Notation v1.0.0-RC.6, notation commands now support reading credentials from the Docker config file if a credentials store is not installed. If users have successfully logged in using `docker login`, they can use the `notation sign` command to sign container images directly without the need to use `notation login` first. The same solution applies to other commands `notation verify`, `notation ls`, and `notation inspect`. For example,

```console
# credentials store is not installed
docker login <Registry>
notation sign --key <key_name> <image>
notation ls <image>
notation inspect <image>
notation verify <image>
```

If credentials store is present, users can use either `docker login` or `notation login` for authentication with registries. See the [guide](https://notaryproject.dev/docs/how-to/registry-authentication/) for other authentication methods.

### Flag `--plain-http` was renamed to `--insecure-registry`

The original flag `--plain-http` and its description did not emphasize that it is an insecure way to connect to the registry, and it should only be used for testing purposes. With updated description and the name changed to `--insecure-registry`, it is now more intuitive and emphasized for users to understand the usage of this flag. Other than the name change, there is no difference between the two flags.

## Credits

We would like to specially thank the Notary maintainers, contributors, and the broader Notary community for helping us throughout the release process with timely feedback, reviews, and testing and for all your support to help ensure a timely release. Sending credits to the following contributors who made great contributions to Notation RC.7.

- [@FeynmanZhou](https://github.com/FeynmanZhou)
- [@gokarnm](https://github.com/gokarnm)
- [@iamsamirzon](https://github.com/iamsamirzon)
- [@JeyJeyGao](https://github.com/JeyJeyGao)
- [@priteshbandi](https://github.com/priteshbandi)
- [@qweeah](https://github.com/qweeah)
- [@rgnote](https://github.com/rgnote)
- [@shizhMSFT](https://github.com/shizhMSFT)
- [@toddysm](https://github.com/toddysm)
- [@Two-Hearts](https://github.com/Two-Hearts)
- [@vaninrao10](https://github.com/vaninrao10)
- [@Wwwsylvia](https://github.com/Wwwsylvia)
- [@yizha1](https://github.com/yizha1)
- [@zr-msft](https://github.com/zr-msft)

## Download and give it a try

Follow this [hands-on guide](https://notaryproject.dev/docs/quickstart/) to get started.
