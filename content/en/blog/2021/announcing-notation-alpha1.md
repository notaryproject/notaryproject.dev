---
title: Announcing Notary v2 alpha 1
author:  "[Steve Lasker](https://github.com/stevelasker), Microsoft Azure"
date: 2021-10-26
draft: false
---

Notary v1, otherwise known as Docker Content Trust, was released at at a time when there was one primary registry: Docker Hub. A lot has changed since then, some design choices around Trust on First Use (TOFU), key management, and a lack of content promotion within and across registries have become limiting factors for Docker Content Trust and Notary v1.

At KubeCon EU 2019, container image signing was the main topic of interest for a small group in the community. By December 2019, a [multi-cloud, multi-vendor meeting kicked off Notary v2](https://github.com/notaryproject/meeting-notes/blob/main/meeting-notes-2019.md), as it was clear the time had come to solve the container image signing problem.
Since 2019, multiple prototypes have been built validating the intended experiences around the [Notary v2 goals][notary-v2-goals], including how [The Update Framework](https://theupdateframework.io/) metadata can be partitioned, supporting content promotion.

***Today, we are happy to announce the [alpha 1 release][notary-v2-release] of the [Notary v2 project][notary-v2] is ready for your feedback.***

Notary v2 enables signing of all artifacts (Container Images, Software Bill of Materials, Scan Results) stored in [OCI Distribution][oci-distribution] based registries, with [ORAS artifacts spec][oras-artifacts] enhancements.
A key tenant of Notary v2 is that it enables promotion of signed artifacts within and across registries, including air-gapped and private network environments.

![Graphic demonstrating promotion of an artifact, including building, importing, and deploying it](../announcing-notation-alpha1/artifact-promotion.svg)

In addition to signature promotion, Notary v2 focuses on ease of use, with minimal dependencies. While Notary v2 can integrate with other supply chain efforts, there are no additional services required to sign or validate an artifact.
As artifacts get promoted, users/entities may add new signatures, attesting to the validity of the content for the target environment, enabling a secure supply chain workflow.

Through signing, users choose the artifacts they trust, from the entities they trust, [decoupling location from identity](https://stevelasker.blog/2021/09/24/separating-identity-from-location/).

The Notary v2 Alpha includes the following releases:
- [notation][notation-release] - CLI enabling test-cert creation, cert/key configuration, sign and verify capabilities.
- [notation-go-lib][notation-lib-release] - a set of Go libraries that may be incorporated into other tools, providing sign, configuration and verify capabilities.
- [Notary v2 specs][notary-v2-specs] - providing the specifications, such as the [signature specification](https://github.com/notaryproject/notaryproject/blob/main/signature-specification.md)

To get a sense for how users can use the notation cli, we'll walk through a few quick examples.

### Sign & Verify

Signing and verification with the notation cli is as simple as:

```bash
export IMAGE=localhost:5000/net-monitor:v1
notation cert generate-test --default "wabbit-networks.io"
notation sign $IMAGE
notation cert add --name "wabbit-networks.io" ~/.config/notation/certificate/wabbit-networks.io.crt
notation verify $IMAGE
```

![Animated screencast showing an image being signed using the notation CLI](../announcing-notation-alpha1/sign-verify.gif)

### Add and Sign other Supply Chain Artifacts

Notary v2 supports signing any artifacts stored in a registry, including SBOMs and Scan Results. Using [notation-go-lib][notation-lib-release], tooling may incorporate these capabilities directly into various artifact CLIs.

```bash
export PRIVATE_REGISTRY=localhost:5050
export PRIVATE_REPO=${PRIVATE_REGISTRY}/net-monitor
export PRIVATE_IMAGE=${PRIVATE_REPO}:v1

# Simulate an SBOM
echo '{"version": "0.0.0.0", "artifact": "'${IMAGE}'", "contents": "good"}' > sbom.json

# Push to the registry with the oras cli
oras push $REPO \
  --artifact-type sbom/example \
  --subject $IMAGE \
  sbom.json:application/json

# Capture the digest of the SBOM, to sign it
SBOM_DIGEST=$(oras discover -o json \
                --artifact-type sbom/example \
                $IMAGE | jq -r ".references[0].digest")

notation sign $REPO@$SBOM_DIGEST

# Generate scan results with snyk
docker scan --json $IMAGE > scan-results.json
cat scan-results.json | jq

# Push the scan results to the registry, referencing the image
oras push $REPO \
  --artifact-type application/vnd.org.snyk.results.v0 \
  --subject $IMAGE \
  scan-results.json:application/json

# Capture the digest of the scan result, to sign the scan results
SCAN_DIGEST=$(oras discover -o json \
                --artifact-type application/vnd.org.snyk.results.v0 \
                $IMAGE | jq -r ".references[0].digest")

notation sign $REPO@$SCAN_DIGEST

# Only 1 tag, representing the one artifact
curl $PRIVATE_REGISTRY/v2/net-monitor/tags/list | jq

# Discover the additional attributes
oras discover -o tree $PRIVATE_IMAGE
```

![Animated screencast showing an SBOM and scan results being pushed using ORAS and signed using the notation CLI](../announcing-notation-alpha1/additional-objects.gif)

## Notation Alpha 1 Features

The [Notation alpha 1 release][notation-release] supports the following [Notary v2 goals][notary-v2-goals]:
- Offline signature creation
- Signatures attesting to authenticity and/or certification
- Maintain the original artifact digest and collection of associated tags, supporting existing dev through deployment workflows
- Multiple signatures per artifact, enabling the originating vendor signature, public registry certification and user/environment signatures
- Signature persistance within an [OCI distribution-spec][oci-distribution] based registry, with [oras artifacts spec][oras-artifacts] enhancements
- Air-gapped environments, where the originating registry of content is not accessible
- Artifact and signature copying within and across [OCI distribution-spec][oci-distribution] based registries, with [oras artifacts spec][oras-artifacts] enhancements
- Verification of signatures, through a configuration based policy

Future versions of Notation will include:

- Certificate revocation
- Verification through policy, enabling environment specific validations
- OCI Distribution 1.0 support (registries that don't yet support the oras artifacts spec enhancements)
- TUF meta-data support, enabling compromise resilience, revocation of keys and artifacts, and timeliness guarantees

## Getting Started

Here are some resources to help get started with Notation and Notary V2:

- [Notation CLI Alpha 1 release][notation-release]
- [Notation Quick Start](https://github.com/notaryproject/notation#notation-quick-start)
- [Join the notary v2 community](https://github.com/notaryproject/notation#community)

[notary-v2]:              https://github.com/notaryproject/notaryproject/
[notary-v2-goals]:        https://github.com/notaryproject/notaryproject/blob/main/requirements.md#goals
[notation-release]:       https://github.com/notaryproject/notation/releases/tag/v0.7.0-alpha.1
[notary-v2-release]:       https://github.com/notaryproject/roadmap/blob/main/RELEASENOTES/v2.0.0.alpha-1.MD
[notation-lib-release]:   https://github.com/notaryproject/notation-go-lib/releases/tag/v0.7.0-alpha.1
[notary-v2-specs]:        https://github.com/notaryproject/notaryproject/releases/tag/v1.0.0-draft.1
[oci-distribution]:       https://github.com/opencontainers/distribution-spec
[oci-artifacts]:          https://github.com/opencontainers/artifacts
[oras-artifacts]:         https://github.com/oras-project/artifacts-spec/
