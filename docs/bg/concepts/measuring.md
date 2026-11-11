---
title: Измерване на мрежата IPFS
description: Научете за измерванията на мрежата IPFS и ProbeLab.
---

# Измерване на мрежата IPFS

Мрежата IPFS е сложна система, която разчита на координираното участие на swarm от независими възли. За да гарантира надеждност и ефективност, [Protocol Benchmarking & Optimization Team (ProbeLab)](https://probelab.io/) редовно измерва производителността и здравето на мрежата и публикува тези измервания публично. В допълнение към тези [ключови показатели за производителност (KPIs)](#kpis), ProbeLab е създал редица [персонализирани инструменти](#tools) за изчисляване на тези измервания.

Тази страница дава кратък преглед на тези KPI и инструменти. За по-задълбочена информация вижте [probelab.io](https://probelab.io/).

## KPI

### Размер и стабилност на мрежата

#### Оценки на възлите DHT client и server

Следните метрики се използват за оценка на размера на DHT мрежата и броя на клиентите спрямо сървърите:

1. Общ брой peer-ове в мрежата Amino (Public IPFS DHT)
1. Брой уникални [DHT](dht.md) Server peer-ове
1. Брой DHT Client peer-ове

За повече информация и най-новите данни, вижте [https://probelab.io/ipfskpi/#client-vs-server-node-estimate](https://probelab.io/ipfskpi/#client-vs-server-node-estimate).

#### Уникални софтуерни агенти

Следните метрики се използват за оценка на общия брой уникални софтуерни агенти:

1. Уникални софтуерни агенти, идентифицирани от [bootstrap nodes](https://docs.ipfs.tech/concepts/nodes/#bootstrap)
1. Уникални софтуерни агенти, наблюдавани в Amino (публичния IPFS [DHT](dht.md))

За повече информация и най-новите данни, вижте [https://probelab.io/ipfskpi/#unique-software-agents](https://probelab.io/ipfskpi/#unique-software-agents).
https://probelab.io/ipfskpi/#unique-software-agents

### Маршрутизиране на съдържанието

#### Наличност на DHT сървър

Наличността на [DHT](dht.md) сървър се измерва чрез класифициране на възлите в една от четири категории въз основа на процента време, през което възелът е бил видим онлайн:

- _Online_: онлайн 80% или повече от времето.
- _Mostly Online_: онлайн между 40%-80% от времето.
- _Mostly Offline_: онлайн между 10%-40% от времето.
- _Offline_: онлайн по-малко от 10% от времето.

За повече информация и най-новите данни, вижте [https://probelab.io/ipfskpi/#dht-server-availability](https://probelab.io/ipfskpi/#dht-server-availability).

#### Производителност на DHT lookup

Производителността на [DHT](dht.md) lookup се измерва чрез изчисляване на производителността във времето и от няколко географски региона. Използваните метрики са: i) median, ii) P90, iii) P99.

За повече информация и най-новите данни, вижте [https://probelab.io/ipfskpi/#dht-lookup-performance](https://probelab.io/ipfskpi/#dht-lookup-performance).

#### Използване на IPNI

Използването на [IPNI](ipni.md) се измерва чрез изчисляване на броя на заявките, направени на ден, към network indexers, управлявани от [cid.contact](https://cid.contact/). За повече информация и най-новите данни, вижте [https://probelab.io/ipfskpi/#ipni-utilization](https://probelab.io/ipfskpi/#ipni-utilization).

## Инструменти

Екипът на ProbeLab разработва инструменти за непрекъснато наблюдение на производителността на няколко критични части от мрежата IPFS. Текущият набор от инструменти, заедно с подробни описания и връзки, можете да намерите на: [https://probelab.io/tools/](https://probelab.io/tools/).

### Nebula

[Nebula](https://github.com/dennis-tra/nebula) е libp2p DHT crawler, използван за изчисляване на [DHT server availability](#dht-server-availability). Периодично се опитва да се свърже с DHT Server peer-ове в IPFS DHT. При откриване на нов peer, crawler-ът регистрира началото на availability session, удължавайки сесията при всяка успешна опит за връзка. Обратно, неуспешна връзка прекратява сесията, а последващ успешен опит започва нова. По време на всеки период на измерване peer-овете могат да имат множество availability sessions. Научете повече за Nebula на [probelab.io/tools/nebula/](https://probelab.io/tools/nebula/).

### Parsec

[Parsec](https://github.com/dennis-tra/nebula) е инструмент за измерване на [DHT lookup performance](#dht-lookup-performance), фокусиран конкретно върху PUT и GET производителността на Amino DHT. Може да бъде адаптиран и за оценка на други [libp2p-kad-dht](https://github.com/libp2p/specs/blob/master/kad-dht/README.md) мрежи. Конфигурацията е разделена на scheduler и server. Научете повече за Parsec на [probelab.io/tools/parsec/](https://probelab.io/tools/parsec/).

### Tiros

[Tiros](https://github.com/plprobelab/tiros) оценява производителността на извличане на уебсайтове, хоствани в IPFS. По-конкретно, сравнява метриките на уебсайта, като TTFB (Time to First Byte) или FCP (First Contentful Paint), с Kubo възел и headless Chrome instance за даден уебсайт. Целта е да се сравнят тези метрики, когато са заредени през IPFS, в сравнение с HTTPS. За да постигне това, Tiros насочва Chrome да заяви уебсайт или чрез gateway на локален Kubo възел, или чрез HTTPS. Научете повече за Tiros на [probelab.io/tools/tiros/](https://probelab.io/tools/tiros/).

## Научете повече

Можете да научите повече за данните и инструментите, обсъждани тук, както и за ProbeLab като цяло на [probelab.io](https://probelab.io/).
