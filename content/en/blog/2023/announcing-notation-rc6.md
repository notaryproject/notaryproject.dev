---
title: Notation v1.0.0-RC.7 is available!
author:  "Notation Release Team"
date: 2023-05-28
draft: false
---

The Notation maintainers are pleased to announce the release of Notation v1.0.0-RC.7, including [Notation CLI v1.0.0-rc.7](https://github.com/notaryproject/notation/releases/tag/v1.0.0-rc.7), [notation-go library v1.0.0-rc.6](https://github.com/notaryproject/notation-go/releases/tag/v1.0.0-rc.6), and [notation-core-go library v1.0.0-rc.4](https://github.com/notaryproject/notation-core-go/releases/tag/v1.0.0-rc.4). This blog walks you through the updates in this release.

> NOTE: Both Notation CLI v1.0.0-rc.7 and v1.0.0-rc.6 have the same functionalities. However, v1.0.0-rc.7 included an additional [fix](https://github.com/notaryproject/notation/pull/690) for an E2E test case.

## What's new

This release adds the following major changes:

- Security advisory fixes: CVE-2023-33957, CVE-2023-33958, CVE-2023-33959
- Notation commands support reading Docker credentials if the [credentials store](https://docs.docker.com/engine/reference/commandline/login/#configure-the-credentials-store) is not present
- Renamed `--plain-http` to `--insecure-registry` to guide that it should only for testing
- Improved error messages
- Bug fixes
- Updated dependencies

### Notation commands support reading Docker credentials if credentials store is not present

Security best practices recommend that users configure a credentials store to securely manage credentials, especially in production environments. Notation commands use the following order to find credentials to authenticate with registries. Notation commands first look for credentials in its Notation’s config file, if absent Notation looks for credentials in docker config file, and if even that is not present, Notation uses the operating system default. This way, for users who do not configure explicit credentials in Notation, a successful `docker login`, will enable them to run `notation sign/verify/list/inspect` commands without the need to complete notation login first.

However, there may be cases where no credentials store is present, such as in a test environment. If no credentials store is present, Docker stores the credentials in the config files by default, see [reference](https://docs.docker.com/engine/reference/commandline/login/#default-behavior). Starting with Notation v1.0.0-RC.7, notation commands support reading credentials from the Docker config file if no credentials store is present. This way, a successful `docker login`, will enable users to run `notation sign/verify/list/inspect` commands without the need to complete `notation login` first. For example,

```console
# No credentials store is present
docker login <registry>
notation sign --key <key_name> <image>
notation ls <image>
notation inspect <image>
notation verify <image>
```

### Flag `--plain-http` was renamed to `--insecure-registry`

The original flag `--plain-http` and its description did not emphasize that it is an insecure way to connect to the registry, and it should only be used for testing purposes. With updated description and the name changed to `--insecure-registry`, it is now more intuitive and emphasized for users to understand the usage of this flag. Other than the name change, there is no difference between the two flags.

## Known issue

An issue was reported on this version that `notation login/logout` commands failed to detect credentials store, which is actually present and used by Docker CLI. See [details](https://github.com/notaryproject/notation/issues/696). This issue doesn't impact other notation commands, so if you have successfully logged in registries using `docker login`, you can continue to use other Notation commands, for example, `notation sign`. If you want to fix the issue for `notation login/logout`, the workaround is to manually create or update `config.json` file with correct credentials store configuration, and store this file under notation [configuration directory](https://notaryproject.dev/docs/concepts/directory-structure/#general-configuration). For example:

```jsonc
{
        "credsStore": "desktop.exe"
}
```

In above example, `desktop.exe` is the Docker credential store installed in Windows.

## Credits

We would like to specially thank the Notary maintainers, contributors, and the broader Notary community for helping us throughout the release process with timely feedback, reviews, and testing and for all your support to help ensure a timely release. Sending credits to the following contributors who made great contributions to Notation v1.0.0-RC.7.

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
