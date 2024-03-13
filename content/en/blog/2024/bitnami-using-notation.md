---
title: Bitnami now uses Notation for signing and verifying images on DockerHub
author:  Beltran Rueda
date: 2024-03-18
draft: true
---

Bitnami-packaged open source software container images and Helm charts [available in DockerHub](https://hub.docker.com/u/bitnami) are now signed by [Notation](https://github.com/notaryproject/notation).

[Bitnami](https://bitnami.com) provides the latest versions of pre-packaged, hardened, ready-to-deploy open source software application packages that enable developers to hit the ground running when building new applications and services on any platform. Bitnami open source software packages are highly popular with developers with over 500 million pulls per month and over 2 billion computer hours per year. This strong developer community of Bitnami has leveraged its robust application catalog to build millions of applications for almost 20 years now.

In December 2023, [we announced](https://tanzu.vmware.com/content/tanzu-application-catalog-resources/tanzu-application-catalog-leverages-notation) that Tanzu Application Catalog, the enterprise edition of Bitnami Application Catalog, started making use of Notation as a tool for signing and verifying open container initiative (OCI) artifacts (e.g. container images, Helm charts, and metadata bundles.

Now, we are happy to have extended our collaboration with Notation and announce the extension of this capability to the community edition of Bitnami-packaged container images and Helm charts in DockerHub as well.

To know more about the benefits that the Bitnami users stand to enjoy with this integration and to learn how to verify the signature of a Bitnami-package, check out [this blog](https://blog.bitnami.com/2024/03/bitnami-packaged-containers-and-helm.html).

If you are interested in learning more about Tanzu Application Catalog, check out their [product webpage](https://tanzu.vmware.com/application-catalog) and [additional resources](https://tanzu.vmware.com/content/vmware-application-catalog-resources/jun-23-boost-developer-productivity-and-operator-confidence-with-secure-open-source-components).
