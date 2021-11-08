---
title: Notary v2 Meeting Notes Archive - 2019
---

## Notary v2 Kickoff Meeting

December 12, 2019

## Agenda
| Time | Agenda |
|-|-|
|10:00-10:30 | Arrival |
| 10:30-10:45 | Welcome & intros |
| 11:00-11:20 | Goals for the meeting |
| 11:20-11:45 | Goals for Notary v2 |
| 11:45-12:30 | Requirement discussion |
| 12:30-01:00 | Lunch |
| 01:00-03:00 | Open Discussions TBD |
| 03:00-03:30 | House Keeping/Next Steps |
| 03:30-05:00 | Unbooked, as some have previous committments |
| 06:00-??:?? | Dinner downtown seattle (location tbd) |
- Dinner (location tbd. Please reply with any dietary restrictions for lunch and dinner)

## Attendees

-  Steve Lasker (Microsoft acr/mcr)
-  Sajay Antony (Microsoft acr/mcr)
-  Shiwei Zhang (Microsoft acr/mcr)
-  Ralph Squillace (Microsoft)
-  Radu Matei (Microsoft)
-  Samuel Karp (AWS / container runtimes)
-  Jay Pipes (aws eks)
-  Raja (aws ecr/hybrid)
-  Tue (aws / ecr)
-  Lahiru (aws / ecr)
-  Vincent Batts (red hat)
-  Jon Johnson (google)
-  Omar Paul (aws - product manager ecr)
-  Lindsay Smith (google gcr)
-  Lukasz Opyrchal (google gcr)
-  Derek McGowan (docker)
-  Michael Hasuenblaus (aws)
-  Michael Brown (OCI/IBM)
-  Miloslav Trmac (RedHat)
- Joey (quay)
- Hank (quay)
- Kenny (quay)
- Evan (quay)
- Maria Moore (NYU)
- Justin Cormack (Docker)
- Chad Metcalf (Docker)
- Kat (JFrog)
-

## Meeting Notes

### Video of the discussions

https://youtu.be/mZ_x0KW33Tg (all three segments combined)

### Goals for the meeting

- Round table discussion
- Justin - Identify areas of focus

