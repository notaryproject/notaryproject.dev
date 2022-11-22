---
title: Notation signatures as ORAS and OCI artifacts
author:  "[maxgio92](https://github.com/maxgio92), Clastix"
date: 2022-11-21
draft: false
---

## Notary and Notation

[Notary project](https://notaryproject.dev/) is a set of tools that helps you sign, store, and verify OCI artifacts using OCI-conformant registries.

[Notation](https://github.com/notaryproject/notation) is an implementation of the [Notary v2 specifications](https://github.com/notaryproject/notaryproject).
As an implementation provides a CLI that adds signatures as standard items in the registry ecosystem, and can build a set of simple tooling for signing and verifying these signatures.

Notary v2 provides for multiple signatures of an [OCI Artifact](https://github.com/opencontainers/artifacts) (including container images) to be persisted in an OCI conformant registry.
Artifacts are signed with private keys, and validated with public keys.

To support user deployment flows, signing an OCI Artifact will not change the `@digest` or artifact `:tag` reference.
To support content movement across multiple certification boundaries, artifacts and their signatures will be easily copied within and across OCI conformant registries.

To deliver on the Notary v2 goals of cross registry movement of artifacts with their signatures, changes to several projects are anticipated, including [OCI distribution-spec](https://github.com/opencontainers/distribution-spec), [CNCF Distribution](https://github.com/distribution/distribution), [OCI Artifacts](https://github.com/opencontainers/artifacts), [ORAS](https://github.com/oras-project/oras) with further consumption from projects (e.g. [containerd](https://github.com/containerd/containerd)).

Already changes are coming in ORAS that unified the ORAS artifact spec into the new OCI artifact spec, to cover scenarios where images aren't the only artifact to be distributed, such as signatures, SBOMs, attestation, etc. but that references container-related artifacts.

## OCI and ORAS

Notation leverages ORAS to store signatures into OCI registries.
The [ORAS project](https://oras.land/) is a set of tools and libraries that enable to use OCI registries to store arbitray artifacts.
But what are OCI Registries?

The [Open Container Initiative](https://opencontainers.org/) (OCI) defines the specifications and standards for container technologies.
This includes the [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec), the API for working with container registries.
Registries that implement the distribution-spec are referred to as OCI Registries.

### OCI and ORAS artifacts

The main OCI artifact type is the [OCI image](https://github.com/opencontainers/image-spec). With time, people used registries to store arbitrary artifacts, leveraging performance, security and reliability capabilities of registries.
One growing example is artifacts for securing the sofware supply chain like SBOMS, signatures, attestations, scan results, etc.

The [OCI artifacts](https://github.com/opencontainers/artifacts) project aims to generalize the artifact types that can be distributed by and stored into OCI registries. 
The image manifest has a `config.mediaType` field to differentiate between the various types of artifacts.
This field is supposed to be filled by the authors of new artifact types, so ORAS did to support a wide range of artifact types.

It introduced the [ORAS artifact specification](https://github.com/oras-project/artifacts-spec) and related `application/vnd.cncf.oras.artifact.manifest.v1+json` `mediaType`.
This media type bases on the OCI image manifest but removes constraints such as a required `config` object and required & ordinal `layers` (more on the OCI image manifest spec [here](https://github.com/opencontainers/image-spec/blob/main/manifest.md)).

The ORAS artifact manifest adds a `subject` property supporting a graph of independently linked artifacts.
It provides a means to define artifacts that can be related to an OCI image manifest, OCI image index or another ORAS artifact manifest (for example [here](https://github.com/oras-project/artifacts-spec/blob/main/scenarios.md#notary-v2-signatures) a Notary V2 signature that references an image).
By defining a new manifest, registries and clients opt-into new capabilities, without breaking existing behaviour, such as discovery provided by the ORAS [referrers API](https://github.com/oras-project/artifacts-spec/blob/main/manifest-referrers-api.md#manifest-referrers-api).

## Quickstart

### Requirements

- [Docker](https://docs.docker.com/engine/reference/commandline/cli/) or [Podman](https://docs.podman.io/en/latest/Commands.html)
- [Notation](https://github.com/notaryproject/notation/releases)
- [ORAS CLI](https://oras.land/cli/)

### Run the demo

Run a local [ORAS](https://github.com/oras-project) OCI regsitry:

```shell
export PORT=5000
export REGISTRY=localhost:${PORT}

docker run -d -p ${PORT}:5000 ghcr.io/oras-project/registry:v0.0.3-alpha
```

Build and push an OCI image to the local registry with a tag:

```shell
export REPO=${REGISTRY}/net-monitor
export IMAGE=${REPO}:v1

docker build -t $IMAGE https://github.com/wabbit-networks/net-monitor.git#main
docker push $IMAGE
```

See how the image is not signed (the are no signing artifacts on the local repository that reference the just pushed image):

```shell
notation list --plain-http $IMAGE
```

Generate a certificate key pair to sign the image:

```shell
notation cert generate-test --default "wabbit-networks.io"
```

Sign the image with the certificate key just created:

```shell
notation sign --plain-http $IMAGE
```

Now you need to configure the [trust policy](https://notaryproject.dev/docs/concepts/trust-store-trust-policy-specification/#trust-policy) to specify trusted identities which sign the artifacts, and level of signature verification to use:

```shell
cat <<"EOF" > ~/.config/notation/trustpolicy.json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "strict" 
            },
            "trustStores": [ "ca:wabbit-networks.io" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
EOF
```

Verify that the image is signed, against the trust store.

```shell
notation verify --plain-http $IMAGE
```

But now, let's get more detail and see what is a signature.

## Inpspect the signature artifacts

As of now of Notation v0.12 a signature is an ORAS [artifact-spec](https://github.com/oras-project/artifacts-spec) compatible OCI image, on an OCI registry that references an OCI image.
As a digest makes unique an artifact (i.e. an image), the `subject` field of the signature image manifest references the signing content.

Let's check that on our local registry!

### Inspect with ORAS CLI

First, install a ORAS CLI release with version < 0.16.0.

> Later we'll see why not 0.16.

```shell
$ oras discover $IMAGE -o json
{
  "referrers": [
    {
      "digest": "sha256:6131e049f4e045614d575ade11e9c9b44e6b7fb081fdd0b8a27f1726329eb5ab",
      "mediaType": "application/vnd.cncf.oras.artifact.manifest.v1+json",
      "artifactType": "application/vnd.cncf.notary.v2.signature",
      "size": 512
    },
    {
      "digest": "sha256:cdb664bc205fccbfc06cff7310ea42fe8cf483deb2c9e77a3c829c5d3ecde037",
      "mediaType": "application/vnd.cncf.oras.artifact.manifest.v1+json",
      "artifactType": "application/vnd.cncf.notary.v2.signature",
      "size": 512
    }
  ]
}
```

And you can see that the artifacts digests match the signatures pushed by Notation.

Now let's see how is composed a `application/vnd.cncf.notary.v2.signature` manifest, by picking the first signature:

```shell
$ oras manifest fetch ${REPO}@$(oras discover $IMAGE -o json | jq -r '.referrers[0].digest') \
  | jq
{
  "mediaType": "application/vnd.cncf.oras.artifact.manifest.v1+json",
  "artifactType": "application/vnd.cncf.notary.v2.signature",
  "blobs": [
    {
      "mediaType": "application/jose+json",
      "digest": "sha256:187e7739f84c8b7770dacfda80917ac1c671b92de192bdadf16c87ca0611d846",
      "size": 2120
    }
  ],
  "subject": {
    "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
    "digest": "sha256:79cf36c749e0e7445335567b97719bddaf57d0f465f9f36bcbe7ce0a25d02ec6",
    "size": 942
  },
  "annotations": {
    "io.cncf.oras.artifact.created": "2022-11-14T18:38:51Z"
  }
}
```

As you can see the `subject` field references the Docker image [manifest v2](https://docs.docker.com/registry/spec/manifest-v2-2/) of the signed image.

## Show me the code

Now let's see what the `notation sign` command does.
[`runSign()`](https://github.com/notaryproject/notation/blob/v0.11.0-alpha.4/cmd/notation/sign.go#L83) is the core part of the command:

```go
func runSign(command *cobra.Command, cmdOpts *signOpts) error {
	// initialize
	signer, err := cmd.GetSigner(&cmdOpts.SignerFlagOpts)
	if err != nil {
		return err
	}

	// core process
	desc, opts, err := prepareSigningContent(command.Context(), cmdOpts)
	if err != nil {
		return err
	}
	sig, err := signer.Sign(command.Context(), desc, opts)
	if err != nil {
		return err
	}

	// write out
	path := cmdOpts.output
	if path == "" {
		path = dir.Path.CachedSignature(digest.Digest(desc.Digest), digest.FromBytes(sig))
	}
	if err := osutil.WriteFile(path, sig); err != nil {
		return err
	}

	if ref := cmdOpts.pushReference; cmdOpts.push && !(cmdOpts.Local && ref == "") {
		if ref == "" {
			ref = cmdOpts.reference
		}
		if _, err := pushSignature(command.Context(), &cmdOpts.SecureFlagOpts, ref, sig); err != nil {
			return fmt.Errorf("fail to push signature to %q: %v: %v",
				ref,
				desc.Digest,
				err,
			)
		}
	}

	fmt.Println(desc.Digest)
	return nil
}
```

First, a `signer` is fetched. A signer here is a component that signs an artifact and generate and signature.

[`prepareSigningContent()`](https://github.com/notaryproject/notation/blob/v0.11.0-alpha.4/cmd/notation/sign.go#L126) prepares the manifest [descriptor](https://github.com/opencontainers/image-spec/blob/main/descriptor.md#oci-content-descriptors) to be signed:

```go
func prepareSigningContent(ctx context.Context, opts *signOpts) (notation.Descriptor, notation.SignOptions, error) {
	manifestDesc, err := getManifestDescriptorFromContext(ctx, &opts.RemoteFlagOpts, opts.reference)
	if err != nil {
		return notation.Descriptor{}, notation.SignOptions{}, err
	}
	if identity := opts.originReference; identity != "" {
		manifestDesc.Annotations = map[string]string{
			"identity": identity,
		}
	}
	var tsa timestamp.Timestamper
	if endpoint := opts.timestamp; endpoint != "" {
		if tsa, err = timestamp.NewHTTPTimestamper(nil, endpoint); err != nil {
			return notation.Descriptor{}, notation.SignOptions{}, err
		}
	}
	pluginConfig, err := cmd.ParseFlagPluginConfig(opts.pluginConfig)
	if err != nil {
		return notation.Descriptor{}, notation.SignOptions{}, err
	}
	return manifestDesc, notation.SignOptions{
		Expiry:       cmd.GetExpiry(opts.expiry),
		TSA:          tsa,
		PluginConfig: pluginConfig,
	}, nil
}
```

the `signer` signs artifacts and generates signatures by delegating the [one or more operations](https://github.com/notaryproject/notation-go/blob/v0.11.0-alpha.4/signature/plugin.go#L46) to the named plugin that will only generate a raw signature given a payload to sign.

```go
// Sign signs the artifact described by its descriptor and returns the marshalled envelope.
func (s *pluginSigner) Sign(ctx context.Context, desc notation.Descriptor, opts notation.SignOptions) ([]byte, error) {
	metadata, err := s.getMetadata(ctx)
	if err != nil {
		return nil, err
	}
	if !metadata.SupportsContract(plugin.ContractVersion) {
		return nil, fmt.Errorf(
			"contract version %q is not in the list of the plugin supported versions %v",
			plugin.ContractVersion, metadata.SupportedContractVersions,
		)
	}
	if metadata.HasCapability(plugin.CapabilitySignatureGenerator) {
		return s.generateSignature(ctx, desc, opts)
	} else if metadata.HasCapability(plugin.CapabilityEnvelopeGenerator) {
		return s.generateSignatureEnvelope(ctx, desc, opts)
	}
	return nil, fmt.Errorf("plugin does not have signing capabilities")
}
```

Finally, Notation will package this signature into a signature envelope, and generate and pushes the signature manifest, through [`pushSignature`](https://github.com/notaryproject/notation/blob/v0.11.0-alpha.4/cmd/notation/push.go#L90):

```go
func pushSignature(ctx context.Context, opts *SecureFlagOpts, ref string, sig []byte) (notation.Descriptor, error) {
	// initialize
	sigRepo, err := getSignatureRepository(opts, ref)
	if err != nil {
		return notation.Descriptor{}, err
	}
	manifestDesc, err := getManifestDescriptorFromReference(ctx, opts, ref)
	if err != nil {
		return notation.Descriptor{}, err
	}

	// core process
	// pass in nonempty annotations if needed
	sigMediaType, err := envelope.SpeculateSignatureEnvelopeFormat(sig)
	if err != nil {
		return notation.Descriptor{}, err
	}
	sigDesc, _, err := sigRepo.PutSignatureManifest(ctx, sig, sigMediaType, manifestDesc, make(map[string]string))
	if err != nil {
		return notation.Descriptor{}, fmt.Errorf("put signature manifest failure: %v", err)
	}

	return sigDesc, nil
}
```

### Signing protocols: JOSE and COSE

As a detail, the [supported signing protocols](https://github.com/notaryproject/notation/blob/v0.11.0-alpha.4/internal/cmd/signer.go#L58) are [JWS](https://www.rfc-editor.org/rfc/rfc7515) and [COSE](https://www.rfc-editor.org/rfc/rfc9052).

The [JOSE](https://jose.readthedocs.io/en/latest/) Working Group produced a set of documents ([RFC7515](https://www.rfc-editor.org/rfc/rfc7515), [RFC7516](https://www.rfc-editor.org/rfc/rfc7516), [RFC7517](https://www.rfc-editor.org/rfc/rfc7517), [RFC7518](https://www.rfc-editor.org/rfc/rfc7518)) that specified how to process encryption, signatures, and Message Authentication Code (MAC) operations and how to encode keys using JSON (like for JWS).

JWS represents content secured with digital signatures or Message Authentication Codes (MACs) using JSON-based data structures.

COSE describes how to create and process signatures, message authentication codes, and encryption using CBOR for serialization.
[CBOR](https://www.rfc-editor.org/rfc/rfc7049) is a data format that was designed specifically to be small in terms of both messages transported and implementation size and to have a schema-free decoder.

CBOR extended the data model of JavaScript Object Notation (JSON) by allowing for binary data directly without first converting it into a base64-encoded text string, among other changes.

COSE is not a direct copy of the JOSE specification.  In the process of creating COSE, decisions that were made for JOSE were re-examined.

## What's next

It happened that ORAS worked to unify their artifact specification into a new OCI standard specification (Reference Types for image and distribution specs).

We're waiting to see a bump in the Notation Go library to [support](https://github.com/notaryproject/notation-go/issues/136) the new Reference Type (and then Notation CLI) of the ORAS Go library (now release candidate [v2.0.0-rc.4](https://github.com/oras-project/oras-go/tree/v2.0.0-rc.4)).

ORAS CLI [v0.16.0](https://github.com/oras-project/oras/releases/tag/v0.16.0) already leverages OCI artifacts, and that's why in this demonstration we picked a previous version, as we demonstrate ORAS Artifact-based signatures.

See you soon with updates on OCI Artifact-based signatures!

