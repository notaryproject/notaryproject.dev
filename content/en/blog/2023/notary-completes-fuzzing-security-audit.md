---
title: The Notary Project completes fuzzing security audit
author:  "Adam Korczynski, David Korczynski, and Feynman Zhou"
date: 2023-03-17
draft: false
---

> Reviewed by Pritesh Bandi, Samir Kakkar, Shiwei Zhang, Toddy Mladenov, Vani Rao, Yi Zha

The Notary Project is happy to announce the completion of its fuzzing security audit. The audit was carried out by Ada Logics and is part of [an initiative by the CNCF](https://www.cncf.io/blog/2022/06/28/improving-security-by-fuzzing-the-cncf-landscape/) to bring fuzzing to the CNCF landscape. The audit spanned several months in late 2022 and early 2023 and resulted in 20 fuzzers written for 3 Notary sub-projects and 2 issues being identified and addressed including a critical security fix.

The full report from the audit is available [here](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf). 

## About the Notary Project

The Notary Project is an open standard and tooling for signing and verifying artifacts and safeguarding their distribution. It was started at Docker in 2015 and powers [Docker Content Trust](https://docs.docker.com/engine/security/trust/) which is the `docker trust` set of commands. With the Notary Project, users can attest to the trustworthiness of data and verify the integrity of the signed data. 

The Notary Project was accepted into the CNCF in October 2017 and is hosted as an incubating project. Contributors are both independent individuals and from organizations including Microsoft, AWS, and Docker. Notation-go and Notation-core-go are sub-projects of the Notary Project. The implementation is an effort to build a signing framework to be used with OCI v1.1 compliant registry, allowing signatures to easily be associated and distributed with images.

The fuzzing audit was performed on all three active code sub-projects listed below:

- [Notary](https://github.com/notaryproject/notary): A server and a client for running and interacting with trusted collections. 
- [Notation-go](https://github.com/notaryproject/notation-go): a collection of libraries for supporting signing, verifying OCI artifacts. Based on the Notary standard. 
- [Notation-core-go](https://github.com/notaryproject/notation-core-go): Crypto library for signature envelope, and signature format specific implementation.

## Fuzzing the Notary Project

Fuzzing is a way of testing software, whereby pseudo-random data is passed to a target API with the goal of detecting bugs and security issues. The pseudo-random data is created by a fuzzing engine that over time will generate test cases that uncover more of the code base. This type of fuzzing is called “coverage-guided fuzzing” and has been effective in finding bugs in software projects implemented in both memory-safe and memory-unsafe languages. This includes several other CNCF-hosted projects; Most recently, a security issue was found in containerd during [its fuzzing audit](https://www.cncf.io/blog/2023/03/02/containerd-completes-fuzzing-audit/). 

There are several reasons why it's important to fuzz your software and we'll try to list some of the primary ones. First, due to empirical evidence where fuzzing is a proven technique for finding bugs and has found tens of thousands of bugs in security-critical software. Second, fuzzers find bugs that static analysis and manual auditing miss. This is because fuzzers rely on instrumenting and executing the code under analysis, which enables the fuzzers to have a different perspective than other analysis techniques and monitor deeper in the code, including third party dependencies. For example, a high severity bug in Istio [CVE-2022-23645](https://github.com/istio/istio/security/advisories/GHSA-856q-xv3c-7f2f) was due to a fairly unintuitive [behaviour](https://adalogics.com/blog/fuzzing-istio-cve-CVE-2022-23635) that static and manual analysis are very unlikely to find. Third, fuzzing is intuitive in the sense that it's closely related to unit- and integration-testing which makes it fit well with the developers workflow. Fourth, fuzzing is part of the secure development lifecycle for leading tech companies and has been for more than a decade.

A critical component of a robust fuzzing suite is making sure that the fuzzers run continuously. The auditors of the Notary Projects fuzzing audit integrated Notary, Notation-go, and Notation-core-go into [OSS-Fuzz](https://github.com/google/oss-fuzz). OSS-Fuzz is an open-source project run by Google, which runs the fuzzers of critical open-source projects at scale with excessive computing, thus achieving much higher runtime results than developers would see when running the fuzzers locally. OSS-Fuzz is a critical piece of open-source fuzzing infrastructure and many other CNCF projects are integrated including Kubernetes, Helm, containerd, Argo, Flux, Envoy, Fluent-bit, and others. 

Once the auditors had integrated the three Notation projects into OSS-Fuzz, they wrote the fuzzers covering all three projects and added them to the CNCF fuzzing repository, https://github.com/cncf/cncf-fuzzing. They then instructed OSS-Fuzz to pull them from there, allowing the fuzzers to run continuously during the audit as well as after the audit had concluded.

## Findings

The fuzzing audit found two issues both of which had their root cause in 3rd-party dependencies. One of the issues was found to be a memory-exhaustion vulnerability in Notation-go and was assigned CVE-2023-25656. The vulnerability could be triggered by a specifically malicious security policy containing the char sequence `=#`. The issue has been fixed in Notation v1.0.0-rc.3 and later by denying any policy that contains that char sequence. The vulnerability has been reported in [GHSA-87x9-7grx-m28v](https://github.com/notaryproject/notation-go/security/advisories/GHSA-87x9-7grx-m28v).

The second found issue was a slice bounds out of range panic, which was a functional bug and not a security issue.  The root cause was in a 3rd-party dependency and the crash is recoverable. This issue has been fixed in notation-go v1.0.0-RC.3.

## Contributing

Notary Project has various sub-projects, of which some of the new ones like Notation, Notation-go, and Notation-core-go are in active development. Your contributions to the Notary Projects code and documentation are welcome. A great way to get started with contributing to the Notary Project is by joining the [#notary-project](https://cloud-native.slack.com/messages/notary-v2/) channel in the [CNCF](https://slack.cncf.io/) Slack workspace.  If you find a problem or would like to suggest an enhancement, you can create an issue or submit a pull request on the related sub-projects repository.
