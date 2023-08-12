---
title: "Overview"
description: "An overview of the Notary Project"
type: docs
weight: 1
---

{{% alert title="Important" color="info" %}}
This article as well as the rest of this documentation describes the overview and latest status of the Notary Project. For documentation of older versions and implementations, please refer to the [previous Notary documentation](https://github.com/notaryproject/notary/tree/master/docs).
{{% /alert %}}

## Overview

The Notary Project is a set of specifications and tools intended to provide a cross-industry standard for securing software supply chains by using authentic container images and other OCI artifacts. Notation Project specifications and tooling provides signing and verification workflows for OCI artifacts, signature portability across OCI compliant registries, and integration with 3rd party key management solutions through a plugin model. Notary Project is also the name of the GitHub organization that has multiple prominent subprojects like Notation, Notary Project specifications, and Notary. Very often we use the name Notary Project to refer to all the above as well as the community that drives the specifications and the implementations. To learn more about Notary Project terms, please refer to the [FAQ](https://notaryproject.dev/docs/faq/#notary-project-terms).

Here is a list of repositories under the Notary Project organization

| Repository                                                              | Description                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [.github](https://github.com/notaryproject/.github)                     | This repository contains the Notary Project governance and other common documents that are shared across all repositories under the Notary Project organization.                                            |
| [meeting-notes](https://github.com/notaryproject/meeting-notes)         | This repository contains the archived meeting notes.                                                                                                                                                        |
| [notary](https://github.com/notaryproject/notary)                       | This repository contains the source code for the server and the client of the initial TUF-based implementation circa 2016.                                                                                  |
| [specifications](https://github.com/notaryproject/specifications)       | This repository contains the latest Notary Project requirements, scenarios,  specifications, and security audits to overcome the challenges from the initial implementation of 2016.                        |
| [notaryproject.dev](https://github.com/notaryproject/notaryproject.dev) | This repository contains the source code and content for the [Notary Project website](https://notaryproject.dev).                                                                                           | 
| [notation](https://github.com/notaryproject/notation)                   | This repository contains the source code for the convenient CLI implementation of the new Notary Project specifications.                                                                                    |
| [notation-go](https://github.com/notaryproject/notation-go)             | This repository contains the source code for the convenient Golang library implementation of the new Notary Project signing and verification flow.                                                          |
| [notation-core-go](https://github.com/notaryproject/notation-core-go)   | This repository contains the source code for the Golang library implementation of the Notary Project signature (hereafter "Notary Project signature")  specification and wrapping (COSE and JWS).           |
| [roadmap](https://github.com/notaryproject/roadmap)                     | This repository is intended for keeping track of development activities in the Notary Project. It may be retired in the future as feature request and milestones are moved to the appropriate repositories. |
| [tuf](https://github.com/notaryproject/tuf)                             | This repository is intended for prototyping the storage of TUF metadata in OCI-compliant registries. It is not under active development at the moment but there are plans to revive it in the future.       |

## Project status

The Notary Project is in active development. The latest release announcements are published on the [Notary Project blog](https://notaryproject.dev/blog/). The Notary Project community uses the [project board](https://github.com/orgs/notaryproject/projects/10) for project planning and status tracking. You can also use GitHub milestones to track the progress of each repository:

- [The Notary Project specification milestones](https://github.com/notaryproject/specifications/milestones)
- [notation CLI milestones](https://github.com/notaryproject/notation/milestones)
- [notation-go library milestones](https://github.com/notaryproject/notation-go/milestones)
- [notation-core-go library milestones](https://github.com/notaryproject/notation-core-go/milestones)
- [notary milestones](https://github.com/notaryproject/notary/milestones)

## Security

The Notary Project has a continuous fuzz testing implemented for the following repositories: `notary`, `notation-go`, and `notation-core-go`.

In addition, the Notary Project has had several public security audits:

- [Jul 7, 2023 by ADA Logics](https://github.com/notaryproject/specifications/blob/v1.0.0/security/reports/audit/ADA-notation-security-audit-23.pdf) security audit covering `notation`, `notation-go`, and `notation-core-go` repositories.
- [Mar 21, 2023 by ADA Logics](https://github.com/notaryproject/specifications/blob/v1.0.0/security/reports/fuzzing/ADA-fuzzing-audit-22-23.pdf) fuzz testing audit covering `notary`, `notation-go`, and `notation-core-go` repositories.
- [August 7, 2018 by Cure53](https://github.com/notaryproject/notary/blob/master/docs/resources/cure53_tuf_notary_audit_2018_08_07.pdf)) covering TUF and the `notary` repository.
- [July 31, 2015 by NCC](https://github.com/notaryproject/notary/blob/master/docs/resources/ncc_docker_notary_audit_2015_07_31.pdf) covering `notary` repository.

## Community

You can reach the Notary Project community and developers via the following channels:

- Join the [Notary Project Slack channel](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) for discussions and to ask questions.
- Follow the [@NotaryProject](https://mobile.twitter.com/NotaryProject) for news about the Notary Project.
- Join the [Notary Project community meetings](https://notaryproject.dev/community/#community-meetings) to stay on top of the latest discussions and development activities.
  - Active meeting notes are captured at the [Notary Project meeting notes](https://hackmd.io/_vrqBGAOSUC_VWvFzWruZw?view)
  - Archived meeting notes are stored in the [meeting-notes repository](https://github.com/notaryproject/meeting-notes)
