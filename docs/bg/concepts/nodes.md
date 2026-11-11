---
title: "Възли"
description: "Участниците в мрежата IPFS се наричат възли. Възлите са най-важният аспект на IPFS — без възли, които изпълняват IPFS демона, нямаше да има IPFS мрежа. Тази страница разглежда какво представляват възлите, текущите IPFS реализации и видовете услуги, които различните възли могат да предоставят."
sidebarDepth: 2
---

# Възли

Участниците в мрежата IPFS се наричат _възли_. _Възел_ е инстанция на IPFS реализация, която стартирате на локалния си компютър (директно или през браузър), за да съхранявате файлове и да се свързвате с мрежата IPFS. Те са най-важният аспект на IPFS. Без IPFS възли нямаше да има IPFS мрежа.

Вероятно ще срещнете термина _node_ (възел) в цялата документация на IPFS, в проблеми и в свързания код. Това е много общ термин, така че значението му зависи от контекста. Има три основни категории възли: IPFS възли, data nodes и libp2p възли за приложения.

* __IPFS възли__ са програми, които работят на компютър и могат да обменят данни с други IPFS възли. Те имат няколко различни имена, но ние ги наричаме различно, в зависимост от контекста:

  * _възел_: Използвайте _възел_, когато се позовавате на отделна точка в мрежата. Това е много общ термин. Например, когато отворите IPFS Desktop, вие установявате себе си като възел с потенциал да взаимодейства с други възли. Виж [Конфигуриране на възел](../how-to/configure-node.md).
  * _peer_: Използвайте _peer_, когато говорите за връзката на един възел (дори собствения ви) с други възли. Това означава тяхното отношение като равни, без централен орган, така че вашият възел е peer спрямо други peers. Виж [Наблюдение на peers](../how-to/observe-peers.md) и [Свързване с доставчици на съдържание](../how-to/peering-with-content-providers.md).
  * _демон_: Използвайте _демон_, когато говорите за състоянието на активност на възел. Когато възелът е онлайн и работи във фонов режим, слушайки за заявки за данните си, се нарича _демон_. Виж [Поставете вашия възел онлайн](../how-to/command-line-quick-start.md#take-your-node-online). Имайте предвид, че IPFS Helia _възел_ в браузър обикновено не се нарича _демон_. Въпреки това, в контекста на този документ, ние ще наричаме Helia _инстанция_, действаща като _възел_ в браузър, _демон_. За повече информация вижте [документацията на Helia](https://github.com/ipfs/helia/wiki).
  * _инстанция_: Използвайте _инстанция_, когато говорите за библиотека или програма, като Go или JS версия, работеща като IPFS възел в определен момент от време. Peer ID е същото, така че това все още е същият _възел_ от гледна точка на IPFS мрежата. Виж [Kubo](../reference/go/api.md) и [Helia](../reference/js/api.md#helia).

* __Data възли__, използвайте _data nodes_ при разговор за действителните части от данни в IPFS, като DAG възли, UnixFS възли и IPLD възли. Когато добавите файл с командата `ipfs add myfile.txt`, IPFS го разделя на няколко възела, всеки от които съдържа част от файла и е свързан с другите. Виж [Merkle Directed Acyclic Graphs (DAGs)](../concepts/merkle-dag.md), [Unix File System (UnixFS)](../concepts/file-systems.md#unix-file-system-unixfs), и следете [документацията за InterPlanetary Linked Data (IPLD) model](../concepts/ipld.md), която е в процес на разработка.

* __libp2p peer__ Използвайте _libp2p peer_, когато говорите за libp2p възли, върху които можете да изграждате приложения. Обикновено те се наричат _peers_ в libp2p, защото предоставя решения за основни peer-to-peer операции като transport, security, routing и discovery на съдържание. Виж [концепции](../concepts/libp2p.md)


## Видове

Има различни типове IPFS възли. И в зависимост от случая на употреба, един IPFS възел може да изпълнява една от много функции:

- [Релей](#relay)
- [Bootstrap](#bootstrap)
- [Делегирано маршрутизиране](#delegated-routing)

### Релей

Ако IPFS възел реши, че е недостъпен от общия интернет, IPFS възлите могат да изберат да използват relay node като вид VPN, за да се опитат да достигнат до недостъпния възел.

#### Характеристики на relay възел

- Имплементира [v2](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md) на Circuit Relay протокола.
- Може да бъде Kubo или Helia възел; въпреки това има и самостоятелни реализации:
  - [js-libp2p/circuit-relay](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#setup-with-relay)
  - [go-libp2p-relay-daemon](https://github.com/libp2p/go-libp2p-relay-daemon)
- Те се използват и от Kubo, и от Helia възли.
    - Helia _възел_ в браузър не може да говори TCP, така че relay може да помогне за увеличаване на броя на _peers_, с които може да се комуникира. Helia _възел_ с поддържани в браузъра [transports](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#transport) може да говори с Kubo _peer_ без припокриващи се transports, използвайки relay _peer_, ако този relay поддържа един transport от всеки друг _peer_:
      1. Поне един browser-supported transport (подходящите transports са [включени по подразбиране в Helia browser _възли_](https://github.com/ipfs/helia/blob/main/packages/libp2p/src/utils/libp2p-defaults.browser.ts))
      2. Поне един Kubo _peer_ supported transport.

#### Ограничения на relay възлите:
- v2 relays са „limited relays“, предназначени да се използват за [Direct Connection Upgrade through Relay](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md) (известно като hole punching).

Виж [p2p-circuit relay](https://github.com/libp2p/specs/tree/master/relay)

### Bootstrap

И Kubo, и Helia _възли_ използват bootstrap _възли_, за да откриват peers в DHT.

#### Характеристики на bootstrap възел:

- Всички default bootstrap _възли_ са част от Amino DHT.
- Списъкът с bootstrap _възли_, към които се свързва Helia _възел_, се контролира чрез конфигуриране на [опцията peerDiscovery на libp2p](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#peer-discovery).

#### Ограничения на bootstrap възела:

- Ако IPFS _възел_ има само един bootstrap _възел_, посочен в тази конфигурация, и този bootstrap възел спре да работи, IPFS възелът ще загуби достъп до Amino DHT, ако бъде рестартиран.
- Можете да конфигурирате хранилището на вашите _peers_ в вашата реализация, за да кешира здрави свързваеми _peers_, така че да можете да се свържете отново след рестартиране, вместо да използвате bootstrap _възли_. [Issue 8856 в Kubo repository](https://github.com/ipfs/kubo/pull/8856), който адресира този проблем, предоставя допълнителна информация и контекст.

[Повече за Bootstrap](../how-to/modify-bootstrap-list.md)

### Делегирано маршрутизиране

IPFS възлите _делегират_ задачите за маршрутизиране на съдържание и peer към **Delegated Routing V1 HTTP API** ([spec](https://specs.ipfs.tech/routing/http-routing-v1/)).

Делегираното маршрутизиране през HTTP не е routing система, а общ API за изнасяне на маршрутизиращата работа. Това е полезно в браузъри и други ограничени среди, където е неосъществимо да бъдеш DHT сървър/клиент, контактуващ с много други peers. По-широко, това позволява експерименти и иновации в routing на съдържанието, като същевременно поддържа оперативна съвместимост.

[HTTP API](https://specs.ipfs.tech/routing/http-routing-v1/) може да се използва за разрешаване на заявки за маршрутизиране на **съдържание**, **peer** и **IPNS име**.

#### Поддръжка за делегирано маршрутизиране в IPFS реализации

- [someguy](https://github.com/ipfs/someguy) е Delegated Routing V1 сървър, който проксира заявки към IPFS Amino DHT и [cid.contact Network Indexer](https://cid.contact/). IPFS Foundation управлява обществено делегирано routing endpoint, базиран на someguy, с URL `https://delegated-ipfs.dev/routing/v1`.
- [cid.contact Network Indexer](https://cid.contact/) също имплементира Delegated Routing V1 HTTP API.
- [Helia](https://github.com/ipfs/helia/tree/main/packages/http) може да бъде настроена да използва delegated routing endpoint.
- [Kubo](https://github.com/ipfs/kubo/blob/master/docs/delegated-routing.md) може да бъде конфигуриран с множество delegated routing endpoints ([Kubo като клиент](https://github.com/ipfs/kubo/blob/master/docs/config.md#routingtype)), в допълнение към експонирането на delegated routing endpoint на gateway ([Kubo като delegated routing server](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewayexposeroutingapi)).

## Реализации

[Прочетете повече за IPFS реализациите](./ipfs-implementations.md)
