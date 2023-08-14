---
title: "Verification of container image on Kubernetes"
description: "This guide describes the verification of container image before deploying on Kubernetes Cluster"
type: docs
weight: 11
---
As container images continue to be distributed across various channels, it becomes increasingly important for consumers to ensure that the downloaded container images are authentic before deploying them into their Kubernetes environment. This practice helps mitigate potential cyber threats. Container image verification is the process of evaluating the digital signature of a container image to determine if a container image is considered authentic. Let’s say, you’ve downloaded a signed image from a public source for deployment within your Kubernetes cluster. How do you validate the authenticity and integrity of the image? Which tools should you use for verifying signed images during deployment? This guide describes verification scenarios on Kubernetes and suggests tools for validating signed container images before deploying them on Kubernetes. Let's take a look at this scenario in more detail:

## Verification Scenario on Kubernetes
This scenario describes a series of steps that a software publisher and consumer go through to ensure the integrity of a software package. 

The software publisher builds and pushes an application to a container registry such as Docker Hub.  This process results in the creation of a container image. Before making the container image accessible to the public, the software publisher uses the [Notation Command Line Interface (CLI)]({{< ref "/docs/installation/cli" >}}) to generate cryptographic keys for signing the image. These keys consist of a private key for creating a digital signature and a corresponding public key for image verification.

After signing the image, it gets uploaded to a public repository such as GitHub Packages, using the [OCI Registry As Storage (ORAS) command line](https://oras.land/docs/installation) tool. Potential users are required to verify the image before using it. Users can use the  Notation CLI to validate the signature digest and inspect the signature along with its certificate information to confirm the image's authenticity. However, an additional layer of security is applied to validate images before deployment on Kubernetes. Users can use any Open Policy Agent (OPA) or admission controller of their choice to define and enforce policies to ensure images meet established security and authenticity criteria. The admission controller operates on specified policies to validate image deployment on Kubernetes. If the image is signed by a trusted source, it admits the image into Kubernetes resources, ready for deployment. However, if the image is unsigned or does not pass the authenticity check, its deployment gets blocked, preventing any potentially malicious or tampered images from being deployed into the Kubernetes cluster.

The following solutions can be used to verify signed container images before deployment on Kubernetes:
## Ratify and OPA GateKeeper 
Within your Kubernetes environment, [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper) can be utilized as the admission controller for defining policies that artifacts must adhere to, alongside [Ratify](https://github.com/deislabs/ratify), to validates the admission of only signed images for deployment. Refer to this article on how to [Sign and verify an image with Notation, Ratify, and OPA Gatekeeper](https://ratify.dev/blog/sign-and-verify-image-with-notation-ratify).

## Kyverno
[Kyverno](https://kyverno.io/#td-block-1) is a policy engine designed for Kubernetes. It allows users to generate Kubernetes policies to validate, mutate, generate, and clean up Kubernetes resources, and [verify image signatures](https://kyverno.io/docs/writing-policies/verify-images/notary/#verifying-image-signatures) and artifacts to help secure the software supply chain.