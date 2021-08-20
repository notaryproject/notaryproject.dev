---
title: Notary v2 Integrity Wrapper, Attested by an Entity
decsciption: ""
weight: 1000
---

Notary v2 signatures provide integrity validation, as attested by a given entity.
As content is copied within and across registries, consumers want to know the artifact's integrity remains intact, based on the signature of an entity the user trusts.

As an entity creates a private key, (or key-chain), they sign artifacts with notary v2.
The signature is associated with the subject artifact through the an [artifact.manifest][artifact-manifest-spec]`.subject` property.
This graph of artifacts can be persisted in a registry, and copied within and across registries, supporting [the best practices for consuming public content][consuming-public-content].

![](https://raw.githubusercontent.com/oras-project/artifacts-spec/main/media/net-monitor-with-sigs-copy.svg)

To validate an artifact, a public key is acquired. The public key has no affiliation with the registry the artifact happened to be sourced from. Multiple artifacts from different entities may be placed in the same `registry/repository`. 

The signature is associated with an entity. The user chooses which keys they trust, or which keys they distrust.
Signature validation is configured through policy, based on the configuration at the time of validation. For instance, ACME Rockets may trust artifacts from Docker Hub when importing content into the ACME Rockets shared registry. Artifacts signed by evil-co are only validated if ACME Rockets allows evil-co public keys to be used. During a build process, ACME Rockets may choose to validate artifacts that are signed with ACME Rockets, which were added when the artifact was imported, security scanned and signed with an ACME Rocket Security and Infrastructure teams key.

## Scenario 1: Redistribution

Wabbit Networks produces several products whcih they publish on their company registry; registry.wabbit-networks.io.
When users download the `net-monitor:v1` image from the Wabbit Networks registry, the artifacts are signed by Wabbit Networks.
Users may not know of Wabbit Networks, and may be concerned if the software contains malware.
Although the artifacts, including the associated SBoM is signed by Wabbit Networks, they don't know if they can trust Wabbit Networks.

As a small software company, Wabbit Networks also distributes their software on [Docker Hub][docker-hub] at: 
[wabbitnetworks/net-monitor](https://hub.docker.com/r/wabbitnetworks/net-monitor) which is badged as Docker Certified Content.

The Acme Rockets developer finds the `net-monitor` software on [Docker Hub][net-monitor-on-hub].
Since the security team at Acme Rockets has enabled their developers to download Docker Certified Artifacts, they can import the `net-monitor` image.

## Scenario 2: Curated Consumption

The Security and Infrastructure teams at Acme Rockets have curated a set of content they allow for internal use.
As rocket manufacturers, it's important they understand and secure the content they use.
Developers and operations teams can only utilize content that has been blessed by the Acme Rockets Security and Infrastructure teams.

As content is imported into an internally shared registry (`registry.acme-rockets.io/upstream/products`), the content is security scanned. The results of the security scans are associated with the artifact. If the scanner doesn't block the content due to critical vulnerabilities, the artifact is stamped with approval by adding a *acme-rockets-internally-approved* signature.

> **TODO:** Insert image of the net-monitor software with a wabbit-netowrks SBoM and Signature, then another with the scan results, signed and the approved Acme Rockets signature.

[docker-hub]:               https://hub.docker.com/
[net-monitor-on-hub]:       https://hub.docker.com/r/wabbitnetworks/net-monitor
[artifact-manifest-spec]:   https://github.com/oras-project/artifacts-spec/blob/main/artifact-manifest.md
[consuming-public-content]: https://opencontainers.org/posts/blog/2020-10-30-consuming-public-content/