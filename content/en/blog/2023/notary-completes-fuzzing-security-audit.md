---
title: The Notary Project completes fuzzing security audit
author:  "Adam Korczynski, Feynman Zhou"
reviewer: "Shiwei Zhang, Pritesh Bandi, Vaninrao"
date: 2023-03-17
draft: false
---

> Reviewed by Pritesh Bandi, Samir Kakkar, Shiwei Zhang, Toddy Mladenov, Vani Rao, Yi Zha

The Notary Project is happy to announce the completion of the fuzzing audit of Notation libraries. The audit was carried out by Ada Logics and is part of [an initiative by the CNCF](https://www.cncf.io/blog/2022/06/28/improving-security-by-fuzzing-the-cncf-landscape/) to bring fuzzing to the CNCF landscape. The audit spanned several months in late 2022 and early 2023 and resulted in 20 fuzzers written for 3 Notary sub-projects and 2 issues found, one of which was security-critical. 

The full report from the audit is available [here](https://github.com/notaryproject/notaryproject/tree/main/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf). 

## About the Notary Project

The Notary Project is an open standard and tooling for signing and verifying artifacts and safeguarding the software delivery security from development to deployment and ensuring integrity. It was started at Docker in 2015 and powers [Docker content trust](https://docs.docker.com/engine/security/trust/) which is the docker trust set of commands. With the Notary Project, users can assign trust to data and verify the integrity of the signed data. Notary is an implementation of The Update Framework (TUF) and is used in many enterprise-grade cloud solutions.

The Notary Project was accepted into the CNCF in October 2017 and is hosted as an incubating project. Contributors are from organizations including Microsoft, AWS, Docker, and independent individuals. The fuzzing audit was limited to the following sub-projects:

- [Notary](https://github.com/notaryproject/notary): A server and a client for running and interacting with trusted collections. 
- [Notation-go](https://github.com/notaryproject/notation-go): a collection of libraries for supporting signing, verifying OCI artifacts. Based on the Notary standard. 
- [Notation-core-go](https://github.com/notaryproject/notation-core-go): Crypto library for signature envelope, and signature format specific implementation.

Notation-go and Notation-core are sub-projects for the Notary project which is an effort to build a signing framework to be used in every container image registry, and where signatures are easily distributed with images, [which are features that were missing in Notary](https://www.docker.com/blog/notary-v2-project-update/). 

## Fuzzing the Notary Project

Fuzzing is a way of testing software, whereby pseudo-random data is passed to a target API with the goal of detecting bugs and security issues. The pseudo-random data is created by a fuzzing engine that over time will generate test cases that uncover more of the code base. This type of fuzzing is called “coverage-guided fuzzing” and has been effective in finding bugs in software projects implemented in both memory-safe and memory-unsafe languages. This includes several other CNCF-hosted projects; Most recently, a security issue was found in containerd during [its fuzzing audit](https://www.cncf.io/blog/2023/03/02/containerd-completes-fuzzing-audit/). 

A critical component of a robust fuzzing suite is making sure that the fuzzers run continuously. The auditors of the Notary Projects fuzzing audit integrated Notary, Notation-go, and Notation-core-go into [OSS-Fuzz](https://github.com/google/oss-fuzz). OSS-Fuzz is an open-source project run by Google, which runs the fuzzers of critical open-source projects at scale with excessive computing, thus achieving much higher runtime results than developers would see when running the fuzzers locally. OSS-Fuzz is a critical piece of open-source fuzzing infrastructure and many other CNCF projects are integrated including Kubernetes, Helm, containerd, Argo, Flux, Envoy, Fluent-bit, and others. 

Once the auditors had integrated the three Notation projects into OSS-Fuzz, they wrote the fuzzers covering all three projects and added them to the CNCF fuzzing repository, https://github.com/cncf/cncf-fuzzing. They then instructed OSS-Fuzz to pull them from there, allowing the fuzzers to run continuously during the audit as well as after the audit had concluded.

## Findings

The fuzzing audit found two issues both of which had their root cause in 3rd-party dependencies. One of the issues was found to be a memory-exhaustion vulnerability in Notation-go and was assigned CVE-2023-25656. The vulnerability could be triggered by a specifically malicious security policy containing the char sequence =#. The issue has been fixed in Notation v1.0.0-rc.3 and later by denying any policy that contains that char sequence. The vulnerability has been disclosed in [GHSA-87x9-7grx-m28v](https://github.com/notaryproject/notation-go/security/advisories/GHSA-87x9-7grx-m28v).

The second found issue was a slice bounds out of range panic, which was a functional bug and not a security issue. It has been fixed at the completion of the fuzzing audit.

## Contributing

Notary Project has various sub-projects, of which some of the new ones like Notation, Notation-go, and Notation-core-go are in active development. Your contributions to the Notary Project code and documentation are welcome; A great way to get started with contributing to the Notary Project is by joining the [#notary-project](https://cloud-native.slack.com/messages/notary-v2/) channel in the [CNCF](https://slack.cncf.io/) Slack workspace.  If you find a problem or would like to suggest an enhancement, you can create an issue or submit a pull request on the related sub-projects repository.