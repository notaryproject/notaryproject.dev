---
title: "Release schedule and support policy"
description: "This document describes the Notary Project release schedule and support policy"
type: docs
weight: 10
---

Since the Notary Project v1.0.0 release, Notary Project releases are scheduled quarterly.

## Release versioning

The Notary Project release version is in the form of `vX.Y.Z`, where `X` is the major version, `Y` is the minor version and `Z` is the patch version, following [Semantic Versioning](https://semver.org/spec/v2.0.0.html) terminology.

## Patch release

Patch releases provide users with bug fixes and security fixes. They do not contain new features. A patch release can be done by each Notary Project repository individually every quarter in a calendar year. A patch release to fix critical issues or security issues can be done on demand. A patch release can be cancelled if there is no new fixes since the previous release.

## Minor release

Minor releases contain new features, security and bug fixes. They are backwards compatible with respect to the API and the CLI usage. A minor release will be done every quarter in a calendar year. If a feature needs specifications changes, a corresponding release for specifications will be planned. If a feature needs documentation, documentation need to be published on [Notary Project website](https://notaryproject.dev/docs/) during a minor release. Code freeze starts one week before a minor release. Only critical bug fixes are accepted into the release codebase during this time. Features that are not mandatory and not completed in a minor release will be moved to next minor release.

## Major releases

Major releases contain breaking changes. Such releases should be managed carefully to minimize disruption to users. Major releases are rare but are sometimes necessary to allow Notary Project to evolve, optimize codebase, enhance security, and comply with updated standards. The target date for a major release can be chosen once beta versions and release candidates of a major release are planned.

## Release notes

Release notes can be found by reading the notes from release page of each corresponding repository. Alternately, you can read the corresponding [release blogs](https://notaryproject.dev/blog/).

## Support policy

The Notary Project community will support "n" (current) and "n-1" `vX.Y` releases. For example, when `v1.3.0` comes out, `v1.1.x` will no longer be supported for patch releases, and we encourage users to upgrade to a supported version as soon as possible. 

## Upcoming releases

| Quarter in Year | Release                          | Code freeze | Target date |
| --------------- | -------------------------------- | ----------- | ----------- |
| Q4 2023         | Notary Project v1.1.0            | 11/15/2023  | 11/22/2023  |
| Q4 2023         | Patch releases                   |     N/A     | 11/15/2023  |
| Q1 2024         | Notary Project v1.2.0            | 3/13/2024   | 3/20/2024   |

## Attribution

This document builds on the ideas and implementations of release processes from Kubernetes and Helm.

