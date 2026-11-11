---
title: Адресиране на IPFS в мрежата
description: Практически ръководства за използване и разработка с IPFS за създаване на децентрализирани уеб приложения и услуги.
---

# Адресиране на IPFS в мрежата

Тази страница описва как да се адресира съдържание в IPFS в уеб среда. Клиенти, които поддържат IPFS протокола, могат да игнорират HTTP подробностите и да извличат данните нативно, докато тези, които не го правят, могат да извлекат ресурса от HTTP сървър на gateway `ipfs.io`, стига да имат идентификатор на съдържанието (CID).
Когато `ipfs.io` или всеки друг [public gateway](https://ipfs.github.io/public-gateway-checker/) спре да работи, IPFS-aware клиенти все още ще могат да извличат съдържанието от IPFS мрежата, стига поне един възел да предоставя данните зад CID в мрежата:

Адресите, използващи gateway, имат следната форма, където `<gateway>` е адресът на gateway, а `<CID>` е идентификаторът на съдържанието:

```shell
https://<gateway>/ipfs/<CID>
```

Например:

```shell
https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly
```

[Самостоятелно хостван локален gateway](https://docs.ipfs.tech/install/) също може да се използва вместо `ipfs.io`. За да преместите съществуващо приложение извън public gateways, вижте [Replace public gateways with self-hosted IPFS](./replace-public-gateways-with-self-hosted-ipfs.md).

## IPFS адресиране накратко

В IPFS съдържателните адреси са подобни на пътища; тоест адресите са компоненти, разделени със слешове. Първият компонент е протоколът, който ви казва как да интерпретирате всичко след него.

Съдържанието, на което се отнася хеш, може да има именувани връзки. Например, Git commit има връзка с име `parent`, която всъщност е просто указател към хеша на друг Git commit. Компонентите в IPFS адрес след CID са именуваните връзки.

Тъй като съдържателните адреси не са URL адреси, използването им в уеб браузър изисква повторно форматиране. Вариантите за това са:

1. [Path gateway](#path-gateway)

   ```shell
   https://<gateway-host>/ipfs/<cid>/<path>
   ```

2. [Subdomain gateway](#subdomain-gateway), за хостване на уебсайтове с origin isolation. Това е по-сигурно, но по-трудно за настройка.

   ```shell
   https://<cid>.ipfs.<gateway-host>/<path>
   ```

3. Нативни protocol handlers, когато не искате да вграждате конкретен HTTP gateway в URI:

   ```shell
   ipfs://<cid>/<path>
   ```

   ```shell
   ipns://<ipns-name>/<path>
   ```

## HTTP gateways

HTTP gateway-овете позволяват на инструменти, които „говорят“ HTTP, но не говорят „IPFS“, да общуват. Те са първата стъпка по пътя за надграждане на уеба. [Повече информация за IPFS gateways](../concepts/ipfs-gateway.md).

Един недостатък на HTTP gateway-овете е централизацията. Адресирането по местоположение на gateway зависи както от DNS, така и от HTTPS/TLS, което разчита на доверие в [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) (CAs) и [public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI). В дългосрочен план тези проблеми трябва да бъдат смекчени чрез използването на opportunistic protocol upgrade schemes.

### Protocol upgrade

Дългосрочно, десериализираните отговори, върнати от публичен HTTP gateway, се използват само като резерв, когато няма нативна реализация на IPFS.

IPFS клиенти, user agents, инструменти и разширения трябва да откриват CIDs в URL адреси, DNSLinks или IPFS content paths и да ги разрешават директно през IPFS протокола. Това гарантира, че извлечените данни съответстват на очаквания хеш.

Примери за user agents, които поддържат IPFS нативно, са:

- Стандартен уеб браузър с инсталиран [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) до IPFS възел, като [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)

## Path gateway

Path gateway е най-основната схема. В тази схема URL пътят, използван за content addressing, всъщност е име на ресурс без канонична локация. HTTP сървърът предоставя частта с локацията, което позволява на браузърите да интерпретират IPFS content path относително към текущия сървър и да работят без нужда от преобразуване. Даден адрес на gateway host (например `ipfs.io`) и път до ресурса (например `/path/to/resource`), [CID](../concepts/content-addressing.md) (`<cid>`), IPNS ID (`<ipnsid>`) или [DNSLink](../concepts/dnslink.md) (`<dnslink>`) могат да се използват всички.

[Използване на CID](#cid)
[Използване на IPNS](#ipns)
[Използване на DNSLink](#dnslink)

### CID

Даден CID `<cid>`, URL пътят може да бъде конструиран по следния начин:

```plaintext
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
```

Пример:

```plaintext
https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html
```

### IPNS

Дадено [IPNS име](https://specs.ipfs.tech/ipns/ipns-record/#ipns-name) `<ipns-name>`, URL пътят може да бъде конструиран по следния начин:

```plaintext
https://<gateway-host>.tld/ipns/<ipns-name>/path/to/resource
```

Пример:

```plaintext
https://ipfs.io/ipns/k51qzi5uqu5dgutdk6i1ynyzgkqngpha5xpgia3a5qqp4jsh0u4csozksxel2r
```

### DNSLink

Дадено DNS име с DNS TXT запис [DNSLink](https://dnslink.dev/) `<dnslink>`, URL пътят може да бъде конструиран по следния начин:

```plaintext
https://<gateway-host>.tld/ipns/<dnslink>/path/to/resource
```

Пример:

```plaintext
https://ipfs.io/ipns/docs.ipfs.tech/concepts/
```

::: danger
В тази схема всички страници споделят един [единен origin](https://en.wikipedia.org/wiki/Same-origin_policy). Поради това този тип gateway трябва да се използва само когато изолацията на сайта не е важна. Примери включват статично съдържание без cookies, локално хранилище или API, които изискват потребителско разрешение.

Ако сте в съмнение, използвайте [subdomain gateway](#subdomain-gateway).
:::

::: tip
Implementers и operators на gateway-ове могат да намерят повече подробности в [Path Gateway Specification](https://specs.ipfs.tech/http-gateways/path-gateway/).
:::

## Subdomain gateway

Когато е необходима [origin-based security](https://en.wikipedia.org/wiki/Same-origin_policy), трябва да се използва [CIDv1](../concepts/content-addressing.md#cid-versions) в case-insensitive encoding, като Base32 или Base36, в subdomain:

```plaintext
https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/resource
```

Примери:

```plaintext
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
http://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.localhost:8080/wiki/Vincent_van_Gogh.html
```

::: warning Известни проблеми

1. Някои браузъри и други user agents принуждават lowercase за authority частта на URL адресите, което нарушава case-sensitive CIDs, преди HTTP gateway да има шанс да ги прочете.
1. Дължината на DNS label е ограничена до 63 символа ([RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034#page-7))

Поради тези ограничения се препоръчва използването на кратък, case-insensitive CIDv1 в subdomain контекст. Base32 е безопасната стойност по подразбиране; по-малко популярният Base36 може да се използва за по-дълги ED25519 libp2p ключове.

Вижте следващия раздел, за да научите как да конвертирате съществуващ CIDv0 в DNS-безопасно представяне.

:::

#### Нативна поддръжка в Kubo и Rainbow

[Kubo](https://dist.ipfs.tech/#kubo) предоставя нативна поддръжка за subdomain gateway; вижте [`Gateway` recipes](https://github.com/ipfs/kubo/blob/master/docs/gateway.md#gateway-recipes) с готови за използване one-liners за най-често срещаните случаи.

Ако имате нужда от високопроизводителен HTTP gateway, може да искате да разгърнате [Rainbow](https://github.com/ipfs/rainbow/). Rainbow е специализиран IPFS HTTP gateway, който улеснява мащабирането на HTTP retrieval и го изолира от вашия Bitswap provider backend, като Kubo или IPFS Cluster. Вижте `rainbow --help` за съответните конфигурации (`--subdomain-gateway-domains` и `RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS`).

#### Преобразуване на CID за subdomains

Ако имате съдържание, идентифицирано от по-стар CIDv0, има автоматичен и ръчен вариант за безопасно представяне като CIDv1 за използване в subdomains и други case-insensitive контексти.

- [Автоматично](#automatic-leverage-the-gateway-in-kubo)
- [Ръчно](#manual-use-cid-ipfs-tech-or-the-command-line)

##### Автоматично — използвайте gateway в Kubo

Използването на subdomain gateway като drop-in замяна за path one премахва нуждата от ръчно преобразуване на CID.

Заявките за content path, изпратени до gateway домейна, ще върнат HTTP 301 redirect към правилна subdomain версия, като се грижат за всяко необходимо преобразуване на кодиране:

```plaintext
https://<gateway-host>.tld/ipfs/<cid> -> https://<cidv1>.ipfs.<gateway-host>.tld/
```

Например, отварянето на CIDv0 ресурс на [`https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html`](https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html)
връща redirect към CIDv1 представяне на [`https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html`](https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html).

Gateway преобразува CID в case-insensitive encoding.
Мулитежестът в CIDv1 е същият, какъвто е и в оригиналния CIDv0.

#### Ръчно — използвайте cid.ipfs.tech или командния ред

Преобразуването може да се направи и ръчно.

За да конвертирате CID в Base32 без padding ([RFC4648](https://datatracker.ietf.org/doc/html/rfc4648#section-6)), използвайте [cid.ipfs.tech](https://cid.ipfs.tech) или командния ред. По-долу е пример с командния ред:

```shell
ipfs cid base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

Резултатът е:

```shell
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

PeerIDs могат да бъдат представени като [CID с `libp2p-key` multicodec](https://github.com/libp2p/specs/blob/master/RFC/0001-text-peerid-cid.md).
Base36 се предлага като по-сигурна стойност по подразбиране за по-дълги ключове:

```shell
ipfs key list -l --ipns-base base36
k51qzi5uqu5dh9ihj4p2v5sl3hxvv27ryx2w0xrsv6jmmqi91t9xp8p9kaipc2 self

ipfs cid format -v 1 -b base36 --mc libp2p-key QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
k2k4r8jl0yz8qjgqbmc2cdu5hkqek5rj6flgnlkyywynci20j0iuyfuj
```

::: tip
Implementers и operators на gateway-ове могат да намерят повече подробности в [Subdomain Gateway Specification](https://specs.ipfs.tech/http-gateways/subdomain-gateway/).
:::

## DNSLink gateway

Gateway, предоставен от Kubo, разбира HTTP `Host` header и ще провери дали [DNSLink](../concepts/dnslink.md) съществува за посочено [domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).
Ако DNSLink е наличен, gateway ще върне съдържание от път, разрешен чрез DNS TXT запис.
Този тип gateway предоставя пълна [origin isolation](https://en.wikipedia.org/wiki/Same-origin_policy).

Пример е този уебсайт, [https://docs.ipfs.tech](https://docs.ipfs.tech).

::: tip
За пълно ръководство за DNSLink, включително уроци, примери за употреба и FAQ, вижте [dnslink.dev](https://dnslink.dev).

Implementers и operators на gateway-ове могат да намерят повече подробности в [DNSLink Gateway Specification](https://specs.ipfs.tech/http-gateways/dnslink-gateway/).
:::

## Нативни URL адреси

Нативният формат на адреса е същият като HTTP URL адрес на [subdomain gateway](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway), но с две разлики:

- Схемата на протокола се заменя с namespace `ipfs` или `ipns`
- Компонентът на authority (host и port на gateway) се заменя с CID

```plaintext
ipfs://{cid}/path/to/subresource/cat.jpg
```

Примери:

```plaintext
ipfs://{cidv1}
ipfs://{cidv1}/path/to/resource
ipfs://{cidv1}/path/to/resource?query=foo#fragment

ipns://{cidv1-libp2p-key}
ipns://{cidv1-libp2p-key}/path/to/resource
ipns://{dnslink-name}/path/to/resource?query=foo#fragment
```

::: tip
Основната ни цел тук е да използваме съществуващи стандарти, които максимизират съвместимостта с съществуващи user-agents, като браузъри и CLI инструменти. Ако нещо не е ясно, важат правилата на HTTP URL адресите.
:::

Първият елемент след двойното наклонено черта е идентификатор, представляващ корена на съдържанието. Той се интерпретира като authority компонент, използван за origin calculation, което осигурява необходимата изолация между security contexts на различни дървета на съдържанието.

Пример:

```plaintext
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

::: warning Избягвайте case-sensitive CID
Някои user agents ще принудително преобразуват CID компонента на URL-подобен адрес в lowercase.
За да гарантирате съвместимост със съществуващи библиотеки и софтуер, използвайте case-insensitive CID encoding. Препоръчва се използването на CIDv1 в Base32 или Base36.
:::

::: tip
Implementers могат да намерят повече подробности в спецификациите [IPFS URI (`ipfs://`)](https://specs.ipfs.tech/ipfs-uri/) и [IPNS URI (`ipns://`)](https://specs.ipfs.tech/ipns-uri/).
:::

### Превръщане на нативен адрес в каноничен content path

Всеки „URL“ адрес може да бъде превърнат обратно в content path лесно:

Примери:

- `ipfs://{immutable-root}/path/to/resourceA` се преобразува в `/ipfs/{immutable-root}/path/to/resourceA`
- `ipns://{mutable-root}/path/to/resourceB` се преобразува в `/ipns/{mutable-root}/path/to/resourceB`

## Допълнителни ресурси

### Техническа спецификация за implementers

Gateway адресирането е специфицирано на [specs.ipfs.tech/http-gateways](https://specs.ipfs.tech/http-gateways/). Нативните адресни схеми са специфицирани в [IPFS URI (`ipfs://`)](https://specs.ipfs.tech/ipfs-uri/) и [IPNS URI (`ipns://`)](https://specs.ipfs.tech/ipns-uri/).

### Фон върху дискусиите за адресни схеми

Дискусиите около IPFS адресирането текат откакто [@jbenet](https://github.com/jbenet) публикува [IPFS whitepaper](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf), като са предложени редица други подходи. Тази дългогодишна дизайнерска дискусия включва много дълги GitHub issue потоци, но добър преглед може да бъде намерен в [this PR](https://github.com/ipfs/specs/pull/152).

### IPFS Companion

[IPFS Companion](https://github.com/ipfs/ipfs-companion#readme) е браузърно разширение, което опростява достъпа до IPFS ресурси.

То предоставя поддръжка за нативни URL адреси и автоматично ще пренасочва IPFS gateway заявките към локалния Kubo демон, така че да не разчитате на или да се доверявате на отдалечени gateways.
