---
title: notation login
---

Login to registry

### Synopsis

Log in to an OCI registry

Example - Login with provided username and password:
```shell
notation login -u <user> -p <password> registry.example.com
```

Example - Login using $NOTATION_USERNAME $NOTATION_PASSWORD variables:
```shell
notation login registry.example.com
```

General usage:
```shell
notation login [flags] <server>
```

### Options

```
  -d, --debug             debug mode
  -h, --help              help for login
  -p, --password string   password for registry operations (default to $NOTATION_PASSWORD if not specified)
      --password-stdin    take the password from stdin
      --plain-http        registry access via plain HTTP
  -u, --username string   username for registry operations (default to $NOTATION_USERNAME if not specified)
  -v, --verbose           verbose mode
```

