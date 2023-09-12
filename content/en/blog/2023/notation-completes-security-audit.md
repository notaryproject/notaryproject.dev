---
title: Announcing results of Notation security audit 2023
author:  "Notary Project maintainers"
date: 2023-07-06
draft: false
---

In early 2023, Notary Project, under the guidance of [Cloud Native Computing Foundation](https://cncf.io/) began work with [Ada Logics](https://adalogics.com/) to perform the first security audit of the Notation libraries and CLI. The Notation libraries and CLI are a reference implementation of the latest Notary Project specifications. Ada Logics discovered seven issues and those issues have been fixed by Notary Project maintainers. This blog post summarizes the overall findings and notes a few things learnt from the security audit result.
 
We are very grateful to the CNCF for funding this work, the [OSTIF for arranging the audit](http://ostif.org/ostifs-security-audit-of-notation-duly-noted/), and Ada Logics for [conducting](https://adalogics.com/blog/notation-security-audit-2023) and [releasing](https://github.com/notaryproject/notaryproject/blob/main/security/reports/audit/ADA-notation-security-audit-23.pdf) the security audit.
 
## Summary of findings
 
Ada Logics identified seven issues of varying severity:
- one high-severity issue
- two moderate-severity issues
- three low-severity issues
- one informational issue 

All issues were fixed in [Notation v1.0.0-RC.6](https://notaryproject.dev/blog/2023/announcing-notation-rc6/). As a result, all subsequent releases of Notation CLI, including latest RC-7 and the upcoming 1.0.0 release, includes these fixes. The Notary Project maintainers created CVEs for three issues, and tracked the remaining four issues as non-CVEs involving documentation or CLI command flags name changes.

Below are the specific details for the seven issues identified in the security audit:

* Potential endless data attack in `notation ls`, ADA-NOT-23-1, aka [CVE-2023-33958](https://github.com/notaryproject/notation/security/advisories/GHSA-rvrx-rrwh-r9p6), fixed in Notation-v1.0.0-RC.6.
* Max allowed signatures could lead to an endless data attack, ADA-NOT-23-2, aka [CVE-2023-33957](https://github.com/notaryproject/notation/security/advisories/GHSA-9m3v-v4r5-ppx7), fixed in Notation-v1.0.0-RC.6.
* Overwriting global variable could lead to undefined behavior of Notation in the future, ADA-NOT-23-3, fixed in Notation-v1.0.0-RC.6.
* Insufficient security-relevant documentation findings, ADA-NOT-23-4, are fixed with documentation updates in [securely deploy Notation](https://notaryproject.dev/docs/concepts/secure-deployment/). 
* Clear text storage of sensitive information in an environment variable, ADA-NOT-23-5, fixed by adding security best practice document on [how to authenticate to OCI registries](https://notaryproject.dev/docs/how-to/registry-authentication/).
* Insufficient verification of fetched artifact descriptor, ADA-NOT-23-6, aka [CVE-2023-33959](https://github.com/notaryproject/notation-go/security/advisories/GHSA-xhg5-42rf-296r), fixed in Notation-v1.0.0-RC.6.
* Denial of service from resource exhaustion in `notation inspect`, ADA-NOT-23-7, fixed in Notation-v1.0.0-RC.6.
 
## Details by category of findings
 
### Endless data attack can cause resource exhaustion leading to denial of service attack (ADA-NOT-23-1, ADA-NOT-23-2, and ADA-NOT-23-7)

This issue was initially reported for the `notation list` command which lists all signature artifacts associated with a signed image (OCI artifact). This issue can also affect other CLI commands such as `notation inspect`, or `notation verify` which pulls all signatures associated with an image. Refer to [CVE-2023-33957](https://github.com/notaryproject/notation/security/advisories/GHSA-9m3v-v4r5-ppx7) and [CVE-2023-33958](https://github.com/notaryproject/notation/security/advisories/GHSA-rvrx-rrwh-r9p6) for details. The concern was a threat actor could cause denial of service attack by associating large number of signatures to an OCI artifact, such as a container image, and causing Notation to endlessly enumerate all signatures. The fix was relatively straightforward to have a default configurable maximum limit of 100 signatures that Notation CLI will enumerate for any given operation. Users can adjust this number for their unique needs.

### Overwriting a global variable could lead to undefined behavior (ADA-NOT-23-3)

Notation overwrites a global import identifier in the verification command. There is no current way to exploit this issue, but it could lead to undefined behavior of Notation in the future, if a contributor adds code that allows an attacker to trigger an issue. The issue is flagged informational since we have found no attack vector.
 
### Insufficient documentation and non-descriptive CLI command (ADA-NOT-23-4 and ADA-NOT-23-5)

Notation maintainers have improved documentation to include security best practices for
- [Securely deploying Notation](https://notaryproject.dev/docs/concepts/secure-deployment/)
- [Securely developing and managing plugins](https://notaryproject.dev/docs/concepts/secure-plugin-development/). Ensure plugins are downloaded from a trusted source
- Renamed `plain-http` flag to `insecure-registry` to clarify that authenticating to registries over HTTP is insecure and should only be used for testing purposes 
 
### Validating unintended artifact (ADA-NOT-23-6)

This issue allowed threat actors, who have compromised the registry, to sign or verify the artifact other than intended one. Refer to [CVE-2023-33959](https://github.com/notaryproject/notation-go/security/advisories/GHSA-xhg5-42rf-296r) for more details. The issue has been fixed in the notation-go library to validate that the descriptor signed or verified by Notation is the one provided by user.

## Fuzzing

The Notary Project announced the completion of its fuzzing security audit in Mar 2023. The audit was also carried out by Ada Logics and is part of [an initiative by the CNCF](https://www.cncf.io/blog/2022/06/28/improving-security-by-fuzzing-the-cncf-landscape/) to bring fuzzing to the CNCF landscape. The fuzzing audit resulted in 20 fuzzers written for 3 Notation code repositories and 2 issues being identified and addressed including a critical security fix. The full report from the fuzzing audit is available [here](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf).
 
## SLSA

Supply chain Levels for Software Artifacts (SLSA) is a check-list of standards and controls to prevent tampering, improve integrity, and secure software packages and infrastructure. It is organized into a series of levels that provide increasing integrity guarantees.

Notation build process does not generate provenance artifacts. The Notary Project maintainers have a plan to generate the provenance artifacts for Notation to ensure the origins of the binaries.

## Conclusion
 
The Notary Project maintainers owe a huge thanks to the CNCF, OSTIF, and Ada Logics for sponsoring, facilitating, and conducting this security audit. Aside from their observations above, the auditors noted that Notation contributors follow high security standards and best practices for implementation.

If you have questions about the audit report, reach out to Notary Project maintainers in the [#notary-project](https://cloud-native.slack.com/messages/notary-project/) channel of the [CNCF](https://slack.cncf.io/) Slack workspace. If you find any security vulnerability, please use the GitHub Security Vulnerability Disclosure process for each one of the Notary Project repositories by following this [guide](https://github.com/notaryproject/.github/blob/main/SECURITY.md#reporting-a-vulnerability).