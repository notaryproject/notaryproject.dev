---
title: notation key
---

Manage keys used for signing

### Synopsis

Manage keys used for signing

Example - Add a key to signing key list:
```shell
notation key add --plugin <plugin_name> --id <key_id> <key_name>
```

Example - List keys used for signing:
```shell
notation key ls
```

Example - Update the default signing key:
```shell
notation key set --default <key_name>
```

Example - Delete the key from signing key list:
```shell
notation key delete <key_name>...
```

### Options

```shell
  -h, --help   help for key
```
