---
title: notation certificate delete
---

Delete certificates from the trust store.

### Synopsis

Delete certificates from the trust store

Example - Delete all certificates with "ca" type from the trust store "acme-rockets":

```  
notation cert delete --type ca --store acme-rockets --all
```

Example - Delete certificate "cert1.pem" with "signingAuthority" type from trust store wabbit-networks:

```
notation cert delete --type signingAuthority --store wabbit-networks cert1.pem
```

Example - Delete all certificates with "ca" type from the trust store "acme-rockets", without prompt for confirmation:

```
notation cert delete --type ca --store acme-rockets -y --all 
```

General usage:
```
notation certificate delete --type <type> --store <name> [flags] (--all | <cert_fileName>)
```

### Options

```
  -a, --all            delete all certificates in the named store
  -h, --help           help for delete
  -s, --store string   specify named store
  -t, --type string    specify trust store type, options: ca, signingAuthority
  -y, --yes            do not prompt for confirmation
```

