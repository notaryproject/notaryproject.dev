---
title: "Authenticate with OCI-compliant registries"
description: "How to use notation to authenticate with OCI-compliant registries"
type: docs
weight: 1
---

You can use `notation` to authenticate to an OCI-compliant registry. This is useful for pushing and pulling signed artifacts, as well as inspecting artifacts in registries that do not offer public access.

{{% alert title="Important" color="info" %}}
Currently, `notation` relies on [Docker Credential Store](https://docs.docker.com/engine/reference/commandline/login/#credentials-store) for authentication. Notation requires additional configuration for Docker credential helper if you are using Notation in Linux.
{{% /alert %}}

## Use `notation login` to authenticate to an OCI-compliant registry

To authenticate to an OCI-compliant registry, use the `notation login` command with your registry, username, and password. For example:

```console
notation login -u <username> -p <password> <registry>
```

{{% alert title="Note" color="primary" %}}
If `notation login` is failing, you may need to configure environment variables as detailed in the [Configure environment variables to authenticate to an OCI-compliant registry](#configure-environment-variables-to-authenticate-to-an-oci-compliant-registry) section, or configure [Docker Credential Store](https://docs.docker.com/engine/reference/commandline/login/#credentials-store) as detailed in the [Configure Docker Credential Store for Linux](#configure-docker-credential-store-for-linux) section.
{{% /alert %}}

## Configure environment variables to authenticate to an OCI-compliant registry

Set the `NOTATION_USERNAME` and `NOTATION_PASSWORD` environment variables to authenticate to an OCI-compliant registry.

```bash
export NOTATION_USERNAME="YOUR_REGISTRY_USERNAME"
export NOTATION_PASSWORD="YOUR_REGISTRY_PASSWORD"
```

After the environment variables are set, you can use Notation with your registry without `notation login`.

For security reasons, unset the environment variables after you log out from the registry. For example:

```console
unset NOTATION_USERNAME
unset NOTATION_PASSWORD
```

## Configure Docker Credential Store for Linux

As a security best practice, you should use a credential helper with a system keychain when using local credentials to access remote repositories.

`notation` uses [Docker Credential Helpers](https://github.com/docker/docker-credential-helpers) and its [protocol](https://docs.docker.com/engine/reference/commandline/login/#credential-helper-protocol) as the credential helpers. Currently, using Docker Credential Helpers requires manual installation and configuration in Linux by following the steps below. This configuration will be simplified in Notation v1.0.0.

Install [Docker credential helper](https://github.com/docker/docker-credential-helpers) pass.

```bash
mkdir -p ~/bin
curl -Lo ~/bin/docker-credential-pass "https://github.com/docker/docker-credential-helpers/releases/download/v0.7.0/docker-credential-pass-v0.7.0.linux-amd64"
chmod +x ~/bin/docker-credential-pass
```

Generate and configure GPG key for encryption. 

{{% alert title="Note" color="primary" %}}
If you have a GPP key already, run `gpg --edit-key` to trust your key instead.
{{% /alert %}}

```console
gpg --full-generate-key
```

Install and configure [pass](https://www.passwordstore.org/).

```console
sudo apt update 
sudo apt install pass -y
pass init $your_email
```

Configure Docker credential store in `~/.docker/config.json`.

```
mkdir -p ~/.docker
echo '{"credsStore":"pass"}' > ~/.docker/config.json
chmod 600 ~/.docker/config.json
```

Use `notation login` to authenticate to an OCI-compliant registry.

```console
notation login -u <username> <registry>
```

## Use `notation logout` to log out of an OCI-compliant registry

To log out of an OCI-compliant registry, use the `notation logout` command with your registry. For example:

```console
notation logout <registry>
```