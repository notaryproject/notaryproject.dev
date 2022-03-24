---
title: Discovery and Configuration for Notation Verification
description: Discover the public identity for notation verify
simple_list: true
weight: 100
---

# Discovery and Configuration for Notation Verification

Notary v2 is a opt-in model for what identities are trusted for a set of artifacts.
This is contrast to Docker Content Trust ([Notary v1][notary-v1]) which implemented a Trust on First Use ([TOFU][tofu]) model, where the public key was automatically acquired and configured.

If Notary v2 is based on opt-in configuration, the question would be, how do I configure the trusted identities?

In a perfect world, the user knows who they choose to trust and configures a trust policy.
In a modern world, developers are continually finding new tools, projects, packages and images that speed their development.
Just a few years ago, it was common practice to contract with a vendor for their tools and packages.
In a cloud-native development model, the internet of open source is at a development teams disposal.

## Scenario

A developer finds an image (artifact), which helps their productivity.
It may be a base image that includes all the libraries they need to build their image, or a runtime image that provides a set of services.
The image may have been original hosted on docker hub or one of several other public registries.
Following [best practices for consuming public content][consuming-public-content], the developer pulled it into their private registry.
Before the PR can be merged, all content must meet security requirements, which includes artifacts must be signed by trusted identities.
The developer wants to find the identity/owner of the image, vet them and if approved add to the list of of trusted identities.

## Discovering the Identity of an Artifact

All Notary v2 signed artifacts contain [DiD][did] information, providing traceability to the identity of the signer.

> TODO: Include the notary signature property for where this is stored

To assist the user, they may perform:

```bash
notation discover registry.wabbit-networks.io/net-monitor:v1
```

This will surface the `DiD identifier`.

```bash
TODO: output
```

Using this information, the user may find the root public key.

## Configuring Notation Verify with Trusted Identities

Notation has two primary models for configuring a list of trusted identities:

1. `notation cert add` provides a list of public keys.  
See [Configuring Notation Verify with Public Certs](#configuring-notation-verify-with-public-certs) for more info.
2. [Notary v2 Trust Policy][trust-stores], provides a file based list of trusted identities  
   See [Configuring Roots of Trust](#configuring-roots-of-trust) for more info.

## Configuring Notation Verify with Public Certs

With the location of the public key, the user can download the public key and configure with:

```bash
notation cert add <path>
```

## Configuring Roots of Trust

With the location of the public key, the user can download the public key and add to a [trust store][trust-stores]

Trust stores may be stored in configuration management systems as they may be environment specific, deployed as part of the node creation.

[consuming-public-content]: https://opencontainers.org/posts/blog/2020-10-30-consuming-public-content/
[did]:    https://w3c-ccg.github.io/did-method-web/
[notary-v1]:    https://github.com/notaryproject/notary
[tofu]:   https://en.wikipedia.org/wiki/Trust_on_first_use
[trust-stores]: https://github.com/notaryproject/notaryproject/blob/main/trust-store-trust-policy-specification.md