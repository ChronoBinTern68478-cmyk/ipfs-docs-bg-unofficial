---
title: Как работи IPFS
description: Научете как работи InterPlanetary File System (IPFS) и защо е важна част от бъдещия интернет.
---

# Как работи IPFS

В това концептуално ръководство ще научите за основните подсистеми, от които се състои <VueCustomTooltip label="InterPlanetary File System" abbreviation is-small>IPFS</VueCustomTooltip>, и как те работят. Трите ключови отговорности на подсистемите на IPFS са:
- **Представяне и адресиране на данни**
- **Маршрутизиране на данни**
- **Прехвърляне на данни**

Въпреки че това са основните отговорности, функционалността на IPFS надхвърля именно тези три.

Данните в IPFS се адресират по съдържанието си (<VueCustomTooltip label="Начин за адресиране на данни по техния хеш, а не по местоположението им (IP адреси)." underlined multiline>content addressing</VueCustomTooltip>), а не по местоположение, като например IP адрес (адресиране по местоположение).

:::callout
Това ръководство е част 3 от 3-частово въведение в [основните концепции на IPFS](../concepts/README.md#learn-the-basics). Първата част, [Какво представлява IPFS и какво не представлява](../concepts/what-is-ipfs.md), дефинира IPFS, докато втората част, [**IPFS и проблемите, които решава**](../concepts/ipfs-solves.md), разглежда проблемите в интернет и текущите протоколи като HTTP, които IPFS решава.
:::

## Преглед на подсистемите

Всички подсистеми на IPFS, подредени по цел, са изброени по-долу, с връзки към основните подсистеми, разгледани в това ръководство.

| Цел | Подсистема |
| ------- | --------- |
| Представяне и организиране на данните | [CID-ове](#content-identifier-cid), [IPLD, UnixFS](#interplanetary-linked-data-ipld), MFS, DAG-CBOR, DAG-JSON, [CAR файлове](#content-addressable-archive-car-files) |
| Маршрутизиране на съдържание, свързване между CID и IP адреси | [Kademlia DHT](#kademlia-distributed-hash-table-dht), [Делегирано маршрутизиране през HTTP](#delegated-routing-over-http), [Bitswap](#bitswap-for-content-routing), [mDNS](#mdns) |
| Прехвърляне на данни | [Bitswap](#bitswap-for-data-transfer), [HTTP Gateways](#ipfs-http-gateways), [Sneakernet](#sneakernet), Graphsync, още в разработка |
| Адресиране на данни и възли | [Multiformats](#content-identifier-cid) |
| Свързване между IPFS и HTTP | [IPFS Gateways](#ipfs-http-gateways), Pinning API Spec |
| Peer-to-peer свързаност | libp2p (TCP, QUIC, WebRTC, WebTransport) |
| Променливост и динамично именуване | IPNS (Interplanetary Naming System), DNSLink |

## Как IPFS представя и адресира данни

IPFS представя данните като данни, адресирани по съдържание, като <VueCustomTooltip label="Терминът за единичен обем данни в IPFS." underlined multiline is-medium>блокове</VueCustomTooltip>, и работи с тези блокове, използвайки следните подсистеми:

- [Идентификатор на съдържанието (CID)](#content-identifier-cid)
- [InterPlanetary Linked Data (IPLD)](#interplanetary-linked-data-ipld)
- [Content Addressable aRchive (CAR) files](#content-addressable-archive-car-files)

### Идентификатор на съдържанието (CID)

В IPFS данните се разделят на <VueCustomTooltip label="Терминът за единичен обем данни в IPFS." underlined multiline is-medium>блокове</VueCustomTooltip>, които получават уникален идентификатор, наречен <VueCustomTooltip label="Адрес, използван за указване към данни в IPFS, базиран на самото съдържание, а не на местоположението." underlined multiline is-medium>Content Identifier (CID)</VueCustomTooltip>. По принцип CID се изчислява чрез комбиниране на хеша на данните с неговия <VueCustomTooltip label="Софтуер, способен да кодира и/или декодира данни." underlined multiline is-medium>codec</VueCustomTooltip>. Codecът се генерира чрез <VueCustomTooltip label="Колекция от съвместими, разширяеми протоколи, които правят данните самоописващи се." underlined multiline is-medium>Multiformats</VueCustomTooltip>.

Поради факта, че CID-овете се основават на съдържанието, а не на местоположението:
- Можете да извличате данни по *какво са*, а не къде се съхраняват.
- Можете да проверявате данните, като изчислявате отново CID-а и го сравнявате с това, което сте поискали.

:::callout
**Научете повече**
Научете повече за CID-овете в [дълбочинния преглед за CID](../concepts/content-addressing.md#cid-versions).
:::

### InterPlanetary Linked Data (IPLD)

IPFS използва <VueCustomTooltip label="Набор от спецификации за децентрализирани, адресирани по съдържание структури от данни за уеба." underlined multiline is-medium>InterPlanetary Linked Data (IPLD)</VueCustomTooltip>, за да работи с CID-ове и данни, адресирани по съдържание. IPFS използва IPLD, за да представя връзките между данни, адресирани по съдържание, като директории на файлове и други йерархични структури, използвайки <VueCustomTooltip label="Данни, структурирани като граф, чиито възли са насочено свързани помежду си и не образуват затворен цикъл." underlined multiline is-medium>Directed Acyclic Graph (DAG)</VueCustomTooltip>, наречен <VueCustomTooltip label="Специален тип DAG, при който всеки възел има уникален идентификатор, който е хеш на съдържанието на възела." underlined multiline is-medium>Merkle DAG</VueCustomTooltip>. Използвайки IPLD за общата функционалност, IPFS може да осигури по-подходящ, специфичен механизъм за представяне и адресиране на файлове, директории и техните symlinks, наречен [UnixFS](../concepts/file-systems.md#unix-file-system-unixfs). С UnixFS IPFS може да <VueCustomTooltip label="Когато обект се добави към IPFS, той се разделя на по-малки части, всяка част се хешира и за нея се създава CID." underlined multiline is-medium>разделя</VueCustomTooltip> и свързва данни, които не се побират в един блок, и да използва разделеното представяне за съхраняване и управление на данните.

IPLD осигурява на IPFS следните предимства:

- Възможност за представяне и работа с произволни данни, независимо дали това са стандартни файлове и директории, свързани данни, Merkle DAG или друг тип данни.
- Основна функционалност за структуриранe, сериализация, обход и свързване на данни, адресирани по съдържание, които могат да бъдат използвани от абстракции като UnixFS за по-специфични случаи на употреба.
- Съвместими протоколи.
- Лесно обновяване.
- Обратна съвместимост.

:::callout
**Научете повече**
Искате да научите повече за IPLD? Вижте [официалната документация](https://ipld.io/docs/intro/primer/).
:::

### Content Addressable aRchive (CAR) файлове

IPFS използва Content Addressable aRchive (CAR) файлове за съхраняване и прехвърляне на сериализиран архив от IPLD данни, адресирани по съдържание. CAR файловете са подобни на TAR файловете, защото са предназначени за съхраняване на колекции от данни, адресирани по съдържание.

## Как работи маршрутизирането на съдържание в IPFS

_Маршрутизиране на съдържание_ се отнася до начина, по който IPFS определя къде да намери даден CID в мрежата; по-специално, кои мрежови възли предоставят CID-овете, които търсите. С други думи, възелът не може просто да намери данни в мрежата с един CID; той се нуждае от информация за IP адресите и портовете на своите <VueCustomTooltip label="Програми, които имплементират протокола IPFS и участват в мрежата IPFS. Наричат се също възел." underlined multiline is-left>peer-ове</VueCustomTooltip> в мрежата. За маршрутизиране на съдържанието IPFS използва следните подсистеми:

- [Kademlia Distributed Hash Table (DHT)](#kademlia-distributed-hash-table-dht)
- [Bitswap](#bitswap-for-content-routing)
- [mDNS](#mdns)
- [Делегирано маршрутизиране през HTTP](#delegated-routing-over-http)

### Kademlia Distributed Hash Table (DHT)

IPFS използва Kademlia, a <VueCustomTooltip label="Децентрализирано хранилище от данни, което съпоставя данни според ключ-стойност двойки." underlined multiline is-left>Distributed Hash Table (DHT)</VueCustomTooltip>, проектирана за децентрализирани peer-to-peer мрежи. Kademlia помага да се намерят възли в мрежата IPFS, които съхраняват търсените данни. Kademlia DHT може да се мисли като голяма таблица, разпределена между много възли, която съхранява информация за това кои възли (IP адреси) имат кои данни (CID-ове). Kademlia предоставя високо ефективна, самостоятелно организираща се система, която издържа на променливостта на възлите. Kademlia използва <VueCustomTooltip label="Съкратено от “library peer-to-peer”, libp2p е колекция от протоколи, спецификации и библиотеки, които улесняват свързването между възли в peer-to-peer мрежа." underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> за установяване на свързаност.

:::callout
**Научете повече**

Искате да научите повече за Kademlia and DHTs? See the [Distributed Hash Tables (DHTs) conceptual guide](../concepts/dht.md#kademlia).
:::

### Bitswap (for content routing)

IPFS nodes use Bitswap, a <VueCustomTooltip label="Unlike a request-response protocol, all nodes in the system receive every message transmitted, and decide whether the message received should be immediately discarded, stored or processed." underlined multiline is-medium>message-based</VueCustomTooltip>,  <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer network</VueCustomTooltip> protocol for the transfer of data, that is _also_ used for routing data. With Bitswap, an IPFS node can ask any of the peers that it is connected to if they have any of the CIDs that node is looking for, all without traversing the [Kademlia DHT](#kademlia-distributed-hash-table-dht). Peers also store wantlists, so that if a peer receives the requested data at a later time, it can then send it to the node that originally requested. Like Kademlia, Bitswap uses <VueCustomTooltip label="Short for “library peer-to-peer”, libp2p is a collection of protocols, specifications, and libraries that facilitate connectivity between nodes in a peer-to-peer network." underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> to establish connectivity. 

:::callout
**Learn more**

Want to learn more about Bitswap? See the [Bitswap deep dive](../concepts/bitswap.md).

:::

### Delegated routing over HTTP

Delegated content routing is a mechanism for IPFS implementations to use for offloading content routing to another process/server using an HTTP API. For example, if an IPFS node does not implement the DHT, a delegated router can search the DHT for peers on its behalf. The main benefit of delegated routing is that nodes are not required to implement routing functionality themselves if they do not have the computing resources to do so, or wish to build an IPFS system with a custom backend for routing. So, delegated routing over HTTPS provides IPFS nodes with a standard interface that allows more flexibility in terms of how content routing works. 

:::callout
**Learn more**

For further information, see the [Delegated Content Routing HTTP API spec](https://specs.ipfs.tech/ipips/ipip-0337/)..

:::

### mDNS

To quickly and efficiently discover peers in local networks, IPFS uses Multicast Domain Name System (mDNS), a type of <VueCustomTooltip label="A system in which human-readable internet domain names are mapped to IP addresses." underlined multiline is-medium>DNS</VueCustomTooltip> protocol that resolves human-readable internet domain names to IP names without the use of a <VueCustomTooltip label="Any computer application that implements a system in which human-readable internet domain names are mapped to IP addresses (DNS)." underlined multiline is-medium>name server</VueCustomTooltip>.

The use of mDNS enables quick and efficient discovery of IPFS nodes in local networks without any coordination, e.g., without internet connectivity or access to [bootstrap nodes](./nodes.md#bootstrap).

## How IPFS transfers data

In addition to [routing data](#how-content-routing-works-in-ipfs), nodes in the IPFS network must efficiently distribute and deliver the content addressed data, taking into account that there are some nodes in the network who already have a copy of the data, and other nodes who do not have a copy of the data, but want one. To handle the transfer of data, IPFS uses the following subsystems:

- [Bitswap](#bitswap-for-data-transfer)
- [IPFS HTTP Gateways](#ipfs-http-gateways)
- [Sneakernet](#sneakernet)

### Bitswap (for data transfer)

As discussed in [How content routing works in IPFS](#bitswap-for-content-routing), IPFS nodes use Bitswap, a <VueCustomTooltip label="Unlike a request-response protocol, all nodes in the system receive every message transmitted, and decide whether the message received should be immediately discarded, stored or processed." underlined multiline is-medium>message-based</VueCustomTooltip>,  <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer network</VueCustomTooltip> protocol for both content routing and the transfer of data. With Bitswap, any peers that an IPFS node is connected to can transfer requested blocks directly to that node without needing to traverse the [DHT](#kademlia-distributed-hash-table-dht). Peers also store wantlists, so that if a peer receives requested data at a later time, it can then transfer it to the node that originally requested.

:::callout
**Learn more**

Want to learn more about Bitswap? See the [Bitswap deep dive](../concepts/bitswap.md).
:::

### IPFS HTTP Gateways

HTTP Gateways allow applications that do not support or implement all IPFS subsystems to fetch data from the IPFS network using an HTTP interface. In its simplest form, a gateway is an IPFS Node that also exposes an [HTTP Gateway API](https://specs.ipfs.tech/http-gateways/).

:::callout
**Learn more**

Want to learn more about IPFS Gateways? See the [IPFS Gateway conceptual guide](../concepts/ipfs-gateway.md).
:::

### Sneakernet

For use cases where transfer of data over a network connection is not an option, IPFS supports the use of <VueCustomTooltip label="An informal term for the transfer of data between computers through removable devices (hard drives, flash drives, optical disks, etc.), which are physically transported between computers, as opposed to transferring the data over the network." underlined multiline is-small is-right>sneakernet</VueCustomTooltip> to transfer content-addressed data between IPFS nodes. Using IPFS, CAR files (discussed in [How IPFS represents and addresses data](#content-addressable-archive-car-files)) can be transferred between two network drives without any network connectivity. Because of IPFS, the data is [verifiable](../concepts/what-is-ipfs.md#verifiability) and will have the same CID on both sides of the air gap.

## Further reading

- Are you looking for a deep dive into the design, architecture and theory of IPFS? See the [original IPFS whitepaper](../concepts/further-reading/academic-papers.md#ipfs---content-addressed-versioned-p2p-file-system).
- Dive deeper into the related concepts of [immutability](../concepts/immutability.md), [hashing](../concepts/hashing.md), [content-addressing and CIDs](../concepts/content-addressing.md).
- Learn about [IPFS pinning, along with the differences between persistence, permanence, and pinning](../concepts/persistence.md).
- Understand [privacy and encryption in IPFS](../concepts/privacy-and-encryption.md).
- Learn more about [IPFS nodes, including the different types](../concepts/nodes.md).
