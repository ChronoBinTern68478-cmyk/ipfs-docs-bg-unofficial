---
title: Публични IPFS услуги
sidebarDepth: 1
description: Информация за хоствани публични услуги като публични gateways и хоствани delegated routing endpoints.
---

# Публични IPFS услуги

IPFS Foundation (и Protocol Labs в миналото) и редица други организации предоставят хоствани публични услуги на общността на доброволна основа. Следователно те не са предназначени да бъдат част от критичния ви път или от продукционна инфраструктура.

Те включват [IPFS Gateways](./ipfs-gateway.md), хоствани [Delegated Routing V1 endpoints](./glossary.md#delegated-routing), и [Amino DHT](./glossary.md#amino-dht) [Bootstrappers](./nodes.md#bootstrap).

Тези услуги улесняват извличането на данни от мрежата IPFS в среди с ограничени ресурси, като браузъри и устройства с ниска мощност.

Това е чудесен начин да започнете. Когато приложението ви надрасне best-effort трафика и искате инфраструктура, която контролирате вие, вижте [Замяна на публични gateways със self-hosted IPFS](../how-to/replace-public-gateways-with-self-hosted-ipfs.md).

## Публични IPFS Gateways

IPFS Foundation предоставя три публични gateway hostnames. Те не са три отделни услуги: всяка от тях е различен интерфейс към един и същ backend, създаден за различен тип задача.

- **`https://ipfs.io`**: [path resolution](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#path-gateway) gateway. Използвайте го за обикновени връзки и fetch-и от командния ред, където URL от вида `https://ipfs.io/ipfs/{cid}` е всичко, от което се нуждаете.
- **`https://dweb.link`**: [subdomain resolution](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway) gateway. Използвайте го за уебсайтове и всичко, което браузърът зарежда, защото всеки CID получава свой собствен origin и собствен browser security sandbox.
- **`https://trustless-gateway.link`**: gateway, ограничен до [trustless and verifiable responses](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval). Използвайте го, когато клиентът сам проверява байтовете, например browser app, построена върху [Helia](https://helia.io) или [`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch).

:::warning Изберете един, не запитвайте всички три
Трите hostnames се обслужват от един и същ набор от сървъри, споделят един и същ cache, едни и същи връзки към мрежата IPFS и едни и същи rate limits. Заявяването на всичките три за един и същ CID наведнъж връща един и същ отговор три пъти. Това не е по-бързо, не е по-надеждно, изгаря rate limit три пъти по-бързо и отнема капацитет от всички останали, използващи споделен обществен ресурс. Повторното изпращане на неуспешен request на sibling hostname също не помага: достига до същия backend.

За истинно резервиране ви е необходим втори backend, не второ hostname на същия. Стартирайте [свой gateway](../how-to/replace-public-gateways-with-self-hosted-ipfs.md), или добавете такъв, управляван от някой друг, от [public gateway checker](https://ipfs.github.io/public-gateway-checker/).
:::

Техническите операции се управляват от Waterworks Community от името на IPFS Foundation. За да докладвате за технически проблеми с тези gateways, можете да отворите issue в [Waterworks Community repository](https://github.com/ipshipyard/waterworks-community). Начинът, по който тези gateways работят, се променя: вижте [IPFS is moving beyond the sponsored gateways](https://blog.ipfs.tech/2026-08-beyond-sponsored-gateways/).

### Политика за злоупотреба

Тези gateways блокират злоупотребно съдържание чрез [Bad Bits Denylist](https://badbits.dwebops.pub/).

За да докладвате за злоупотребно съдържание или съдържание, което нарушава [IPFS Community Code of Conduct](https://ipfs.fyi/coc), използвайте [уеб формата](https://ipfs.fyi/report-abuse). Ако предпочитате имейл, изпратете CID-ите на abuse@ipfs.io. Пълната политика е на [about.ipfs.io](https://about.ipfs.io/#reporting-abuse). Тъй като трите hostnames споделят един backend, един доклад покрива всички тях.

Когато бъде получена заявка за премахване, подателят получава автоматизирано системно потвърждение. След това някой от екипа за премахване проверява заявката, за да потвърди, че е легитимна и трябва да бъде приета. След като валидността бъде установена, тя се изпраща за по-нататъшна обработка.

Оттам вътрешна система извлича съответната информация от заявката и създава запис за нея в нашите списъци за премахване. Списъкът след това се публикува на нашите gateway възли, а съдържанието в въпрос е връща статус 410 при посещение.

Вашият браузър може да има локален cache на въпросното съдържание и може да не показва, че нещо е блокирано на gateways. За да избегнете cache на браузъра, опитайте да видите съдържанието в режим incognito или private mode. Можете също така да предотвратите проблеми с cache, като използвате command-line tool като Curl или Wget.

### Поддържани функции

Горните публични gateways поддържат следното:

- `ipfs.io` и `dweb.link` поддържат [пълния набор от IPFS Gateway спецификации](https://specs.ipfs.tech/http-gateways/), включително deserialized отговори, за да се позволи хостване на уебсайтове.
  - [HTTP Range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range) поддържат файлове с максимален размер до 5GiB поради ограничения на Cloudflare CDN. Заявки за по-големи файлове ще върнат стандартен HTTP 200 отговор вместо това.
- `trustless-gateway.link` поддържа само [Trustless Gateway subset of the specification](https://specs.ipfs.tech/http-gateways/trustless-gateway/)
  - Поддържани типове съдържание: `application/vnd.ipld.raw`, `application/vnd.ipld.car` и `application/vnd.ipfs.ipns-record`

Те поддържат HTTP клиенти, достигащи до тях чрез ipv4 и ipv6 адреси.

Основните IPFS възли, които стоят зад gateways, поддържат следните променливи идентификатори в пространството от имена `/ipns`:
- [IPNS Names](https://specs.ipfs.tech/ipns/ipns-record/#ipns-name), напр. `dweb.link/ipns/k51q....`
- [DNSLink](dnslink.md) за всички [ICANN](https://en.wikipedia.org/wiki/ICANN) регистрирани домейни, както и `.eth`, напр. `dweb.link/ipns/vitalik.eth`

Основните IPFS възли, стоящи зад gateways, поддържат извличане на данни от peers, които:
- Имат ipv4 или ipv6 адреси
- Или са достижими през публичния интернет, или са достъпни чрез libp2p [relay-v2 протокол](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md) и се свързват обратно към gateway възлите чрез dialback
- Поддържат една от следните libp2p transport конфигурации:
   - QUIC-v1
   - TCP или WS или WSS, Yamux, TLS или Noise
   - WebTransport
- Поддържат [Bitswap](./bitswap.md) протокол ([v1.2](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-2-0), [v1.1](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-1-0) или [v1.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-0-0)), или HTTP извличане на `application/vnd.ipld.raw` отговори, както е дефинирано в [Trustless Gateway specification](https://specs.ipfs.tech/http-gateways/trustless-gateway/)
- Имат или рекламирани своите данни към [Amino DHT](./glossary.md#amino-dht), или са рекламирани към [IPNI](./glossary.md#ipni), така че данните им да са индексирани от [cid.contact](https://cid.contact)

## Други публични gateways

Освен това, има [инструмент, поддържан от общността](https://ipfs.github.io/public-gateway-checker/), за намиране и тестване на публични gateways.

## Делегирано маршрутизиране

Докато IPFS Gateways са изключително полезни за извършване на тежката работа по намиране на providers за CIDs и тяхното извличане, те могат да станат choke point за извличане и точка на централизация.

[_Delegated Routing_](./glossary.md#delegated-routing) endpoints са ключова стъпка към премахване на възникващата централизация на публичните gateways и по този начин повишаване на здравината на мрежата.

Браузърите и устройствата с ниска мощност могат да направят единично HTTP извикване към _Delegated Routing_ endpoint с CID, което търсят. Endpoint връща [multiaddresses](./glossary.md#multiaddr) на providers за CID, от които браузърът може да изтегля директно.

### Delegated Routing Endpoint

IPFS Foundation предоставя публичен delegated routing endpoint, подкрепен от [**someguy**](https://github.com/ipfs/someguy), с URL **`https://delegated-ipfs.dev/routing/v1`**

Под капака, someguy обработва заявките, като търсиng up the DHT and Network Indexer.

This endpoint can also be useful for debugging discoverability of CIDs, for example: [https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4](https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4) will show the providers for the CID `bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4`.

## Amino DHT Bootstrappers

За да се присъедини IPFS възел към Amino DHT, той трябва да открие други peers. Bootstrap възлите помагат в този процес.

IPFS Foundation предоставя няколко публични bootstrap възела, които се публикуват като TXT записи в DNS на `_dnsaddr.bootstrap.libp2p.io`:

- `/dnsaddr/sg1.bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt`
- `/dnsaddr/sv15.bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN`
- `/dnsaddr/am6.bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb`
- `/dnsaddr/ny5.bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa` ([Rust based](https://blog.ipfs.tech/2023-rust-libp2p-based-ipfs-bootstrap-node/))


> **Бележка:** Можете да попитате DNS за конкретните записи с следната команда: `dig +short TXT _dnsaddr.bootstrap.libp2p.io`

За да се увеличи устойчивостта и разнообразието на имплементациите, от 2024 г. IPFS Foundation предоставя и bootstrap възел, захранван от [js-libp2p](https://github.com/libp2p/js-libp2p-amino-dht-bootstrapper) на:

`/dnsaddr/va1.bootstrap.libp2p.io/p2p/12D3KooWKnDdG3iXw9eTFijk3EWSunZcFi54Zka4wmtqtt6rPxc8`.


## IPFS Check

[IPFS Check](https://check.ipfs.network) е диагностичен инструмент за отстраняване на проблеми при извличане по CID. Той работи, като проверява извличането от един доставчик или набор от доставчици с Bitswap и HTTP (в зависимост от поддръжката на доставчика). Поддържа два режима:

- **Single Provider Mode**: Проверява извличането от един доставчик с даден CID и multiaddress.
- **Multi Provider Mode**: Проверява извличането от набор от доставчици с даден CID. Този режим работи, като маршрутизира CIDs през DHT и IPNI, след което проверява извличането от доставчиците.

IPFS Foundation предоставя хоствана версия на IPFS Check като обществено благо и тя е достъпна на [check.ipfs.network](https://check.ipfs.network).

Backend-ът е с отворен код на [`ipfs/ipfs-check`](https://github.com/ipfs/ipfs-check) и може да се стартира self-hosted, идеално на отдалечен сървър с публичен IPv4/IPv6 адрес, за да се получи външен поглед.

## Често задавани въпроси (FAQ)

### Как се различава gateway-ът ipfs.io от другите gateways?

Gateway-ът ipfs.io е gateway, управляван от IPFS Foundation. Много други организации управляват свои собствени gateways с различни политики за ограничаване и достъп, които може да подлежат на други местни закони и регулации. [Списъкът с публични gateways е наличен тук](https://ipfs.github.io/public-gateway-checker/).

IPFS Foundation не съхранява и не хоства данните, които са видими през gateway-а ipfs.io. Вместо това gateway-ът ipfs.io позволява на потребителите да видят съдържание, хоствано от трети страни. IPFS Foundation няма никакъв контрол върху данните, които се гледат през gateway-а ipfs.io, нито IPFS Foundation има контрол върху други gateways.

### Дали gateway-ът ipfs.io е хост на данни?

Не. Gateway-ът ipfs.io е портал, който предава данни, хоствани от трети страни на възли в мрежата IPFS. Това не е хост на данни.

### Може ли уебсайтът да разчита на gateway-а ipfs.io за хостинг?

Не. Уебсайтите не трябва да разчитат на gateway-а ipfs.io за хостинг по какъвто и да е начин. Gateway-ът ipfs.io е обществен ресурс, управляван от IPFS Foundation, за да помогне на разработчиците да изграждат върху IPFS. Потребителите на gateway-а ipfs.io трябва да използват ресурсите умерено. IPFS Foundation ще забавя или блокира потребители, които злоупотребяват или използват ресурсите неуместно, включително ако разчитат на gateway-а ipfs.io за хостинг на уебсайтове или нарушават Community Code of Conduct.

### Как gateway-ът ipfs.io се справя с глобалните данни и регулации?

IPFS Foundation се съобразява със законите и регулациите на съответните юрисдикции.

Както беше обяснено по-горе, gateway-ът ipfs.io не е доставчик на уебсайт хостинг или доставчик на данни, и IPFS Foundation не може да премахне материал от Интернет, достъпен чрез gateway-а ipfs.io.

### Кой е отговорен за съдържанието, което се гледа през gateway-а ipfs.io?

Потребителите на gateway-а ipfs.io са длъжни да спазват всички приложими закони и регулации при използването му.

Gateway-ът ipfs.io не е доставчик на данни или хост на уебсайтове. Той позволява на потребителите да виждат съдържание, хоствано от трети страни, върху което IPFS Foundation няма никакъв контрол. Фактът, че определено съдържание е видимо през gateway-а ipfs.io, не означава, че то е хоствано от самия gateway или че IPFS Foundation може да го изтрие.

Както беше обяснено по-горе, gateway-ът ipfs.io не е доставчик на уебсайт хостинг или доставчик на данни, и IPFS Foundation не може да премахне материал от Интернет, достъпен чрез gateway-а ipfs.io. Ако смятате, че материалът, достъпен чрез gateway-а ipfs.io, е незаконен или нарушава авторските ви права, насърчавате се да уведомите директно този, който хоства или контролира данните.

Докато gateway-ът ipfs.io не служи като хост за данни или уебсайтове, в подходящи обстоятелства IPFS Foundation може да спре възможността да се вижда определено съдържание през gateway-а ipfs.io. Това не означава, че самите данни са премахнати от мрежата, а че съдържанието не е видимо чрез gateway-а ipfs.io. Това също няма да засегне наличността на данните чрез други gateways, управлявани от други страни.

### Може ли IPFS Foundation да премахне съдържание, видимо през gateway-а ipfs.io?

Не. Gateway-ът ipfs.io е един от многото портали, използвани за преглед на съдържание, съхранявано от трети страни в Интернет. IPFS Foundation не хоства това съдържание и не може да го премахне, но може да блокира достъпа на потребителите до него през gateway-а ipfs.io в подходящи обстоятелства.
