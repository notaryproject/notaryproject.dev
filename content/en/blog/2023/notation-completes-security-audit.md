# Announcing results of Notation security audit 2023

In early 2023, Notary Project, under the guidance of CNCF began work with Ada Logics to perform the first security audit of Notation libraries and Notation CLI, a reference implementation of the latest Notary Project specifications. Ada Logics discovered seven issues and they had been triaged and resolved by Notary Project maintainers. 

This blog post summarizes the overall findings and notes a few things learnt from the security audit, which was preceded by a related but independent Audit.
 
We are very grateful to Cloud Native Computing Foundation for funding this work and helping drive this effort, to OSTIF for arranging the audit, and to Ada Logics for actually conducting the audit and releasing the audit report.
 
### Summary of Findings
 
Ada Logics identified seven issues of varying severity - one high, two moderate, three low and one informational which were all fixed in Notation RC-6. All subsequent releases of Notation CLI including latest RC-7 and the upcoming 1.0.0 includes the fixes. The Notary Project maintainers created CVEs for 3 issues, and tracked the remaining issues as non-CVEs involving documentation or CLI command flags name changes.

* Potential endless data attack in `notation ls`, ADA-NOT-23-1, aka CVE-2023-33958, fixed in RC-6.
* Max allowed signatures could lead to an endless data attack, ADA-NOT-23-2, aka CVE-2023-33957, fixed in RC-6
* Overwriting global variable, ADA-NOT-23-3, fixed in RC-6
* In Progress,  Insufficient security-relevant documentation findings, ADA-NOT-23-4, are fixed with updates for plugin management,plugin development, and securely deploying Notation (228). 
* Cleartext Storage of Sensitive Information in an Environment Variable, ADA-NOT-23-5, fixed by how to authenticate to OCI registries documentation.
* Insufficient Verification of Fetched Artifact Descriptor, ADA-NOT-23-6, aka CVE-2023-33959, fixed in RC-6
* Denial of Service from Resource Exhaustion in `notation inspect`, ADA-NOT-23-7, fixed in RC-6

 
### Details by category of Findings
 
1. Endless data attack can cause resource exhaustion leading to Denial of Service attack (ADA-NOT-23-1, ADA-NOT-23-2, and ADA-NOT-23-7)
Issue was initially reported for the “notation list” command which lists all signature artifacts associated with a signed image (OCI artifact) but this can also affect other CLI commands such as notation inspect, or notation verify which pulls all signatures associated with an image. Refer related CVE-2023-33957 and CVE-2023-33958 for details. The concern was a threat actor could cause denial of service attack by associating large number of signatures to an OCI artifact, such as a container image, and causing Notation to endlessly enumerate all signatures. The fix was relatively straightforward to have a default configurable max limit of 100 signatures that Notation CLI will enumerate for any given operation. Users can adjust this number for their unique needs.

2. Overwriting a Global Variable (ADA-NOT-23-3)
This was an informational issue where notation was overwriting global import identifier. Notation maintainers fixed the issue, a best practice, even though there is no known attack vector to exploit the issue.

 
3. Improving/Insufficient Documentation and CLI commands (ADA-NOT-23-4 and ADA-NOT-23-5)
Notation maintainers have improved documentation to include best practices for securely deploying Notation, developing plugins, managing plugins, validating plugins are consumed from a trusted source, and renamed plain-http flag to insecure-registry to clarify its implications that authenticating to registries over HTTP is insecure and should only be used for test environments. 
 
4. Validating unintended artifact (ADA-NOT-23-6) 
This issue allowed threat actors, who have compromised the registry, to sign or verify the artifact other than intended one. Refer related  CVE-2023-33959 for more details. The fix was in notation-go library to validate that the descriptor signed or verified by Notation is the one provided by user.
 
### Processes

The Notary Project team is extremely proud of releasing Notation and partnering with Ada Logics to auditing and improving Notation CLI and its associated libraries security posture. The issues reported by Ada Logics gave us an opportunity to validate and improve our development and release processes.
 
Notation enabled ‘Privately reporting a security vulnerability’ feature for GitHub, which allows users/security researchers to securely report any issue to Notation maintainers. Standardized issue tracking in GitHub also gives us an easy way to look back and evaluate what we have done and identify trends. 

### Community

As the Notary Project team has worked on vulnerabilities reported by Ada Logics, community-led activity has delighted us to contribute security enhancements such as enhancing documentation on how to develop, deploy and manage plugins.

Plugins enhance the usability of Notation, as customers, partners, and users can all iterate on top of Notation without forking it and still use their own unique Key and Certificate managers, signing services, and verification policy needs. This work demonstrates the vitality of the Notary Project community.

## Fuzzing

The Notary Project announced the completion of its fuzzing security audit in Mar 2023. The audit was also carried out by Ada Logics and is part of [an initiative by the CNCF](https://www.cncf.io/blog/2022/06/28/improving-security-by-fuzzing-the-cncf-landscape/) to bring fuzzing to the CNCF landscape. The fuzzing audit resulted in 20 fuzzers written for 3 Notation code repositories and 2 issues being identified and addressed including a critical security fix. The full report from the fuzzing audit is available [here](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf).
 
### SLSA

Supply chain Levels for Software Artifacts (SLSA) is a check-list of standards and controls to prevent tampering, improve integrity, and secure software packages and infrastructure. It is organized into a series of levels that provide increasing integrity guarantees.

Notation has not generated provenance artifacts in release process yet. The Notary maintainers has a plan to generate the provenance artifacts for Notation to ensure the origins of the project.


### Conclusion
 
The Notary Project maintainers owe a huge thanks to the CNCF, OSTIF, and Ada Logics for sponsoring, facilitating, and conducting this security audit. Aside from their observations above, the auditors note that Notation  follows a high level of industry standards in dealing with security.

If you have questions about the audit report, reach out to Notary Project maintainers in the [#notary-project](https://cloud-native.slack.com/messages/notary-v2/) channel in the [CNCF](https://slack.cncf.io/) Slack workspace. If you find any security vulnerability, plese use the GitHub Security Vulnerability Disclosure process for each one of the Notary Project repositories by following this [guide](https://github.com/notaryproject/.github/blob/main/SECURITY.md#reporting-a-vulnerability).