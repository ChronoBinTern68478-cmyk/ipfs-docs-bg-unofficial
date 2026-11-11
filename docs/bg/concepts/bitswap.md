---
title: Bitswap
sidebarDepth: 0
description: Научете за Bitswap и как той се вписва в общата архитектура на IPFS, InterPlanetary File System.
---

# Bitswap

Bitswap е основен модул на IPFS за обмен на блокове от данни. Той управлява заявките и изпращането на блокове към и от други възли в мрежата. Bitswap е _протокол, базиран на съобщения_, при който всички съобщения съдържат [want-lists](#want-lists) или блокове. Bitswap има [Go имплементация](https://github.com/ipfs/boxo/tree/main/bitswap) и [JavaScript имплементация](https://github.com/ipfs/helia/tree/main/packages/bitswap).

Bitswap има две основни задачи:

- Да получава блокове, поискано от клиента, от мрежата.
- Да изпраща блокове, които притежава, на други възли, които ги искат.

## Как работи Bitswap

IPFS разделя файловете на парчета данни, наречени _блокове_. Тези блокове се идентифицират чрез [CID (Content Identifier)](../concepts/content-addressing.md).

### Want Lists

Когато възлите, работещи по протокола Bitswap, искат да извлекат файл, те изпращат `want-lists` до други възли. `want-list` е списък на CID-ове на блокове, които възелът иска да получи. Всеки възел помни кои блокове желаят неговите съседни възли. Всеки път, когато възелът получи блок, той проверява дали някой от неговите съседни възли желае този блок и ако да, го изпраща на тях.

Ето опростена версия на `want-list`:

```javascript
Want-list {
  QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy, WANT,
  QmTudJSaoKxtbEnTddJ9vh8hbN84ZLVvD5pNpUaSbxwGoa, WANT,
  ...
}
```

### Discovery

За да намери възли, които притежават файл, възел, работещ по протокола Bitswap, първо изпраща заявка, наречена _want-have_, до всички възли, с които е свързан. Тази заявка _want-have_ съдържа CID на root block-а на файла (root block-ът е най-горният в DAG на блоковете, които съставляват файла). Възлите, които притежават root block-а, изпращат отговор _have_ и се добавят към сесия. Възлите, които нямат блока, изпращат отговор _dont-have_. Bitswap създава карта, която показва кои възли имат и кои нямат всеки блок.

![Диаграма на процеса _want-have/want-block_.](./images/bitswap/diagram-of-the-want-have-want-block-process.png =740x537)

### Transfer

Bitswap изпраща _want-block_ до възлите, които притежават блока, и те отговарят с самия блок. Ако никой от възлите няма root block-а, Bitswap пита Distributed Hash Table (DHT) кой може да предостави root block-а.

### Техническа спецификация

- [Спецификации на протокола Bitswap](https://specs.ipfs.tech/bitswap-protocol/)
  - [v1.0.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-0-0)
  - [v1.1.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-1-0)
  - [v1.2.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-2-0)

### Допълнителни справки

- [Февруари 2020: Нови подобрения в IPFS Bitswap](https://blog.ipfs.tech/2020-02-14-improved-bitswap-for-container-distribution/)
- [Технически преглед на Go имплементацията на Bitswap](https://docs.google.com/presentation/d/1mbFFGIIKNvboHyLn-k26egOSWkt9nXjlNbxpmCEQfqQ/edit#slide=id.p)
- [Статия: Swapping bits and distributing hashes on the decentralized web (Textile)](https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507)
- ["About Bitswap" Go implementation poster from the IPFS developer summit in Berlin in July 2018](https://user-images.githubusercontent.com/74178/43230914-f818dab2-901e-11e8-876b-73ba6a084f76.jpg)
