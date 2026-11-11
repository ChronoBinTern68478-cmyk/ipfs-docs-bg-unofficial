---
title: Най-добри практики за разработчици на IPFS
description: Някои функции на IPFS са изключени или не са настройки по подразбиране, но насърчаваме използването им при подходящи обстоятелства. Изброяваме ги тук за лесен достъп от натоварени разработчици.
date: 2022-03-11
---

# Най-добри практики за разработчици на IPFS

Някои функции на IPFS не са активирани или не са зададени по подразбиране, но насърчаваме използването им при подходящи обстоятелства.

## Използвайте CIDv1 за адресиране, устойчиво към бъдещи промени, и за чувствителност към регистъра

Има две версии на CIDs ([Content Identifiers](../concepts/content-addressing.md)), CIDv0 и CIDv1.

CIDv0 е по-прост, но много по-малко гъвкав от CIDv1. Той не предлага адресиране, устойчиво към бъдещи промени, и не е чувствително към регистъра, както CIDv1. Можете бързо да различите v0 и v1 CIDs, защото CIDs от v0 винаги започват с `Qm`. Много от съществуващите инструменти на IPFS все още генерират CIDs във v0, например:

- [IPFS Desktop](../install/ipfs-desktop.md#ipfs-desktop)
- [/api/v0/add](../reference/kubo/rpc.md#api-v0-add), където `cid-version` по подразбиране е 0, освен ако е подадена опция, която зависи от CIDv1.

Някои функции използват CIDv1 по подразбиране:

- `files` ([Mutable File System](../concepts/file-systems.md#mutable-file-system-mfs))
- операции `dag` ([ipfs object](../reference/kubo/cli.md#ipfs-dag))

Използвайте CIDv1, когато желаете:

- устойчиво към бъдещи промени адресиране: CIDv1 предоставя водещи идентификатори, например [multicodec](https://github.com/multiformats/multicodec), които показват формата на целевото съдържание, така че CID да поддържа бъдещи формати на CID.
- адресиране без чувствителност към регистъра за повече гъвкавост

За да се включите, използвайте флага `--cid-version` в CLI:

```shell
ipfs add --cid-version 1
```

За да конвертирате CID от v0 в v1, вижте [CID conversion](https://docs.ipfs.tech/concepts/content-addressing/#cid-conversion).

За повече информация относно адресирането на съдържанието и версиите на CID, вижте [Content Addressing and CIDs](../concepts/content-addressing.md#content-addressing-and-cids).

## Активирайте pubsub за бърз IPNS

Като самостоятелна функция, `pubsub` е начин за публикуване и абонамент за съобщения. Въпреки това, в рамките на `ipns`, можете да го използвате, за да ускорите публикуването и разрешаването на записи на IPNS. Pubsub е експериментална функция, така че използвайте я внимателно. По подразбиране е изключена.

За да използвате тази функция, задайте `Ipns.UsePubsub` преди стартиране на демона на IPFS:

```shell
ipfs config --json Ipns.UsePubsub true
ipfs daemon
```

От този момент нататък IPNS ще бъде разрешаван както чрез `pubsub`, така и чрез DHT. Научете повече за ограниченията на тази експериментална функция тук:

- [Experimental features > IPNS pubsub](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipns-pubsub)
- [Enable IPNS over pubsub by default, Issue 8591](https://github.com/ipfs/kubo/issues/8591)

## Активирайте garbage collection, ако очаквате висока сменяемост на данните

Съхранението е ограничено, така че възлите трябва да изчистват част от предишно кешираните ресурси, за да освободят място за нови ресурси. Този процес се нарича _garbage collection_.

Ако очаквате високата сменяемост на данните да бъде висока, може да искате да активирате garbage collection, за да възстановите паметта, заета от обекти, които вече не се използват.

Въпреки това може да имате и данни, които цените. За да сте сигурни, че запазвате ценните данни, закрепете (pin) ценните данни. Следните страници са полезни за научаване как работи pinning:

- [Persistence, permanence, and pinning](../concepts/persistence.md#persistence-permanence-and-pinning)
- [Pinning in context](../concepts/persistence.md#pinning-in-context)
- [Pin files using IPFS](../how-to/pin-files.md#three-kinds-of-pins).

След това можете безопасно да активирате garbage collection за всички останали данни. Вижте:

- [Garbage collection](../concepts/persistence.md#garbage-collection)
- [api/v0/repo/gc](../reference/kubo/rpc.md#api-v0-repo-gc)

## Използвайте subdomain gateways или DNSLink, когато публикувате приложения за сигурен контекст и изолация на произхода

За да предотвратите една уебстраница да има неправомерен достъп до HTTP сесийни данни, свързани с различна уебстраница, използвайте:

- subdomain gateway, или
- DNSLink

Вижте:

- [Violation of same-origin policy](../concepts/ipfs-gateway.md#limitations-and-potential-workarounds)
- [Subdomain gateway](../how-to/address-ipfs-on-web.md#subdomain-gateway)
- [DNSLink gateway](../how-to/address-ipfs-on-web.md#http-gateways)
