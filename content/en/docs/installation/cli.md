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

## Verify the `notation` CLI checksum

In order to detect any errors that could have been introduced when downloading or storing the Notation archive, you can compare the archive's checksum with the values present in checksums file. Notation uses the SHA256 algorithm for the checksum.

1. Download the checksum file for the release and save it to same directory as CLI archive file. The checksum file is the `notation_<version>_checksums.txt` file in the *Assets* section of the release.
2. Calculate the sha 256 hash of the notation archive file
    1. For **MacOS** use [shasum](https://www.unix.com/man-page/osx/1/SHASUM) command to generate hash of archive the file.
        ```shell
        $ shasum -a 256 notation_1.0.0-rc.1_linux_amd64.tar.gz 
        3b5239d68810fec349807aa9eb90fcb9cd972cdb540ecfd4fcf3631d7ad4be06  notation_1.0.0-rc.1_linux_amd64.tar.gz
        ```
    2. For **Linux** use [sha256sum](https://www.unix.com/man-page/linux/1/sha256sum) command to generate hash of the archive file.
        ```shell
        $ sha256sum notation_1.0.0-rc.1_darwin_arm64.tar.gz
        eaa7b0c7c8d18e504766ce8d3ac5e46da2e97f4fdcead8be997e0ae74b146b00  notation_1.0.0-rc.1_darwin_arm64.tar.gz
        ```
    3. For **Window** use the [Get-FileHash](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.3) command in powershell to generate the hash of the archive file.
        ```powershell
        (Get-FileHash .\notation_1.0.0-rc.1_windows_amd64.zip).Hash
        7d091cbd62886d1b47b60519a5b56314e794caf18751b1cccab2f54387a0d5c4
        ```
3. Compare the results of the command with the value shown in the `notation_<version>_checksums.txt` file. The two values should match.

Alternatively, on macOS and linux you can also use `--check` mode to read the checksum file and verify the integrity of the archive.
```shell
$ shasum --check notation_1.0.0-rc.1_checksums.txt
shasum: notation_1.0.0-rc.1_linux_arm64.tar.gz: No such file or directory
notation_1.0.0-rc.1_linux_arm64.tar.gz: FAILED open or read
shasum: notation_1.0.0-rc.1_darwin_amd64.tar.gz: No such file or directory
notation_1.0.0-rc.1_darwin_amd64.tar.gz: FAILED open or read
shasum: notation_1.0.0-rc.1_linux_amd64.tar.gz: No such file or directory
notation_1.0.0-rc.1_linux_amd64.tar.gz: FAILED open or read
shasum: notation_1.0.0-rc.1_windows_amd64.zip: No such file or directory
notation_1.0.0-rc.1_windows_amd64.zip: FAILED open or read
notation_1.0.0-rc.1_darwin_arm64.tar.gz: OK
shasum: WARNING: 4 listed files could not be read
```

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

## Additional configuration

**IMPORTANT:** `notation` automatically creates the `NOTATION_CONFIG` directory if it does not exist. For more on the `NOTATION_CONFIG` directory and configuring your environment with `notation` see:

- [Notation directory structure for system configuration]({{< ref "/docs/how-to/directory-structure" >}})
- [Customize the Notation configuration file]({{< ref "/docs/how-to/notation-config-file" >}})