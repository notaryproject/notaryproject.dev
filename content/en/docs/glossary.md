---
title: Glossary
description: A list of Notary Project's terminologies 
weight: 11
---
## Notary Project 
The Notary Project refers to the [GitHub organization](https://github.com/notaryproject), the community, all specifications, and all the repositories under the GitHub organization, including community-released tools like [notary](https://github.com/notaryproject/notary) and [notation](https://github.com/notaryproject/notation).
## Notary 
Notary is a TUF [(The Update Framework)](https://theupdateframework.com/) based artifact signing **implementation**. It consists of a server and client components. The server infrastructure tightly integrates with the container registry and keeps track of the images pushed to the registry. The client component is referred to as the notary command-line interface (CLI), which handles tasks such as signing and pushing container images to a registry and updating metadata. The CLI communicates with the registry and the key and metadata management server component. The most prominent use of this implementation is in Docker Content Trust (DCT). The server and the client implementation can be found in the [notary](https://github.com/notaryproject/notary) repository under the Notary Project organization.
## Notation
Notation, based on new set of specifications unrelated to TUF, is a newer implementation from the Notary Project. It refers to the implementation of the Notation CLI and the Notation libraries. Notation offers signing and verification workflows for OCI artifacts, enables signature portability across OCI-compliant registries, and facilitates integration with third-party key management solutions through a plugin model. The CLI itself is referred to as the [Notation CLI](https://github.com/notaryproject/notation) while the libraries are referred to as the [Notation-Go](https://github.com/notaryproject/notation-go) library and the [Notation-Core-Go](https://github.com/notaryproject/notation-core-go) library. Stakeholders can use libraries independently of the Notation CLI for integrating Notation with their own client tools.
## Notary Project Specifications
Notary Project Specifications, mainly created between years 2021-2022, are a collection of specifications distributed across "subprojects" within the Notary Project. Notation CLI and libraries have implemented these specifications, which are also utilized by other OSS projects and/or vendor tools that seek to interoperate with the Notary Project tooling. These specifications are stored in the [specifications](https://github.com/notaryproject/specifications) repository under the Notary Project.

Notary Project specifications are categorized into:

**OCI Signature Specifications:**
These specifications are specific to the [Open Container Initiative (OCI)](https://github.com/opencontainers). It describes how the Notary Project's Signing Scheme is applied to signatures stored in OCI registries. This category includes the following specifications:
- [Notary Project OCI Signature Specification](https://github.com/notaryproject/specifications/blob/main/specs/signature-specification.md)
- [Notary Project OCI Signing and Verification Workflow](https://github.com/notaryproject/specifications/blob/main/specs/signing-and-verification-workflow.md)
- [Notary Project OCI COSE Envelope](https://github.com/notaryproject/specifications/blob/main/specs/signature-envelope-cose.md)
- [Notary Project OCI JWS Envelope](https://github.com/notaryproject/specifications/blob/main/specs/signature-envelope-jws.md)

**Signing Scheme Specification:** The Signing Scheme Specification is not specific to any particular storage method. It describes the supported signing schemes. Any tool that supports those schemes might be able to produce signatures that are compatible with Notary Project tools. The specification under this category includes the [Notary Project Signing Scheme.](https://github.com/notaryproject/specifications/blob/main/specs/signing-scheme.md)
## TUF
TUF refers to [The Update Framework](https://theupdateframework.com/). A [tuf](https://github.com/notaryproject/tuf) repository under the Notary Project organization is intended for prototyping the storage of TUF metadata in OCI-compliant registries. It is not under active development at the moment.