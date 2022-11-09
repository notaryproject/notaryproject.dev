---
title: Install the notation CLI
description: Install the notation CLI on Linux, macOS, and Windows
weight: 1
---

## Download the `notation` CLI

Navigate to the [Releases page](https://github.com/notaryproject/notation/releases) and select the latest release of the CLI. The notation CLI binaries for each platform are available under the *Assets* section in the `notation_<version>_<platform>.tar.gz` files.

For example, in the [v0.12.0-beta1 release](https://github.com/notaryproject/notation/releases/tag/v0.12.0-beta.1) the following CLI binaries are available:

* `notation_0.12.0-beta.1_darwin_amd64.tar.gz` for macOS running on Intel processors.
* `notation_0.12.0-beta.1_darwin_arm64.tar.gz` for macOS running on Apple Silicon processors.
* `notation_0.12.0-beta.1_linux_amd64.tar.gz` for Linux running on Intel processors.
* `notation_0.12.0-beta.1_linux_arm64.tar.gz` for Linux running on ARM processors.
* `notation_0.12.0-beta.1_windows_amd64.zip` for Windows running on Intel processors.


## Install the CLI for macOS

Expand the archive file directly into `/usr/local/bin`:

```console
tar xvzf <ARCHIVE_FILE> -C /usr/local/bin/ notation
```

Alternatively, you can expand the archive file to a different directory and add it to your path. For example, the following command expands the archive file to `<EXAMPLE_PATH>/notary-cli/` and adds it to your path using the `PATH` variable in `~/.zshhrc`.

```console
tar xvzf <ARCHIVE_FILE> -C <EXAMPLE_PATH>/notation-cli/ notation
echo 'export PATH="$PATH:<EXAMPLE_PATH>/notary-cli/"' >> ~/.zshrc
```

## Install the CLI for Linux

Expand the archive file directly into `/usr/bin/`:

```console
tar xvzf <ARCHIVE_FILE> -C /usr/bin/ notation
```

Alternatively, you can expand the archive file to a different directory and add it to your path. For example, the following command expands the archive file to `<EXAMPLE_PATH>/notary-cli/` and adds it to your path using the `PATH` variable in `~/.bashrc`.

```console
tar xvzf <ARCHIVE_FILE> -C <EXAMPLE_PATH>/notation-cli/ notation
echo 'export PATH="$PATH:<EXAMPLE_PATH>/notary-cli/"' >> ~/.bashrc
```

## Install the CLI for Windows

Expand the archive file and add `notation.exe` to `%ProgramFiles%/notation/bin`

Alternatively, you can expand the archive file to a different directory and add it to your path.