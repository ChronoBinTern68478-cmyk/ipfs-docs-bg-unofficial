---
title: Идентификатори на съдържанието (CID)
description: Научете как работи адресирането по съдържание и как идентификаторите на съдържанието, или CID-овете, играят ключова роля в IPFS.
---

# Идентификатори на съдържанието (CID)

Както е описано в [IPFS и проблемите, които решава](../concepts/what-is-ipfs.md), IPFS е модулен набор от протоколи, създадени специално за организиране и прехвърляне на <VueCustomTooltip label="Начин за адресиране на данни по техния хеш, а не по местоположението им (IP адреси)." underlined multiline>данни, адресирани по съдържание</VueCustomTooltip>. В това ръководство ще научите повече за основите на адресирането по съдържание в IPFS и как IPFS използва Content Identifiers (CID) за работа с данни, адресирани по съдържание.

## Какво представлява CID?

_Идентификатор на съдържанието_, или CID, е етикет, използван за указване към материал в IPFS. Той не показва _къде_ се съхранява съдържанието, а представлява вид адрес, базиран на самото съдържание. CID-овете са кратки, независимо от размера на съдържанието, което стоят зад тях.

CID-овете се базират на [криптографския хеш](hashing.md) на съдържанието. Това означава:

- Всека промяна в съдържанието ще произведе различен CID.
- Същото съдържание, добавено към два различни IPFS възела с еднакви настройки, ще произведе _един и същ CID_.

