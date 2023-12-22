---
title: VMware Tanzu Application Catalog now uses Notation for signing and verifying OCI artifacts
author:  Beltran Rueda
date: 2023-12-19
draft: false
---

[VMware Tanzu Application Catalog](https://tanzu.vmware.com/application-catalog), the enterprise edition of [Bitnami Application Catalog](https://bitnami.com/), now leverages [Notation](https://github.com/notaryproject/notation) as a tool for signing and verifying open container initiative (OCI) artifacts (e.g. container images, Helm charts, and metadata bundles).

Tanzu Application Catalog enables enterprises to build their own private catalog of custom-packaged open source application components that are continuously maintained and verifiably tested for use in production environments. Built by leveraging Bitnami’s expertise in packaging hundreds of open source software applications and delivering them to millions of developers, Tanzu Application Catalog aims to address the open source software needs of enterprises by providing them with customized ready-to-deploy open source applications along with extensive metadata for efficient risk assessment.

With this integration, Notation plays a key role in Tanzu Application Catalog’s mission of making open source software enterprise ready.

## What Tanzu Application Catalog achieves by using Notation

* **Ensure content integrity**: By signing their OCI artifacts using Notation, Tanzu Application Catalog team can help ensure the integrity of the OCI artifacts they deliver to their customers. Tanzu team uses Notation to sign their OCI artifacts, creating a unique fingerprint for each version of the artifact. Any tampering with the OCI artifact will result in a failed verification, alerting users to potential security threats.
* **Verify authenticity**: Knowing the source of OCI artifacts is crucial for security and compliance of enterprises. Notation, a client from the Notary Project, helps generate cryptographic signatures to verify artifact authenticity by validating signer's cryptographic identity. Validation helps ensures that the signed applications are built by trusted sources, i.e. Tanzu Application Catalog in this case, reducing the risk of deploying unapproved software.
* **Interoperability across tools and platforms**: Notary Project along with its client tool Notation has standardized signature format. This standardization enables interoperability across different tools, registries, container orchestrators, and platforms that support the OCI image format.

Thus, Notation, with its standards-based tooling for signing and verifying artifacts, helps Tanzu Application Catalog achieve improved security while delivering compliant open source software artifacts for mission critical production use cases.

To read more about how Tanzu Application Catalog leverages Notation, check out [this blog](https://tanzu.vmware.com/content/vmware-application-catalog-resources/tanzu-application-catalog-leverages-notation).

If you are interested in learning more about Tanzu Application Catalog, check out their [product webpage](https://tanzu.vmware.com/application-catalog) and [additional resources](https://tanzu.vmware.com/content/vmware-application-catalog-resources/jun-23-boost-developer-productivity-and-operator-confidence-with-secure-open-source-components).