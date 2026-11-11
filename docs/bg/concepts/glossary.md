---
title: Речник
sidebarDepth: 0
description: Ръководство с ключови термини за IPFS, InterPlanetary File System.
related:
  'Guide to libp2p terminology': https://web.archive.org/web/20260130120408/https://docs.libp2p.io/reference/glossary/
  'Guide to IPLD terminology': https://ipld.io/glossary/
  'IPFS Course at ProtoSchool': https://proto.school/course/ipfs
---

# IPFS речник

[A](#a) [B](#b) [C](#c) [D](#d) [E](#e) [F](#f) [G](#g) [H](#h) [I](#i) [J](#j) [K](#k) [L](#l) [M](#m) [N](#n) [O](#o) [P](#p) [Q](#q) [R](#r) [S](#s) [T](#t) [U](#u) [V](#v) [W](#w) [X](#x) [Y](#y) [Z](#z)

## A

### ACL

В компютърната сигурност, access-control list (ACL) е списък с разрешения, свързани с системен ресурс, известен също като _обект_. ACL определя кои потребители или системни процеси имат достъп до обекти и какви операции са разрешени за тях. [Повече за ACL](https://en.wikipedia.org/wiki/Access-control_list)

### ADL

ADL е съкратено от _Advanced Data Layout_, концепция в [IPLD](#ipld). Вижте [IPLD docs](https://ipld.io/glossary/#adl).

### Amino DHT

Преди това наричан "public DHT", Amino DHT е публичната [DHT](#dht), базирана на Kademlia, към която [Kubo](#kubo) и други реализации по подразбиране се присъединяват чрез [libp2p](#libp2p) протокола `/ipfs/kad/1.0.0`. [Amino DHT specification](https://specs.ipfs.tech/routing/kad-dht/#amino-dht) | [Blog post](https://blog.ipfs.tech/2023-09-amino-refactoring/)

### Announcing

Announcing е функция на мрежовия слой на IPFS в [libp2p](#libp2p), при която възел може да информира други възли, че разполага с налични блокове данни.

### AutoNAT

[libp2p](#libp2p) протокол, който позволява на [peer](#peer) да установи дали е разположен зад [Network address translator (NAT)](#nat). [Повече за AutoNAT](https://github.com/libp2p/specs/blob/master/autonat/#readme).

## B

### Base32

Нечувствително към регистъра [Multibase](#multibase) кодиране, използвано за текстово представяне на [CIDv1](#cid-v1).

### Base36

Нечувствително към регистъра [Multibase](#multibase), използвано за текстово представяне на [CIDv1](#cid-v1).

### Base58btc

Чувствително към регистъра [Multibase](#multibase), използвано за текстово представяне на [Multihashes](#multihash) и [CIDv0](#cid-v0).

### Base64url

Чувствително към регистъра [Multibase](#multibase), използва модифициран Base64 с URL- и filename безопасен азбука ([RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5)), където `+` и `/` са заменени съответно с `-` и `_`.

### Bitswap

Bitswap е централният протокол за обмен на блокове в IPFS. Целта му е да запитва блокове от други възли в мрежата и да изпраща блокове към тях. [Bitswap specification](https://specs.ipfs.tech/bitswap-protocol/) | [Повече за Bitswap](../concepts/bitswap.md)

### BitTorrent

BitTorrent е комуникационен протокол за P2P споделяне на файлове, използван за разпространение на данни и електронни файлове през интернет. Освен това е първото приложение за споделяне на файлове, използващо протокола. [Повече за BitTorrent protocol](https://en.wikipedia.org/wiki/BitTorrent) и [BitTorrent app](https://www.bittorrent.com)

### Blockchain

Блокчейнът е растящ списък от записи, известни като блокове, които са свързани чрез криптография. Всеки блок съдържа криптографски хеш на предишния блок, timestamp и данни за транзакции (обикновено представени като Merkle tree). [Повече за Blockchain](https://en.wikipedia.org/wiki/Blockchain)

### Block

Блокът е двоичен масив от данни, идентифициран от [CID](#cid). Това може да бъде необработени байтове от произволни данни или част от сериализирани двоични данни, кодирани с [IPLD](#ipld) [codec](#codec).

### Bootstrap node

Bootstrap възелът е доверен peer в мрежата на IPFS, чрез който възел на IPFS научава за други възли в мрежата. И Kubo, и Helia използват bootstrap възли, за да влязат в разпределената хеш таблица (DHT). Виж [Bootstrap](../concepts/nodes.md#bootstrap)

## C

### CAR

CAR (Content Addressable aRchives) е формат за сериализирано представяне на всяка [IPLD](#ipld) [DAG](#dag). Форматът CAR е начин за пакетиране на данни, адресирани по съдържание, в архивни файлове, които могат лесно да се съхраняват и прехвърлят. Обикновено в файл с разширение `.car` или байтов поток, маркиран като медийният тип [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car). [Повече за CAR](https://ipld.io/specs/transport/car/)

### CAR v1

Версия 1 на формата [CAR](#car), представляващ конкатенация от DAG блокове, плюс заглавка, описващ графите във файла (чрез root CIDs). [Повече за CAR v1](https://ipld.io/specs/transport/car/carv1/)

### CAR v2

Минимално подобрение към формата [CAR v1](#car-v1) с основна цел добавянето на незадължителен индекс в формата за бърз достъп до блокове. [Повече за CAR v2](https://ipld.io/specs/transport/car/carv2/)

### CBOR

Конкретното двоично представяне на обекти (CBOR) е формат на данни, базиран на [JSON](#json), със сравнително малък размер на кода и съобщенията и с възможност за разширяване. Използва се в [IPLD](#ipld). [Повече за CBOR](http://cbor.io/)

### CID

Content Identifier (CID) е самоописващ се етикет, адресиран по съдържание, използван за указване към данните, съхранени в IPFS. Това е основният идентификатор, използван за IPFS и [IPLD](#ipld). [Повече за CID](../concepts/content-addressing.md)

### CID v0

Версия 0 (v0) на идентификатора на съдържанието в IPFS. Този CID е с дължина 46 символа, започващ с "Qm". Използва base 58-кодиран multihash, много прост, но много по-малко гъвкав от новите CID. [Повече за CID v0](../concepts/content-addressing.md#version-0-v0)

### CID v1

Версия 1 (v1) на идентификатора на съдържанието в IPFS. Тази версия на CID съдържа водещи идентификатори, които осигуряват съвместимост напред. Поддържа различни формати за бъдещи версии на CID. [Повече за CID v1](../concepts/content-addressing.md#version-1-v1)

### Circuit relay

Термин на [libp2p](#libp2p) за транспортен протокол, който маршрутизира трафик между два peer-а чрез трети [_relay_ peer](#relay-node). [Повече за Circuit Relay](https://web.archive.org/web/20260128152445/https://docs.libp2p.io/concepts/nat/circuit-relay/).

### Circuit relay v1

Неограничен relay, който изисква външен ACL за контрол на използването на ресурси. [Виж спецификацията](https://github.com/libp2p/specs/blob/master/relay/circuit-v1.md).

### Circuit relay v2

Истински децентрализиран relay, който предоставя ограничен relay за неща като [hole punching](#hole-punching). Поддръжката за този тип relay е въведена в Kubo 0.11. [Виж спецификацията](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md).

### Codec

Функция, която кодира или декодира сериализирани данни в/от някакъв модел на данни. В IPFS използваме договорена таблица с codec-ове, реализирана като част от [Multicodec](#multicodec).

### Content addressing

Начин за съхранение на информация, при който устройството може да извлича данните въз основа на тяхното съдържание, а не на тяхното местоположение. [Научете как IPFS използва content addressing](../concepts/how-ipfs-works.md#how-ipfs-represents-and-addresses-data).

### CRDT

Conflict-Free Replicated Data Type (CRDT) е тип специално проектирана структура от данни, използвана за постигане на силна крайна последователност (SEC) и монотонност (липса на rollback). [Повече за CRDT](https://github.com/ipfs/research-CRDT)

## D

### Daemon

Daemon е компютърна програма, която обикновено работи във фонов режим. IPFS daemon е начинът, по който възелът се включва в мрежата на IPFS. [Повече за IPFS Daemon](../how-to/command-line-quick-start.md#take-your-node-online)

### DAG

Направеният ацикличен граф (Directed Acyclic Graph, DAG) е структура от данни в компютърните науки, адаптирана за използване с файлови системи с версии, блокчейни и моделиране на различни видове информация. Данните на [IPLD](#ipld) в IPFS са естествено DAG. [Повече за DAG в Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

### DAG-JSON

DAG-JSON е [codec](#codec), който реализира [IPLD Data Model](https://ipld.io/glossary/#data-model) като JSON, плюс допълнителни правила за кодиране на връзки, които се задават чрез определени структури на map. DAG-CBOR също добавя тип "link" с CBOR tag, за да се приведе в съответствие с IPLD Data Model. [More about DAG-JSON](https://ipld.io/docs/codecs/known/dag-json/)
### DAG-JOSE

DAG-JOSE е [codec](#codec), който дефинира CBOR сериализация за JOSE, стандарт за подписване и криптиране на обекти. [Повече в спецификацията на DAG-JOSE](https://ipld.io/specs/codecs/dag-jose/spec/)

### DAG-CBOR

DAG-CBOR е [codec](#codec), който реализира [IPLD Data Model](https://ipld.io/glossary/#data-model) като подмножество на CBOR, плюс допълнителни ограничения за представяния, съвместими с хеширане. DAG-CBOR също добавя тип "link" чрез CBOR tag, за да се приведе в съответствие с IPLD Data Model. [Повече за DAG-CBOR](https://ipld.io/docs/codecs/known/dag-cbor/)

## DAG-PB

DAG-PB е [codec](#codec), който реализира много малко подмножество от [IPLD Data Model](https://ipld.io/glossary/#data-model) в конкретен набор от [Protobuf](#protobuf) съобщения, използвани в IPFS за дефиниране как се сериализира данните на [UnixFS](#unixfs) v1. [Повече за DAG-PB](https://ipld.io/specs/codecs/dag-pb/spec/)

### Data model

Имахте предвид [IPLD Data Model](https://ipld.io/glossary/#data-model)?

### DataStore

Datastore е системата за съхранение на диска, използвана от възел на IPFS. Параметрите на конфигурацията контролират местоположението, размера, конструкцията и работата на datastore-а. [Повече за Datastore](https://github.com/ipfs/kubo/blob/master/docs/config.md#datastore)

### DCUtR

Протоколът Direct Connection Upgrade through Relay (DCUtR) позволява [hole punching](#hole-punching) за NAT traversal, когато port forwarding не е възможен. Peer ще координира действията с другата страна чрез [relayed connection](#circuit-relay-v2), за да се надгражда до директна връзка през NAT/ firewall, когато това е възможно. [Повече за DCUtR](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md)

### Delegated routing

Delegated routing е механизъм, чрез който имплементациите на IPFS могат да прехвърлят маршрутизирането на съдържание, маршрутизирането на peer-ове и именуването (IPNS) на друг процес/сървър. Най-широко приетата спецификация за delegated routing без зависимост от доставчик е [Delegated Routing V1 HTTP API](https://specs.ipfs.tech/routing/http-routing-v1/) с [public utility instance at `delegated-ipfs.dev/routing/v1`](../concepts/public-utilities.md#delegated-routing).

Delegated routing е полезен в браузъри и други ограничени среди, където е невъзможно да се действа като DHT client/server. По-широко, той позволява експерименти и иновации в маршрутизацията на съдържанието, като същевременно запазва съвместимостта и модулността.

[Повече за delegated routing](../concepts/nodes.md#types)

### DHT

_Разпределена хеш таблица_ (DHT) е разпределено key-value хранилище, където ключовете са криптографски хешове. IPFS използва модифициран алгоритъм [Kademlia](#kademlia) за своя DHT. Виж [Amino DHT](#amino-dht) за публичната мрежа. [IPFS Kademlia DHT specification](https://specs.ipfs.tech/routing/kad-dht/) | [Повече за DHT](dht.md)

### DMT

Съкратено от _Data Model Tree_, термин, въведен от екипа на IPLD. [Повече за DMT в IPLD docs](https://ipld.io/glossary/#dmt)

### Dialing

Dialing е функция на мрежовия слой на IPFS в [libp2p](#libp2p), при която се отваря връзка към друг peer. Заедно, реализацията на dialing и [listening](#listening) образуват [transport](#transport).

### DNSAddr

DNSAddr е протокол за публикуване на множество [Multiaddrs](#multiaddr) в DNS име. Самият DNSAddr е валиден Multiaddr, който изглежда като `/dnsaddr/bootstrap.libp2p.io`. Може да се използва за мащабиране, динамично bootstrapping или като допълнителна подсказка за маршрутизиране на съдържание за уебсайтове с [DNSLink](#dnslink). [Повече за DNSAddr](https://github.com/multiformats/multiaddr/blob/master/protocols/DNSADDR.md)

### Denylist

Механизъм, чрез който операторите на възли на IPFS блокират конкретни [CIDs](#cid) от обслужване. Компактният denylist формат позволява ефективно филтриране на съдържанието. [Compact Denylist Format specification](https://specs.ipfs.tech/compact-denylist-format/) | [Content blocking in Kubo](https://github.com/ipfs/kubo/blob/master/docs/content-blocking.md)

### DNSLink

DNSLink е протокол за свързване на съдържание и услуги директно от DNS. Адресът на DNSLink изглежда като IPNS адрес, но вместо хеширан публичен ключ използва домейн, например `/ipns/docs.ipfs.tech`. [DNSLink Gateway specification](https://specs.ipfs.tech/http-gateways/dnslink-gateway/) | [Повече за DNSLink](https://dnslink.dev/)

### DWeb

Децентрализираната мрежа (DWeb) изглежда като днешната World Wide Web, но е изградена върху нови основни технологии, които поддържат децентрализация. Много по-трудно е за една единствена организация (като държава или терористична група) да спре една страница, сайт или услуга, независимо дали случайно или умишлено.

## E

## F

### Filestore

Експериментален datastore в [Kubo](#kubo). Използва се, когато е подадено `--nocopy` към `ipfs add`. Той съхранява компонентите с данни на [UnixFS](#unixfs) като файлове в файлова система вместо като блокове. Това позволява добавяне на съдържание към IPFS без дублиране в datastore-а на IPFS. [Повече за експеримента Filestore](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipfs-filestore)

## G

### Gateway

IPFS Gateway е HTTP сървър, който действа като мост между уеб браузърите и IPFS. Чрез gateway потребителите могат да разглеждат файлове и уебсайтове, съхранени в IPFS, сякаш са съхранени на HTTP сървър. Най-често IPFS Gateway е възел на IPFS, който също така разкрива HTTP endpoint за IPFS Gateway. Виж [повече за Gateway](../concepts/ipfs-gateway.md), [адресиране на IPFS в уеба](../how-to/address-ipfs-on-web.md) и [HTTP Gateway specifications](https://specs.ipfs.tech/http-gateways/)

### Garbage Collection

Garbage Collection (GC) е процесът, при който всеки възел на IPFS изчиства кеширани файлове и блокове. Възлите трябва да изчистват предишно кеширани ресурси, за да освободят място за нови. [Закачените ресурси](#pinning) никога не се изтриват.

### GO-IPFS

Старото име на [Kubo](#kubo).

### Graph

В компютърните науки, Graph е абстрактен тип данни от областта на теорията на графите в математиката. [Merkle-DAG](#merkle-dag), използван в IPFS, е специализиран граф.

### Graphsync

Graphsync е остарял протокол за репликация на съдържание, подобен на [Bitswap](#bitswap), но фокусиран върху графи, а не върху блокове. Не се поддържа от [Kubo](#kubo) поради сложност на протокола, а [IPIP-402](https://specs.ipfs.tech/ipips/ipip-0402/) предлага по-лесен начин за синхронизиране на частични [DAGs](#dag). [Повече за Graphsync](https://github.com/ipld/specs/blob/master/block-layer/graphsync/graphsync.md)

## H

### HAMT-sharding

Техниката за sharding, използвана за [sharding](#sharding) на големи директории на UnixFS. Използва свойства на hash array mapped tries (HAMT). [UnixFS HAMT specification](https://specs.ipfs.tech/unixfs/#dag-pb-hamtdirectory) | [Повече за HAMT](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

### Hash

Криптографският хеш е функция, която приема произволен вход (съдържание) и връща стойност с фиксирана дължина. Един и същ вход винаги генерира един и същ хеш. Има много хеш алгоритми. [Повече за Hash](hashing.md)

### Helia

Лека, модулна и модерна имплементация на IPFS за JS и browser среди, която замества [js-ipfs](#js-ipfs). Научете повече на [https://github.com/ipfs/helia](https://github.com/ipfs/helia).

### Hole punching

Техника за обход на [NAT](#nat) или firewall, която разчита на координирани едновременни връзки. Използва се, когато port forwarding не е възможен. [Виж DCUtR](#dcutr)

## I

### Information Space

Information Space е наборът от понятия и отношения между тях, притежавани от информационна система. Това може да се мисли като концептуална рамка или инструмент за изучаване как знанието и информацията се кодифицират, абстрахират и разпространяват в социална система. [Повече за Information Space](https://en.wikipedia.org/wiki/Information_space)

### IPFS Desktop

Най-малко натрапчиво и потребителски приятелско настолно приложение за IPFS на Windows, macOS и Linux. Използва [Kubo](#kubo) като backend на IPFS. Виж: [Инсталиране на IPFS Desktop App](../install/ipfs-desktop.md).

### IPFS Mainnet

Виж [Mainnet](#mainnet).

### IPLD

Моделът InterPlanetary Linked Data (IPLD) е набор от спецификации за подкрепа на децентрализирани структури от данни за web, адресиран по съдържание. Основните характеристики са взаимосъвместими протоколи, лесно надграждащи се и обратно съвместими. Едно пространство от имена за всички хеш-базирани протоколи. [Повече за IPLD](https://ipld.io/)

### IPNI

InterPlanetary Network Indexer (IPNI), наричан още Network Indexer, indexer и IPNI, позволява бързо и ефективно търсене на данни, адресирани по съдържание. IPNI е проектиран да подобри производителността и ефективността на IPFS чрез предоставяне на алтернативен метод за маршрутизиране на съдържанието към [Amino DHT](#amino-dht). [Повече за IPNI](../concepts/ipni.md)

### IPNS

InterPlanetary Name System (IPNS) е система за създаване и актуализиране на променливи връзки към съдържание в IPFS. IPNS позволява публикуване на последната версия на всяко съдържание в IPFS, дори ако основният IPFS хеш се е променил. [IPNS Record specification](https://specs.ipfs.tech/ipns/ipns-record/) | [Повече за IPNS](ipns.md)

### IPIP

InterPlanetary Improvement Proposal (IPIP) е дизайнерски документ за въвеждане на функции или промени в спецификациите на IPFS. IPIP предоставя структуриран процес за предлагане, обсъждане и документиране на подобрения. [IPIP process specification](https://specs.ipfs.tech/meta/spec-for-specs/) | [Всички IPIP](https://specs.ipfs.tech/ipips/)

## J

### JS-IPFS

Остаряла имплементация на IPFS, написана изцяло на JavaScript. [js-ipfs е deprecated](https://github.com/ipfs/js-ipfs?tab=readme-ov-file#%EF%B8%8F-deprecated-js-ipfs-has-been-superseded-by-helia) и е заменена от [Helia](#helia).

### JSON

JavaScript Object Notation (JSON) е лек формат за обмен на данни. JSON е текстов формат, напълно независим от езика, четим от човека и лесен за парсване и генериране. [Повече за JSON](https://www.json.org/)

## K

### Kubo

Kubo (преди известен като [go-ipfs](#go-ipfs)) е най-ранната и най-широко използвана имплементация на IPFS, написана на Go. Работи на сървъри и машини на потребители с пълни възможности на IPFS. [Инсталирайте IPFS Kubo](../install/command-line.md) или виж [Kubo README](https://github.com/ipfs/kubo#readme).

### Kademlia

Алгоритъм за peer-to-peer разпределена хеш таблица, използващ XOR-базирани метрики за ефективна маршрутизация. [libp2p](#libp2p) първоначално го е реализирал като Kad-DHT, който IPFS разширява с поддръжка за търсене на [CID](#cid), записи на [IPNS](#ipns) и реклами на доставчици. Виж [DHT](#dht) и [Amino DHT](#amino-dht). [IPFS Kademlia DHT specification](https://specs.ipfs.tech/routing/kad-dht/) | [libp2p Kad-DHT relation](https://specs.ipfs.tech/routing/kad-dht/#relation-to-libp2p-kad-dht)

## L

### LAN

Local Area Network (LAN) е тип (обикновено частна) компютърна мрежа, покриваща ограничена площ. [Повече за LAN](https://en.wikipedia.org/wiki/Local_area_network)

### Leaf

Leaf е възел на граф, който не сочи към друг възел. Това е обратното на [root](#root).

### libp2p

Проектът libp2p е модулна система от протоколи, спецификации и библиотеки, които позволяват разработването на peer-to-peer мрежови приложения. Това е основен компонент на IPFS. [Повече за libp2p](https://libp2p.io/)

### Listening

Listening е функция на мрежовия слой на IPFS в libp2p, при която входяща връзка се приема от друг peer. Заедно, реализацията на [dialing](#dialing) и listening образуват [transport](#transport).

### Link

В IPFS и [IPLD](#ipld), _link_ обикновено означава указател към [CID](#cid).

## M

### Mainnet

IPFS Mainnet е термин, използван за описание на стандартната или "основна" публична мрежа, към която повечето имплементации на IPFS се свързват по подразбиране. Повечето [IPFS implementations](https://specs.ipfs.tech/architecture/principles/#ipfs-implementation-requirements) са проектирани да работят с Mainnet (но някои могат да бъдат конфигурирани вместо това за създаване на частна swarm). Възлите на Mainnet обикновено се присъединяват към [Amino DHT](#amino-dht) за маршрутизиране на съдържанието с помощта на [Bootstrap nodes](#bootstrap-node), разчитат на [Bitswap](#bitswap) за прехвърляне на данни, [UnixFS](#unixfs) за кодирането на файлове и директории и обикновено експонират [IPFS Gateway](#gateway). Това е основно прието за мрежата на IPFS. Въпреки това IPFS Mainnet е полезно разграничение в свят с много [IPFS implementations](../concepts/implementations.md) с различна степен на съвместимост.

### Merkle-DAG

Merkle-DAG е структура от данни в компютърните науки, използвана в основата на файловете/съхранението на блокове в IPFS. Merkle-DAG създава хеш на своето съдържание, известен като [Content Identifier](#cid). [Повече за Merkle-DAG](merkle-dag.md)

### Merkle Forest

Merkle Forest е термин, създаден за описание на разпределените, автентични, хеш-връзани структури от данни (Merkle trees), използвани в технологии като Bitcoin, Ethereum, git и BitTorrent. По този начин IPFS е гора от свързани Merkle trees. [Повече за Merkle Forest](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

### Merkle Tree

Merkle Tree е специфичен тип хеш дърво, използвано в криптографията и компютърните науки, което позволява ефективна и сигурна проверка на съдържанието на големи структури от данни. Наречено на Ralph Merkle, който го патентова през 1979 г. [Повече за Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree)

### MFS

Mutable File System (MFS) е инструмент, вграден в IPFS, който ви позволява да третирате файловете като нормална файлова система, базирана на имена. Можете да добавяте, редактирате и премахвате MFS файлове, докато всички актуализации на връзки и хешове се обработват автоматично. [Повече за MFS](file-systems.md#mutable-file-system-mfs)

### Multiaddr

Multiaddr е начин за създаване на самоописващи се, съставими и бъдещо устойчиви мрежови адреси. В [libp2p](#libp2p) се използва за адресиране на [peer](#peer). За да научите повече, прочетете [Addressing in libp2p →](https://github.com/libp2p/specs/blob/master/addressing/README.md) и [Multiaddr Specification →](https://github.com/multiformats/multiaddr)

### Multibase

Multibase е протокол за разграничаване на кодировката на base-encoded (напр. base32, base36, base64, base58 и др.) двоични данни, появяващи се в текст. В IPFS се използва като префикс, указващ кодировката, използвана за остатъка от CID. [Повече за Multibase](https://github.com/multiformats/multibase#readme)

### Multicodec

Multicodec е идентификатор, указващ формата на целевото съдържание. Той помага на хората и софтуера да разберат как да интерпретират това съдържание след изтеглянето му. В IPFS е подпомаган от договорена таблица с [codec](#codec). Multicodec-ите са проектирани за използване в двоични представяния, като ключове или идентификатори (напр. [CIDv1](#cid)). [Повече за Multicodec](https://github.com/multiformats/multicodec#readme)

### Multihash

Multihash е протокол за разграничаване на изходите от различни добре познати хеш функции, като същевременно отчита размер и кодировка. Полезен е за създаване на приложения, които са устойчиви към бъдещи промени в използваните хешове, и позволява съвместната работа на множество хеш функции. [Повече за Multihash](https://github.com/multiformats/multihash).

### Multiformats

Проектът Multiformats е колекция от протоколи, които имат за цел да направят системите устойчиви на бъдещи промени. Ключов елемент е подобряването на форматираните стойности с самоописване. Това позволява съвместимост, гъвкавост и насърчава разширяемост. [Повече за Multiformats](https://multiformats.io/) и [Multihash](https://github.com/multiformats/multihash)

### Multiplexer

Мултиплексирането позволява създаването на множество "виртуални" връзки в рамките на една [libp2p](#libp2p) връзка. [Повече за Stream Multiplexing в libp2p docs](https://web.archive.org/web/20260128163648/https://docs.libp2p.io/concepts/multiplex/overview/)

### Mplex

mplex е остарял stream multiplexer, създаден в ранните дни на [libp2p](#libp2p). [Повече за mplex](https://web.archive.org/web/20250624193954/https://docs.libp2p.io/concepts/multiplex/mplex/)

## N

### NAT

Network Address Translation (NAT) enables communication between two networks by mapping IP addresses from one to another. Many consumer routers provide NAT service to allow multiple devices in local network ([LAN](#lan)) to access the internet ([WAN](#wan)) through a single public IP address. [More about NAT](https://en.wikipedia.org/wiki/Network_address_translation)

### Node

In IPFS, a node or [peer](#peer) is the IPFS program that you run on your local computer to store files and then connect to the IPFS network. See [Nodes](../concepts/nodes.md#nodes).

### Node (in graphs)

In an IPLD [graph](#graph) context, a node is a point that may be linked to by other nodes using edges or links.

For example, in a family tree each person is a _node_, while each branch connecting one person to another is an _edge_.

## O

## P

### Path Gateway

An HTTP [Gateway](#gateway) that serves deserialized IPFS content at `/ipfs/{cid}` or `/ipns/{name}` paths. Good for loading files and assets, but the lack of origin isolation and URL paths prefixed with `/ipfs` or `/ipns` make it unsuitable for hosting websites or web apps. Use a [Subdomain Gateway](#subdomain-gateway) for those. Requires trust in the gateway operator as responses can be modified; only use with a local, trusted gateway to avoid MITM risks. [Path Gateway specification](https://specs.ipfs.tech/http-gateways/path-gateway/)

### Path/Address

A Path/Address is the method within IPFS of referencing content on the web. Addresses for content are path-like; they are components separated by slashes. [More about Path/Address](../how-to/address-ipfs-on-web.md)

### Peer

In system architecture, a Peer is an equal player in the peer-to-peer model of decentralization, as opposed to the client-server model of centralization. [See also Peer as Node](#node)

### Peer routing

Peer routing is the process of discovering the network _route_ or address for a network peer using various methods. The primary peer routing mechanism in IPFS is a distributed hash table that uses the [Kademlia routing algorithm](dht.md#lookup-algorithm) to efficiently locate peers. However, other methods, like local discovery, are also used. Learn more in the [libp2p documentation](https://web.archive.org/web/20251113174247/https://docs.libp2p.io/concepts/).

### Peer ID

A Peer ID is how each unique IPFS node is identified on the network. The Peer ID is created when the IPFS node is initialized and is essentially a cryptographic hash of the node's public key. [More about Peer ID](dht.md)

### Pinning

Pinning is the method of telling an IPFS node that particular data is important and so it will never be removed from that node's cache. To learn more, start by understanding [persistence, permanence, and pinning](persistence.md); then, see how to [add local pin](../how-to/pin-files.md) and read [what remote pins are](#remote-pinning).

### Pinning service

Third-party services that run IPFS nodes and [pin](#pinning) content on behalf of users, ensuring data remains available on the IPFS network even when the user's local node is offline. See [working with pinning services](../how-to/work-with-pinning-services.md).

### Pinning Service API

[Vendor-agnostic](https://ipfs.github.io/pinning-services-api-spec/) [API specification](https://ipfs.github.io/pinning-services-api-spec/), която всеки може да имплементира, за да предостави услуга за [remote pinning](#remote-pinning).

### Preload node

Част от процеса на публично достъпно UnixFS DAG чрез wantlist на preload node, което го кара да извлича данни. Други възли, които запитват съдържанието, след това могат да го разрешат от preload node чрез Bitswap, тъй като данните вече са налични в blockstore на preload node.

### Protobuf

Protocol Buffers (Protobuf) е безплатен и с отворен код крос-платформен формат за сериализация на структурирани данни. IPFS го използва в [DAG-PB](#dag-pb). [Повече за Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers)

### Pubsub

Publish-subscribe (Pubsub) е експериментална функция в IPFS. Издателите изпращат съобщения, класифицирани по тема или съдържание, а абонатите получават само съобщенията, които ги интересуват. [Повече за Pubsub](https://blog.ipfs.tech/25-pubsub/)

## Q

### QUIC

QUIC (`/quic-v1`) е един от [libp2p](#libp2p) [transport](#transport) протоколи. Осигурява винаги криптирана, stream-multiplexed връзка, изградена върху UDP. [Повече за QUIC в libp2p](https://web.archive.org/web/20260128152146/https://docs.libp2p.io/concepts/transports/quic/)

## R

### `_redirects` file

Конфигурационен файл за дефиниране на URL redirects и rewrites на [Subdomain](#subdomain-gateway) и [DNSLink](https://specs.ipfs.tech/http-gateways/dnslink-gateway/) gateways. Полезен за single-page приложения и потребителска маршрутизация на уебсайтове, хоствани в IPFS. [Как да използвате _redirects](../how-to/websites-on-ipfs/redirects-and-custom-404s.md) | [Web _redirects File specification](https://specs.ipfs.tech/http-gateways/web-redirects-file/)

### Redundancy

В контекста на IPFS практиката на [pinning](#pinning) на едно и също съдържание към множество възли или [pinning services](#pinning-service), за да се гарантира наличност дори ако един източник стане офлайн. Това повишава устойчивостта и наличността на данните в [network](#mainnet).

### Relay node

Средство за установяване на свързаност между libp2p възли (напр. IPFS възли), които иначе не биха могли да установят директна връзка помежду си. Това може да се дължи на възли, стоящи зад NAT, reverse proxies, firewall-и и др. Виж [Nodes > Relay](../concepts/nodes.md#relay) и [libp2p docs about Circuit Relay](https://web.archive.org/web/20260128152445/https://docs.libp2p.io/concepts/nat/circuit-relay/).

### Remote Pinning

Вариант на [pinning](#pinning), който използва трета страна услуга, за да гарантира, че данните остават в IPFS, дори когато локалният възел стане офлайн или локалната копия на данните бъде изтрита по време на garbage collection. [Повече за работа с remote pinning services](../how-to/work-with-pinning-services.md).

### Repo

Repository (Repo) е директория, където IPFS съхранява всички настройки и вътрешни данни. В [Kubo](#kubo) се създава с командата `ipfs init`. [Повече за Repo в Kubo](../how-to/command-line-quick-start.md#initialize-the-repository)

### Root

Root е [node](#node-in-graphs) в [graph](#graph), който сочи към поне друг възел. В IPLD граф root-овете се използват за агрегирането на множество части от файл заедно.

Ако имате файл `A` от 600 KiB, той може да бъде разделен на 3 блока `B`, `C` и `D`, тъй като стандартният размер на блок в IPFS е 256 KiB. Възелът `A`, който сочи към всеки от тези три блока, е root. CID на този root е това, което IPFS показва като CID на файла.

```
      A
      |
-------------
|     |     |
B     C     D
```

## S

### Schemas

В IPFS, IPLD Schemas са система за описание на данни със структурни типове. [Повече за IPLD Schemas](https://ipld.io/glossary/#schemas)

### Selectors

IPLD selectors са форма на graph query над IPLD данни. Може да се мисли и като начин за задаване на [traversal](#traversal). [Повече за IPLD Selectors](https://ipld.io/glossary/#selectors)

### Self-hosting

Стартиране на собствен възел на IPFS (използвайки [Kubo](#kubo), [IPFS Desktop](#ipfs-desktop) или други реализации), за да [pin](#pinning) и обслужвате съдържание, вместо да разчитате изцяло на трети [pinning services](#pinning-service). Self-hosting ви дава пълен контрол над данните, докато участвате в мрежата на IPFS.

### SFS

A Self-certifying File System (SFS) е децентрализирана файлова система, която не изисква специални разрешения за обмен на данни. Тя е self-certifying, защото данните, подадени на клиент, са автентифицирани от името на файла (което е подписано от сървъра). [Повече за SFS](https://en.wikipedia.org/wiki/Self-certifying_File_System)

### Sharding

Въвеждане на хоризонтално разделяне на данни в база данни или структура от данни. Основната цел е разпределяне на натоварването и повишаване на производителността. Пример за sharding в IPFS е [HAMT-sharding](#hamt-sharding) на големи директории на [UnixFS](#unixfs).

### Signing (Cryptographic)

Криптографското подписване на данни позволява доверие към данни от недоверени източници. Криптографски подписаните стойности могат да се предават през недоверен канал и всякаква манипулация с данните може да бъде открита. [Повече за Digital signature](https://en.wikipedia.org/wiki/Digital_signature)

### Subdomain Gateway

HTTP [Gateway](#gateway), който обслужва десериализирано съдържание, като всеки [CID](#cid) има собствен поддомен (напр., `{cid}.ipfs.gateway.example`). Осигурява [origin](https://en.wikipedia.org/wiki/Same-origin_policy) изолация, което го прави безопасен за хостинг на уебсайтове и web apps. Изисква доверие към оператора на gateway; използвайте го с локален gateway, за да избегнете MITM рискове. [Subdomain Gateway specification](https://specs.ipfs.tech/http-gateways/subdomain-gateway/)

### Substrate

Термин от [IPLD](#ipld), свързан с [ADLs](#adl). [Повече в IPLD glossary](https://ipld.io/glossary/#substrate)

### Swarm

_Swarm_ е термин за мрежата от peer-ове на IPFS, с които локалният възел има връзки. Swarm адресите са адреси, на които локалният възел ще слуша за връзки от други peer-ове на IPFS.

### Switch

В [libp2p](#libp2p), _switch_ е компонент, отговорен за комбиниране на множество [transports](#transport) в един интерфейс, позволявайки на приложението да [dial](#dialing) peer-ове без да специфицира кой транспорт да използва.

Switch-овете също координират процеса на _connection upgrade_, който повишава _raw_ връзка от transport слоя в такава, която поддържа [protocol negotiation](https://web.archive.org/web/20260113172348/https://docs.libp2p.io/concepts/protocols/#protocol-negotiation), [stream multiplexing](../concepts/libp2p.md) и сигурна комуникация.

Понякога се нарича [swarm](#swarm) за исторически причини.

## T

### Transport

В [libp2p](#libp2p), transport означава технологията, която ни позволява да преместваме данни от една машина в друга. Това може да бъде TCP, UDP ([QUIC](#quic)) мрежа, [WebSocket](#websocket) връзка в браузър или всичко друго, способно да имплементира transport interface. [Повече за libp2p transports](https://web.archive.org/web/20260128152051/https://docs.libp2p.io/concepts/transports/overview/)

### Traversal

В [IPLD](#ipld), това е процесът на преминаване през [Data Model](#data-model). [Повече в IPLD glossary](https://ipld.io/glossary/#substrate)

### Trustless Gateway

[Gateway](#gateway), който връща сурови данни, адресирани по съдържание (блокове, [CAR](#car) файлове), които могат да бъдат [verified](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) от клиента (напр. [@helia/verified-fetch](https://www.npmjs.com/package/@helia/verified-fetch)). За разлика от [Path](#path-gateway) или [Subdomain](#subdomain-gateway) gateways, не се изисква доверие към оператора на gateway. Защитен е срещу MITM атаки, защото целостта се проверява чрез криптографски хешове. [Trustless Gateway specification](https://specs.ipfs.tech/http-gateways/trustless-gateway/)

## U

### UnixFS

Unix File System (UnixFS) е форматът на данни, използван за представяне на файлове и всички техни връзки и метаданни в IPFS. Той е в известна степен базиран на начина, по който работят файловете в Unix. Добавянето на файл към IPFS създава блок, или _дърво_ от блокове, в UnixFS формат и го предпазва от garbage collection. [UnixFS specification](https://specs.ipfs.tech/unixfs/) | [Повече за UnixFS](file-systems.md#unix-file-system-unixfs)

### Urlstore

Експериментален datastore в [Kubo](#kubo), подобен на [`filestore`](#filestore), но извлича съдържанието на блоковете чрез HTTP URL вместо локална файлова система. [Повече за urlstore experiment](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipfs-urlstore)

## V

## W

### WAN

Wide Area Network (WAN) е тип (обикновено публична) компютърна мрежа, обхващаща голяма географска област. [Повече за WAN](https://en.wikipedia.org/wiki/Wide_area_network)

### WebRTC

WebRTC (Web Real-Time Communications) е рамка за комуникация в реално време и в libp2p се използва за установяване на връзки browser-to-server и browser-to-browser между приложения. [Libp2p](#libp2p) поддържа WebRTC като множество [transports](#transport) (`/webrtc`, `/webrtc-direct`). [Повече за WebRTC в libp2p](https://web.archive.org/web/20260128152341/https://docs.libp2p.io/concepts/transports/webrtc/)

### WebSocket

WebSockets са начин за web приложения да поддържат двупосочна комуникация със сървърни процеси и са един от [transports](#transport), поддържани от [libp2p](#libp2p) (`/ws`). [Повече за поддръжката на libp2p WebSockets](https://github.com/libp2p/specs/blob/master/websockets/README.md)

### WebTransport

WebTransport е нова спецификация, използваща QUIC, за да предложи алтернатива на [WebSocket](#websocket). По концепция може да се разглежда като WebSocket над [QUIC](#quic). [Libp2p](#libp2p) поддръжката е обозначена с `/webtransport` [Multiaddr](#multiaddr). [Повече за WebTransport в libp2p](https://web.archive.org/web/20260128152314/https://docs.libp2p.io/concepts/transports/webtransport/)

## X

### x-ipfs-path

`x-ipfs-path` е HTTP response header, който някои IPFS [gateways](#gateway) добавят, за да информират клиентите за IPFS пътя на върнатото съдържание. Това е по-стар начин за откриване на IPFS съдържание през HTTP, преди [gateway URL conventions](https://specs.ipfs.tech/http-gateways/) и [DNSLink](#dnslink), използвани днес. Те го са заменили, така че вече не е необходим за адресиране. [HTTP Gateway specifications](https://specs.ipfs.tech/http-gateways/) | [Addressing IPFS on the web](../how-to/address-ipfs-on-web.md)

## Y

### Yamux

Yamux (Yet another Multiplexer) е мощен stream [multiplexer](#multiplexer), използван в [libp2p](#libp2p). [Повече за Yamux в libp2p docs](https://web.archive.org/web/20250917025649/https://docs.libp2p.io/concepts/multiplex/yamux/)

## Z
