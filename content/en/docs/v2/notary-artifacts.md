---
title: Notary v2 and ORAS Artifacts
description: "The separation between Notary v2 persistance of signatures and ORAS Artifacts"
weight: 1000
---

Notary v2 provides signatures that attests to the integrity of an artifact, as they are stored within an [OCI distribution-spec conformant][oci-dist-conformance] registries.
The attestation and trust of the attestation is based on the entity that signs the artifact.

Notary v2 signatures are persisted as a `blob` within an [artifact.manifest][artifact-manifest-spec]. The `manifest.subject` links the signature to the artifact it's attesting to. The Notary v2 signature is pushed to the registry, storing the signature and it's reference to subject artifact.

The Notary Project is independent from the [ORAS Artifacts][artifacts-repo]. Notary v2 depends upon Artifacts to persist, discover and pull Notary v2 signatures, however [ORAS Artifacts][artifacts-repo] is used to store other artifact types, including Software Bill of Materials (SBoM), Security Scan Results and possibly some other signature formats.


[artifact-manifest-spec]:   https://github.com/oras-project/artifacts-spec/blob/main/artifact-manifest.md
[artifacts-repo]:           https://github.com/oras-project/artifacts-spec
[oci-dist-conformance]:     https://github.com/opencontainers/oci-conformance/tree/main/distribution-spec
