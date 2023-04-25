---
title: notation key
---

Manage keys used for signing

### Synopsis

Manage keys used for signing

Example - Add a key to signing key list:
```  
notation key add --plugin <plugin_name> --id <key_id> <key_name>
```

Example - List keys used for signing:
```
notation key ls
```

Example - Update the default signing key:
```
notation key set --default <key_name>
```

Example - Delete the key from signing key list:
```
notation key delete <key_name>...
```

### Options

```
  -h, --help   help for key
```
