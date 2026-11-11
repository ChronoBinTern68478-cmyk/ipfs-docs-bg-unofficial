---
title: 'IPFS реализации'
description: 'Списък на различни IPFS реализации за различни случаи на използване и езици.'
---

# IPFS реализации

Изчерпателен списък на [IPFS реализации](./implementations.md) на различни езици и за различни случаи на употреба, от настолни приложения до специализирани библиотеки.

- [Настолни реализации](#desktop-implementations)
- [Популярни реализации и инструменти, съвместими с Mainnet](#popular-mainnet-compatible-implementations-and-tools)
- [Filecoin](#filecoin)
- [Ограничена съвместимост с Mainnet](#limited-mainnet-interop)
- [Данни, адресирани по съдържание](#content-addressed-data)
- [Леки възли или експериментални](#lite-nodes-or-experimental)
- [Неактивни](#inactive)

За да предложите добавки или редакции, [редактирайте тази страница в GitHub](https://github.com/ipfs/ipfs-docs/edit/main/docs/concepts/ipfs-implementations.md) или [отворете issue](https://github.com/ipfs/ipfs-docs/issues/new?assignees=&labels=need%2Ftriage&template=open_an_issue.md&title=IPFS%20Implementations).

## Настолни реализации

Търсите лесен начин да започнете? Инсталирайте тези инструменти за достъп без код до публичната мрежа IPFS Mainnet.

| Име            | URL                                      | Език(ци)   | Какво се опитва да направи                                                                                                 |
| -------------- | ---------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| IPFS Desktop   | <https://github.com/ipfs/ipfs-desktop>   | javascript | Настолно приложение, което включва Kubo възел с файлов мениджър, мениджър на peers и разглеждане на съдържание             |
| IPFS Companion | <https://github.com/ipfs/ipfs-companion> | javascript | Разширение за браузър, добавящо поддръжка за `ipfs://` адреси, които се извличат от публичната мрежа от локален Kubo възел |

## Популярни реализации и инструменти, съвместими с Mainnet

За разработчици и оператори. Всичко тук е съвместимо с [IPFS Mainnet](https://docs.ipfs.tech/concepts/glossary/#mainnet); редовете отбелязват всякакви целенасочени подмножества.

| Име            | URL                                              | Език(ци)   | Какво се опитва да направи                                                                                                                                                                        |
| -------------- | ------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kubo           | <https://github.com/ipfs/kubo>                   | go         | Популярен, еднофайлов IPFS демон, реализиращ пълния стек от протоколи (bitswap, UnixFS, IPNS, Amino DHT, HTTP gateways) с обширен HTTP RPC API.                                                   |
| Boxo (GO SDK)  | <https://github.com/ipfs/boxo>                   | go         | Библиотека от компоненти за изграждане на IPFS приложения и реализации на Go; осигурява блокове за bitswap, UnixFS, IPNS и gateway, които се използват от Kubo и Rainbow.                         |
| Helia (JS SDK) | <https://github.com/ipfs/helia>                  | typescript | Лека, модулна и модерна реализация на IPFS за широко използваните JS и browser среди; съвместима с мрежата чрез bitswap, UnixFS, IPNS и trustless gateway retrieval                               |
| Verified Fetch | <https://github.com/ipfs/helia-verified-fetch>   | typescript | Клиент за извличане, подобен на fetch за IPFS; извлича съдържание през trustless gateways и bitswap, го проверява локално и намира providers чрез delegated routing                               |
| inbrowser.link | <https://github.com/ipfs/service-worker-gateway> | typescript | IPFS Gateway, реализиран в Service Worker, построен с Helia и Verified Fetch                                                                                                                      |
| IPFS Cluster   | <https://github.com/ipfs-cluster/ipfs-cluster>   | go         | Оркестрация на множество Kubo възли чрез CRDT / Raft consensus                                                                                                                                    |
| Nabu           | <https://github.com/peergos/nabu>                | java       | Минималистична, бърза и вградима IPFS реализация на ниво блокове, съвместима по мрежовия протокол с Kubo (bitswap, Amino DHT, IPNS); няма UnixFS или gateway. Използва се в продукция от Peergos. |
| Rainbow        | <https://github.com/ipfs/rainbow/>               | go         | Специализирана IPFS HTTP gateway реализация.                                                                                                                                                      |
| Someguy        | <https://github.com/ipfs/someguy/>               | go         | Delegated Routing V1 сървър и клиент за всички ваши HTTP/IPFS routing нужди.                                                                                                                      |

## Filecoin

Инструменти, които свързват IPFS данни и Filecoin съхранение; всеки ред уточнява кое IPFS протоколи говори.

| Име    | URL                                           | Език(ци) | Какво се опитва да направи                                                                                                                                                                                                          |
| ------ | --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boost  | <https://github.com/filecoin-project/boost>   | go       | Демон за внасяне и извеждане на IPFS данни към Filecoin storage provider; обслужва deal данни към IPFS клиенти през bitswap и trustless HTTP gateway API. В процес на замяна от [Curio](https://github.com/filecoin-project/curio). |
| Curio  | <https://github.com/filecoin-project/curio>   | go       | Наследник на Boost и lotus-miner за Filecoin storage providers; обслужва deal данни към IPFS клиенти през trustless HTTP gateway API.                                                                                               |
| Lassie | <https://github.com/filecoin-project/lassie/> | go       | Минимална retrieval client библиотека за IPFS и Filecoin, която извлича съдържание в CAR файлове чрез graphsync и trustless gateways; няма bitswap поддръжка (премахната в v0.25.0). В режим на поддръжка.                          |
| Lotus  | <https://github.com/filecoin-project/lotus>   | go       | Filecoin възел, управляващ консенсус, storage providing и създаване на storage deals; използва CIDs, IPLD и CAR за състоянието на веригата, но не обменя IPFS съдържание (няма bitswap serving, UnixFS или gateway; виж Boost).     |
| RIBS   | <https://github.com/CIDgravity/gw>            | go       | Експериментален blockstore, който се включва в Kubo (който осигурява bitswap и gateway serving) и изнася данни към Filecoin deals; в процес на работа, няма release-и                                                               |

## Ограничена съвместимост с Mainnet

Проекти с ограничена или никаква съвместимост с IPFS Mainnet; всеки ред посочва какво говори.

| Име  | URL                                   | Език(ци) | Какво се опитва да направи                                                                                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iroh | <https://github.com/n0-computer/iroh> | rust     | Обща peer-to-peer библиотека, построена върху QUIC и BLAKE3 hashing. Теоретично малки блокове до 1MiB, адресирани чрез BLAKE3 CIDs, могат да бъдат импортирани и експортирани; на практика няма общ транспорт или протокол за обмен на данни (няма bitswap или UnixFS), така че [IPFS Mainnet](https://docs.ipfs.tech/concepts/glossary/#mainnet) и Iroh възлите остават отделни swarms. |

## Данни, адресирани по съдържание

Леки библиотеки за работа с IPFS данни (CID, DAGs, DAG-CBOR, UnixFS, CAR). Повечето от тях не включват networking функционалност. За още инструменти за данни, адресирани по съдържание, вижте <https://github.com/ipld>.

| Име             | URL                                               | Език(ци)               | Какво се опитва да направи                                                                                                                                                            |
| --------------- | ------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| atcute          | <https://github.com/mary-ext/atcute>              | typescript             | CID, DAG-CBOR и CARv1 codec-ове за JavaScript/TypeScript, покриващи подмножеството, използвано от AT Protocol (CIDv1 с sha-256 и raw/DAG-CBOR codec-ове само); няма DAG-PB или UnixFS |
| dag-cbrrr       | <https://github.com/DavidBuchanan314/dag-cbrrr>   | python                 | Бързо, строго DAG-CBOR кодиране/декодиране, построено за AT Protocol; минимална CID поддръжка, без CAR                                                                                |
| js-multiformats | <https://github.com/multiformats/js-multiformats> | javascript, typescript | Многобройни формати за многобайтни префикси, кодове, хешове, CID-и и други; обща библиотека за JavaScript и TypeScript                                                                |
| go-cid          | <https://github.com/ipfs/go-cid>                  | go                     | Go реализация на CIDs (Content IDentifiers) с поддръжка за кодиране/декодиране                                                                                                        |
| go-ipld-prime   | <https://github.com/ipld/go-ipld-prime>           | go                     | Популярна библиотека за работа с IPLD данни на Go                                                                                                                                     |
| go-fixtureplate | <https://github.com/ipld/go-fixtureplate/>        | go                     | Инструменти за генериране и инспекция на IPLD данни, подпомагащи тестването.                                                                                                          |
| python-libipld  | <https://github.com/MarshalX/python-libipld>      | python                 | Бърза Python библиотека за работа с DAG-CBOR, CID и multibase; CAR поддръжка е CARv1 decode-only                                                                                      |
| py-ipld-car     | <https://github.com/storacha/py-ipld-car>         | python                 | CARv1 encoder/decoder библиотека (без CARv2)                                                                                                                                          |
| py-ipld-dag-pb  | <https://github.com/storacha/py-ipld-dag-pb>      | python                 | Строг DAG-PB encoder/decoder, Python порт на js-dag-pb                                                                                                                                |
| py-ipld-unixfs  | <https://github.com/storacha/py-ipld-unixfs>      | python                 | UnixFS encoder за файлове (WIP; все още не е публикуван в PyPI)                                                                                                                       |
| rust-ipld-core  | <https://github.com/ipld/rust-ipld-core>          | rust                   | Основни traits и типове за IPLD реализации на Rust                                                                                                                                    |

## Леки възли или експериментални

| Име                   | URL                                      | Език(ци) | Какво се опитва да направи                                                                                                                                                                               |
| --------------------- | ---------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ipfs-lite             | <https://github.com/hsanjuan/ipfs-lite>  | go       | Минимална библиотека, ориентирана към изграждането на IPFS демон, базирайки се на същите boxo блокове като Kubo: добавя и извлича UnixFS файлове през bitswap с Amino DHT routing; няма gateway или IPNS |
| rust-ipfs (dariusc93) | <https://github.com/dariusc93/rust-ipfs> | rust     | Kubo-съвместима реализация: bitswap, Amino DHT, UnixFS, IPNS, CAR import/export и pubsub; извлича от gateways и pinning services като клиент, но не обслужва gateway.                                    |

## Неактивни

| Име           | URL                                                   | Език(ци)               | Какво се опитва да направи                                                                                                                                                                             |
| ------------- | ----------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Agregore      | <https://github.com/AgregoreWeb/agregore-ipfs-daemon> | go, javascript         | Mobile friendly Kubo daemon                                                                                                                                                                            |
| auspinner     | <https://github.com/2color/auspinner>                 | go                     | CLI инструмент, който pin-ва CAR файлове чрез pinning service API и обслужва техните блокове през bitswap [не се поддържа от 2022; повечето услуги, които целеше, са прекъснати]                       |
| barge         | <https://github.com/application-research/barge>       | go                     | CLI инструмент с git-подобен workflow, който създава UnixFS DAGs и ги качва към Estuary [не се поддържа от 2022; неработещ откакто Estuary услугата беше спряна]                                       |
| c-ipfs        | <https://git.agorise.net/agorise/c-ipfs>              | C                      | IPFS реализация на C                                                                                                                                                                                   |
| durin         | <https://github.com/ipfs-shipyard/Durin>              | N/A                    | iOS и Android app, който отваря `ipfs://` и `ipns://` връзки през публични HTTP gateways; не съдържа IPFS възел и не проверява или прехвърля данни сам [архивиран през 2026]                           |
| Elastic IPFS  | <https://github.com/elastic-ipfs/elastic-ipfs>        | javascript, typescript | Мащабируема cloud-native реализация                                                                                                                                                                    |
| Estuary       | <https://github.com/application-research/estuary/>    | go                     | Демон-ориентирана услуга за pin-ване и onboard-ване на IPFS данни в Filecoin                                                                                                                           |
| gomobile-ipfs | <https://github.com/ipfs-shipyard/gomobile-ipfs>      | go                     | Библиотека, вграждаща пълен Kubo 0.16 възел в мобилно приложение, така че съвместимостта съответства на Kubo от онова време [архивиран през 2026, непроменян от 2023]                                  |
| homestar      | <https://github.com/ipvm-wg/homestar/>                | rust                   | Wasm workflow runtime на [IPVM](https://github.com/ipvm-wg); използва IPLD и CIDs вътрешно и разчита на външен Kubo възел за IPFS I/O (няма bitswap или UnixFS самостоятелно) [не се поддържа от 2024] |
| ipfs-embed    | <https://github.com/ipfs-rust/ipfs-embed>             | rust                   | Малък вградим blockstore с опростен bitswap; обменя блокове с Kubo само чрез opt-in compat mode, няма UnixFS, IPNS или gateway [не се поддържа от 2023]                                                |
| ipfs-nucleus  | <https://github.com/peergos/ipfs-nucleus/>            | go                     | Минимален block-level демон за P2P IPLD приложения (bitswap, Amino DHT, block RPC subset); няма UnixFS, IPNS или gateway [не се поддържа от 2023, заменен от Nabu]                                     |
| ipfs tiny     | <https://gitlab.com/librespacefoundation/ipfs-tiny>   | c++                    | Малка вградима, os-independent IPFS реализация                                                                                                                                                         |
| ipget         | <https://github.com/ipfs/ipget>                       | go                     | Минимален wget-подобен инструмент за изтегляне на файлове от IPFS възли през bitswap [архивиран през 2026, използвайте `ipfs get` от Kubo вместо това]                                                 |
| js-ipfs       | <https://github.com/ipfs/js-ipfs>                     | javascript, typescript | JavaScript реализация, насочена към nodejs и браузъри [deprecated, заменена от Helia]                                                                                                                  |
| Linux2ipfs    | <https://github.com/Jorropo/linux2ipfs>               | go                     | Малка pipeline и ориентирана към висока производителност реализация за бързо pinning service upload-ване                                                                                               |
| py-ipfs       | <https://github.com/ipfs-shipyard/py-ipfs>            | python                 | Python IPFS реализация                                                                                                                                                                                 |
| rust-cid-npm  | <https://salsa.debian.org/debian/rust_cid_npm>        | rust                   | Debian packaging на малък CLI инструмент, който генерира CIDs на файлове; не е IPFS клиент или библиотека                                                                                              |
| rust-ipfs     | <https://github.com/rs-ipfs/rust-ipfs>                | rust                   | Rust IPFS реализация [архивирана през 2022]                                                                                                                                                            |
| whypfs        | <https://github.com/whyrusleeping/whypfs>             | go                     | Демон, базиран на Kubo building blocks с опции, ориентирани към производителност                                                                                                                       |
