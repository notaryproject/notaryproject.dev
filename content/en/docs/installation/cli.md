---
title: Install the notation CLI
description: Install the notation CLI on Linux, macOS, and Windows
weight: 1
---

## Download the `notation` CLI 

Download the latest CLI for your platform from the [Releases page](https://github.com/notaryproject/notation/releases).

## Install the CLI for Linux

Expand the archive file and add it to your path. For example, the following command expands the archive file directly to `~/bin`.

```console
tar xvzf notation.tar.gz -C ~/bin notation
```

## Install the CLI for macOS

Expand the archive file and add it to your path. For example, the following command expands the archive file to `<EXAMPLE_PATH>/notary-cli/` and adds it to your path using the `PATH` variable in `~/.zshhrc`.

```console
tar xvzf notation.tar.gz -C <EXAMPLE_PATH>/notation-cli/ notation
echo 'export PATH="$PATH:<EXAMPLE_PATH>/notary-cli/"' >> ~/.zshrc
```

## Install the CLI for Windows

Expand the archive file and add `notation.exe` to your path.