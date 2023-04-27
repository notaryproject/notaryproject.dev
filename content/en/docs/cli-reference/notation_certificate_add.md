---
title: notation certificate add
---

Add certificates to the trust store.

### Synopsis

Add certificates to the trust store

Example - Add a certificate to the "ca" type of a named store "acme-rockets":

```
notation cert add --type ca --store acme-rockets acme-rockets.crt
```

Example - Add a certificate to the "signingAuthority" type of a named store "wabbit-networks":

```
notation cert add --type signingAuthority --store wabbit-networks wabbit-networks.pem
```

General usage:
```
notation certificate add --type <type> --store <name> [flags] <cert_path>...
```

### Options

```
  -h, --help           help for add
  -s, --store string   specify named store
  -t, --type string    specify trust store type, options: ca, signingAuthority
```