### Goals for notary v2
 - Reading/reference material
 - [Notary v2 Google Doc from Justin](https://docs.google.com/document/d/1OeH1-PpERE_9bs12klQstlaf-Omn-1_Rapu0DF7FiVg/edit#heading=h.r39ivww1ygm8)
 - [Artifacts Signing Requirements](https://github.com/opencontainers/distribution-spec/issues/70)
 - Previous discussion in opencontainers/image-spec
     - [#22](https://github.com/opencontainers/image-spec/issues/22), [#176](https://github.com/opencontainers/image-spec/issues/176), [#480](https://github.com/opencontainers/image-spec/issues/480)
- Support up/down the stack, inlcuding K8s, and other container hosts
- Consistency across registry operators
- SteveLas - Each cloud can point customers to a central oss/notary location for general documentation, then each cloud only needs to provide their unique interaction, such as auth or how the info is displayed
- SteveLas - each cloud has the ability to utilzie their specific providers, such as auth and key storage. The spec would provide a common api for customers, but the underlying interaction would be open. Just as ddocker-distribution enables cloud specifi
- Justin - Consistency of signatures, movement between repos as well as cross registry
- Joey - the simpler we can keep things, the more likely we can all standardize on tooling, now
- Steve - How much do we need to save compat on previous notary/content trust is a good question
- Vincent - reusing infra for existing, should be a goal
- Justin - keeping signatures in the registry, so it's not separate components for clouds/vendors to implement
- Joey - if you can use arbitray mime types, keeping the signature in the registry is helpful. Can leverage caches, like the kube image cache
- SteveLas - should we support signatures in the registry, for artifacts that are stored externally?
- Radu - storing signatures inside the registry, but the CNAB is stored outside the registry is a requirement for air-gapped environment
- Joey - if manifest lists can reference an external entity, will that suffice? (internal/external references)
- Radu - the entity that is signed, needs to reference the content digest that's stored in the registry (**Radu - please correct this note**)
- Vincent - should have a means to deal with compression and decompression scenarios.
- Vincent - You should sign the opaque blob. How a registry, or transport handles compression is a separate element
- SteveLas - signature movement/copy must be fully copied into the destination environment. Users within the air-gapped enviornment must be able to self validate the signature wihtin that air-gapped environment
- Justin - how do we get the public keys between environments?
- Marina - As long as the initial root of trust is good, the destination shouldn't matter.
- Miloslav - if an ISV signs an artifact, that should be maintained (if consumers have public keys directly from the ISV, don’t allow a registry to sign on-behalf)
  - Some signatures may not move, rather stay in their source.
  - "please lets not re-invent the Certificate Authority ecosystem"
- Justin - with Docker Hub, there's currently too many keys as each repo can have it's own key.
- Justin - vendors should have the ability to have a single key to represent all their images, rather than each artifact having their own
- evan - registry keys vs repo keys, and having a hierarchy
- Vincent - should their be a tiered level of trust between certs?
- SteveLas - how do we enable clients/nodes to support signatures? Is this a policy? Do we need to incorporate the flow into K8s and other container hosts?
- Justin - when should the signature be verified. If you use a tag, is it late binding?
- Vincent - assumed it would be more like the admission controller scneario
- Raja - at the cluster - should it determine based on a dev or production environment. The same application/same image might have different policies, based on the environemnt
- Vincent - should be pre-flight validation capable
- Vincent - revocation/ejection of artifacts for comprimised certs
- Raja - how do we handle revocation across air-gapped registries
- Vincent - can we do multiple signatures, as it moves across the workflow?
- Justin - signatures through the CI flow.
- Steve - signatures by scanning solution, to say it's been security signed
- Vincent - multiple signatures might something we can do later
- Tue - can we do signatures on the base layers?
- Vincent - this scenario was supported in Docker 1.8?, and we'd have to revisit to bring it back.
- Joey - can we sign the signed manifest with another signature? Tuf may have a solution for threshold signatures. If we're concerned about multiple sigs, we should be able leverage what's already there (TUF)
- Raja - should each layer have different pointers.
- Steve - this could help with the base image vulnerabilities issues
- Vincent - need to account for the squash scenarios
- Miloslav - for multi-signatures, need to think about two different roots of trust (!= TUF threshold signing)
- Miloslav - manifest digests are used for things like openshift, to assure consistency. We should make sure the signature doesn't change the digest.
- Vincnet - you can have manifest lists, point to additional manifest lists. Clients could hop through the manifest lists.
- Lindsay - what does it mean for a registry to sign content? How do signatures flow through registries if a registry doesn't support signing?
- Justin - It doesn't make sense for the registry to sign artifacts. The client should sign it. Where they do signing is a different question.
- Joey - as long as we have the necessary hooks, for cloud, or external cloud hsm providers.
- Raja - what does multi-tenancy look like. An org with multiple subsidearies.
- SteveLas - Should a distribution spec incorporate multi-tenancy for storing multiple customer keys
- Justin - how does mirroring work in these scenarios?
- Joey - if built atop distirbution, handling multi-tenancy already, there shouldn't be any additional work, other than handling heirarchical root keys
  - idealiy, there's a way for the protocol to know a root key, for a tenant, is located at this place. The registry could have a root key.
- Marina - could this be handled with delegation?
- Justin - when discussing docker hub, if you did root at the org, it could like repo inormation. You might be able to pull the tuf metadata to get all the repos. Changed at the last minute. Should revisit the concerns.
- Evan - There's an [extension](https://github.com/theupdateframework/taps/blob/master/tap4.md#use-case-2-hiding-sensitive-metadata-and-targets) to TUF to explain how to disambiguate public and private.

### Client Experience/Requirements

- Justin Signing should be built into everything. It shouldn't have to be a seperate tool
- Joey - docker made containers avaialble to the world, becuase the experiences were frictionless and consolidated.
- Samuel - the challenge with it only being built in, doesn't allow for different trust policies. What if I wanted to express different expiration dates.
- Justin - can there be a plug-in model?
- Samuel - use case - I want to provide a trust policy to a cluster, where do I define this for prod vs. staging.
- Samuel - I don't want to put all the policy information into the client.
- Justin - should there be a default/normal policy.
- Steve - should the plug-in model be at the registry as well, to enforce policies, before the image is even pulled.
- Joey - preventing pulls, outside of auth are overly restrictive.
- Sajay - Notary is currently a different endpoint. Should the notary server be separate? This causes vnet/firewall rule challenges
- Justin - Registry should have this part of the endpoint.
- Steve - Capabilties - how can a registry support a set of capabiliites that it supports, as opposed to having a strict versoin MUST list.
- Joey - TAP, based on python supports a feature discovery scenario
- Should add this capabilities/discovery approach to distribution, as a base, as part of v1?
    - Vincent - as long as it doesn't take too long
- Justin - should standardize a set of annotations for signing
- MikeBrown - reminder for existing annotation rules and predefined examples:
    - https://github.com/opencontainers/image-spec/blob/master/annotations.md#annotations
- Justin - probably need a breakout for threat model.
- Tue - some customers may want the registry to provide a managed signing solution (whether it does it itself and/or hands that off to a service such as aws KMS).
- Omar - when launching workloads across many nodes, should make sure the design does not prevent a way for a control plane or node to verify prior to pulling the entire image.  (e.g. revoked, check publisher)
- Joey - lets not solve key distribution as part of all this. API can return a redirect to go 'here' to verify/manage keys, lets key management be part of the orchestrator, for example.
- Mike - manage pull policy from the pod spec in kubelet. +1 to the point above, the container runtime nor the registry implements policy, e.g. running verified images.
- Justin - make sure out-of-band key management does not cause a 'million' keys to exist and be used in signing and verifying
- Sam - Cannot really have a system to allow trust without having a way to also signify mistrust.
- Justin - experience from v1 was not as optimal as what docker trust laid out, that may be a model for how the cli looks like (as a starting point).  E.g. observability of the signature was not good.
- Steve, Sajay - Most of our support cases are around usability today. Must make this simple to use for clients.

### Breakout Conversations

- How compression/decompression is handled with signatures
- What do signatures look like witihin a registry
    - Justin - Detached signatures?
- Use case/test cases
- Policy plug-ins
    - Client plug-ins
    - Registry plug-ins
    - Does a registry provide a way for clients to pull in policy plug-ins to avoid a client from implmeenting a rogue plug-in?
- Annotations and how do we think about a registry and client understanding a signature
- Key Management
- Signature Storage (OCI, etc)
- Threat model
- UX (cli, api, params)

## Signature Storage

- Justin - do people want x509, pki?
- Marina - should be careful about providing too many options
- Vincent - if I push an opaque sig to a registry, there's certain things that can be encoded, but there's data that's signed in it, and data that's attached to it (hints). Some things must be wrapped up underneath the signature.
- Steve - how can we have a set of annotations that aren't required to be signed
- open discussion - any non-signed metadata is externally tracked, not part of this signing solution.
- Open discussion - mutation - for notary v2, we'll focus on signing a specific object. Tracking it's history is not part of this scope. If someone takes a signed artifact, makes some change, inlcuding annotations, they can re-sign it, but we're not worrying about tracking the previous signature.
- Justin/Vincent - should focus on signing the checksum of the descriptor, to account for different mediaTypes (artifact types). *Note*: should follow-up with Derek on some history here.
- Justin: annotations should have publisher information.
- Vincent - SWID discussion on how it might make sense for storing the signature info
- Mike Brown - need to think about how encyrpted content relates to signing

## Strawman
- Jon - strawman: https://gist.github.com/jonjohnsonjr/6f179e5876118561ca8ed9504e68c9ae

## Use Cases

### Local Build, Push, Pull, Run

**[Must have]** Prior to doing any deploymnet, a developer can test the sign, push, run scenario.

### Automated Build, Push, Pull, Run

**[Must have]** A CI/CD solution can be triggered by a git commit. The system can build an artifact, sign it, and push it to the registry. The production system can pull the artifact, verify the signature and run it.

### Automated Build, Push, Pull, Failed Run

**[Must have]** A CI/CD solution can be triggered by a git commit. The system can build an artifact, sign it, and push it to the registry. The production system can pull the artifact, verify the signature and reject it, thus not run it.

### Multiple runtimes and orchestrators

**[Must have]** The *Automated Build, Push, Pull, Run* use case can execute on a Docker, containerd runtime, and in a k8s environment.

### Verify base images

**[Must have]** A CI/CD build system uses base images that are signed. It can verify the signature as part of using them when adding them as layers.

### Move images across registry

**[Must have]** A signed image exists in one registry. I can pull that image and push it into another registry which can validate the signature.

### Sign more than just an image

**[Must have]** A CI/CD system can have a registry that supports more than container images, signs for example a helm chart and stores it in a registry. A client can then verify the chart before using it.

### Policy Management

The ability for a cloud provider/vendor to implement a policy managmenet solution

### Running a Packaged Product

I can find a product on a public or vendors registry. I can then move the artifact...

## Notary v2 Timeline

- Omar - we all have pressing timelines. We'll need a solution we can all implement prior to *2022!*
- Omar - Conclusion after the kickoff meeting was that we'd have a proposal in time to get a Q4 2020 implementation

### House Keeping

- Balancing Geo challenges of participants
    - occasionaly on-site meetings, with regular conversations on slack
    - Use the CNCF Slack:notary v2 for all breakouts
    - KubeCon EU on-site meeting? (concern that several key folks wont be able to attend )
        - Arrange on-site meeting at [KubeConEU March 30-April 2](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/)
        - Justin - we have two 35 min Notary slots
        - For those that do attend KubeConEU, we'll schedule an afternoon with dial-in for others to attend
        - Steve to arrange logistics (day 0 or +1)
    - Will focus on the OCI weekly call for now
    - We may schedule one-off calls for specific breakout topics,
    - Justin to get a CNCF/Notary zoom room
- Where to post community content?
    - notary org, although github/notary is taken
    - Justin - should assume Notary v2 is a new org, not a branch
    - Justin to find a new org
- Timeline for notary v2 - setting realistic expectations
    - Scope to ship a Notary v2 experience in 2020
    -
- Next steps
  - breakouts for:
    - Capabilities/PEP for distribtuion-spec (Vincent)
    - Use Cases (Steve) first week of Feb as a working draft
    - Threat Model (Justin)
      - Key Management ()
    - Signature Storage (Vincent/Derek?)
    - UX (Omar)

## Dinner/Drinks

 - for the purposes of security, no notes permitted
@ 5:30pm
**Black Bottle Gastrotavern**
2600 1st Avenue
Seattle, WA 98121
(206) 441-1500
