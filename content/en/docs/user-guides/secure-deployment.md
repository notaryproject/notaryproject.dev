---
title: "Securely deploying Notation"
description: "Best practices for securely deploying Notation"
type: docs
weight: 5
---

A deployment of Notation, specifically the `notation` CLI, is used for signing and verifying container images. The `notation` CLI is usually deployed on a development computer or in a CI/CD pipeline, such as GitHub Actions.

A deployment has several sensitive components:

- [Trust policies]({{< ref "/docs/user-guides/how-to/manage-trust-policy" >}})
- [Trust stores and certificates]({{< ref "/docs/notary-project-concepts.md" >}})
- Plugins

It is strongly recommended that you follow the best practices in this document to secure your deployment of Notation. Notation works with a shared responsibility model, meaning users and organizations are responsible for securing the `notation` CLI deployment.

Failure to secure the filesystem on development computers and hosts with `notation` CLI deployments can result in malicious plugins being installed, trust policies being modified to allow verification compromised or untrusted artifacts, and trust stores being modified to have untrusted or compromised certificates.

## Secure the installation and binary

When manually installing the binary, it is critical to download both the binary and its checksum from a trusted source, such as the [notation GitHub repo](https://github.com/notaryproject/notation/releases), over HTTPS. You should also verify the checksum of the binary before using it. When using a package manager, such as [Homebrew](https://brew.sh/), it is critical to use a package manager that provides authenticity guarantees. For example, Homebrew uses [GPG](https://gnupg.org/) to verify the authenticity of the packages it installs. 

When downloading the binary without installing it, for example to use it in a CI/CD pipeline, it is critical to download both the binary and checksum from a trusted source, such as the [notation GitHub repo](https://github.com/notaryproject/notation/releases), over HTTPS. You should also verify the checksum of the binary. If all users on the host will need access to the binary, copy the binary to `/usr/local/bin` with the owner set to `root` and the permission set to `rwxr-xr-x (755)`. This operation will require `sudo` or root access. If only one user, such as your account, will need access to the binary, copy the binary to a directory that users own with the owner set to that user and the permission set to `rwx------ (700)`. 

## Secure the trust policy file

When creating a trust policy that only one user, such as your account, needs create the policy using `notation policy import` as that user without `sudo`. This approach ensures the policy file is stored in the correct directory with appropriate permissions. 

Manually moving the trust file and setting the directory and file permissions is not recommended, but if you choose to do so, you must adhere to the following guidelines:
- The policy file should be stored in a directory that user owns with the permission set to `rwx------ (700)`. 
- The policy file should have the permission set to `rw------- (600)`. 

## Secure certificates

When setting up a signing key for yourself, you should use your own account to do that. Never use `sudo` or as a separate user unless you are an admin and try to set up the signing key for that user. This recommendation applies for both the binary installed for all users on the system or just for you.

When downloading certificates for validation, always obtain them from trusted sources. For web-based downloads, using HTTPS. For vendor-specific sources, use the tools provided by the vendor. Use `notation cert add` to add the certificates to the trust store. 

Manually moving certificates and setting the directory and file permissions is not recommended, but if you choose to do so, you must set the permissions for those certificate files to `rw------- (600)` to prevent access from other users since those certificates may contain confidential information.

## Secure filesystem access

The sensitive components of a deployment of Notation are stored on the filesystem. For development computers managed by individuals and hosts directly managed by your organization, you should follow general best practices as well as your organization's best practices for securing those development computers and hosts, such as:

- Ensuring the operating system is fully patched
- The disk encryption follows your organizations encryption policies
- Use strong passwords and adhere to your organization's password policies
- Access to the Notation deployment directory is restricted to only authorized users, such as those with `sudo` access, administrators, or the user that owns the directory 

Every organization has different policies and best practices for securing development computers and hosts, and they should be followed as a part securing filesystem on development computers and hosts with `notation` CLI deployments.

## Other security best practices

For development computers managed by individuals and hosts directly managed by your organization, ensure the access to those systems as well as locations of the sensitive components of a deployment of Notation are restricted to only authorized users.

For computers not directly managed by individuals or your organization, such as hosts used for CI/CD pipelines, ensure manner in which the sensitive components of a deployment of Notation are stored, accessed, and transmitted to those computers follows your organizations best practices and are restricted only to authorized users.
