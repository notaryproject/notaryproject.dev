---
title: Notary v2 Trojan Horse Validation
description: "Notary v2 protects from Trojan Horse exploits by validating signatures independently from the artifact."
weight: 1000
---

Trojan Horse exploits exist when an exploited artifact is pulled into an environment before its integrity has been validated, based on a trusted authority.

## Scenario: Trojan Horse Exploit

The **evil-co** publishes a hacked version of a `hello-world` image. Prior to running the image, a validation is done, however the signature was included as one of the layers in the hello-world container image. One of the exploits injects exploited code into a commonly used base layer. As the image layers are pulled and expanded, the signature is evaluated. The evil-co signature doesn't pass signature validation as the evil-co public key isn't included in the Notary v2 validation policy.
As a result, the container-run command was stopped, however since the layers were pulled and expanded, the common layer exploit remains on the node.
A validated container image is pulled, referencing the exploited common layer. Although the evil-co image failed validation, exploited content is a Trojan Horse, getting into the environment prior to validation.

## Notary V2 Trojan Horse Protection

Through the use of [Artifact ReferenceType][artifact-references] support, Notary v2 signatures are persisted as separable artifacts. When an artifact requires validation, a Notary v2 based client can identify the signatures required for validation, pull the signature from the registry independently from the artifact and only proceed with the artifact pull after the signature has been independently verified.

By validating the Notary v2 signature independently from the artifact, the artifact is only pulled into the secured environment after it's validated.

> **TODO:** imagery for trojan horse exploit and notary v2 protection

[artifact-references]:    artifact-references