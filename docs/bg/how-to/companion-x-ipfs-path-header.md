---
title: Използване на x-ipfs-path
description: Заглавката x-ipfs-path е наследен начин за откриване на IPFS съдържание през HTTP.
meta:
  - name: robots
    content: noindex, follow
---

# Поддръжка за заглавки `x-ipfs-path` в IPFS Companion

::: danger

## Поддръжката за `x-ipfs-path` е остаряла

HTTP заглавката `x-ipfs-path` е наследен начин за откриване на IPFS съдържание през HTTP. [Конвенциите за URL на gateway](https://specs.ipfs.tech/http-gateways/) и [DNSLink](../concepts/dnslink.md) я са заместили. Тази страница е предоставена само за справка; вижте [записа за `x-ipfs-path` в глосария](../concepts/glossary.md#x-ipfs-path).

:::

`x-ipfs-path` е HTTP response header, който някои IPFS gateways добавят, за да назоват IPFS пътя на връщаното съдържание. IPFS Companion все още може да го открива, но опцията е изключена по подразбиране. Можете да я включите в екрана с _Preferences_ на разширението.
