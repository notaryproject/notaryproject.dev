---
title: Notary Project Completes Its Second Audit!
author:  "Notary Project Community"
date: 2025-01-21
draft: false
---


> This blog post was original published on [OSTIF blog](https://ostif.org/notaryproject-cryptography-audit-2025/) by Helen Woeste, Communications Manager, the Open Source Technology Improvement Fund.

OSTIF is proud to share the results of our second security audit of Notary Project. You can read the Audit Report [HERE](https://github.com/notaryproject/specifications/blob/main/security/reports/audit/Quarkslab-notation-security-audit-25.pdf). Notary Project is “a set of specifications and tools intended to provide a cross-industry standard for securing software supply chains by using authentic container images and other OCI artifacts.”  With the help of Quarkslab and the Cloud Native Computing Foundation (CNCF), this project continues to provide users with trusted software supply chain management.

## Audit Process

This audit of Notary Project was specifically scoped around two new cryptographic features.  
The audit team, Quarkslab, was chosen for their practical cryptography experience to work on this engagement.  
The audit report presents how Quarkslab installed and performed discovery of Notary Project tooling Notation, reviewed the code structure and quality, and analyzed the timestamping and certificate revocation.  
The audit team also created multiple figures to help illustrate Notation with examples of overall project functionality, flow of certificate chain verification, and a global overview of the CRL verification.

## Audit Results

- **11 findings with Security Impact and Recommended Fixes**
  - 1 Medium, 1 Low, 9 Informational
  - 2 CVEs issued for audit findings:
    - **CVE-2024-56138**: Notation-go timestamp signature generation lacks certificate revocation check.
    - **CVE-2024-51491**: Notation-go process crash during CRL-based revocation check on OS using separate mount point for temp directory.

- **Review and Recommendations for 2 New Cryptographic Features**
  - **Timestamping Support**
    - Time-Stamp Protocol Compliance
    - Time Stamp Analysis in Notation
  - **Revocation Checking with Certificate Revocation List**
    - Certificate Revocation List Compliance
    - CRL Analysis in Notation

- **Future Security Work Recommendations**

This was Notary Project’s third security audit and second audit in partnership with OSTIF.  
Practicing mature security practices, the three audits were all undertaken after implementation of new features with security impact.  
Notary Project’s efforts to provide secure code to users was observable to the audit team and is reflected by the reported findings and further recommendations for future security work.

Thank you to the individuals and groups that made this engagement possible:

- Notary Project maintainers and community, notably: Pritesh Bandi, Junjie Gao, Vani Rao, Shiwei Zhang, Yi Zha, Patrick Zheng, and Feynman Zhou
- Quarkslab: Dahmun Goudarzi, Sébastien Rolland, and Ramtine Tofighi Shirazi
- Cloud Native Computing Foundation (CNCF)