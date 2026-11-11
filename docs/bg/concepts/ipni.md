---
title: IPNI (InterPlanetary Network Indexer)
description: Научете за IPNI, индексиране на съдържанието и маршрутизиране в IPFS.
---

# IPNI (InterPlanetary Network Indexer)

[InterPlanetary Network Indexer (IPNI)](https://github.com/ipni), наричан още _Network Indexer_, _indexer_ и _IPNI_, позволява бързо и ефективно търсене на данни, адресирани по съдържание, налични в мрежите на InterPlanetary File System (IPFS) и Filecoin.

Чрез IPNI възлите на IPFS могат да публикуват идентификаторите на съдържанието (CIDs) на данните си в indexer, а клиентите могат да попитат indexer, за да научат къде да извлекат съдържанието, свързано с тези CIDs.
Допълнителното индексиране чрез IPNI може да се активира от:

- [Lotus](https://lotus.filecoin.io/), референтната реализация на [мрежата Filecoin](https://docs.filecoin.io/).
- [Boost](https://boost.filecoin.io/), инструмент за доставчиците на съхранение в Filecoin за управление на onboarding и извличането на данни в Filecoin.
- Самостоятелно хостван IPFS сървър с [someguy](https://github.com/ipfs/someguy) caching proxy за routing lookups към IPNI (read path).
- IPFS deployment от production клас, конфигуриран да поддържа sidecar [IPNI index-provider](https://github.com/ipni/index-provider) за публикуване към IPNI (write path).

IPNI е проектиран да създава алтернативна инфраструктура за routing и discovery извън и независимо от [Kademlia Distributed Hash Table (DHT)](../concepts/dht.md#kademlia).

:::callout
За по-задълбочен преглед на техническата спецификация за IPNI, вижте [https://github.com/ipni/specs/blob/main/IPNI.md](https://github.com/ipni/specs/blob/main/IPNI.md).
:::

## За какви случаи на употреба служи IPNI

Докато in-protocol routing и discovery са [преодолели значителни разстояния в последните версии на Kubo и Helia](https://ipshipyard.com/blog/2025-dht-provide-sweep/), при добре настроени benchmark-и на test server, които измерват десетки милиони CIDs, които могат да бъдат announce-нати в 24-часовия re-announcement window, все още съществуват случаи на употреба, при които поддържането на announcements live в DHT е тежко, или swarms, където този обем съобщения няма да бъде разпространен преди следващия re-announcement cycle.

За сравнение, announcements към IPNI indexer трябва да се правят само веднъж, което ги прави особено привлекателни за announcers с големи обеми от рядко търсени CIDs, като големи доставчици на „cold storage“ в икономиката на Filecoin или архиви на публични open data.

За да се поддържат ефективни _retrievals_ на unsealed Filecoin и IPFS pinned data със скорост, сравнима с CDN, трябва да се събере надежден, разпределен index, който да съпоставя данните с peer-овете, които ги хостват или кешират, и този index трябва да бъде репликиран, така че да е географски близо до lookups. Сравними lookup и time-to-first-byte метрики са доста трудни за постигане в DHT.

Едно предимство на пълната ортогоналност към DHT-based announcing и discovery е оперативната гъвкавост. През целия жизнен цикъл на gateway или друга data provider service може да се включат или изключат един или повече IPNI-style indexer системи, без това да засегне производителността на DHT. Обратното също е вярно: DHT announcing може да бъде спряно и възстановено независимо.
Много потребители са открили стойност в включването на IPNI индексиране за long-tail discovery, докато все още обявяват всичко ново съдържание към peers в DHT по време на публикуване, за да осигурят устойчивост и кеширане в реално време. Този смесен подход също така заобикаля сложността на re-announcing и поддържането на DHT announcements в циркулация с течение на времето за съдържание, което не се очаква да бъде кеширано и динамично разпространявано peer-to-peer през целия си lifecycle.

### Как IPNI помага на IPFS

Indexer предлага няколко предимства за IPFS, включително:

- **По-бързо извличане на данни**: Като поддържа допълнителен слой информация над DHT, indexer може да помогне за ускоряване на намирането и извличането на данни.
- **Намалена консумация на ресурси**: Indexer може да помогне за намаляване на обема на bandwidth и изчислителната мощност, изразходвана за циркулиране и re-announcing на CID location records. Това е особено полезно за възли в търговски data центрове, където peer-to-peer мрежовият трафик е скъп. За разлика от DHT announcements, които трябва да се повтарят на всеки 24 часа, IPNI announcements са необходими само веднъж.
- **Подобрен мащаб**: С indexer, IPFS може да намали частта от мрежовия трафик, използвана от publishers с голям обем, позволявайки останалата част от мрежата да се мащабира по-ефективно и да поддържа по-широки и хетерогенни мрежови топологии.

## Екосистемата на IPNI

Екосистемата на IPNI се състои от три основни участници:

1. **IPNI provider nodes** - IPFS peers, които рекламират съдържание към IPNI.
1. **IPNI nodes** - Възли, които приемат announcements за content-addressable data и обслужват lookup queries.
1. **Retrieval clients** - Peers, които намират съдържание чрез indexer nodes и го извличат от providers.

### IPNI provider nodes

_IPNI Provider nodes_ са отговорни за каталогизиране и поддържане на актуалния списък със съдържание, което хостват, както и за протоколите, по които съдържанието може да бъде извлечено. Списъкът със съдържание е представен като верига от незменяеми „advertisements“, подписани от идентичността на content provider. Всяко advertisement може да представлява добавяне или премахване на съдържание. Това свойство, комбинирано с веригата от advertisement entries, ефективно улавя „diff“ на съдържанието, хоствано от provider с течение на времето. Когато възникне промяна в съдържанието, веригата от advertisements се актуализира по следния начин:

1. Provider улавя промяната като ново advertisement.
1. Provider обявява съществуването си в мрежата.
1. IPNI node получава и съхранява advertisement.

### IPNI Nodes

_IPNI nodes_ са отговорни за непрекъснато слушане на provider announcements. След като получат _announce message_, те извличат и анализират advertisement, за да построят текущия списък със съдържание, хоствано от provider. Тъй като самите advertisements са неизменяеми, IPNI nodes могат да разпознаят известни advertisements и да анализират само тези, които не са виждали преди. Това позволява на IPNI nodes да обработват и мащабиране при много дълги ad chains, стига непрекъснато да слушат за advertisements и да следят последното състояние.

### Retrieval clients

След обработката на advertisements, _retrieval clients_ могат да търсят резултатите от индексните записи чрез query към API, изложено от IPNI nodes. При даден Content Identifier (CID) или multihash, API връща списък с индексни записи, съответстващи на него. Всеки индексен запис съдържа идентичността на content provider, неговия address и протоколите, по които данните могат да бъдат извлечени от този provider. _Retrieval client_ след това може да филтрира списъка с providers, например по протокол, и да извлече съдържанието директно от providers.

## Как IPNI се използва от IPFS

Indexer работи в съчетание с съществуващия DHT, за да подобри намирането и извличането на данни в IPFS. Той поддържа актуален индекс на съдържанието в мрежата, което е рекламирано към него, и предоставя допълнителен слой информация, която може да се използва за бързо намиране и извличане на данни.

Когато потребител търси парче данни с CID или multihash, indexer се консултира първо. Ако данните са открити в индекса, потребителят се свързва директно с възела, който хоства данните, което води до по-бързо извличане. Ако данните не са открити в индекса, потребителят преминава към традиционно DHT-based търсене, гарантирайки, че данните все още могат да бъдат открити, дори ако не са в indexer.

Чрез предоставянето на този допълнителен слой информация, indexer помага за ускоряване на локализирането и извличането на данни, намаляване на консумацията на ресурси и подобряване на общия мащаб на IPFS за случаи на употреба, при които производителността, устойчивостта или сигурността на DHT сами по себе си не са достатъчни.

### Пример: намиране на providers чрез `/routing/v1`

Повечето пъти IPFS реализации взаимодействат с IPNI, като правят query към HTTP endpoint, съвместим със [Delegated Routing V1 API Specification](https://specs.ipfs.tech/routing/http-routing-v1/).

```plaintext
$ curl https://cid.contact/routing/v1/providers/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

```json
{
  "Providers": [
    {
      "Addrs": ["/dns4/bitswap.filebase.io/tcp/443/wss"],
      "ID": "12D3KooWGtYkBAaqJMJEmywMxaCiNP7LCEFUAFiLEBASe232c2VH",
      "Protocols": ["transport-bitswap"],
      "Schema": "peer",
      "transport-bitswap": "gBI="
    },
    {
      "Addrs": ["/ip4/212.6.53.27/tcp/80/http"],
      "ID": "12D3KooWHEzPJNmo4shWendFFrxDNttYf8DW4eLC7M2JzuXHC1hE",
      "Protocols": ["transport-ipfs-gateway-http"],
      "Schema": "peer",
      "transport-ipfs-gateway-http": "oBIA"
    },
    {
      "Addrs": ["/ip4/72.52.65.166/tcp/26101"],
      "ID": "12D3KooWHKChM2uYi4EXREaCGtaxersCsp7hbFiMqMUK8o7CgV6Q",
      "Protocols": ["transport-graphsync-filecoinv1"],
      "Schema": "peer",
      "transport-graphsync-filecoinv1": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg1l4zEzA4zeGlv3N7u4iMbysxTBMRUrquyMVzQejTeh9sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q=="
    }
  ]
}
```

Всеки резултат следва [PeerSchema](https://specs.ipfs.tech/routing/http-routing-v1/#peer-schema) и е в същия формат като всеки друг delegated routing endpoint в екосистемата на IPFS. Това позволява повторно използване на клиентски код между всички съвместими routing системи.

:::callout TIP
За да започнете да получавате резултати веднага, активирайте [streaming responses](https://specs.ipfs.tech/routing/http-routing-v1/#streaming), като подадете HTTP Header `Accept: application/x-ndjson`.

```plaintext
$ curl -H 'Accept: application/x-ndjson' https://cid.contact/routing/v1/providers/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

:::

:::callout FYI
Леките IPFS клиенти може да предпочетат да попитат endpoint-a [delegated-ipfs.dev/routing/v1](https://docs.ipfs.tech/concepts/public-utilities/#delegated-routing), който е [`someguy` caching proxy](https://github.com/ipfs/someguy#readme) и за Amino DHT, и за IPNI при `cid.contact`.
:::

### Пример: намиране на providers чрез IPNI-specific `/cid` endpoint

IPNI също предоставя свои собствени HTTP API-та, които могат да бъдат предпочитани, когато е необходимо IPNI-specific информация.

За да демонстрира практическото приложение и използване на IPNI, този раздел ще премине през практически пример с indexer tool `cid.contact`. Tool-ът `cid.contact` използва IPNI, за да върне provider record information за даден CID.

1. Отворете браузър.

1. В полето за търсене въведете URL-а по-долу.

   ```plaintext
   https://cid.contact/cid/bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy
   ```

   Tool-ът използва IPNI, за да върне информация за providers за CID `bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy`.
   Показва се резултат, подобен на следния (форматиран за целите на примера):

   ```json
   {
     "MultihashResults": [
       {
         "Multihash": "EiDVNlzli2ONH3OslRv1Q0BRCKUCsERWs3RbthTVu6Xptg==",
         "ProviderResults": [
           {
             "ContextID": "AXESIAqACNwDTPpjRLuNw0rCwP4z5ge8p2p+mceS0hjDQdBl",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgjdNAYM8PDCDyhgEIJKlEGElVgqkxlecqZA+2aJrX8CdsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ",
               "Addrs": ["/ip4/195.26.70.31/tcp/24001"]
             }
           },
           {
             "ContextID": "AXESIIDDfCF2O9gTlTCW1jsS94di679rBaiNW2wYuudllV8n",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWDMJSprsuxhjJVnuQQcyibc5GxanUUxpDzHU74rhknqkU",
               "Addrs": ["/ip4/89.20.96.58/tcp/24001"]
             }
           },
           {
             "ContextID": "AXESIBD01Ud5R2aNm17hy5POqaKeNmIzfSNMhnAGzhvNCfK/",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg1bFuob1/knnbN6PTonjf6wUGeB/qc2hJb4oriOwRjTNsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWDMJSprsuxhjJVnuQQcyibc5GxanUUxpDzHU74rhknqkU",
               "Addrs": ["/ip4/89.20.96.58/tcp/24001"]
             }
           },
           {
             "ContextID": "AXESID1YhQwxum55WMSHXI6EQbtVpnhm7QwGpDPYCm5bjwbr",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg7H0Gb8ZK4LC8aijKk56XS4diZvoLv9hcDz6iiE0gJhNsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooW9yi2xLhXds9HC4x9vRN99mphq6ds8qN2YRf8zks1F32G",
               "Addrs": ["/ip4/149.5.22.10/tcp/24002"]
             }
           },
           {
             "ContextID": "AXESIMGxu6/414seq9d+YrGEwonTcCDwNzookG69eGph7cQK",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWM4wsQ3kdd8CDHiVDQthU9JZ9KqsxSdSQT2xj6TAdDth5",
               "Addrs": ["/ip4/61.38.42.252/tcp/20000"]
             }
           },
           {
             "ContextID": "AXESIPM2bykkesWamkYUx5lDVUhDSMnaZ10zi3Fk7+5TBCcC",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU",
               "Addrs": [
                 "/ip4/141.138.64.21/tcp/11337",
                 "/ip4/149.6.102.102/tcp/11337"
               ]
             }
           },
           {
             "ContextID": "AXESIO50esRu0SvbUfSGOzLTWfIff1S54seFI/PtyDuPNkzZ",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg+IcjHXCOHHUf8wNiVtnvhYTPwL5Fqnnr7GyOLZp48R5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWPNbkEgjdBNeaCGpsgCrPRETe4uBZf1ShFXStobdN18ys",
               "Addrs": ["/ip4/76.219.232.45/tcp/24001"]
             }
           },
           {
             "ContextID": "AXESIO50esRu0SvbUfSGOzLTWfIff1S54seFI/PtyDuPNkzZ",
             "Metadata": "gBI=",
             "Provider": {
               "ID": "12D3KooWSoSgVaUvoguDQZu1doytze9RgnnANwJoiLw7KUcAXq8i",
               "Addrs": ["/ip4/76.219.232.45/tcp/24888"]
             }
           },
           {
             "ContextID": "AXESIIVMIJ+VCHTZGl8Io8JebgortiwZPeGdWjG7/PMqQedI",
             "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
             "Provider": {
               "ID": "12D3KooWEkQFhSUc17MNC4gimbRYakSSCmDiQwMLhcvToh7bsXbN",
               "Addrs": ["/ip4/112.216.168.43/tcp/8999"]
             }
           },
           {
             "ContextID": "YmFndXFlZXJha3ppdzRwaWxuZmV5ZGFtNTdlZ2RxZTRxZjR4bzVuZmxqZG56emwzanV0YXJtbWltdHNqcQ==",
             "Metadata": "gBI=",
             "Provider": {
               "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
               "Addrs": ["/dns4/elastic.dag.house/tcp/443/wss"]
             }
           },
           {
             "ContextID": "YmFndXFlZXJhNWpnZWF6eXRhbWVpZnNwbmlocWk2NnFxejNlNnRzazRuM255Nmo3emxjeGFqcnh2YTNlcQ==",
             "Metadata": "gBI=",
             "Provider": {
               "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
               "Addrs": ["/dns4/elastic.dag.house/tcp/443/wss"]
             }
           },
           {
             "ContextID": "YmFndXFlZXJhd3pjeDJ1YnF6M2E0eTJ3anRoZW90bmR1NGFiZDR2NGt6dWxlNzR4dWNvNjZyMmNkeWRycQ==",
             "Metadata": "gBI=",
             "Provider": {
               "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
               "Addrs": ["/dns4/elastic.dag.house/tcp/443/wss"]
             }
           }
         ]
       }
     ]
   }
   ```

#### Обяснение на отговора

Този отговор връща множество provider records, което показва, че данните, идентифицирани от този CID, са открити в множество providers. Например, първият provider е посочен от следния запис:

```json
{
"ContextID": "AXESIAqACNwDTPpjRLuNw0rCwP4z5ge8p2p+mceS0hjDQdBl",
"Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgjdNAYM8PDCDyhgEIJKlEGElVgqkxlecqZA+2aJrX8CdsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
"Provider": {
    "ID": "12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ",
    "Addrs": [
    "/ip4/195.26.70.31/tcp/24001"
    ]
}
```

Това показва, че данните могат да бъдат:

- Намерени при provider, идентифициран от peer `ID` `12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ`.
- Извлечени според multiaddress `/ip4/195.26.70.31/tcp/24001`.

Допълнителна информация също е включена:

- Полето `Metadata` съдържа данни, които provider използва, за да локализира и достави съдържанието до клиент.
- `ContextID` се използва от IPNI за актуализиране на metadata, добавяне на multihash mappings към provider record или изтриване на provider record и multihash mappings към него.

## Glossary

### Advertisement

Запис, достъпен от publisher, който съдържа връзка към верига от multihash blocks, CID на предишното advertisement и provider-specific content metadata, към които се отнасят всички multihashes във връзката с multihash blocks. Данните на provider се идентифицират чрез ключ, наречен _context ID_.

### Announce Message

Съобщение, което информира indexers за наличието на advertisement. Обикновено се изпраща чрез _gossip pubsub_, но може да се изпраща и чрез HTTP. Announce message съдържа CID на advertisement, който обявява, което позволява на indexers да игнорират съобщението, ако вече са индексирали advertisement. Адресът на publisher е включен в съобщението, за да каже на indexers откъде да извлекат advertisement.

### Context ID

Ключ, който за provider уникално идентифицира content metadata. Това позволява content metadata да бъде актуализирана или изтрита в indexer, без да се позовава на multihashes, които я съпоставят.

### Gossip Pubsub

Комуникации publish/subscribe през libp2p gossip mesh. Това се използва от publishers за разпространение на Announce Messages до всички indexers, които са абонирани за темата, по която се изпраща съобщението. За production publishers и indexers тази тема е `/indexer/ingest/mainnet`.

### Indexer

Възлове в мрежата, които поддържат съпоставяния на multihashes и CIDs към provider records.

### Metadata

Provider-specific данни, които retrieval client получава от query към indexer и предава на provider при извличане на съдържание. Тези metadata се използват от provider, за да идентифицира и намери конкретно съдържание и да го достави чрез протокола.

### Provider

Възелът, от който съдържанието може да бъде извлечено от retrieval client. Когато multihashes се търсят в indexer, отговорите съдържат provider-и, които предоставят съдържанието, на което сочат multihashes. Provider се идентифицира от libp2p peer ID.

### Publisher

Възелът, който публикува advertisements и index data в indexer. Обикновено, но не винаги, това е същият възел като data provider. Publisher се идентифицира от libp2p peer ID.

### Retrieval Client

Възел, който прави query към indexer, за да намери къде е налично съдържанието, и извлича това съдържание от provider.

### Sync

Операция, която синхронизира съдържанието, индексирано от indexer, със съдържанието, публикувано от publisher. Sync се инициира, когато indexer получи Announce Message, чрез административна команда за sync с publisher или когато indexer не е получил актуализации за provider за известно време (по подразбиране 24 часа).
