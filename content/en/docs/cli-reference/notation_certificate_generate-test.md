---
title: notation certificate generate-test
---

Generate a test RSA key and a corresponding self-signed certificate.

### Synopsis

Generate a test RSA key and a corresponding self-signed certificate

Example - Generate a test RSA key and a corresponding self-signed certificate named "wabbit-networks.io":
```shell
notation cert generate-test "wabbit-networks.io"
```

Example - Generate a test RSA key and a corresponding self-signed certificate, set RSA key as a default signing key:
```shell
notation cert generate-test --default "wabbit-networks.io"
```

General usage:
```shell
notation certificate generate-test [flags] <common_name>
```

### Options

```
  -b, --bits int   RSA key bits (default 2048)
      --default    mark as default signing key
  -h, --help       help for generate-test
```

