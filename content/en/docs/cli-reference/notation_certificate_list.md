---
title: notation certificate list
---

List certificates in the trust store.

### Synopsis

List certificates in the trust store

Example - List all certificate files stored in the trust store
```  
notation cert ls
```

Example - List all certificate files of trust store "acme-rockets"
```
notation cert ls --store "acme-rockets"
```

Example - List all certificate files from trust store of type "ca"
```  
notation cert ls --type ca
```

Example - List all certificate files from trust store "wabbit-networks" of type "signingAuthority"
```
notation cert ls --type signingAuthority --store "wabbit-networks"
```

General usage:
```
notation certificate list [flags]
```

### Options

```
  -d, --debug          debug mode
  -h, --help           help for list
  -s, --store string   specify named store
  -t, --type string    specify trust store type, options: ca, signingAuthority
  -v, --verbose        verbose mode
```

