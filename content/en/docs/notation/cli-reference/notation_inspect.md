---
title: notation inspect
---

Inspect all signatures associated with the signed artifact

### Synopsis

Inspect all signatures associated with the signed artifact.

Example - Inspect signatures on an OCI artifact identified by a digest:
```shell
notation inspect <registry>/<repository>@<digest>
```

Example - Inspect signatures on an OCI artifact identified by a tag  (Notation will resolve tag to digest):
```shell
notation inspect <registry>/<repository>:<tag>
```

Example - Inspect signatures on an OCI artifact identified by a digest and output as json:
```shell
notation inspect --output json <registry>/<repository>@<digest>
```

General usage:
```shell
notation inspect [reference] [flags]
```

### Options

```
  -d, --debug             debug mode
  -h, --help              help for inspect
  -o, --output string     output format, options: 'json', 'text' (default "text")
  -p, --password string   password for registry operations (default to $NOTATION_PASSWORD if not specified)
      --plain-http        registry access via plain HTTP
  -u, --username string   username for registry operations (default to $NOTATION_USERNAME if not specified)
  -v, --verbose           verbose mode
```


