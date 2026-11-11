---
title: Използване на garbage collection
sidebarDepth: 0
---

# Използване на garbage collection в Kubo

В IPFS Kubo, garbage collector на IPFS е конфигуриран в секцията `Datastore` на [конфигурационния файл на Kubo](https://github.com/ipfs/kubo/blob/master/docs/config.md). Важните настройки, свързани с garbage collector, са:

- `StorageGCWatermark`: Процентът от стойността на `StorageMax`, при който garbage collection се задейства автоматично, ако daemon работи с активиран автоматичен garbage collection. По подразбиране е `90`.

- `GCPeriod`: Определя колко често garbage collection да се изпълнява. Използва се само ако автоматичният garbage collection е активиран. По подразбиране е 1 час.

За да стартирате garbage collection ръчно, [изпълнете `ipfs repo gc`](../reference/kubo/cli.md#ipfs-repo-gc):

```bash
ipfs repo gc

> removed QmPZhyTu8D7NqR5NvgkgNYsSYD4CNjnyuFejB8i23itJvA
> removed QmSYQFVAZgEnpa6NxiW5agyj3XU9VR4CbERShXiLhuPPPE
> removed QmS6SJXApoi59hqD8Naktgakc6UNHK1XDhqhtMg9sBhY8g
```

За да активирате автоматично garbage collection, използвайте `--enable-gc` при стартиране на IPFS daemon:

```bash
ipfs daemon --enable-gc

> Initializing daemon...
> Kubo version: 0.9.0
> Repo version: 10
> ...
```

::: tip
Ако използвате IPFS Desktop, можете да задействате garbage collection, като кликнете върху иконата на приложението в лентата на задачите и изберете **Advanced** → **Run Garbage Collector**.
:::
