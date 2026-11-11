---
title: Наблюдение на peers
description: Научете вградените IPFS команди, които помагат да наблюдавате peers в мрежата.
---

# Наблюдение на peers

В IPFS има полезен набор от команди, които помагат при наблюдение на мрежата.

Вижте кои сте директно свързани:

```sh
ipfs swarm peers
```

Ръчно свържете се с конкретен peer. Ако peer-ът по-долу не работи, изберете един от изхода на `ipfs swarm peers`.

```sh
> ipfs swarm connect /dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
```

Търсете конкретен peer в мрежата:

```sh
> ipfs routing findpeer QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
```
