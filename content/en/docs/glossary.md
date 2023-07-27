---
title: Glossary
description: A list of Notary Project's terminologies 
weight: 11
---
### Notary 
Notary is a TUF [(The Update Framework)](https://github.com/theupdateframework/specification) based artifact signing solution. It consists of both [server](https://github.com/notaryproject/notary/blob/master/cmd/notary-server) and [client](https://github.com/notaryproject/notary/blob/master/cmd/notary) components for running and interacting with trusted collections. The client component is referred to as the Notary command-line interface (CLI), which handles tasks such as signing and pushing container images to a registry and updating metadata. The CLI communicates with the registry and the key and metadata management server component.
### Notation
Notation is a non-TUF-based artifact signing solution. It refers to the implementation of the Notation CLI and the Notation Go libraries. Notation offers signing and verification workflows for OCI artifacts, enables signature portability across OCI-compliant registries, and facilitates integration with 3rd party key management solutions through a plugin model. The CLI itself is referred to as the "Notation CLI," while the libraries are referrred to as the [Notation-Go](https://github.com/notaryproject/notation-go) library and the [Notation-Core-Go](https://github.com/notaryproject/notation-core-go) library. These libraries can be used independently of the Notation CLI.
### Notary Project Specifications
Notary Project Specifications are a collection of specifications distributed across "subprojects" within the Notary Project. These specifications are also utilized by other OSS projects and/or vendor tools that seek to interoperate with the Notary project tooling.

Notary Project specifications are categorized into:

**OCI Signature Specifications:**
These specifications are specific to the Open Container Initiative (OCI). It describes how the Notary Project's Signing Scheme is applied to signatures stored in OCI registries. This category includes the following specifications:
- [Notary Project OCI Signature Specification](https://github.com/notaryproject/notaryproject/blob/main/specs/signature-specification.md)
- [Notary Project OCI Signing and Verification Workflow](https://github.com/notaryproject/notaryproject/blob/main/specs/signing-and-verification-workflow.md)
- [Notary Project OCI COSE Envelope](https://github.com/notaryproject/notaryproject/blob/main/specs/signature-envelope-cose.md)
- [Notary Project OCI JWS Envelope](https://github.com/notaryproject/notaryproject/blob/main/specs/signature-envelope-jws.md)

**Signing Scheme Specification:** The Signing Scheme Specification is not specific to any particular storage method. It describes the supported signing schemes. Any tool that supports those schemes might be able to produce signatures that are compatible with Notary Project tools. The specification under this category includes the [Notary Project Signing Scheme.](https://github.com/notaryproject/notaryproject/blob/main/specs/signing-scheme.md)
### TUF
The Update Framework(TUF) is a project under the Notary Project that aims to implement the full TUF specification in a registry-native way. The initial version of Notary did not support transferring signatures between different registries and did not gain widespread adoption. The TUF project aims to develop an enhanced version of Notary, addressing these limitations and encouraging widespread adoption and usage.