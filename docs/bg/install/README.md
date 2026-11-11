---
title: Започнете
description: Има няколко различни начина да инсталирате и използвате IPFS. Разберете кой най-добре отговаря на вашите нужди тук.
---

# Започнете

:::tip Бързи изтегляния
Търсите изтегляния? Изтеглете [IPFS Desktop](./ipfs-desktop.md#install-instructions) (GUI), [Kubo](./command-line.md#install-official-binary-distributions) (CLI) или [IPFS Companion](./ipfs-companion.md#install) (разширение за браузър).
Изпълнявате инфраструктура на IPFS? Вижте [IPFS Cluster, Rainbow и Someguy](#infrastructure-tools).
:::

IPFS е набор от протоколи, пакети и спецификации, които позволяват на компютрите да изпращат и получават данни. Поради това потребителите могат да взаимодействат с IPFS и да го използват по много различни начини. Разработчик, създаващ мрежови приложения, ще използва различен набор от инструменти за работа с IPFS от този на човек, който иска да съхранява файлове в IPFS. Изберете този, който най-добре отговаря на това, което искате да правите.

Търсите лесен и добре структуриран начин да започнете с IPFS [Mainnet](../concepts/glossary.md#mainnet)? Опитайте една от опциите по-долу:

## Потребители на настолни компютри

### IPFS Desktop

Всеки може да използва IPFS, за да съхранява файлове по _децентрализиран_ начин. Най-лесният начин да започнете е да инсталирате приложението IPFS Desktop. То включва вграден Kubo възел и ви позволява да взаимодействате с мрежата чрез прост потребителски интерфейс. [Вижте го →](./ipfs-desktop.md)

### IPFS Companion

Ако вашият браузър все още не поддържа IPFS, можете да инсталирате разширението IPFS Companion, което ще ви позволи да преглеждате децентрализирано уеб съдържание! [Научете повече →](./ipfs-companion.md)

### Закачайте файлове чрез услуга за pinning

Искате ли бързо и лесно да публикувате съдържание в IPFS без сложни инструменти? Вижте [бързия старт за pin с IPFS](../quickstart/pin.md), където ще научите как да използвате трети страни услуги за pinning, за да закачите и предоставите файлове в мрежата IPFS.

### Деплойвайте статични сайтове към мрежата IPFS с GitHub Action

Искате ли бързо и лесно да автоматизирате деплойването на статични уебсайтове към мрежата IPFS? Вижте [Деплойване на статични сайтове към мрежата IPFS с GitHub Actions](../how-to/websites-on-ipfs/deploy-github-action.md), където ще научите как да използвате [GitHub Actions](https://github.com/ipshipyard/ipfs-deploy-action), за да автоматично деплоирате статични уебсайтове към мрежата IPFS.

## Инфраструктурни инструменти

### Kubo

Искате ли да създавате децентрализирани приложения и да съхранявате данните на вашето приложение в IPFS? Вероятно ще искате да инсталирате командния вариант на IPFS, наречен Kubo. Няма GUI, само суров вход и изход през вашия терминал. [Научете повече →](./command-line.md)

### IPFS Cluster

Планирате ли да настроите няколко Kubo ноди в една мрежа? Ще искате да разгледате инсталирането на [IPFS Cluster](./server-infrastructure.md), което осигурява оркестрация на данни в рояк от IPFS демони чрез разпределяне, репликация и следене на глобален pinset, разпределен между множество peers.

### Rainbow

Ако искате да стартирате HTTP [Gateway](../concepts/glossary.md#gateway) услуга от производствен клас, използвайки същия софтуер, който захранва [public gateways](../concepts/public-utilities.md#public-ipfs-gateways), може да изберете [Rainbow →](https://github.com/ipfs/rainbow/#readme).

### Someguy

Ако трябва да управлявате собствен [delegated routing](../concepts/glossary.md#delegated-routing) endpoint, който достига както до Amino DHT, така и до IPNI, помислете за стартиране на [Someguy →](https://github.com/ipfs/someguy/#readme).

### IPFS Check

Инструмент за проверка на достъпността на CIDs от мрежата IPFS. Полезен за отстраняване на грешки и наблюдение. [IPFS Check →](https://github.com/ipfs/ipfs-check/#readme)

## Разработка на софтуер

### Helia за TypeScript/JavaScript

[Helia](https://github.com/ipfs/helia) е нова имплементация на IPFS в JavaScript, проектирана да бъде по-модулна и лека от [deprecated js-ipfs project](https://github.com/ipfs/js-ipfs).

За да започнете с практически пример, вижте [Helia 101](https://github.com/ipfs-examples/helia-examples/blob/main/examples/helia-101/README.md) в [ipfs-examples/helia-examples](https://github.com/ipfs-examples/helia-examples/tree/main).

:::callout
Ако търсите прост API, подобен на [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), за използване в уеб среда, вижте [@helia/verified-fetch](https://www.npmjs.com/package/@helia/verified-fetch).
:::

### Boxo SDK за Go

[Boxo](https://github.com/ipfs/boxo#readme) е набор от референтни библиотеки за създаване на IPFS приложения и имплементации на Go.

За да започнете, вижте [boxo/examples](https://github.com/ipfs/boxo/tree/main/examples) или разгледайте как Boxo се използва в [Kubo](https://github.com/ipfs/kubo), [Rainbow](https://github.com/ipfs/rainbow/), [Someguy](https://github.com/ipfs/someguy), [IPFS Cluster](https://github.com/ipfs-cluster/ipfs-cluster/) или не-Mainnet имплементации като [Lotus](https://github.com/filecoin-project/lotus/).
