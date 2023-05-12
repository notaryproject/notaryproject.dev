---
title: notation verify
---

Verify OCI artifacts

### Synopsis

Verify OCI artifacts

Prerequisite: added a certificate into trust store and created a trust policy.

Example - Verify a signature on an OCI artifact identified by a digest:
```shell
notation verify <registry>/<repository>@<digest>
```

Example - Verify a signature on an OCI artifact identified by a tag  (Notation will resolve tag to digest):
```shell
notation verify <registry>/<repository>:<tag>
```

Example - [Experimental] Verify a signature on an OCI artifact referenced in an OCI layout using trust policy statement specified by scope.
```shell
notation verify --oci-layout <registry>/<repository>@<digest> --scope <trust_policy_scope>
```

Example - [Experimental] Verify a signature on an OCI artifact identified by a tag and referenced in an OCI layout using trust policy statement specified by scope.
```shell
notation verify --oci-layout <registry>/<repository>:<tag> --scope <trust_policy_scope>
```

General usage:
```shell
notation verify [reference] [flags]
```

### Options

```
  -d, --debug                       debug mode
  -h, --help                        help for verify
  -p, --password string             password for registry operations (default to $NOTATION_PASSWORD if not specified)
      --plain-http                  registry access via plain HTTP
      --plugin-config stringArray   {key}={value} pairs that are passed as it is to a plugin, if the verification is associated with a verification plugin, refer plugin documentation to set appropriate values
  -m, --user-metadata stringArray   user defined {key}={value} pairs that must be present in the signature for successful verification if provided
  -u, --username string             username for registry operations (default to $NOTATION_USERNAME if not specified)
  -v, --verbose                     verbose mode
```
