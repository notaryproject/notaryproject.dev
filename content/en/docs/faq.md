---
title: "Frequently asked questions"
description: "Frequently asked questions about Notary"
type: docs
weight: 8
---

## What registries are compatible with Notary?

The following registries are compatible with Notary for artifact signing and verification:

- [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/?wt.mc_id=azurelearn_inproduct_oss_notaryproject)
- [Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [ORAS Distribution Registry](https://github.com/oras-project/distribution/pkgs/container/registry/64589674?tag=v1.0.0-rc.4)
- [Zot registry](https://zotregistry.io/v1.4.3/)


## JWS signature envelope

**Q: Why JWT is not used as the signature envelope format?**

**A:** JWT uses JWS compact serialization which do not support unsigned attributes. Notary signature requires support for unsigned attributes. Instead we use the *JWS JSON Serialization* representation, which supports unsigned attributes.

**Q: Why JWT `exp` and `iat` claims are not used?**

**A:** Unlike JWT which always contains a JSON payload, Notary envelope can support payloads other than JSON, like binary. Reusing the JWT payload structure and claims, limits the Notary JWS envelope to only support JSON payload, which is undesirable. Also, reusing JWT claims requires following same claim semantics as defined in JWT specifications. The [`exp`](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4) claim requires that verifier MUST reject the signature if current time equals or is greater than `exp`, where as Notary allows verification policy to define how expiry is handled.

## Signature specification

**Q: How will Notary support multiple signature envelope formats?**

**A:** The `mediaType` of artifact manifest's blob identifies the signature envelope type.  
The client implementation can use the aforementioned `mediaType` to parse the signature envelope.

**Q: How will Notary support multiple payload formats?**

**A:** The Signature envelope MUST have a versioning mechanism to support multiple payload formats.
For [JWS JSON serialization](https://github.com/notaryproject/notaryproject/blob/main/specs/signature-envelope-jws.md) signature envelope, versioning is achieved by the `cty` field in ProtectedHeaders.


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

**Q: Does Notary supports `n` out of `m` signatures verification requirement?**

**A:** Notary doesn't support n out m signature requirement verification scheme.
Signature verification workflow succeeds if verification succeeds for at least one signature.

**Q: Does Notary support overriding of revocation endpoints to support signature verification in disconnected environments?**

**A:** TODO: Update after verification extensibility spec is ready.
Not natively supported but a user can configure `revocationValidations` to `skip` and then use extended validations to check for revocation.

**Q: Why user needs to include a complete certificate chain (leading to root) in the signature?**

**A:** Without a complete certificate chain, the implementation won't be able to perform an exhaustive revocation check, which will lead to security issues, and that's the reason for enforcing a complete certificate chain.

**Q: Why are we validating artifact signature first instead of signing identity?**

**A:** Ideally, we should validate the signing identity first and then use the public key in the signing identity to validate the artifact signature.
However, this will lead to poor performance in the case where the signature is not valid as there are lots of validations against the signing identity including network calls for revocations, and possibly we won't even need to read the trust store/trust policy if the signature validation fails.
Also, by validating artifact signature first we will still fail the validation if the signing identity is not trusted.

## Notary Project Terms

**Q: What is the difference between Notary, Notation, TUF, and Notary Project Specifications?**

**A:** Notary and Notation are both artifact signing solutions, but they differ in certain key aspects. Notary is based on [The Update Framework](https://github.com/theupdateframework/specification) (TUF) specification and has both server and client components for interacting with trusted collections. Notation, on the other hand, is not based on TUF and has a client component and libraries. Notation is responsible for signing, verification, and signature portability, as well as integration with third-party key management solutions via a plugin model. The Update Framework (TUF) is a model for ensuring security in package management. Notary is based on this model. However, TUF, as a project under the Notary Project, aims to implement the full TUF specification in a registry-native way, which is an improvement over Notary. Meanwhile, Notary Project Specifications describe how other open source projects and/or vendor tools can interoperate with the Notary project tooling. For further details on each term, please refer to the glossary page.