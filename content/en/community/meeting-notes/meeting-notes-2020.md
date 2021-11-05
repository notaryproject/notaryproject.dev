---
title: Notary v2 Meeting Notes Archive - 2020
---

## December 7, 2020

### Attendees:
- Steve Lasker
- David Freilich (VMware)

### Agenda Items:
- _add your topics_

### Notes:
- _meeting minutes_

## November 9, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Niaz Khan (AWS)
- Justin Cormack (Docker)
- Garry Ing (VMware)
- _add yourself_

### Agenda Items:
- Review Key Management Requirements (#3 onwards) https://github.com/notaryproject/requirements/pull/38/files?short_path=ce834e0#diff-ce834e0f33c8faa5afad4489d4edf5d224c22ba1e28a5deea73e058ba784bd95

### Notes:
- _meeting minutes_

## November 2, 2020

[Recording](https://www.youtube.com/watch?v=ciNW19F_T_8)
### Attendees:
- Steve Lasker (Microsoft)
- Niaz Khan (AWS)
- Furkat Gofurov (Ericsson)
- Marco Franssen (Philips - Research)
- Marina Moore (NYU)
- Jesse Butler (AWS)
- Ian McMillan (Microsoft)
- _add yourself_

### Agenda Items:
- NV2 Demo, [focusing on the main end to end (e2e) scenario](https://github.com/notaryproject/requirements/blob/main/scenarios.md)
  - Instnace of distribution hosting prototype changes at nv2.azurewebsites.net. Could be registry.wabbitnetworks.io or registry.acmerockets.io
    - [Distribution change docs](https://github.com/notaryproject/nv2/blob/prototype-1/docs/distribution/persistance-discovery-options.md)
    - [Distribution change PR#1](https://github.com/notaryproject/distribution/pull/1)
    - [Interactive Demo & Review NV2 Prototype](https://github.com/sajayantony/nv2-
demo#configurations) (Steve)
- Review Key Management Requirements https://github.com/notaryproject/requirements/pull/38/files?short_path=ce834e0#diff-ce834e0f33c8faa5afad4489d4edf5d224c22ba1e28a5deea73e058ba784bd95
-  _add your topics_

### Notes:
- _meeting minutes_

## October 26, 2020

[Recording](https://www.youtube.com/watch?v=LKPnJLmASyk&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=29)

### Attendees:
- Steve Lasker (Microsoft)
- Marco Franssen (Philips - Research)
- Trent Jones (GitHub)
- Marina Moore (NYU)
- Miloslav Trmač (Red Hat)
- Jan Tilles (Ericsson)
- Jesse Butler (aws)
- Niaz Khan (AWS)
- _add yourself_

### Agenda Items:
- Review [Key Distribution Workflows](https://github.com/notaryproject/requirements/pull/38) - Niaz
- Client workkflow for TUF proposal
    - https://docs.google.com/document/d/1VXrCTyHeLQUJLgMYYRKXYyMQ3kPM0ywGiqiQ7tMxiOg/edit?usp=sharing
- _add your topics_

### Notes:
- OCI Artifacts & Collections Slides ([PowerPoint](https://github.com/SteveLasker/drafts/blob/main/media/oci-artifact-collections.pptx?raw=true), [PDF](https://github.com/SteveLasker/drafts/blob/main/media/oci-artifact-collections.pdf))


## October 19, 2020

[Recording](https://www.youtube.com/watch?v=y_myKegg1OQ)
### Attendees:
- Steve Lasker (Microsoft)
- Justin Cormack (Docker)
- Furkat Gofurov (Ericsson)
- Marina Moore (NYU)
- Sajay Antony (Microsoft)
- _add yourself_

### Agenda Items:
- Review end to end, `build, sign, push, discover, pull` of signatures (Steve, Sajay)
    - https://github.com/sajayantony/nv2-demo
- proposal for using TUF for default/public, while allowing for fine-grained client control for private repos: https://docs.google.com/drawings/d/1lboE1EmbYOKpwRm6sUSrZbKoZD8V6ilo5eHOEAEYizc/edit?usp=sharing
- Reminder: Next week, we'll be 1 hour earlier
- _add your topics_

### Notes:
- Current prototype - supports at least one key
- New policies would support n keys, and specific keys
- What are the policies, and how would they be implemented (spec'd)
- Demo Script
```
docker build -t wabbitnetworks.azurecr.io/net-monitor:v1 .
docker notary sign wabbitnetworks.azurecr.io/net-monitor:v1 wabbit-networks.crt
docker notary --enabled
docker push wabbitnetworks.azurecr.io/net-monitor:v1
```

On a different node (conceptually)
with the wabbit-networks key
```
docker notary --enabled
docker pull wabbitnetworks.azurecr.io/net-monitor:v1
```
Pull fails, as the key doesn't exist
```
az keyvault get-key
docker pull wabbitnetworks.azurecr.io/net-monitor:v1
```
• Because the key exists, pull succeeds
```
docker tag wabbitnetworks.azurecr.io/net-monitor:v1 acmerockets.azurecr.io/net-monitor:v1
docker notary sign acmerockets.azurecr.io/net-monitor:v1 acme-rockets.crt
docker push acmerockets.azurecr.io/net-monitor:v1
```
- _meeting minutes_

## October 12, 2020

### Attendees:
- Niaz Khan (AWS)
- Miloslav Trmač (Red Hat)
- Jesse Butler (AWS)
- Furkat Gofurov (Ericsson)
- Jan Tilles (Ericsson)
- Samuel Karp (AWS)
- _add yourself_

### Agenda Items:
- _add your topics_

### Notes:
- _meeting minutes_

## October 5th, 2020

[Recording](https://www.youtube.com/watch?v=D4bGYUZRUB0&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=27)

### Attendees:
- Niaz Khan (AWS)
- Samuel Karp (AWS)
- Steve Lasker (Azure)
- _add yourself_

### Agenda Items:
- Review feedback on https://github.com/notaryproject/requirements/pull/38

- Timestamping Service Authorities

### Notes:
- Using TUF for root key distribution - Marina
- Clarify signature validation mechanism - Niaz
- Suggestions for signature verification based on package name - Niaz
- Investigate whether public timestamping was considered for TUF and if there were any drawbacks identified - Marina
- Focus on seom worklfows for where & how keys are acquired to enable signing and verification. Niaz to add to the key managment docs
- Proposal to move 1 hour earlier to keep the existing attendees and add others that couldn't make it. Steve to send info out on slack for others to comment.
- Sounds like Friday key management meetings will merge with the Monday meetings.

## September 28, 2020

[Recording](https://www.youtube.com/watch?v=sMD-mDSKHzE&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=26)

### Attendees:
- Steve Lasker (Microsoft)
- Tero Saarni (Ericsson
- Derek McGowan
- Marina Moore (NYU)
- Trishank Karthik Kuppusamy (Datadog)
- _add yourself_

### Agenda Items:
- Key Management update - Niaz
- Distribution/Artifact design/working session (adding reference and collection artifact type) - Steve, Derek
- _add your topics_

### Notes:
- add a collection type that wasn't index
Separate definition - not in image-spec
Which manifest type they should use
The stuff in image-spec used for other things.
The types are defined in a generic way, but not documented as such

Separate into the artifact types
Indexes suport other indexes - some registries don't support as they don't expect. How many levels deef should I allow?
From an image client perspective

Resuing those types is a bit confusing as other clients don't know how to handle them?
Adding config to index is a good start, but we should further seperate from the image directly.
Image clients - that's the bulk of what exists today.
I'd rather not touch that part of the definition and define something that's generic.
Derek - not convinced that a signature need to be an artifact.
1:many with immutable tags, but they don't actually have tags.
Special endpoints to fetch them.
Should we consider endpoints that are specific to signatures
More optimial for clients
Give me all the signatures for this type
Does it really fit in with other artifacts.
Is a signature meta-data on an artifact.

Marina
The order of signature discovery
Do you start with the artifact, then the signature
Of the 10 signatures on an artifact, how do I know to only download the 1 I care about

Derek
Are attributes a way to identify which signature (generic thing) I actually want (filter upon)
Is there a general way, or a specific way to get signatures
Today, we thing of tags (sometimes digests) and things that refer to it

Ordering is critical to the success
How do we get the digest we trust, from the tag

Different types
- Artifacts
- Meta-data - data on a specific object
- Signatures
- are tags just special types of metadata
- Referneces can/must be capabile of cross repo scenarios (helm chart refences wordpress and mysql)

Clear we need an extension to the distribution api - should we add a signature api?

Separate out the searching/filtering from a single repo to across repositories

Serge - do we support signatures across repos? - do we every want to rule this out?
Derek - questions on security challenges
Notion of cross repo mounting exists today
If a user pushes a refernece to something they don't have access, how is that evaluated

- _meeting minutes_

## September 21, 2020

[Recording](https://www.youtube.com/watch?v=dE8BE5Vin_Y&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=25)
### Attendees
- _add yourself_

### Agenda Items:

- [Proposal for generic reverse lookup #14
 Open](https://github.com/notaryproject/nv2/pull/14)
  - should we persist the config linkage
- Discussion on:
  - manifest generation library for non-image artifacts
  - client updates for [Notary v2 e2e workflow](https://github.com/notaryproject/nv2/blob/prototype-1/media/notary-e2e-scenarios.png)

### Notes:
- _meeting minutes_

## September 14, 2020

[Recording](https://www.youtube.com/watch?v=jnR_ab4uL6U&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=24)

### Attendees:
- Jan Tilles (Ericsson)
- Samuel Karp (AWS)
- Jesse Butler (AWS)
- Furkat Gofurov (Ericsson)
- Serge Hallyn (Cisco)

### Agenda Items:
- No specific items - will join for conversation
- _add your topics_

### Notes:
- Progress has been on the distribution aspects which will enable signature persistance, but no specific updates to report in the nv2 prototype this week
- _meeting minutes_

## September 7, 2020 - cancelled

## August 31, 2020

[Recording](https://www.youtube.com/watch?v=iEUB6ev7byc&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=23)

### Attendees:
- Steve Lasker (Microsoft)
- Tero Saarni (Ericsson)
- Marina Moore (NYU)
- _add yourself_

### Agenda Items:
- TUF demo (Marina)
    - Some new TUF features that address scalability concerns
    - How TUF can be used with private repositories
- Open Discussion on progress thus far (Steve, et all)

### Notes:
- _meeting minutes_


## August 24, 2020

[Recording](https://www.youtube.com/watch?v=3ApNm_HTV4w&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=22)

### Attendees:
- Steve Lasker (Microsoft)
- Marina Moore (NYU)
- Justin Cormack (Docker)
- Samuel Karp (AWS)
- Jesse Butler (AWS)
- Miloslav Trmač (Red Hat)
- _add yourself_

### Agenda Items:

- [Specification and Prototype - JWT based signature update #2](https://github.com/notaryproject/nv2/pull/2)
- [Distribution API Proposal #5](https://github.com/notaryproject/nv2/pull/5)
- _add your topics_

### Notes:
- Create an nv2 branch for prototypes, leaving main for the ultimate reference implementation
- Open issues for open topics in #2 PR
- Distribution Spec PR
    - Index reference doesn't explictly declare no tags - needs this for clarity
    - Add a multi-arch example of signed content
- _meeting minutes_

## August 17, 2020

KubeCon EU Virtual


## August 10, 2020
[Video recording](https://www.youtube.com/watch?v=j-1L2oGkpNQ)
### Attendees:
- Steve Lasker (Microsoft)
- Justin Cormack (Docker)
- Marina Moore (NYU)
- Miloslav Trmač (Red Hat)
- Varderes Barsegyan (DNAnexus)
- _add yourself_

### Agenda Items:
- [Review PR: Move goals and stakeholders to root readme #29](https://github.com/notaryproject/requirements/pull/29) -Steve
- [Review PR: Add requirements doc #30](https://github.com/notaryproject/requirements/pull/30) -Steve
- nv2 Prototype Registry Persistence & APIs - [WIP: distribution API proposals #2](https://github.com/avtakkar/nv2/pull/2)
- _add your topics_

### Notes:
- Do we need Goals, Scenarios and Requirements? Seems the requirments can be merged into the scenarios - general agreement
- For the scenarios, we have a core set of scenarios, with an additional for key managmeent. We'll keep the key management seperate for now, enabling a streamlined working group. As they get solidified, we can merge them with the core scenarios.
- Distribution Spec Signature proposals:
  - Seems we have some agreement OCI Index is a better model for keeping track of depdencies, as it already tracks index to manifest. Which a signature is a link to a manifest.
  - This does mean we need to continue the OCI Index supporting a config object for both persistance of the signature object, and uniquely identifying the index as a signature type. [Add Index support for artifact type #25](https://github.com/opencontainers/artifacts/issues/25)
- Are signatures "special" enough to need a separate API?
  - For discovery API, we briefly discussed the two paging APIs. The one consistent with the distribution tag listing, and a more generic version used on standard REST APIs. Sam provided the [google API design reference](https://cloud.google.com/apis/design/design_patterns#list_pagination).
  - Do we have a signature discovery API, or a generic API for what manifests represent a given digest?
      - Provide a list of all indexes that refer to digest sha256:abc123
      - Provide a list of all indexes that refer to digest sha256:abc123 that has an artifact type of application/vnd.cncf.notary.config.v2+jwt
  - Agreed to defer this to online conversation
  - For signature upload in relation to role based access: rather than have a separate API for signature linking, that wouldn't scale to other artifact types, should we use the standard push/upload APIs and outline role check should be done enabling a scalable and consistent model for other artifact types?
- Steve to finish documenting [WIP: distribution API proposals #2](https://github.com/avtakkar/nv2/pull/2), incorporating feedback
- Please provide some eyes on the [JWT encoding staged PR](https://github.com/shizhMSFT/nv2/pull/16)


## July 31, 2020

[Recording](https://www.youtube.com/watch?v=T1kvJKDiXAU&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=20)

### Attendees:
- Niaz Khan (AWS)
- Steve Lasker (Microsoft)
- Marco Franssen (Philips - Research)
- Marina Moore (NYU)

### Agenda Items:
- Multiple Root Keys
- Key Revocation

### Notes:

- Key sharing service serves the purpose of multi-registry world.
    - it allows a company to define what they trust
- Registry clients connect to key sharing service to fetch trusted roots
    - To prevent usability issues a client should be able to connect to a single key sharing service
- Key sharing service can be used to redirect to other key sharing services or give an overview of the trusted keys
    - What are potential threads for the key sharing service?
    - How can we protect against these threads?
    - The key sharing service should also be able to run as an offline airgapped service. This allows offline/airgapped solutions to rely on this airgapped service.
- Should the keysharing be embedded in the registry?
- How does key revocation propagate to clients via key sharing service?
- _meeting minutes_

## July 27, 2020

[Recording](https://www.youtube.com/watch?v=uzrvLo4sAAE&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=19)

> Note: [Meeting will be 7am Pacific time](https://calendar.google.com/calendar/r/eventedit/copy/dGJmams1amZqajl1MHFwcmRvYWg5OThrNjFfMjAyMDA3MjdUMTcwMDAwWiBsaW51eGZvdW5kYXRpb24ub3JnX281YXZqbHZ0MmNhZTlicTdhOTVlbWM0NzQwQGc)

### Attendees:
- Steve Lasker (Microsoft)
- Shiwei Zhang (Microsoft)
- Miloslav Trmač
- _add yourself_

### Agenda Items:
- [nv2 signing prototype](https://github.com/shizhMSFT/nv2/tree/stevelas/readme-updates) Shiwei / Steve
- _add your topics_

### Notes:
- Outline the multiple signature scenario better - identifying how the references could be used
- Questions on scopying and support of TUF metadata
- Ouline what's in prototype phase 1, vs. future prototypes - like TUF metadata. Ralph volunteered to help - and it's now written in history
- _meeting minutes_

## July 24, 2020

[Recording](https://www.youtube.com/watch?v=6mK325VUC0k&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=18)
### Attendees:
- Niaz Khan (AWS)
- Marco Franssen (Philips - Research)
- Justin Cappos (NYU)
- Marina Moore (NYU)

### Agenda Items:
- Finalize Pull Request [PR](https://github.com/notaryproject/requirements/pull/27)

### Notes:
- Revisions for scenarios doc:
    - Define addtional personas for deployment roles and registry operators
    - Add diagrams to clarify steps in signing, uploading to registry, and deploying containers
    - Add diagrams for key rotation
    - Clarify how air-gapped regions can manage trust store
- Root rotation now involves a third component. Does this introduce additional risk?
    - Justin to clarify risk for discussion at next week's meeting.

## July 20, 2020

[Recording](https://www.youtube.com/watch?v=bIFKRdh0Fvs&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=17)

### Attendees:
- Steve Lasker (Microsoft)
- Marina Moore (NYU)
- Justin Cappos (NYU)
- Miloslav Trmač (Red Hat)
- Trishank Karthik Kuppusamy (Datadog)
- Donald Stufft (Datadog)
- Samuel Karp (AWS)
- Jesse Butler (AWS)
- Niaz Khan (AWS)
- _add yourself_

### Agenda Items:
- Key management working group discussion [PR](https://github.com/notaryproject/requirements/pull/27) (Niaz)

### Notes:
- Should we support CAs?
    - May be optional, but shouldn't be required. If needed, an extensibility option.
    - Not clear there are benefits for CA keys, and Cappos hasn't seen much demand.

## July 17, 2020

[Recording](https://www.youtube.com/watch?v=nMVFU89rHuA&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=16)

### Attendees:
- Niaz Khan (AWS)
- Marco Franssen (Philips Research)
- Justin Cormack (Docker)
- Justin Cappos (NYU)
- Trishank Karthik Kuppusamy (Datadog)
- _add yourself_

### Agenda Items:
- _add your topics_

### Notes:
- Some open questions
    - How to sync certificates to be known to different notary instances? (public vs private company internal)
        - Airgapped.
        - Pulling from different registries at runtime platforms
    - How to enable self managed portal for bigger organizations?
        - admins can manage creation of new targets
        - team can manage delegations themself for their targets
    - How would a CI job retrieve it's delegation and cleanup afterwards to sign images?
        - Auto expire after 10 minutes (lifetime of CI job)
        - Auto register this CI delegation on the given target
            - Does an ACME like challenge work here?
- Review [draft of use cases for key management scenarios](https://github.com/notaryproject/requirements/pull/27)
  - Justin and Trishank to do this
  - Raised some potential issues on role/metadata files vs signatures directly on manifests/indices, and scalability of revocation lists vs explicit metadata on keys
  - Niaz interested in use cases such as different roots of trust in a registry: e.g., company vs individual developers
  - Niaz to add in motivation on why steps are being taken.

## July 13, 2020

### Attendees:
- Justin Cormack (Docker)
- Steve Lasker (Microsoft)
- _add yourself_

### Agenda Items:
- Niaz wanted more time to incorporate feedback. Watch for an invite for this friday for key signing scenarios.
- no agenda, agreed to defer to next week.
- _add your topics_

### Notes:
- _meeting minutes_

## July 10, 2020

### Attendees:
- Niaz Khan (AWS)
- Steve Lasker (Microsoft)
- Marco Franssen (Philips Research)
- Ian Kaneshiro (Ctrl Cmd)
- _add yourself_

### Agenda Items:
- Scope of key management scenarios
- Dates
    - 7/10 Identify use cases
    - 7/17 Detail out all use cases
    - 7/24 Review draft requirements
    - 7/31 Finalize requirements
- Review pull request https://github.com/notaryproject/requirements/pull/27

### Notes:
- Hybrid scenario for root key in HSM, delegate key on local machine.
- Add in details for how hosts are configured.
- Philips solution for managing Notary v1 keys. https://github.com/philips-labs/dct-notary-admin/tree/develop/docs
- _meeting minutes_

## July 6, 2020

[Recording](https://www.youtube.com/watch?v=WA4XcZztd7g&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=15)

### Attendees:
- Steve Lasker (Microsoft)
- Trishank K Kuppusamy (Datadog)
- Justin Cormack (Docker)
- Samuel Karp (AWS)
- Niaz Khan (AWS)
- Omar Paul (AWS)
- Tero Saarni (Ericsson)

### Agenda Items:
- Preliminary sharing of experience with Signy on Notary v1
  - What is [CNAB](https://github.com/cnabio/cnab-spec)?
  - What is [CNAB Security](https://github.com/cnabio/cnab-spec/blob/master/300-CNAB-security.md)?
  - [MVP to sign bundles](https://github.com/cnabio/cnab-spec/blob/master/301-metadata-repositories.md#minimum-viable-product-mvp)
  - [Extending MVP to add SBOM](https://github.com/cnabio/cnab-spec/blob/master/301-metadata-repositories.md#extending-the-MVP-to-verify-the-provenance-of-bundles)
  - [Example minimal SBOM](https://github.com/cnabio/signy/pull/74): machines can only add hashes for images in bundles, but nothing else
  - Signy: the reference implementation for CNAB-Sec
  - [Lesson #1: reusing keys](https://github.com/cnabio/signy/pull/59)
  - Push `timestamp` and `snapshot` to server/signer
  - As of today morning, Philips [dct-notary-admin](https://github.com/philips-labs/dct-notary-admin) is also doing the same
  - Reuse `root` and `targets` across bundles/repos
  - Need to revisit idea why Notary _needs_ a separate metadata repo per image/bundle/etc
  - [Lesson #2: using the power of delegations](https://github.com/cnabio/signy/pull/80)
  - What are delegations?
  - Using delegations to safely include SBOM metadata
  - notary-dct-admin also would like to use the delegations to decentralize how developers use their keys
  - Demo
- Lessons from notary-dct-admin
  - Interested in Notary v2
  - Working with extending Notary v1, like Signy, in the meantime
  - Agnostic storage and key backends
  - One-click key revocation
  - Looking for funding (can CNCF help here?)
- EU+Asia friendly meeting time?
  - Harbor, Philips, etc are interested
  - We should include them
- _add your topics_

### Notes:
- Radu and Trishank to write an issue about lessons learned
- _meeting minutes_

## June 29, 2020

[Recording](https://www.youtube.com/watch?v=EbDIHPb4pHg&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=14)

### Attendees:
- Niaz Khan (AWS)
- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- Tero Saarni (Ericsson)
- Serge Hallyn (Cisco)
- _add yourself_

### Agenda Items:
- A [sketch and process for how and where SMEs can engage in an exploratory prototype](https://github.com/SteveLasker/nv2) (Steve)
- Ephemeral clients as a design requirement. (Justin Cormack)
- _add your topics_

### Notes:
- _meeting minutes_

## June 22, 2020

[Recording](https://www.youtube.com/watch?v=xhSqkJ0Dz3s&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=13)

### Attendees:
- Niaz Khan (AWS)
- Steve Lasker (Microsoft)
- Marina Moore (NYU)
- Justin Cappos (NYU)
- Donald Stufft (Datadog)
- Trishank Karthik Kuppusamy (Datadog)
- Tero Saarni (Ericsson)
- _add yourself_

### Agenda Items:
- [Metadata overhead comparison](https://docs.google.com/spreadsheets/d/18iwWnWvAAZ4In33EWJBgdAWVFE720B_z0eQlB4FpjNc/edit?ts=5ed7d6f4#gid=142880264) (Marina)
- Scheduling Key Management meeting https://doodle.com/poll/ziiqg66hnbnmhygw
- [Pull request for Key Management Scenarios]( https://github.com/notaryproject/requirements/pull/24) (Niaz)
- _add your topics_

### Notes:
- _meeting minutes_

## June 15, 2020

[Recording](https://www.youtube.com/watch?v=2YFvi4VSJNw&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=12)

### Attendees:
- Steve Lasker (Microsoft)
- Marina Moore (TUF)
- Justin Cappos (TUF)
- Trishank Karthik Kuppusamy (Datadog)
- Niaz Khan (AWS)
- Radu Matei (Microsoft)
- Tero Saarni (Ericsson)
- Evan Cordell (Red Hat)
- Samuel Karp (AWS)
- Derek McGowan
- Aaron Lynch (AWS)
- Donald Stufft (Datadog)
- _add yourself_

### Agenda Items:
- [Notary design scenarios and TUF](https://docs.google.com/document/d/1zBxqRAlZ9I8iBIYaGj9dHuubxBZv9tt_JalB9bUaiew/edit#)
  - Where do we go from here?
- _add your topics_

### Notes:
- Registry/Repo RBAC -Storage - Write up a constraint/scenario such that signatures/metadata are stored alongside image data, without the need for a separate service endpoint. (Steve)
- Need key management scenarios written up. Marina offered to make a PR with the initial key management scenarios.
- _meeting minutes_

## June 8, 2020

[Recording](https://www.youtube.com/watch?v=iYHv3qkl76U&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=11)

### Attendees:
- Steve Lasker (Microsoft)
- Niaz Khan (AWS)
- Trishank Karthik Kuppusamy (Datadog)
- Justin Cappos (NYU)
- Serge Hallyn (Cisco)
- Tero Saarni (Ericsson)
- Miloslav Trmač (Red Hat)
- Tue Tran
- _add yourself_

### Agenda Items:
- Target Scenarios for nv2 prototype
- Added [signature verification lookup design pr#22](https://github.com/notaryproject/requirements/pull/22) copied from google doc: [Notary v2 - Verification Persistence by Reference](https://docs.google.com/document/d/1VvT6IsnRFuWlhewbL4iY2h6PhLeA57aOoz_mejwRzzE/edit#heading=h.2gazcsgmxkub)
    - Mitr - good to have a requiment to not require changing digest references
    - Cappos - non goals - protection from attack if a registry is compromised.
- Cappos (ran out of time; pushed to next week)
  - Discussion with Samuel Karp
  - Security issue
  - Performance will come next week
- _add your topics_

### Notes:
- _meeting minutes_

## June 1, 2020

[Recording](https://www.youtube.com/watch?v=86W2ZaJkEdk&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=10)

### Attendees:
- Steve Lasker (Microsoft)
- Aaron Lynch (AWS)
- Samuel Karp (AWS)
- _add yourself_

### Agenda Items:
- Target Scenarios for nv2 prototype
- Added [signature verification lookup design pr#22](https://github.com/notaryproject/requirements/pull/22) copied from google doc: [Notary v2 - Verification Persistence by Reference](https://docs.google.com/document/d/1VvT6IsnRFuWlhewbL4iY2h6PhLeA57aOoz_mejwRzzE/edit#heading=h.2gazcsgmxkub)
- _add your topics_

### Notes:
- _meeting minutes_

## May 25, 2020

Meeting cancelled per US Memorial Day Holiday
We'll reconvene next Monday, June 1st

## May 18, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Tero Saarni (Ericsson)
- Radu Matei (Microsoft)
- Serge Hallyn (Cisco)
- Stuart Hayton (IBM)
- Samuel Karp (AWS)
- Evan Cordell (Red Hat)
- Niaz Khan (AWS)
- Marina Moore (NYU)
- _add yourself_

### Agenda Items:
- [TUF signatures](https://docs.google.com/document/d/1w8PFELVxt4p1aMk5oJv0RbDyd5J4OyvwguNSNZ1sJNw/edit?ts=5ec1e68c#)
- _add your topics_

### Notes:
- _meeting minutes_


## May 4, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Marina Moore (NYU)
- Trishank Karthik Kuppusamy (Datadog)
- Samuel Karp (AWS)
- Serge Hallyn (Cisco, lurking)
- _add yourself_

### Agenda Items:

- Cappos, Moore, Kuppusamy: [Thoughts on Notary-v2 design proposals](https://docs.google.com/document/d/10XXgvb67ITy4VGUJJJUK2y-3nhnabaQ70RCmk4b5QIU/edit?usp=sharing)
-

### Notes:
- Should a signature couple a tag and a digest to say that combination is "signed" and verifed at a given time?
- We haven't yet written down a "requirement" that digests and/or tags can't change as the result of signing an artifact. Is that a requirement?

- [Attacker goals in the threat model](https://github.com/notaryproject/requirements/pull/20/files)

## May 4, 2020 - nv2

### Attendees:
- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- Marina Moore (NYU)
- Trishank Karthik Kuppusamy (Datadog)
- _add yourself_

### Agenda Items:
- Where do signatures go?
- [Signatures in OCI](https://docs.google.com/document/d/1oOmGR6kA4Rfl8YBTZHlE_3jFyEIpySwdHnVfDjVbtOU/edit)
- [Notary v2 - Verification Persistence by Reference](https://docs.google.com/document/d/1VvT6IsnRFuWlhewbL4iY2h6PhLeA57aOoz_mejwRzzE/edit#heading=h.2gazcsgmxkub)
- [Deisgn Options](https://github.com/notaryproject/requirements/pull/6)
- _add your topics_

### Notes:

- Cappos, Moore, Kuppusamy - some feedback on the [Deisgn Options](https://github.com/notaryproject/requirements/pull/6)
    - Option 3, does the entire SBOM have to be entireley downloaded?
    - Does the SBOM need to be signed as well
    - sam - sign an sbom of the sbom
    - What does the client request, an image, or a tag?
        - the client requests a digest or a tag
    - Discussion of option 4 having separate uploads of signed content
    - Discussion of whether a digest can or shouldn't have to change
        - Can a naming convention be used?
        - Joey - when a signature is pushed, an entry is pushed as the orignal manifest, with a new api that links manifests and declaration.
    - Vincent - Reminder for the need to track separate ACLs
    - Cappos - can you trust a registry?
    - Joey - can pushes of linkages between docuemnts be identifiable for walking back compromises
    - Cormack - can we build a secuirty solution without reverse linkages?
    -
- Additional references:
    - [OCI Distribution-spec ext discussion](https://hackmd.io/Ljkrt0LORmeVznREeGOWuQ)
- _meeting minutes_

## April 27, 2020 - nv2

[Recording](https://www.youtube.com/watch?v=PFt_EQfQmXM&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=9)

### Attendees:
- Steve Lasker (Microsoft)
- _add yourself_

### Agenda Items:
- _add your topics_

### Notes:
- Justin Cormack - Doc for a minimalisitc implementation to get started. Tuf with a separate doc format for fitting in a registry to see where it goes.
- _meeting minutes_


## April 27, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Aaron Lynch
- Niaz Khan (AWS)
-   _add yourself_

### Agenda Items:
- _add your topics_

### Notes:
- _meeting minutes_

## April 22, 2020 - nv2 breakout

### Attendees:
- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- _add yourself_

### Agenda Items:
-	Identify some goals of the experience.
-	Sketch out an experience for SMEs to engage within their areas.
    -	Learn what's hard that needs more investments
    -	Learn what's easy, we can just do now

- Repos for iteration:
    - https://github.com/notaryproject/nv2 - Notary v2 Client we’ll experiment with
    - https://github.com/notaryproject/distribution - For any potential changes we’d want to push back to the distribution-spec.
- Housekeeping
    - what language will we use?
        - Golang
    - what are the apis/ux we'll focus on?
    - what are the extension models we need to support for the nv2 client
    - What are the registry extensions do we need?
    - maintainers
- MVP
    1. Sign an artifact
    2. Push the artifact and signature to a registry
    3. Pull an artifact from a registry, validating it's signature
- Needs
    1. Concrete representations for signatures
    2. API changes required on distribution, _if any_
- Prototyping Order
    1. Sign & Push a signature to a registry
        - Manifest is in the registry
        - Persistence - how do we represent a signature in the registry?
    2. Pull an artifact from the registry, validating it
- Misc discussion
    - How to manage ACLs on signatures and artifacts?
    - VBatts - should be able to sign layers
    - Justin - should we be able to sign artifacts not owned
        - Steve - customers want to sign content for different environments, which means they are signing someone elsese content
        - in-repo signatures as a first model
    - Focusing on detached signatures
        - [extension proposal #111](https://github.com/opencontainers/distribution-spec/pull/111) (discussion https://hackmd.io/Ljkrt0LORmeVznREeGOWuQ?edit)
        - Push an artifact, then push another manifest that includes a signature for that artifact. It could support mulitple signatures.
        - Steve - How can we support immutable manifests so users don't have to pull/push and the registry needs to cope with updates?
        - Sajay - the concept of a signed manifest that points to the content and the signature.
            - Tags can be updated, but the content digest doesn't get updated.
        - Derek - how to reference signature collections, as opposed to tag listing.
        - VBatts - can unordered list be pushed, so the collection doesn't need to be signed?
        - Need to account for deleting signatures when the artifacts are deleted.
        - Justin - additional signatures can be pushed to the registry, as a signature manifet.
        - Can we push individual index objects, each with a separate signature so we don't have to update a single signature index?
            - There's no existing reverse lookup for the indexes that represent a manifest
        - Sajay/Justin - could we morph Notary v1 metadata with a Notary v2 model to have tags updated with new signatures. Client can infer a naming scheme with different properites.
        - Steve - can we say Notary v2 doesn't store different pointers for signed and unsigned content for the same tag?
- ToDo:
    - Steve to add a comment to the distribution fork `readme.md` to identify it's for collaboration on changes we might propose to the distribution spec and eventually merge back to docker/distribution.
- _add your topics_

### Notes:
- _meeting minutes_


## April 20, 2020 - Monday call

[Recording](https://www.youtube.com/watch?v=qbS5aTCAayI&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=8)

### Attendees:
- Steve Lasker (Microsoft)
- Stuart Hayton (IBM)
- Aaron Lynch (AWS)
- Miloslav Trmač (Red Hat)
- Niaz Khan (AWS)
- Radu Matei (Microsoft)
- Samuel Karp (AWS)
- Tue Tran (AWS)
- Derek McGowan (Docker)
- _add yourself_

### Agenda Items:
- Scenarios Update
- Prototype
- _add your topics_

### Notes:
- Scenarios Update
- Prototype
- Aaron - what's the value of the signature?
    - Discussion of signature and post validation verificaiton using TUF
- Justin Cappos
    - Discussion of signatures being the foucs, vs. verification, which had been the trusted "annotation". Focus on the result, that the document wasn't tampered with.
- Niaz
    - Layered approach, which could include additional meta-data
    - What's a core, vs. extensibility requirement?
        - eg: Do some signatures can about names, while others may not
- _meeting minutes_


## April 20, 2020 - nv2 experiment

### Attendees:
- Steve Lasker (Microsoft)
- Justin Cormack (Docker)
- Omar Paul (AWS)
- Stuart Hayton (IBM)
- Aaron Lynch (AWS)
- _add yourself_

### Agenda Items:
- _add your topics_

### Notes:
- Signing vs. Content Verifcation
- Multiple phases
    1. What does a signed document in a registry look like
    1. Prototype this in the OSS registry
    1. Write a client that can push/pull signatures
    1. Write a client that can valiate signatures
    1. Build a more complex client, like TUF, that would layer atop the above signatures and validation
- First we fork docker/distribution
    - Add root signature api
- Add an nv2 client to push/pull/sign content
- Then, we add a tuf client that uses the above interfaces
    - Tuf client takes tuf repository to a registry version, then converts it back
- Key Managemnet
    - APIs for external key management solution
    - Solution for the 98% of others
- Next nv2 call
    - Justin Cormack - Wednesday or Friday 9am or 10am
    - Derek - Wednesday 9 or 10
    - VBatts
    - Sam - Wednesday 10
    - Sajay
- _meeting minutes_

## April 13, 2020

[Recording](https://www.youtube.com/watch?v=IVG_9ZFhKzY&list=PLj6h78yzYM2O1BOGT3hLdJTJCKz0f-bYq&index=7)

### Attendees:
- Aaron Lynch
- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- Niaz Khan (AWS)
- Evan Cordell (Red Hat)
- Serge Hallyn (Cisco)

### Agenda Items:
- Working group status
    - Sceanrios Feedback
        - [Push/pull between signing and tuf evaluation](https://github.com/notaryproject/requirements/pull/15#issuecomment-612988900) PR# 15
        -  Justin - if we over scope scenarios, we narrow the conversation
            - Focus on the goals, leaving as much as possible about the mechnisms out. ex: have to have puncture resitant tires on an ambulance removes the option to have helicopters
        - Niaz - can we assure we're capturing the notes in the PRs.
    - Threat Model Update
        - Niaz - until we have more of a design in place, it's hard to do a threat model analysis. At the high-level we have the threats we want to capture. Some conversations around key management.
        - "What does signing attest to", for example.
        - Discussion about splitting up the threat model requirements, vs. an actual threat model of a design.
        - Key managment spearate from a threat model design.
- UX flow
    - We'll start to sketch out an experience for iterative work. There's nothing concerete about the sketch, rather an experience to learn from, enabling folks to engage with their expertise.
- Housekeeping
    - Niaz suggested we see if we can get a different time slot, which he'll help coordinate for brekout meetings. We'll chat on the Notary v2 slack channel for everyones visibility.

### Notes:


## April 6, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Aaron Lynch (AWS)
- Samuel Karp (AWS)
- Niaz Khan (AWS)
- Tue Tran (AWS)
- Miloslav Trmač (Red Hat)
- Vibhav Bobade (Red Hat)
- _add yourself_

### Agenda Items:
- Working group status
    - Scenarios
    - Key Management / Threat Model
    - Signature Persistance
    - UX

### Notes:
- Discussion for how to represetnt a TUF concept of a collection
- What is the extent of design/constraints are we hitting? Is the existing OCI Index/Manifest design enough?
- We've been working with the assumption the existing OCI spec meets most of the capabilities, with some tweaks. But, that may not be the case.
- Threat model team to focus on more documentation of the proposal and discussion.
- Hoping to get more progress, as is reasonable, within the next week
- Ask to wrap up the current PR for scenarios so we have a common doc to reference. We can and will likely iterate on additions, but lets get a [Scenarios PR merged](https://github.com/notaryproject/requirements/pull/15).
- _meeting minutes_

## March 30, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Joey Schorr (Red Hat)
- Josh Dolitsky (Blood Orange)
- Peter Engelbert (Blood Orange)
- Miloslav Trmač (Red Hat)
- Rita Zhang (Microsoft)
- Richard Nguyen (AWS)
- Samuel Karp (AWS)
- Matthew Russo (AWS)
- Tue Tran (AWS)
- Shubhra Deshpande (AWS)
- Vincent Batts
- Adrian Mouat (Container Solutions)
- Aaron Lynch (AWS)
- Radu Matei (Microsoft)
- Ram Chinchani (Cisco)

### Agenda Items & Notes
- 9:00am – 9:30 Artifacts update
  - Status of the spec
  - IANA mediaType registration updates
  - Josh - how many types would need anything more than the generic ones?
      - Steve - likely not many. But, if they do, they can
  - Joey - We need to make sure the proposal states that *handling* of downloaded layers/blobs is artifact specific. As well, if we are mixing different kinds of artifacts, it should be done via an index, not using different layers (IMO)
  - Repo: https://github.com/opencontainers/artifacts
- 9:30-10:00: Getting the Distribution Spec to a 1.0
    - A set of proposals, such as the extension proposal #111 that could get incorporated into the 1.0 spec.
    - Hanging extensions off a repo enables ACL (Access Control Lists) to be enforced on the extnesion, in relation to the artifact.
    - Minor details - like the Readme.md need updates
    - Clarifications that are flushing out from the conformance testing.
    - Josh - [Spec Language Updates](https://github.com/opencontainers/distribution-spec/issues/117)
    - VBatts - Would like to get an RC2 out
- 10:00-10:30: Supporting the Secure Supply Chain efforts
  - How OCI, Artifacts & Notary can support the Software Supply Chain efforts with SBoM, GPL Source and other content, stored in a registry, signed with Notary v2.
- 10:30-11:00 Notary v2
    - Derek - Signatures in OCI Distribtuions
        - Fit into the existing OCI spec
        - Planning on having the extension design integrated to allow for signatures
    - Discussion of signing collections, querying a collection of signatures
    - Discussion of offline verification of signatures using snapshots
        - good conversation for the breakout groups

## Threat model meeting 27 March 2020

### Attendees:
- Justin Cormack
- Justin Cappos
- Niaz Khan
- Marina Moore
- Samuel Karp
- tuetran
- lahiru

### Agenda Items:
- where are we with threat model?

### Notes:
- TODO: remove from scenarios doc any design pieces
- TODO: improve wording on thread model: forward looking crypto agility
- roles: operator, producer consumer
- motivation vs what is wrong
- do we have to trust the registry?
- minimal possible trust.
- how does user get trust of publisher. If user knows the key registry doesnt neeed trust.
- naming vs location. third party vs first party.
- registry A deletes software where you have in B. How can you continue to trust.
- model of who the actors are and what they are trying to achieve.
- TODO: list of roles (the length of the threat model) and basic use cases.
- Which roles are providing signatures?
- Information about them.
- Signing collections is impossible.
- discussion about properties of registries - privacy needs.
- Niaz: key administrator role. Add as a TAP for TUF?

## March 23, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Miloslav Trmač (Red Hat)
- Dan Lorenc
- Samuel Karp (AWS)
- Carmen Puccio (AWS)
- Trishank Karthik Kuppusamy (Datadog)
- Marina Moore
- _add yourself_

### Agenda Items:
- A quick check-in for folks
- Breakout Updates
- _add your topics_

### Notes:

- **NOTE:** we appreciate some may be coping with, assisting others at this time. While others are looking for something creative to do with their time. We'll continue to the weekly meetings, with breakouts where possible. We will NOT make any fina/final decions as we recognize that some may not be able to engage right now. We expect things to get worse before they get better, so we'll continue to adjust. If you're leading a breakout, and need to step back, please just ask for some help to take the lead. We're a diverse group of people that are here becuase we believe in community, which is made of people.- _meeting minutes_
- Some were confused about the start time. Steve to update the heading of these notes. Please see the cncf calendar as Amye has been awesome to keep these updated.
- Breakout Updates
- Justin-Hoping to get a threat model this week
    - [#notary-v2-oci](https://app.slack.com/client/T08PSQ7BQ/C0105KCEN6T) slack channel created
- Steve - Discussion on status of scenarios. If we can get :eyes: on [#15](https://github.com/notaryproject/requirements/pull/15) we can wrap-up a baseline
    - Discussion of the mirroring PR, looking great. A minor clarification on the verification step so we can also merge.
- Key Management - possibly create another slack channel
    - Trishank to send a draft of a key management HackMD
- Please put breakout notes here, with a mid-week update if needed - AJust add another ## heading
- Some teams may split out to another slack channel, with a link provided here for others to engage.
- A bit of a concern about too many slack channels. If we do, lets try to keep them focused and not force folks to montior too many slacks.
    - We'll update here weekly for those that want to hear, but don't have time to egnage
- [Initial Design Ideas](https://github.com/notaryproject/requirements/pull/6)
    - should we move these to an issue, or another location?
    - Samuel - the requriements repo is a working location
        - we'll continue it here, as issues doesn't have good editing/comments
        - Justin spoke to the hackmd folks
        - VBatts - would be great if we could somehow integrate hackmd with github
        - At this point we'll keep things where they are. As we get further along in design, or we may merge this in as it evolves.

## March 16, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Justin Cormack (Docker)
- Miloslav Trmač (Red Hat)
- Niaz Khan (AWS)
- Tue Tran (AWS)
- Samuel Karp (AWS)
- Marina Moore (NYU)
- Trishank Karthik Kuppusamy (Datadog)
- Evan Cordell (Red Hat)
- Dave Trudgian (Sylabs)
- Justin Cappos (NYU)
- Aaron Lynch (AWS)
- Ian Kaneshiro (Sylabs)
- Dan Lorenc (Google)
- Dave Billing (Cisco)
- Vibhav Bobade (Red Hat)

### Agenda Items:
- Breakout Recap
    - Justin - Signature Storage conversations with Vincent & Derek. A writeup will be done for next week
    - Steve - Scenarios have been staged for PR feedback.
        - [Readme Link Fixup](https://github.com/notaryproject/requirements/pull/18)
        - [Scenario updates, incorporating scenarios from @JustinCappos](https://github.com/notaryproject/requirements/pull/15)
- Key Management needs a separate focus from Threat Model
    - Discussion of getting more details on the threat models before we focus on details of key managment
- Breakout teams will split off for discussions
    - Please use this Hackmd.io doc for those working at different times
    - Post meeting times for those that can attend, and subsequent recordings
        - Threat model meeting: https://calendar.google.com/event?action=TEMPLATE&tmeid=NXUzbXZmZzZhY2RwbmZwc3VsbDBnbTFtcmwganVzdGluY2FwcG9zQG0&tmsrc=justincappos%40gmail.com
- Radu did a Helm 3 w/Notary 1 prototype: https://github.com/helm/helm/pull/6282
    - Uses signatures, pushed to OCI Artifact supported registries, pushed with [ORAS](https://github.com/deislabs/oras)

### Notes:
- _meeting minutes_

## March 9, 2020

### Attendees:
- Aaron Lynch (AWS)
- Niaz Khan (AWS)
- Justin Cormack (Docker)
- Jon Johnson (Google)
- Dave Billing (Cisco)
- Marina Moore (NYU)
- Joshua Lock (VMware)
- Evan Cordell (Red Hat)
- Justin Cappos (NYU)
- Radu Matei (Microsoft)
- Serge Hallyn (Cisco)
- Miloslav Trmač (Red Hat)
- Daniel Jiang (VMware)
- Ram Chinchani (Cisco)

### Agenda Items:
- Breakout groups for Scenarios+UX and Key management+Threat model

### Notes:
- KubeCon meeting (Steve)
    - Witht the postponement of KubeCon, we moved to an online meeting. I will reschedule to start at 8am Pacific time, to account for Europe folks.
    - I'll have other meetings for Artifacts and possibly the Pub/Sub work Joey has been working on that will happen from 10am to possibly noon. With the KubeCon plan confirmed, I'll get these meetings finalized as well.
- Breakout groups
  - Use Cases & UX (api/interaction model)
      - (Steve, Omar, Marina, Aaron, Ram, Tue)
  - Threat Model & Key Management
      - (JustinCr, Justin Cappos, Niaz, Evan, Dave B, Miloslav?, Serge. Tue)
  - Signature Storage within the OCI spec
      - (JustinCr, Vincent, Derek, Sam, Jon, Daniel J, Serge, Tue)
  - Reference Implementation
      - Docker Distribution?
      - How does it interact with k8s, OPA and SBoMs
      - Zot very interested in implementing asap
- Keep the exising Monday meeting for status sync. Reduce to 30 minutes. Will move to the later hour to free up the first 30 minutes for groups to meet prior.
- Naming: Will leave open for now, pending the threat model discussions. (serge asks - where will that discussion happen?)
- Timeline
    - Going to hold to our original April timeline for an initial design.
        - use the 2 hour March 30 meeting for a summary reporting of the groups.
        - [KubeCon EU July](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/) Notary v2 First Proposal
        - [KubeCon US November 17](https://www.cncf.io/events-well-be-at/kubecon-cloudnativecon-north-america-2/) a working reference implementation.
- How do we think about Notary v2 and registries? Does success of Notary v2 end with a registry conformance/implemenation? Or, is it assumed Notary v2 stands alone outside registries?
    - The ability to pull an artifact from a registry, validate it outside of a registry is part of our success.
    - End-to-end verification implies signing/verification outside registries; OTOH smooth usage ~requires registries natively supporting transport of signed data
- _meeting minutes_

## March 2, 2020

### Attendees:
- Steve Lasker
- Stuart Hayton (IBM)
- Brandon Lum (IBM)
- Radu Matei (Microsoft)
- Niaz Khan (AWS)
- Joshua Lock (VMware)
- Marina Moore (NYU)
- Samuel Karp (AWS)
- Dave Billing (Cisco)

### Agenda Items:
- Last Weeks On Site Meeting Recap - Steve
- SBoM Integration - Steve
- Divide & Conquer - Steve/Justin
- _add your topics_

### Notes:
- With the focused conversation last week, we didn't have much new content. We did a quick cover of the naming and CNAB notes from last week. See below.
  - [Definition & Terms](https://github.com/notaryproject/requirements/blob/master/definitions-terms.md)
- SBoM conversations to verify alignmnet that there is *a* doc that would be put in a registry, which is then signed.
- Divide & Conquer to start focused design meetings. Specific groups TBD.
- Look into setting up irq on the slack channel - Serge
- [Notary Project Requirements](https://github.com/notaryproject/requirements/) for the current state of content, with [Justin's Google Doc here](https://docs.google.com/document/d/1OeH1-PpERE_9bs12klQstlaf-Omn-1_Rapu0DF7FiVg/edit#heading=h.yx0a8eaabduw)

## February 24, 2020

- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- Tue Tran (AWS)
- Justin Cormack (Docker)
- Aaron Lynch (AWS)
- Niaz Khan (AWS)
- Omar Paul (AWS)
- Sajay Antony (Microsoft)
- Radu Matei (Microsoft)
- Trishank Karthik Kuppusamy (Datadog)
- Jon Johnson (Google)
- Marina Moore (NYU/TUF)
- _add yourself_

### Agenda Items:

- What's in a name?
- Review a quick [doc on image/registry mirroring](https://docs.google.com/document/d/1k0Oe38MjPskYjRH5UveHZzT7ZE-0akrSztHl_YX61o0/edit#)
- [Notary v2 and CNAB](https://hackmd.io/@radu/By3G7Ni7L)
- Timeline of what is possible by Kubecon EU 2020?

### Notes
- **Justin/Steve/Sam/Omar**: Mirroring is not as straightforward in container registries as in package repos. An image is accessed with a location as core part of the image-therefore signing the image also signs where its stored/retrieved, therefore you today sign the image _and_ where it comes from.
- **"Sam Q: What does a signature tell you?"** **Aaron** - Gives you a hash over a bag of bits, gives you the publishers identity and lets you validate the publisher at a later time. **Sam** - specifically, lets you validate a key and only tells you the publisher is trusted and the object is what was signed, not anything inherent about the content outside of what a publisher says it is. **Steve** - tells me that this content is trusted because I trust the publisher that signed it. The name of that signed object should also be trusted. **Justin** - I have to be able to know that I signed something with a name, and if I access that later with a name, I should be able to trust that without checking the content hash again.
- **Should we let people change a name:tag and keep the signature valid** - If we don't allow this, existing container workflows will break.
- **Sajay** - We need to be able to describe the discoverability and the signature validation seperately.
    - Extending Index to support storing signatures is one option.
- **Trishank** - We can support different models of trust at the same time
    - Option 1: trust Docker to give me the keys for an image
    - Option 2: trust Docker only to give me the signatures and the images, and I will pin the keys
    - Options need not be mutually exclusive: there is no reason why we cannot support both weak and strong signing models; it should be flexible
    - Appears that we need mechanisms for transparent key distribution and revocation, as well as pinning your own keys, as well as ways to somehow order keys using some well-defined criteria for trust
- **What are we signing?** - **Justin** signing the descriptor is the correct thing, and if the exact same content is pushed, then pulled and pushed into a second location, and the content hash changes - thats a tooling issue.  **Radu** - _insert comment here_
- **Min. bar for Notary v2 of OCI needs to be Distribution Spec v1** - As a carrot/forcing function.
- How much are we willing to change?
    - We're changing the docker content trust workflow. Are we willing to change the workflows, such as other package managers like npm, rpm, nuget?
- **Diverging from TUF**
    - **Justin**: So far, not seeing a use-case for using the `snapshot` role to sign a collection of images, since it's ok to change the version/tag and not have the signature be invalid.
    - **Marina**: The `snapshot` role does prevent against [rollback attacks](https://www.usenix.org/conference/atc17/technical-sessions/presentation/kuppusamy) of images.
    - **Trishank**: Also, how does this affect security guarantees the TUF project designed for Docker Hub [hosting images on semi-trusted mirrors](https://www.usenix.org/conference/atc17/technical-sessions/presentation/kuppusamy), where the mirrors may be able to switch images?

### Notary v1
The entire path is signed
docker pull **org.exmple.com/team-a/mydb:1.0**

### Keeping the name, different path
docker pull org.exmple.com/**team-a**/mydb:1.0
docker pull org.exmple.com/**staging**/mydb:1.0
docker pull org.exmple.com/**prod**/mydb:1.0

### Keeping the name, different registries
docker pull org-**dev**.exmple.com/team-a/mydb:1.0
docker pull org-**staging**.exmple.com/team-a/mydb:1.0
docker pull org-**prod**.exmple.com/team-a/mydb:1.0

### Changing the tag, representing the env
docker pull org.exmple.com/team-a/mydb:1.0
docker pull org.exmple.com/team-a/mydb:1.0-**staging**
docker pull org.exmple.com/team-a/mydb:1.0-**prod**

### Tagging References
[Docker Tagging: Best practices for tagging and versioning docker images](https://stevelasker.blog/2018/03/01/docker-tagging-best-practices-for-tagging-and-versioning-docker-images/)
![](https://stevelaskerblog.files.wordpress.com/2018/03/stabletagging.gif?w=940&h=252)

- Comments
    - **Trishank**: I agree with the docker best practices for tagging and versioning docker images
    - **Trishank**: We cannot depend on the registry not changing the contents of the tags (unless you couple with something like immutable history with Transparent Logs, but that is a whole another can of worms by itself)
    - **Jon**: Definitely agree it seems like signing and tag verification can be solved separately... the go modules transparent log work seems to map pretty well to registry tags

### Proposal to implement the above in Notary v2
Notary v2 will support this use case
- com.docker.justin:foo <- canonical image name
- justin:foo <- Docker Hub image name
- registry.example.net/mirror/image:bar <- diff. location where this content is mirrored
Example commands
- docker pull justin:foo --from registry.example.net/mirror/image:bar
- docker pull _Sajay TBD_
- docker build --tag justin:foo --canonical-name com.docker.justin:foo --sign $KEY_ID

### CNAB doc notes
- Lets see if Notary v2 does not explicitly block what CNAB already does with TUF and Notary v1. Support TUF 1.0 delegation.
- **Radu** and **Trishank** will file an issue on the Notary v2 requirements GitHub repository about exactly what we need. A lot of this touches hairy key management issues we will ultimately need to address anyway.

### ToDos
- Steve to merge in Justin Cappos scenarios
- Sam to capture the naming conversation and next steps

### By Kubecon EU, achieve what?
- Sam: What are our goals and what are not. Do we know what we're signing, and what does this mean for OCI?
- Justin: How modular is this, what are the basic use cases, and what that usability is
- Steve: Define scope of Notary v2, so we can share with others as well (SBoM, etc.) can understand what we will and won't do.  What is needed from the OCI spec?
- Sajay: A containerd plugin PoC that shows what Notary v2 can be?
- Niaz: Understand key management requirements, need to make sure its not super easy to do this - ensure we keep some friction here. [Action] Justin (Docker), Niaz (AWS) will start to meet up on this, with Steve (Msft) bringing someone onboard in the coming weeks.

## February 18, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Samuel Karp (AWS)
- Tue Tran (AWS)
- Lahiru (AWS)
- Justin Cormack (Docker)
- Aaron Lynch (AWS)
- Niaz Khan (AWS)
- _add yourself_

### Agenda Items:
- [Review Scenarios](https://github.com/notaryproject/requirements/pull/8)
- [Review Definitions & Terms](https://github.com/notaryproject/requirements/pull/9)
- [Design discussions](https://github.com/notaryproject/requirements/pull/6)
  - What metadata should we include, and what should we defer to other SBOM type projects?
- [grpc key store client feature](https://github.com/theupdateframework/notary/pull/1455)
- [Singularity related background](https://github.com/notaryproject/requirements/issues/5)
- [TUF Delegations](https://www.usenix.org/node/194973)
- _add your topics_

### Notes

- Scenarios
  - JustinCappos Another scneario: what happens when things go wrong, and the keys are compromised? Or, what to do when a specific key was compromised.
  - Steve - are these the revoking scenarios?
  - (Niaz) - we don't revoke keys as much as we revoke trust
  - JustinCappos - If we have a man in the middle attack -
      - It matters what was signed with the key, and when. But, how do you go from the bad state, back to a good state.
      - Should also incorporate offline/copied artifacts that were copied to another registry.
  - How do we want to scope in/out various topics to the scenarios doc.
      - For instance, key managmenet.
      - Scenarios should avoid the specific technology, such as HSM. Rather we refer to keys, regardless of how the key is "managed".
  - New Scenarios
      - (Justin) #1 doesn't mention how the developer would validate the base image is valid
      - (Niaz) How to accont for the scenario where the image is validated, then deployed. Between validation and deploy, how do verify the artifact wasn't compromised. Basically, once the image has been unpacked, how do we validate it.
      - Should the hosting environemt be in-scope?
          - (JustinCormack) Or, is this more about specific artifact type validations?
      - (Raja) Should be careful to not design something that belongs in the artifact specific runtime.
  - For the artifact naming/moving, the existing scenarios aren't crisp enough. Might cover the local mirroring for IoT/OnPrem or workflow from dev-prod.
    - What are the minimum set of scenarios, vs. stretch goals?
    - What are we signing? What does signing an artifact mean?
- Threat Models
    - Agreement to create a separate threat-model.md document. (JustinCormack) - merged
    - Cappos - how to identify how the thing was compromised? It's not just a scanning question.
    - We should valiate the integrity, not enforce a policy
    - (JustinCormack) - how do we account for names being verifiable? If I can't verify by name, I can't trust it, and will revert to @sha256 digest references
- Merging
    - Agreed to merge the existing docuemnts (scenarios, def & terms, and threatmodel), and iterate upon them.
- validation logic
    - What are we validating?
        - Key?
        - Name?
        - Version?
        - Entity?
    - What does a validation look like?
        - Produced with a key that I trust
        - Producted by any key (it was signed and traceable)
        - The signature has an identity (Microsoft vs. micosoft)
        - When was it signed
        - Does the signature expire
- Open Topics
    - Naming & Signing
    - Validate before run
    - TOFU vs. Explicit
    -
- Definitions & Terms
  - _
- Key Management
    - Where keys are stored aren't completly in scope.
    - The usability for how keys are used are in scope for the usability goals of notary v2.
- Design Discussions
  - Where to store the signature info?
- Parking Lot
    - Key Management
    - Heirarchicy of keys
    - grpc key store client feature - will defer to a later conversation.
- _meeting minutes_
docker pull org.exmple.com/team-a/mydb:1.0
docker pull org.exmple.com/prod/mydb:1.0
docker pull org.exmple.com/prod/gibbly:v1dsdf0 --name mydb:1.0


## February 3, 2020

### Attendees:
- Steve Lasker
- Justin Cormack
- Stuart Hayton (IBM/ICCR)
- Jim Flanagan (AWS)
- Jack Baines (IBM/ICCR)
- Tue Tran (AWS)
- Samuel Karp (AWS)
- Niaz Khan (AWS)
- Brandon Lum (IBM/Research)
- Omar Paul (AWS)
- Joey Schorr (Red Hat)
- Evan Cordell (Red Hat)
- Miloslav Trmač (Red Hat)
- Ian Kaneshiro (Sylabs)
- _add yourself_

### Agenda Items:
- [Dividing & Conquering with a Separation of Concerns](https://docs.google.com/document/d/1u3NSJP5j65cdZHSMFALtvHno4YhbGVK6opYaO-vBOzc/edit?usp=sharing) - How Notary v2, SBOM, Policy Managmenet and Orchestrators can take on specific areas - (Steve)
- What We Sign (Justin) https://docs.google.com/document/d/1lffOYCDXBoxRumQre32yv1jUN2NfOkWugoDEJ_2DdEk/edit
- _add your topics_

### Notes:
- Overview of how to think of Notary signatures, versioning, etc: [Dividing & Conquering with a Separation of Concerns](https://docs.google.com/document/d/1u3NSJP5j65cdZHSMFALtvHno4YhbGVK6opYaO-vBOzc/edit?usp=sharing)
- Mitr: Concerned about interoperability.
- Justin: Package managers tend to sign a smaller set of metadata. If they uniquely sign the mysql:3.16 image, is that the minimal use case?
- Discussion of what's signed. The manifest, or the `artifact:tag` name.
- Signature Lifetime: Should signatures have a lifetime?
- _meeting minutes_


## January 27, 2020

### Attendees:
- Steve Lasker (Microsoft)
- Dave Trudgian (Sylabs)
- Stuart Hayton (IBM/ICCR)
- Ian Kaneshiro (Sylabs)
- Omar Paul (AWS)
- Lahiru Dissanayake (AWS)
- Samuel Karp (AWS)
- Niaz Khan (AWS)
- Miloslav Trmač (Red Hat)
- _add youself_

### Agenda Items:
- Remind ourselves to post agenda items the Friday before :)
- KubeCon Schedule update - Amye is working with the KubeCon schedule folks
- Repo update & discussion
- Requirement of signing locally
- Break out

### Notes:
- https://www.docker.com/blog/community-collaboration-on-notary-v2/
- Kubecon Amsterdam planning is being looked at. Currently looks like mid-week (Mar 30-Apr 2), Steve is working with Amy to find a location and times.
- Breakout updates:
  - Threat Model (Justin)
  - Key Managment (Justin)
      - AWS can help with the key management/crypto org participating
  - Integration with OCI & the Spec (Vincent)
    - Some early conversation with between Vincent & Jon. Would like to get Distribtuion 1.0 get out first, and we'll be additive.
  - Scenarios (Steve)
    - In progress: https://github.com/notaryproject/requirements/pull/1
  - Use Cases
  - UX (Omar)
      - Holding pattern for a couple of weeks as the scenarios and use cases flesh out
 - Steve - local signing, keys, registries
   - Sam - local signing makes sense
- Glossary of terms is needed. Define terms so we can use them in  discussion and everyone knows what they mean. _Key_, _Signature_, _Artifact_, _Key Store_, _Artifact Store_, _Annotation_, _Manifest_, _Metadata_, _Artifact Version_, _Tag_, ...
-  Air-gapped/disconnected environments is a scenario that should be spec'd.
-  Artifact names and signature references:
-  When you sign a manifest, are we signing all the annotations? If so, then as annotations are added, consider an exampe scenario that vendor annotates, then subsequently some process adds(not change of image) something, that should not invalidate the vendor signature)
-  Mixing signed and unsigned annotations is out of scope.
-  Spec should refer to orhestrators generically.
-  fx:1.0 scenario was too abstract in some areas to articulate which element of the stack would enforce the scenario.

## January 13, 2020

*video available*: https://youtu.be/_cNtDvaU-J8

### Attendees:
- Steve Lasker (Azure)
- Justin Cormack (Docker)
- Omar Paul (AWS)
- Tue Tran (AWS)
- Lahiru (AWS)
- Dave Trudgian (Sylabs)
- Samuel Karp (AWS)
- Stuart Hayton (IBM/ICR)
- Vincent Batts
- Ian Kaneshiro (Sylabs)
- Chad Metcalf
- Jon Johnson (Google)
- Phil Estes (IBM)
- Raja jadeja (AWS)
- Mike Brown (IBM)
- Miloslav Trmac (RH)
- Joseph Schorr (RH/Quay)
- Evan Cordell (RH/Quay)

### Agenda Items:
- Holiday Update (Justin)
- [Scenarios](https://github.com/notaryproject/requirements/pull/1) (Steve)


### Notes:
- (Justin) - Org things
  - Justin created a notary project under github https://github.com/notaryproject/
  - Requirements repo created at https://github.com/notaryproject/requirements/
- (Justin) How do we account for the UX of how someone signs and/or validates signatures?
- Steve/Justin - how do we account for general signatures? Should a customer have to state which signatures they support before? Or, is there a * like scenario where they require a signature, but not a specific signature? Or, is this up to specific hosts to implement? This has remnants of trust on first use
- Need to account for mirroring scenario (steve)
- Stuart/Justin: How do we account for heirarchy (root of trust) scenarios?
- Need to account for revoking signature scenarios, including mirrored scenarios (steve)
- Steve - have we thought about root signatures being in one-place, while the signed artifacts are in a different registry?
  - Justin - this was part of Notary v1, with the China mirror.
  - Miloslav - this is less of signature issue, but more of a content transport redirection scenario
  - Justin - we did implement this for things like edge/semi disconnected scenarios.
 - Miloslav - does scenario #1 imply the artifact can be signed before it's compressed?
 - Sam - while the current docker implementation doesn't store the compressed format, containerd does support both.
 - Justin - we do really want Docker to work this way (containerd), we just haven't had a chance yet. Mainly a complicated migration scenario. Derek has a PR opened. It's why we have this weird buildx plug-in.
 - David - we have signing and validation embedded into the single file. We currently work through the registry through ORAS.
- Steve - we'll account for whatever Notary v2 goes with into ORAS.
- Stuart - mirroring: Justin was talking about the home location problem. Questions on the history of the name.
    - Justin - do you need to know the history of the name? If it's my image docker.io/justincormack/foo, I may use docker.io/justincormack for my signing key/authority. However, other vendors like Microsoft may have it's own key.
    - Joey - I agree, the name seems to be unimportant. If docker wants to sign every image, they can with docker.io/centralsignature, or there's a specific signature. It's up the client for which signatures they want to trust
    - Justin - we definitley can't have anything change when moved between regsitries
    - Steve - we're talkinga about seperating the signature name from the registry it's stored within.
    - Mirek - the difference between signed “what the content is” and location is important. If the user asks for a specific version, they should get the specific version they asked for.
    - Joey - need to think about keys being tied to versions. I don't want to end up with the tag name being put into the manifest. If one manifest list can refer to a remote manifest, ... then it's up to each user to make a determination on how they sign things. Expect most users will want to trust a general key, not a specific version. But, customers can opt-into the narrowness of what they need. Perhaps a key for major version, with an annotation for a minor version. Want to get away from the tag name being canonicalized into the annotations.
    - Steve - the scnearios capture naming can be different as the artifact moves.
    - Justin - most people do want to know by tag, and they're running mysql:3.8, they really get something that was tagged mysql:3.8, and not something mysql:3.4
    - Steve - how much should we lean into SBOM, vs tied signatures to specific artfiacts. Should we dictate a flow, or enable a flow?
    - Justin - we definelty want to be flexible, but we defintiley want some standard policy/framework to apply the kind of policies they want. It's important to know it's mysql, but also what version is also important.

Notes from slack:
From Red Hat NYC to Everyone:  11:01 AM
We need to leave now, unfortunately, but wanted to comment that name resolution is already the job of the registry; it seems weird to have a second system to replace the very purpose of the registry
that’s part of the reason we have a concern with how Notary V1 worked
From Miloslav Trmač to Everyone:  11:01 AM
The registry (or the registries involved, or the backing storage) is by definition untrusted or we, for the most part, don’t need signatures

