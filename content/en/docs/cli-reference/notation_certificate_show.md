---
title: notation certificate show
---

Show certificate details given trust store type, named store, and certificate file name. If the certificate file contains multiple certificates, then all certificates are displayed.

### Synopsis

Show certificate details of given trust store name, trust store type, and certificate file name. If the certificate file contains multiple certificates, then all certificates are displayed

Example - Show details of certificate "cert1.pem" with type "ca" from trust store "acme-rockets":
```
notation cert show --type ca --store acme-rockets cert1.pem
```

Example - Show details of certificate "cert2.pem" with type "signingAuthority" from trust store "wabbit-networks":
```  
notation cert show --type signingAuthority --store wabbit-networks cert2.pem
```

General usage:
```
notation certificate show --type <type> --store <name> [flags] <cert_fileName>
```

### Options

```
  -d, --debug          debug mode
  -h, --help           help for show
  -s, --store string   specify named store
  -t, --type string    specify trust store type, options: ca, signingAuthority
  -v, --verbose        verbose mode
```

