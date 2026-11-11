---
title: Peering с доставчици на съдържание
description: Оптимизирайте скоростта на извличане, като поддържате директни връзки към големи доставчици на съдържание.
---

# Peering с доставчици на съдържание

IPFS ви позволява да извличате данни от доставчици чрез [CIDs][cid-explainer]. Този процес обикновено включва търсене в content routing, за да се намерят доставчици за CID в [DHT][dht-explainer] и IPNI.

Ако стартирате IPFS възел, който обслужва много заявки, например публичен HTTP gateway, може да успеете да ускорите заявки чрез поддържане на дълготрайни връзки към възли, които предоставят много CIDs.

Приоритизирането на връзките към определени peers се нарича **Peering**, и можете да кажете на IPFS кои peers да приоритизира, като редактирате конфигурацията на [`Peering`][docs-peering-config] в [конфигурационния файл на Kubo](https://github.com/ipfs/kubo/blob/master/docs/config.md).

Например, за да _peer_-вате с възли от Cloudflare, актуализирайте конфигурацията си, за да включите секция `Peering` по следния начин:

```json
{
  "Peering": {
    "Peers": [
      {
        "ID": "QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP",
        "Addrs": ["/dnsaddr/node-8.ingress.cloudflare-ipfs.com"]
      }
    ]
  }
}
```

::: tip
Като цяло потребителите, които стартират IPFS у дома, няма да им трябва да настройват peering и могат да игнорират тази страница!

Peering е най-полезен за възли, които имат много едновременни връзки, защото предотвратява [connection manager][docs-connmgr] да отхвърля връзки, които смята, че вече не са „полезни“. Ако се окажете, че работите близо до лимита на connection manager-а, може да имате полза от peering с доставчици на съдържание.
:::

[cid-explainer]: ../concepts/content-addressing.md
[dht-explainer]: ../concepts/how-ipfs-works.md#distributed-hash-tables-dhts
[docs-peering-config]: https://github.com/ipfs/kubo/blob/master/docs/config.md#peering
[docs-connmgr]: https://github.com/ipfs/kubo/blob/master/docs/config.md#swarmconnmgr
