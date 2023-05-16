---
title: notation sign
---

Sign artifacts

### Synopsis

Sign artifacts

Note: a signing key must be specified. This can be done temporarily by specifying a key ID, or a new key can be configured using the command "notation key add"

Example - Sign an OCI artifact using the default signing key, with the default JWS envelope, and use OCI image manifest to store the signature:
```shell
notation sign <registry>/<repository>@<digest>
```

Example - Sign an OCI artifact using the default signing key, with the COSE envelope:
```shell
notation sign --signature-format cose <registry>/<repository>@<digest> 
```

Example - Sign an OCI artifact with a specified plugin and signing key stored in KMS 
```shell
notation sign --plugin <plugin_name> --id <remote_key_id> <registry>/<repository>@<digest>
```

Example - Sign an OCI artifact using a specified key
```shell
notation sign --key <key_name> <registry>/<repository>@<digest>
```

Example - Sign an OCI artifact identified by a tag (Notation will resolve tag to digest)
```shell
notation sign <registry>/<repository>:<tag>
```

Example - Sign an OCI artifact stored in a registry and specify the signature expiry duration, for example 24 hours
```shell
notation sign --expiry 24h <registry>/<repository>@<digest>
```

Example - [Experimental] Sign an OCI artifact referenced in an OCI layout
```shell
notation sign --oci-layout "<oci_layout_path>@<digest>"
```

Example - [Experimental] Sign an OCI artifact identified by a tag and referenced in an OCI layout
```shell
notation sign --oci-layout "<oci_layout_path>:<tag>"
```

Example - [Experimental] Sign an OCI artifact and use OCI artifact manifest to store the signature:
```shell
notation sign --signature-manifest artifact <registry>/<repository>@<digest>
```

General usage:
```shell
notation sign [flags] <reference>
```

### Options

```
  -d, --debug                       debug mode
  -e, --expiry duration             optional expiry that provides a "best by use" time for the artifact. The duration is specified in minutes(m) and/or hours(h). For example: 12h, 30m, 3h20m
  -h, --help                        help for sign
      --id string                   key id (required if --plugin is set). This is mutually exclusive with the --key flag
  -k, --key string                  signing key name, for a key previously added to notation's key list. This is mutually exclusive with the --id and --plugin flags
  -p, --password string             password for registry operations (default to $NOTATION_PASSWORD if not specified)
      --plain-http                  registry access via plain HTTP
      --plugin string               signing plugin name (required if --id is set). This is mutually exclusive with the --key flag
      --plugin-config stringArray   {key}={value} pairs that are passed as it is to a plugin, refer plugin's documentation to set appropriate values
      --signature-format string     signature envelope format, options: "jws", "cose" (default "jws")
  -m, --user-metadata stringArray   {key}={value} pairs that are added to the signature payload
  -u, --username string             username for registry operations (default to $NOTATION_USERNAME if not specified)
  -v, --verbose                     verbose mode
```
