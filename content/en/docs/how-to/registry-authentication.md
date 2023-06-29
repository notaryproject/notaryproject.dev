---
title: "Authenticate with OCI-compliant registries"
description: "How to use notation to authenticate with OCI-compliant registries"
type: docs
weight: 1
---

You can use `notation` to authenticate to an OCI-compliant registry. This is useful for inspecting artifacts in registries that do not offer a web frontend for view artifacts.

When you authenticate to an OCI-compliant registry, `notation`, by default, uses a [credentials store](#configure-a-credentials-store) to store your credentials in a secure manner. It is possible to store your credentials in [environment variables](#configure-environment-variables-to-authenticate-to-an-oci-compliant-registry) or as [base64 encoded values in a configuration file](#configure-configjson-to-authenticate-to-an-oci-compliant-registry), but these approaches are not secure and are not recommended for production environments. **It is strongly recommended that you use a credentials store to authenticate to an OCI-compliant registry.**

## Configure a credentials store

A credentials store is a secure location that stores your credentials, such as usernames and passwords. Operating systems often include a default credentials store, such as *osxkeychain* on macOS or *wincred* on Windows. You can also use a third-party credentials store, such as [pass](https://www.passwordstore.org/).

By default, `notation` uses a credentials store during the following operations:
- Store credentials when you log in to a registry
- Read credentials when accessing a registry to sign, verify, or display artifacts
- Delete credentials from the credentials store when you log out of a registry
 
You have three options for configuring a credentials store:
1. Use the [`notation` config.json file]({{< ref "/docs/concepts/directory-structure" >}}).
1. Use the Docker configuration file, which is located at `~/.docker/config.json`.
1. Use the default credentials store for your operating system.

`notation` will resolve the credentials store in the order shown above. If no credential store is available and no other method is used for credentials, such as environment variables, `notation login` will not store the credentials and the command will fail.

{{% alert title="Important" color="important" %}}
If you have Docker installed on your system and used `docker login` to authenticate to your OCI-compliant registry, your credentials are already stored and available to `notation`. In this case, you don't need to run `notation login` again to authenticate to your OCI-compliant registry.

Docker also implements a fallback mechanism for storing your credentials. If no credentials store is available, Docker will store your credentials as base64 encoded values in the Docker configuration file. This is not secure and is not recommended for production environments. For more details, see [`docker login` default behavior](https://docs.docker.com/engine/reference/commandline/login/#default-behavior).
{{% /alert %}}

To configure a credentials store in the `notation` configuration file, add a `credStore` to the [`notation` config.json file]({{< ref "/docs/concepts/directory-structure" >}}). The following example shows `osxkeychain` as the configured credentials store.

```json
{
  ...
  "credStore": "osxkeychain"
  ...
}
```

To configure a credentials store in the Docker configuration file, add a `credStore` to `~/.docker/config.json`. The following example shows `pass` as the configured credentials store.

```json
{
  ...
  "credsStore": "pass"
  ...
}
```

## Configure environment variables to authenticate to an OCI-compliant registry

{{% alert title="Warning" color="warning" %}}
Environment variables are not secure for storing sensitive data such as usernames and passwords and should not be used in a production environment.
{{% /alert %}}

Set the `NOTATION_USERNAME` and `NOTATION_PASSWORD` environment variables to authenticate to an OCI-compliant registry.

```bash
export NOTATION_USERNAME="YOUR_REGISTRY_USERNAME"
export NOTATION_PASSWORD="YOUR_REGISTRY_PASSWORD"
```

After the environment variables are set, you can use Notation with your registry without `notation login`.

For security reasons, unset the environment variables after you are done interacting with the OCI-compliant registry. For example:

```console
unset NOTATION_USERNAME
unset NOTATION_PASSWORD
```

## Configure `config.json` to authenticate to an OCI-compliant registry

{{% alert title="Warning" color="warning" %}}
Storing credentials in `config.json` is not secure for storing sensitive data such as usernames and passwords and should not be used in a production environment.
{{% /alert %}}

You can configure the [`notation` config.json file]({{< ref "/docs/concepts/directory-structure" >}}) to store the credentials for your OCI-compliant registry as base64 encoded values. For example:

```json
{
  "auths": {
    "<registry>": {
      "auth": "<base64encoded>",
    }
  },
}
```

## Use `notation login` to authenticate to an OCI-compliant registry

To authenticate to an OCI-compliant registry, use the `notation login` command with your registry, username, and password. For example:

```console
notation login -u <username> -p <password> <registry>
```

{{% alert title="Note" color="primary" %}}
If `notation login` is failing, you may need to [Configure a credentials store](#configure-a-credentials-store). Alternatively in development and testing environments, you can use [environment variables](#configure-environment-variables-to-authenticate-to-an-oci-compliant-registry) to authenticate to an OCI-compliant registry.
{{% /alert %}}

## Use `notation logout` to log out of an OCI-compliant registry

To log out of an OCI-compliant registry, use the `notation logout` command with your registry. For example:

{{% alert title="Warning" color="warning" %}}
Using `notation logout` will remove the credentials from the configured credentials store. If you are using the Docker configuration file as your credentials store, `notation logout` will remove the credentials from the Docker configuration file.

If both the Docker configuration file and the `notation` configuration file are configured with a credentials store, `notation logout` will remove the credentials from credentials stored configured in the `notation` configuration file.
{{% /alert %}}

```console
notation logout <registry>
```

## OCI-compliant registries

For a full list of OCI-compliant registries compatible with `notation`, see [OCI-compliant registries]({{< ref "/docs/faq#what-registries-are-compatible-with-notary" >}}).