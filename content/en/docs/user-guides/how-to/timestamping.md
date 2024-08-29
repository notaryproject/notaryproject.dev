---
title: "Timestamping"
description: "How to sign and verify artifacts in OCI-compliant registries with timestamping"
type: docs
weight: 9
---

In the X.509 Public Key Infrastructure (PKI) system, digital signatures must be generated within the certificate's validity period, as expired certificates compromise the signature's trustworthiness. The [RFC 3161](https://www.rfc-editor.org/rfc/rfc3161) standard defines the internet X.509 PKI Time-Stamp Protocol (TSP), where a timestamp is issued by a trusted third party acting as a Time Stamping Authority (TSA). These trusted timestamps extend the trust of signatures created within certificates validity, enabling successful signature verification even after certificates have expired.

Since Notation v1.2.0 release, Notation supports RFC 3161 compliant timestamping. During signing, a timestamp countersignature is added to the Notary Project signature envelope for the signing artifact, ensuring the trustworthiness of the signature through validation. However, Notation does not use timestamp to verify that the signature was created before any certificate revocation, as the revocation time is not deterministic. For example, the revocation time may not coincide with the time the certificates are compromised.

This guide describes how to sign and verify artifacts in OCI ([Open Container Initiative](https://github.com/opencontainers)) compliant registries with timestamping. Artifacts in OCI-compliant registries can be container images or other artifacts such as Software Bill of Materials (SBOM).

## Prerequisites

Before starting, ensure you have:

* Learned the basic signing and verification workflow following the [guide](https://notaryproject.dev/docs/quickstart-guides/) since Timestamping feature was added on top of existing signing and verification workflows.
* Installed Notation CLI v1.2.0. If not, follow the [installation guides](https://notaryproject.dev/docs/user-guides/installation/).
* Installed Notation plugins for signing with keys stored in a KMS (Key Management System), such as AWS Signer or Azure Key Vault.
* A container image or artifact stored in an OCI-compliant registry.

## Sign artifacts in OCI-compliant registries with timestamping

To sign artifacts in OCI-compliant registries with timestamping, you need to select a trusted [RFC 3161](https://www.rfc-editor.org/rfc/rfc3161) compliant TSA. There are public TSAs available, such as [DigitCert](https://www.digicert.com/) TSA and [Globalsign](https://www.globalsign.com/en) TSA. Since Notation CLI v1.2.0, two flags `--timestamp-url` and `--timestamp-root-cert` are introduced to the `notation sign` command for RFC 3161 timestamping. Use the flag `--timestamp-url` to specify the URL of the TSA that you trusted. Use the flag `--timestamp-root-cert` to specify the filepath of downloaded root cert file for the trusted TSA. The root cert serves as the trust anchor to establish the chain of trust of the TSA. This is to protect you from MITM (Man-in-the-Middle) attacks. Upon successful execution of `notation sign`, the TSA response will be stored in the signature envelope. An example command:

```shell
notation sign --timestamp-url <TSA_URL> --timestamp-root-cert <TSA_ROOT_CERT> --key <KEY_NAME> <REFERENCE_TO_ARTIFACT> 
```

For example, if you choose DigiCert public TSA, the URL is `http://timestamp.digicert.com`, and you can download the root certificate [here](https://cacerts.digicert.com/DigiCertTrustedRootG4.crt?_gl=1*bx6qtj*_gcl_au*MjU0OTgzNjUuMTcyMTkwNDAzMw) and name it as `digicert_root_cert.crt`. The command looks like:

```shell
notation sign --timestamp-url "http://timestamp.digicert.com" --timestamp-root-cert "digicert_root_cert.crt" --key <KEY_NAME> <REFERENCE_TO_ARTIFACT> 
```

If you do not specify the two flags `--timestamp-url` and `--timestamp-root-cert`, artifacts are signed without timestamping.

## Inspect signatures with RFC 3161 timestamp

Since Notation v1.2.0, the `notation inspect` command is enhanced to show RFC 3161 timestamp in the output.

```shell
notation inspect <REFERENCE_TO_ARTIFACT>
```

An example output:

```text
├── unsigned attributes
│   ├── timestamp signature
│   │   ├── timestamp: [Tue Aug 20 00:14:59 2024, Tue Aug 20 00:14:59 2024]
│   │   └── certificates
│   │       ├── SHA256 fingerprint: d2f6e46ded7422ccd1d440576841366f828ada559aae3316af4d1a9ad40c7828
│   │       │   ├── issued to: CN=DigiCert Timestamp 2023,O=DigiCert\, Inc.,C=US
│   │       │   ├── issued by: CN=DigiCert Trusted G4 RSA4096 SHA256 TimeStamping CA,O=DigiCert\, Inc.,C=US
│   │       │   └── expiry: Fri Oct 13 23:59:59 2034
│   │       ├── SHA256 fingerprint: 281734d4592d1291d27190709cb510b07e22c405d5e0d6119b70e73589f98acf
│   │       │   ├── issued to: CN=DigiCert Trusted G4 RSA4096 SHA256 TimeStamping CA,O=DigiCert\, Inc.,C=US
│   │       │   ├── issued by: CN=DigiCert Trusted Root G4,OU=www.digicert.com,O=DigiCert Inc,C=US
│   │       │   └── expiry: Sun Mar 22 23:59:59 2037
│   │       └── SHA256 fingerprint: 33846b545a49c9be4903c60e01713c1bd4e4ef31ea65cd95d69e62794f30b941
│   │           ├── issued to: CN=DigiCert Trusted Root G4,OU=www.digicert.com,O=DigiCert Inc,C=US
│   │           ├── issued by: CN=DigiCert Assured ID Root CA,OU=www.digicert.com,O=DigiCert Inc,C=US
│   │           └── expiry: Sun Nov  9 23:59:59 2031
```

Under the field `timestamp signature`, there are `timestamp` and `certificates` fields. The value of `certificates` lists all the certificates included in the TSA response.

## Verify artifacts in OCI-compliant registries with timestamping

To verify artifacts in OCI-compliant registries with timestamping, you need to create a trust store with the type of `tsa`, add the downloaded TSA root certificate, and use the trust store in the trust policy for verification.

Here are the steps:

1. Create the trust store with the type `tsa`:

```shell
notation cert add --type tsa --store <TSA_STORE_NAME> <TSA_ROOT_CERT_FILEPATH>
```

2. Update your trust policy to add the `tsa` trust store to the property `trustStores`.

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "<POLICY_NAME>",
            "registryScopes": [ "<REPO_URL>" ],
            "signatureVerification": {
                "level" : "strict"
            },
            "trustStores": ["ca:<CA_STORE_NAME>", "tsa:<TSA_STORE_NAME>" ],
            "trustedIdentities": [
                "x509.subject: <SUBJECT_OF_SIGNING_CERT>"
            ]
        }
    ]
}
```

3. Import and use the new trust policy:

```shell
notation policy import <POLICY_FILE_NAME>.json
```

4. Verify artifacts, optionally you can use flag `-v` to view the verbose logs:

```shell
notation verify -v <REFERENCE_TO_ARTIFACT>
```

If the signature was generated with timestamping before certificates expiry, the signature verification will succeed despite certificates expiry at verification time. However, if the trust store of the `tsa` type is not properly established or not configured within the trust policy, the signature verification will fail due to certificates expire.

## Configuration for timestamp verification

By default, if the trust store of `tsa` type is created and configured in the trust policy, Notation will always perform timestamp verification no matter the certificates expire or not. In scenarios you may want to perform timestamp verification only after certificates expire, you can configure additional property `verifyTimestamp` under the parent property `signatureVerification` and set the value to `afterCertExpiry` in the trust policy. For example,

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "<POLICY_NAME>",
            "registryScopes": [ "<REPO_URL>" ],
            "signatureVerification": {
                "level" : "strict",
                "verifyTimestamp": "afterCertExpiry"
            },
            "trustStores": ["ca:<CA_STORE_NAME>", "tsa:<TSA_STORE_NAME>" ],
            "trustedIdentities": [
                "x509.subject: <SUBJECT_OF_SIGNING_CERT>"
            ]
        }
    ]
}
```

To restore to the default behavior, you can either remove the property `verifyTimestamp`, or set the value to `always`.

## What is the next?

In the future, we'll use the system certificate store to verify the chain of trust of a TSA, eliminating the need for you to download and use the root certificate.