IPFS използва хеширащия алгоритъм `sha-256` по подразбиране, но поддържа и много други алгоритми. Проектът [Multihash](https://multiformats.io/multihash/) представлява работата в тази посока, с цел да се гарантира бъдеща съвместимост при използването на хешове и да се позволи съвместното съществуване на множество хеширащи функции. (Ако се интересувате от това как се решават типовете хешове в IPFS, може да следите [тази дискусия във форума](https://discuss.ipfs.tech/t/who-decides-what-hashing-algorithms-ipfs-allows/6742).)

## Как се създават CID-овете

CID-овете съдържат хеша и codec-а на данните. CID може да бъде представен като низ или двоичен формат. По принцип CID се генерира за всеки блок по следния начин:

1. Изчислява се криптографски хеш на данните на блока.
1. Този хеш се комбинира с информация за codec-а на блока чрез <VueCustomTooltip label="Колекция от съвместими, разширяеми стандарти, които правят данните самоописващи се." underlined multiline is-medium>multiformats</VueCustomTooltip>:
   - <VueCustomTooltip label="Стандарт за разграничаване на изходите от различни добре познати хеширащи функции." underlined multiline is-medium>Multihash</VueCustomTooltip> за информация за алгоритъма, използван за хеширане на данните.
   - <VueCustomTooltip label="Стандарт за разграничаване на формата на целевите данни." underlined multiline is-medium>Multicodec</VueCustomTooltip> за информация как да се интерпретират хешираните данни след извличането им.
   - <VueCustomTooltip label="Стандарт за разграничаване на кодирането на двоични данни, базирани на кодиране (напр. base32, base36, base64, base58 и др.), появяващи се в текст." underlined multiline is-medium>Multibase</VueCustomTooltip> за информация как хешираните данни са кодиранe. Multibase се използва само в текстовото представяне на CID.

:::callout
**CID-овете няма да съвпадат с хеша на данните**
Въпреки че CID на блок от данни е конструиран чрез криптографски хеш на самия блок, CID съдържа допълнителна информация (описана по-горе), която хешът няма. За повече информация вижте [CID-овете не са файлови хешове](#cids-are-not-file-hashes) по-долу.
:::

За разбор на реален CID вижте [този пример с IPFS CID inspector](https://cid.ipfs.tech/#bafybeigrf2dwtpjkiovnigysyto3d55opf6qkdikx6d65onrqnfzwgdkfa).

## CID-овете не са файлови хешове

Хеш функциите се използват широко за проверка на цялостта на файловете. Тъй като IPFS разделя съдържанието на блокове и ги проверява чрез [ориентирани ациклични графи (DAG)](../concepts/merkle-dag.md), SHA хешовете на файловете няма да съвпадат с CID-овете. Ето пример какво се случва, ако се опитате да направите това.

Доставчик на изтегляния може да публикува резултата от хешираща функция за файл, често наричан _checksum_. Checksum позволява на потребителите да проверят, че файлът не е бил променян след публикуването му. Тази проверка се извършва, като се изпълни същата хешираща функция върху изтегления файл, която е била използвана за генериране на checksum-а. Ако този checksum, който потребителят получава от изтегления файл, точно съвпада с checksum-а на уебсайта, тогава потребителят знае, че файлът не е бил променян и може да се вярва на него.

Например, когато изтеглите образен файл за [Ubuntu Linux](https://ubuntu.com/), може да видите следния `SHA-256` checksum на сайта на Ubuntu, посочен за проверка:

```
0xB45165ED3CD437B9FFAD02A2AAD22A4DDC69162470E2622982889CE5826F6E3D ubuntu-20.04.1-desktop-amd64.iso
```

След изтегляне на образа на Ubuntu можете да проверите целостта на файла, като хеширате файла, за да сте сигурни, че checksum-овете съвпадат:

```shell
echo "b45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: OK
```

Ако добавим файла `ubuntu-20.04.1-desktop-amd64.iso` към IPFS, получаваме хеш като изход:

```shell
ipfs add ubuntu-20.04.1-desktop-amd64.iso

added QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB ubuntu-20.04.1-desktop-amd64.iso
 2.59 GiB / 2.59 GiB [==========================================================================================] 100.00%
```

Низът `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB`, върнат от командата `ipfs add`, е идентификаторът на съдържанието (CID) на файла `ubuntu-20.04.1-desktop-amd64.iso`. Можем да използваме [CID Inspector](https://cid.ipfs.tech/) за да видим какво включва CID. Истинският хеш е посочен под `DIGEST (HEX)`:

```
NAME: sha2-256
BITS: 256
DIGEST (HEX): 0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E
```

::: tip
Имената на хеширащите функции не се използват последователно. `SHA-2`, `SHA-256` или `SHA-256 bit` всичките се отнасят за една и съща хешираща функция.
:::

Сега можем да проверим дали хешът, съдържащ се в CID-а, съвпада с checksum-а за файла:

```shell
echo "0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: FAILED
shasum: WARNING: 1 computed checksum did NOT match
```

Както виждаме, хешът, включен в CID-а, НЕ съвпада с хеша на входния файл `ubuntu-20.04.1-desktop-amd64.iso`.

### Защо хешовете се различават

Примерът по-горе показва, че [Multihash](glossary.md#multihash) вътре в CID не съвпада с обикновен checksum на файл. Това е така, защото Multihash е хешът на [root block](glossary.md#root), а не директен хеш на байтовете на файла.

Когато добавите файл към IPFS, данните преминават през няколко трансформации:

1. **Chunking**: Големите файлове се разделят на по-малки [блокове](glossary.md#block) (обикновено по 256KiB-1MiB всеки)
2. **Structuring**: Тези блокове се организират в [DAG](glossary.md#dag) (ориентиран ацикличен граф)
3. **Encoding**: [Codec](glossary.md#codec) обгръща данните с метаданни, описващи структурата им

Root block съдържа връзки към всички останали блокове и именно този block се хешира, за да сътвори Multihash в CID.

#### Кога хешът на CID съвпада с хеша на файла

Има един случай, в който Multihash съвпада с хеша на файла: когато CID използва `raw` [codec](glossary.md#codec) и файлът се побира в един блок. `raw` codec съхранява байтовете без обвивка, така че за малки файлове, добавени с `--raw-leaves`, Multihash е директен хеш на съдържанието на файла.

#### Един и същ файл, различни CID-ове

Два идентични файла могат да произведат различни CID-ове. CID зависи както от съдържанието, така и от начина, по който е структурирано:

- **Размер на частите**: Различните стратегии за chunking създават различни дървета от блокове
- **DAG layout**: Балансирани дървета срещу trickle DAGs организират блоковете по различен начин
- **Codec**: [UnixFS](glossary.md#unixfs) ([dag-pb](glossary.md#dag-pb)), [dag-cbor](glossary.md#dag-cbor), `raw` и други кодират данните по различен начин
- **CID версия**: [CIDv0](glossary.md#cid-v0) срещу [CIDv1](glossary.md#cid-v1) използват различни формати
- **Хеширащ алгоритъм**: sha2-256, blake3 и други произвеждат различни хешове

#### Защо тази гъвкавост е важна

Това е функция, а не ограничение. Различните структури са оптимизирани за различни случаи на употреба:
- **DAG layout** trades off seeking against appending: balanced DAGs enable fast random access in large files like videos, trickle DAGs optimize for sequential, append-only data like logs
- **Chunking strategy** balances retrieval overhead against sync efficiency: large chunks mean fewer blocks for bulk downloads, small chunks mean less data to transfer when syncing deltas. Strategies range from simple fixed-size chunking to content-defined algorithms like Rabin or Buzhash that fine-tune deduplication based on dataset characteristics
- **Hash function** varies by system: legacy decisions, regulatory requirements, or interoperability needs may dictate which algorithm to use
- **Directory sharding** threshold, in systems like [UnixFS](glossary.md#unixfs), determines when directories switch from flat listings to [HAMT](glossary.md#hamt-sharding) to seamlessly support huge directories with millions of files. This threshold also affects how much of the DAG needs to be recreated when a single file in the directory is modified

[UnixFS](glossary.md#unixfs) is the default format for files and directories, but you can use other codecs or create custom ones for specialized needs.

When you need reproducible CIDs across different tools, the community documents common parameter sets called [CID profiles](https://github.com/ipfs/specs/pull/499). These define standard combinations of chunking, DAG layout, and codec settings.

To explore how a CID is structured, use the [CID Inspector](https://cid.ipfs.tech/#bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4). To see the DAG behind a CID, use the [DAG Explorer](https://explore.ipld.io/#/explore/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4).


## CID versions

CIDs can take a few different forms with different encoding bases or CID versions. Many of the existing IPFS tools still generate v0 CIDs, although the `files` ([Mutable File System](file-systems.md#mutable-file-system-mfs)) and `object` operations now use CIDv1 by default.

### Version 0 (v0)

When IPFS was first designed, we used base 58-encoded multihashes as the content identifiers. This is simpler but much less flexible than newer CIDs. CIDv0 is still used by default for many IPFS operations, so you should generally support v0.

If a CID is 46 characters starting with "Qm", it's a CIDv0 (for more details, check the [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) in the CID specification).

### Version 1 (v1)

CID v1 contains some leading identifiers that clarify exactly which representation is used, along with the content-hash itself. These include:

- A [multibase](https://github.com/multiformats/multibase) prefix, specifying the encoding used for the remainder of the CID
- A CID version identifier, which indicates which version of CID this is
- A [multicodec](https://github.com/multiformats/multicodec) identifier, indicating the format of the target content — it helps people and software to know how to interpret that content after the content is fetched

These leading identifiers also provide forward-compatibility, supporting different formats to be used in future versions of CID.

You can use the first few bytes of the CID to interpret the remainder of the content address and know how to decode the content after being fetched from IPFS. For more details, check out the [CID specification](https://github.com/ipld/cid). It includes a [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) and links to existing software implementations for decoding CIDs.

If you can't decide between CIDv0 and CIDv1, consider choosing CIDv1 for your new project and opt in by passing a version flag (`ipfs add --cid-version 1`). This is more future-proof and [safe for use in browser contexts](../how-to/address-ipfs-on-web.md#subdomain-gateway).

The IPFS project will switch to CIDv1 as the new default in the near future.


## CID Inspector

It's easy to explore a CID for yourself. Want to pull apart a specific CID's multibase, multicodec, or multihash info? You can use the [CID Inspector](https://cid.ipfs.tech/#QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) or the [CID Info panel in IPLD Explorer](https://explore.ipld.io/#/explore/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) (both links launch using a sample CID) for an interactive breakdown of differently-formatted CIDs.

Check out ProtoSchool's [Anatomy of a CID](https://proto.school/anatomy-of-a-cid) tutorial to see how a single file can be represented in multiple CID versions.

## CID conversion

Converting a CID from v0 to v1 enables it to be represented in multibase encodings.
The default for CIDv1 is the case-insensitive `base32`, but use of the shorter `base36` is encouraged for IPNS names to ensure same text representation on [subdomains](../how-to/address-ipfs-on-web.md#subdomain-gateway).

### v0 to v1

The built-in `ipfs cid format` command can be used from the command line:

```
$ ipfs cid format -v 1 -b base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

JavaScript users can also leverage the `toV1()` method provided by the [`multiformats`](https://www.npmjs.com/package/multiformats) library:

```js
const v0 = CID.parse('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n')
v0.toString()
//> 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
v0.toV1().toString()
//> 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku'
```

### v1 to v0

Conversion from CIDv1 to CIDv0 is only possible when the CIDv1 uses the `dag-pb` codec (0x70), as CIDv0 only supports `dag-pb`. CIDs using other codecs like `raw` (0x55), `dag-cbor` (0x71), or `dag-json` (0x0129) cannot be converted to CIDv0.

The built-in `ipfs cid format` command can be used to convert `dag-pb` from CIDv1 to CIDv0 from the command line:

```
$ ipfs cid format -v 0 bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

Note: The above example works because `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi` uses the `dag-pb` codec. Attempting to convert a CIDv1 with a different codec will result in an error.

Given a CID v1, JS users can convert back to v0 using the `toV0()` method provided by the [`multiformats`](https://www.npmjs.com/package/multiformats) library:

```js
const v1 = CID.parse('bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku')
v1.toString()
//> 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku'
v1.toV0().toString()
//> 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::

### Converting between CID base encodings

A CID can be encoded using any of the encodings specified in the [multibase table](https://github.com/multiformats/multibase#multibase-table). The use of different encodings can impact speed and storage efficiency.

To convert a CIDv1 `cidV1` from one encoding to another, use the `toString()` method. By default, `toString()` will return the `base32` string representation of the CID, but you can use other string representations:

```js
const cidV1StringBase32 = cidV1.toString();
```

The following example returns the base256 emoji encoding of the CID:
```js
const cidV1StringBase256 = cidV1.toString(base256emoji);
```

Using `.bytes`, the following example returns the raw bytes of the CID:

```js
const cidV1Bytes = cidV1.bytes
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::


### CID to hex

Sometimes, a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) representation of raw bytes is preferred for debug purposes.
To get the hex for raw `.bytes` of a CIDv1 `cidV1`, use `base16` encoding:

```js
const cidV1StringBase256 = cidV1.toString(base16);
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::

::: tip
[Subdomain gateways](../how-to/address-ipfs-on-web.md#subdomain-gateway) convert paths with custom bases like base16 to base32 or base36, in an effort to fit a CID in a DNS label:
- [dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a](https://dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a)
  returns a HTTP 301 redirect:
  → [bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link](https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link/)
:::


### CodeSandbox: Converting between CID versions and encodings

For a hand-on, interactive application that converts between CID versions and encodings, use the CodeSandbox below.

<iframe src="https://codesandbox.io/embed/converting-between-cid-versions-xrvqop?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Converting between CID versions"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Further resources

Check out these links for more information on CIDs and how they work:

- [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
- [Files and IPFS Companion](https://www.youtube.com/watch?v=OCv5PvLnk-Y)
- [ResNetLab on Tour](https://research.protocol.ai/tutorials/resnetlab-on-tour/content-addressing/)
