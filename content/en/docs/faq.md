---
title: "Frequently asked questions"
description: "Frequently asked questions about the Notary Project"
type: docs
weight: 7
---

## What registries are compatible with the Notary Project OCI signature specification and its implementation in Notation?

The following registries are compatible with the Notary Project OCI signature specification and its implementation in Notation:

- [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/?wt.mc_id=azurelearn_inproduct_oss_notaryproject)
- [Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [ORAS Distribution Registry](https://github.com/oras-project/distribution/pkgs/container/registry/64589674?tag=v1.0.0-rc.4)
- [Zot registry](https://zotregistry.io/)
- [Docker Hub](https://hub.docker.com) (via tag fallback schema)

## JWS signature envelope

**Q: Why is JWT not used as the signature envelope format?**

**A:** JWT uses JWS compact serialization which do not support unsigned attributes. Notary Project signature requires support for unsigned attributes. Instead we use the *JWS JSON Serialization* representation, which supports unsigned attributes.

**Q: Why JWT `exp` and `iat` claims are not used?**

**A:** Unlike JWT which always contains a JSON payload, [Notary Project OCI Signature Specification](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/signature-specification.md) envelope can support payloads other than JSON, like binary. Reusing the JWT payload structure and claims, limits the signature envelope to only support JSON payload, which is not extendable. Also, reusing JWT claims requires following same claim semantics as defined in JWT specifications. The [`exp`](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4) claim requires that verifier MUST reject the signature if current time equals or is greater than `exp`, where as the Notary Project's [trust store and trust policy](https://github.com/notaryproject/notaryproject/blob/v1.0.0/specs/trust-store-trust-policy.md) allows verification policy to define how expiry is handled.

## Signature specification

**Q: How will Notation support multiple signature envelope formats?**

**A:** The `mediaType` of artifact manifest's blob identifies the signature envelope type.  
The client implementation can use the aforementioned `mediaType` to parse the signature envelope.

**Q: How will Notation support multiple payload formats?**

**A:** The Signature envelope MUST have a versioning mechanism to support multiple payload formats.
For [JWS JSON serialization](https://github.com/notaryproject/specifications/blob/main/specs/signature-envelope-jws.md) signature envelope, versioning is achieved by the `cty` field in ProtectedHeaders.


## Signature scheme

**Q: What is the relationship of Signing Scheme with Signature Envelope format?**

**A:** Signing Scheme aims to be agnostic of the Signature Envelope format.
A given signing scheme can be implemented through any signature envelope format (such as JWS or COSE) as long as it can support the required signature schema used by the signing scheme.

**Q: Why is the trust store used for Signing Authority (`x509/signingAuthority`) distinct from trust store for Certificate Authority (`x509/ca`), why can’t they share the same trust store?**

**A:** Signing Authority is a different type of trusted entity as compared to Certificate Authority (CA) or Timestamping Authority (TSA).
A CA is trusted for verifying the identity of a signing entity (end user) and issuing it a certificate, whereas a TSA is trusted to generate authentic timestamp.
In contrast, an SA is trusted to generate signatures on behalf of an end user (signature requestor) and also to generate authentic timestamp as part of the signature.
If we use a shared trust store for CA and SA, a verifying entity does not have the ability to differentiate between CA and SA when the verifying entity configures trusted roots in the trust store.
This has implication such as an end user with CA issued certificate can masquerade themselves as an SA by generating a signature with signing scheme `notary.x509.signingAuthority`.

## Trust store and trust policy

**Q: Does the trust policy of the Notary Project specification and its implementation in Notation support `n` out of `m` signatures verification requirement?**

**A:** The Notary Project specifications and its implementation in Notation doesn't support n out m signature requirement verification scheme.
Signature verification workflow succeeds if verification succeeds for at least one signature.

**Q: Does the Notary Project specification and its implementation in Notation support overriding of revocation endpoints to support signature verification in disconnected environments?**

**A:** Not natively supported but a user can configure `revocationValidations` to `skip` and then use extended validations to check for revocation.

**Q: Why user needs to include a complete certificate chain (leading to root) in the signature?**

**A:** Without a complete certificate chain, the implementation won't be able to perform an exhaustive revocation check, which will lead to security issues, and that's the reason for enforcing a complete certificate chain.

**Q: Why are we validating artifact signature first instead of signing identity?**

**A:** Ideally, we should validate the signing identity first and then use the public key in the signing identity to validate the artifact signature.
However, this will lead to poor performance in the case where the signature is not valid as there are lots of validations against the signing identity including network calls for revocations, and possibly we won't even need to read the trust store/trust policy if the signature validation fails.
Also, by validating artifact signature first we will still fail the validation if the signing identity is not trusted.

## Notary Project Terms
Below are the frequently asked questions about Notary Project terms. For detailed definitions of each Notary Project term, please refer to the [glossary]({{< ref "/docs/glossary" >}}) page.

**Q: What is Notary Project?**

**A:** The Notary Project is a set of specifications and tools intended to provide a cross-industry standard for securing software supply chains by using authentic container images and other OCI artifacts. Notary Project is also the name of the GitHub organization that has multiple prominent subprojects like Notation, Notary Project specifications, and Notary. Very often we use the name Notary Project to refer to all the above as well as the community that drives the specifications and the implementations.

**Q: How are Notary and Notary Project related?**

**A:** Notary is one of the subprojects under the Notary Project organization. Notary uses The Update Framework (TUF) to implement client and server components that run and interact with trusted collections that describe the content in a container registry. The name Notary comes from the `notary` CLI that is used to manage the trusted collections. The code that has the implementation of the client and the server components is available in the [notaryproject/notary](https://github.com/notaryproject/notary) repository.

**Q: What is the difference between Notary Project and TUF?**

**A:** [The Update Framework (aka TUF)](https://github.com/theupdateframework) is a CNCF graduated project that helps developers maintain the security of software update systems. TUF is a separate community and separate GitHub organization. One of the subprojects under Notary Project, [`notary`](https://github.com/notaryproject/notary), uses TUF for the implementation. 

**Q: What is Notary Project specification?**

**A:** Due to some portability challenges with the TUF-based implementation in Notary, circa 2019, the Notary Project community decided to work on a portable signature specification. This resulted in the creation of the [specifications](https://github.com/notaryproject/specifications) subproject. The Notary Project specifications are shared across repositories under Notary Project as well as used by other open-source projects and/or vendor tools that want to interoperate with the Notary Project tooling. The Notary Project community plans to add other specifications in the future as our work on software supply chain evolves.

**Q: Does Notary Project signature specification leverage TUF?**

**A:** No, the Notary Project [signature specification](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/signature-specification.md) does not leverage TUF.

**Q: What is the difference between Notation and Notary?**

**A:** [Notation](https://github.com/notaryproject/notation) and [Notary](https://github.com/notaryproject/notary) are both subprojects of Notary Project and offer capabilities for signing container images. Notation implements the new [Notary Project signing specification and workflows](https://github.com/notaryproject/specifications/) while Notary is based on [The Update Framework](https://theupdateframework.com) (TUF) and does not implement any of the Notary Project specifications. While Notation has a CLI and libraries and leverages existing key management infrastructure and [OCI-compliant](https://opencontainers.org/) registries, Notary has a server and client components. An example of a `notary` implementation is Docker Content Trust (DCT). In addition to signing artifacts, Notation handles artifact verification, signature portability, and integration with third-party key/certificate management solutions via a plugin model.

**Q: I've heard the term "Notary v2". What does this mean?**

**A:** The term "Notary v2" or "notary v2" was previously used by members of the Notary Project community and others. However, various meanings were ascribed to it, leading to its ambiguous usage with some people referring to it as the entire Notary Project and others as the [Notation CLI](https://github.com/notaryproject/notation). Because of this ambiguity, the term "Notary v2" or "notary v2" is no longer used by the Notary Project community. While the term may still be visible in some articles on the internet, the name "Notary v2" or "notary v2" is only preserved for historical reasons and will not be used by the Notary Project community going forward.
