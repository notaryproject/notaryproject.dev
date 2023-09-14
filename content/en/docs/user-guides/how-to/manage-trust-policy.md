---
title: "Manage trust policies"
description: "How to manage trust policies"
type: docs
weight: 2
---

By default, `notation` configures and manages a trust policy in the [configuration directory]({{< ref "/docs/user-guides/how-to/directory-structure.md" >}}). You can directly change the trust policy file in that directory to manage your trust policies. 

Alternatively, you can manage trust policies using the `notation policy import` and `notation policy show` commands. These commands have the following benefits over directly editing the default trust policy file:

* Significantly easier to manage multiple trust policies
* You don't need to know the name and location of the default trust policy file
* Quickly view the current trust policy

To view the current trust policy, use `notation policy show`:

```console
notation policy show
```

The following output shows an example of a trust policy:

```console
$ notation policy show
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
```

You can override this trust policy by importing a new trust policy using `notation policy import`. For example, if you had the following trust policy defined in `permissive-trustpolicy.json`;

```json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "permissive" 
            },
            "trustStores": [ "ca:wabbit-networks.io" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```


The following command imports `permissive-trustpolicy.json` to override the trust policy:

```console
notation policy import ./permissive-trustpolicy.json
```

The following example output shows `notation` importing the trust policy and prompting to confirm overwriting the existing trust policy:

```console
$ notation policy import ./permissive-trustpolicy.json
Existing trust policy configuration found, do you want to overwrite it? [y/N] y
Trust policy configuration imported successfully.
```

Confirm the new trust policy by running `notation policy show` again. Notice that the `signatureVerification` level is now `permissive`:

```console
$ notation policy show
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "permissive"
            },
            "trustStores": [ "ca:wabbit-networks.io" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
```
