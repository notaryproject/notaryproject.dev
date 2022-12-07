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

Download the checksum file for the release and save it to same directory as CLI archive file. The checksum file is the `notation_<version>_checksums.txt` file in the *Assets* section of the release.

From the command line, navigate to the directory where you downloaded the CLI archive file and checksum file. 

On macOS, use the `shasum` command to verify the checksum of the CLI archive file. On Linux, use the `sha256sum` command to verify the checksum of the CLI archive file. 

The following example verifies the checksum is correct for the `notation_0.12.0-beta.1_darwin_arm64.tar.gz` archive file.

```output
$ shasum -c notation_0.12.0-beta.1_checksums.txt
shasum: notation_0.12.0-beta.1_linux_amd64.tar.gz: No such file or directory
notation_0.12.0-beta.1_linux_amd64.tar.gz: FAILED open or read
shasum: notation_0.12.0-beta.1_windows_amd64.zip: No such file or directory
notation_0.12.0-beta.1_windows_amd64.zip: FAILED open or read
shasum: notation_0.12.0-beta.1_linux_arm64.tar.gz: No such file or directory
notation_0.12.0-beta.1_linux_arm64.tar.gz: FAILED open or read
notation_0.12.0-beta.1_darwin_arm64.tar.gz: OK
shasum: notation_0.12.0-beta.1_darwin_amd64.tar.gz: No such file or directory
notation_0.12.0-beta.1_darwin_amd64.tar.gz: FAILED open or read
shasum: WARNING: 4 listed files could not be read
```

To verify the checksum on Windows PowerShell, use the [Get-FileHash](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.3) command to generate the hash for archive file. For example, the following command generates the hash for the `notation_0.12.0-beta.1_windows_amd64.zip` archive file.

```powershell
Get-FileHash notation_0.12.0-beta.1_windows_amd64.zip -Algorithm SHA256
```

Compare the generated hash from the command to the content of the checksum file.

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

For more on configuring your environment with `notation` see:

- [Notation directory structure for system configuration]({{< ref "/docs/how-to/directory-structure" >}})
- [Customize the Notation configuration file]({{< ref "/docs/how-to/notation-config-file" >}})