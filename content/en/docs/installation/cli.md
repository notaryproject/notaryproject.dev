---
title: Install the notation CLI
description: Install the notation CLI on Linux, macOS, and Windows
weight: 1
---


## Download and install the CLI for Linux

Download the latest stable release of the notation CLI binary for macOS and checksum file, then verify the integrity of the download.

Set the `NOTATION_VERSION` environment variable to the version of notation you want to download. The latest version is `1.0.0-rc.3`.

```console
export NOTATION_VERSION=1.0.0-rc.3
```

For ARM processors:

```console
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_linux_arm64.tar.gz
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_checksums.txt
shasum --check notation_$NOTATION_VERSION\_checksums.txt
```

For x86 processors:

```console
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_linux_amd64.tar.gz
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_checksums.txt
shasum --check notation_$NOTATION_VERSION\_checksums.txt
```

Confirm the `shasum` command succeeds for the archive file you downloaded. For example, the following shows a successful checksum verification for the `notation_1.0.0-rc.3_linux_arm64.tar.gz` archive file:

```console
...
shasum: notation_1.0.0-rc.3_windows_amd64.zip: No such file or directory
notation_1.0.0-rc.3_windows_amd64.zip: FAILED open or read
shasum: notation_1.0.0-rc.3_linux_amd64.tar.gz: No such file or directory
notation_1.0.0-rc.3_linux_amd64.tar.gz: FAILED open or read
notation_1.0.0-rc.3_linux_arm64.tar.gz: OK
shasum: notation_1.0.0-rc.3_darwin_amd64.tar.gz: No such file or directory
notation_1.0.0-rc.3_darwin_amd64.tar.gz: FAILED open or read
shasum: notation_1.0.0-rc.3_darwin_arm64.tar.gz: No such file or directory
notation_1.0.0-rc.3_darwin_arm64.tar.gz: FAILED open or read
shasum: WARNING: 4 listed files could not be read
...
```

Expand the archive file directly into `/usr/bin/`:

```console
tar xvzf <ARCHIVE_FILE> -C /usr/bin/ notation
```

Alternatively, you can expand the archive file to a different directory and add it to your path. For example, the following command expands the archive file to `<EXAMPLE_PATH>/notary-cli/` and adds it to your path using the `PATH` variable in `~/.bashrc`.

```console
tar xvzf <ARCHIVE_FILE> -C <EXAMPLE_PATH>/notation-cli/ notation
echo 'export PATH="$PATH:<EXAMPLE_PATH>/notary-cli/"' >> ~/.bashrc
```

## Download and install the CLI for macOS

Download the latest stable release of the notation CLI binary for macOS and checksum file, then verify the integrity of the download.

Set the `NOTATION_VERSION` environment variable to the version of notation you want to download. The latest version is `1.0.0-rc.2`.

```console
export NOTATION_VERSION=1.0.0-rc.2
```

For Apple Silicon processors:

```console
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_darwin_arm64.tar.gz
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_checksums.txt
shasum --check notation_$NOTATION_VERSION\_checksums.txt
```

For Intel processors:

```console
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_darwin_amd64.tar.gz
curl -LO https://github.com/notaryproject/notation/releases/download/v$NOTATION_VERSION/notation_$NOTATION_VERSION\_checksums.txt
shasum --check notation_$NOTATION_VERSION\_checksums.txt
```

Confirm the `shasum` command succeeds for the archive file you downloaded. For example, the following shows a successful checksum verification for the `notation_1.0.0-rc.3_darwin_amd64.tar.gz` archive file:

```console
...
shasum: notation_1.0.0-rc.3_windows_amd64.zip: No such file or directory
notation_1.0.0-rc.3_windows_amd64.zip: FAILED open or read
shasum: notation_1.0.0-rc.3_linux_amd64.tar.gz: No such file or directory
notation_1.0.0-rc.3_linux_amd64.tar.gz: FAILED open or read
shasum: notation_1.0.0-rc.3_linux_arm64.tar.gz: No such file or directory
notation_1.0.0-rc.3_linux_arm64.tar.gz: FAILED open or read
notation_1.0.0-rc.3_darwin_amd64.tar.gz: OK
shasum: notation_1.0.0-rc.3_darwin_arm64.tar.gz: No such file or directory
notation_1.0.0-rc.3_darwin_arm64.tar.gz: FAILED open or read
shasum: WARNING: 4 listed files could not be read
...
```

Expand the archive file directly into `/usr/local/bin`:

```console
sudo tar xvzf <ARCHIVE_FILE> -C /usr/local/bin/ notation
```

Alternatively, you can expand the archive file to a different directory and add it to your path. For example, the following command expands the archive file to `<EXAMPLE_PATH>/notary-cli/` and adds it to your path using the `PATH` variable in `~/.zshhrc`.

```console
tar xvzf <ARCHIVE_FILE> -C <EXAMPLE_PATH>/notation-cli/ notation
echo 'export PATH="$PATH:<EXAMPLE_PATH>/notary-cli/"' >> ~/.zshrc
```

## Download and install the CLI for Windows

Download the latest stable release of the notation CLI binary for Windows and checksum file:

* [notation_1.0.0-rc.3_windows_amd64.zip](https://github.com/notaryproject/notation/releases/download/v1.0.0-rc.2/notation_1.0.0-rc.3_windows_amd64.zip)
* [notation_1.0.0-rc.3_checksums.txt](https://github.com/notaryproject/notation/releases/download/v1.0.0-rc.2/notation_1.0.0-rc.3_checksums.txt)

Use the [Get-FileHash](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.3) command in powershell to generate the hash of the archive file.

```powershell
(Get-FileHash .\notation_1.0.0-rc.3_windows_amd64.zip).Hash
```

Compare the results of the command with the value in the checksum file. The two values should match.

Expand the archive file and add `notation.exe` to `%ProgramFiles%/notation/bin`

Alternatively, you can expand the archive file to a different directory and add it to your path.

## Additional configuration

**IMPORTANT:** `notation` automatically creates the `NOTATION_CONFIG` directory if it does not exist. For more on the `NOTATION_CONFIG` directory and configuring your environment with `notation` see:

- [Notation directory structure for system configuration]({{< ref "/docs/concepts/directory-structure" >}})
- [Customize the Notation configuration file]({{< ref "/docs/how-to/notation-config-file" >}})