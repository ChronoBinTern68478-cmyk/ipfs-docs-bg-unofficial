---
title: Публикуване на геопространствени Zarr данни с IPFS
description: Научете как да публикувате геопространствени набори от данни с помощта на IPFS и Zarr за децентрализирано разпространение, целостност на данните и отворен достъп.
---

# Публикуване на геопространствени Zarr данни с IPFS

В това ръководство ще научите как да публикувате публични геопространствени набори от данни с помощта на IPFS, с фокус върху формата [Zarr](https://zarr.dev/). Ще научите как да използвате децентрализирано разпространение с IPFS за по-добро сътрудничество, цялост на данните и отворен достъп.

Имайте предвид, че въпреки че това ръководство се фокусира върху Zarr, то е приложимо и за други набори от данни.

В края на това ръководство ще публикувате Zarr набор от данни в мрежата IPFS по начин, който е извличаем директно в [Xarray](https://xarray.dev/).

Ако се интересувате от реален пример, следващ моделите в това ръководство, вижте [ORCESTRA Campaign case study](../../case-studies/orcestra.md).

- [Защо IPFS за геопространствени данни?](#why-ipfs-for-geospatial-data)
- [Предпоставки](#prerequisites)
- [Стъпка 1: Подгответе вашия Zarr набор от данни](#step-1-prepare-your-zarr-data-set)
- [Стъпка 2: Добавете набора от данни към IPFS](#step-2-add-your-data-set-to-ipfs)
- [Стъпка 3: Организиране на данните](#step-3-organizing-your-data)
- [Стъпка 4: Проверете статуса на providing](#step-4-verify-providing-status)
- [Стъпка 5: Откриване на съдържание](#step-5-content-discovery)
  - [Вариант A: Споделете CID директно](#option-a-share-the-cid-directly)
  - [Вариант B: Използвайте IPNS за актуализируеми препратки](#option-b-use-ipns-for-updatable-references)
  - [Вариант C: Използвайте DNSLink за четими URL адреси](#option-c-use-dnslink-for-human-readable-urls)
- [Достъп до публикуваните данни](#accessing-published-data)
- [Избор на подход](#choosing-your-approach)
- [Референции](#reference)

## Защо IPFS за геопространствени данни?

Геопространствените набори от данни, като метеорологични наблюдения, сателитни изображения и показания от сензори, обикновено се съхраняват като многомерни масиви, наричани също тензори.

Тъй като тези набори от данни стават по-големи и по-разпределени, традиционните формати като NetCDF и HDF5 показват ограниченията си: метаданните, смесени с данни, изискват големи последователни четения, преди да получите данните, от които се нуждаете.

**[Zarr](https://zarr.dev/)** е модерен формат, който адресира тези ограничения и е оптимизиран за мрежово и разпределено съхранение, характеризиращо се с висока пропускателна способност и висока латентност. Zarr допълва популярния [Xarray](https://xarray.dev/), който предоставя структурите от данни и операциите за анализ на наборите от данни.

Някои от ключовите свойства на Zarr включват:

- **Разделени метаданни**: Каталогът/индексът на данните ви позволява да разберете структурата на набора от данни, преди да извлечете каквито и да са данни.
- **Chunked by default**: Масивите са разделени на малки chunk-ове, позволявайки да изтеглите само частта, от която се нуждаете.
- **Consolidated metadata**: Всички метаданни в един файл `zarr.json` ускоряват четенията за многомасивни набори от данни.

> **Забележка:** За по-подробно обяснение на основните принципи и мотивация за Zarr, вижте [този блог пост](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/), от един от сътрудниците на Zarr.

:::callout
Това ръководство използва Zarr v3 конвенции. Zarr v2 работи по същия начин с IPFS, но използва различни файлове с метаданни (`.zmetadata`, `.zarray`, `.zattrs`, `.zgroup`) вместо `zarr.json`. Флагът `--hidden` в командата `ipfs add` гарантира, че тези файлове са включени. Вижте [ръководството за миграция от Zarr v2 към v3](https://zarr.readthedocs.io/en/stable/user-guide/v3_migration.html) за повече подробности.
:::

**IPFS** допълва Zarr с децентрализирано разпространение:

- **Content addressing**: Данните се идентифицират по това, какво съдържат, използвайки CIDs, а не къде са съхранени.
- **Вградена цялост**: Криптографските хешове проверяват, че данните не са повредени или манипулирани.
- **Сътрудническо споделяне**: Всеки може да помогне за разпространението на наборите от данни, които е изтеглил.
- **Отворен достъп**: Няма vendor lock-in или централизирана инфраструктура.

Тази комбинация се оказва ефективна в реални кампании като [ORCESTRA](https://orcestra-campaign.org/orcestra.html), където учени са сътрудничили с ограничен интернет достъп в полето, докато споделят данни глобално.

## Предпоставки

Преди да започнете, уверете се, че имате:

- Готов Zarr набор от данни за публикуване
- Основни познания за командния ред
- Инсталиран [Kubo](../../install/command-line.md) или [IPFS Desktop](../../install/ipfs-desktop.md) на машина.

:::callout
Вижте [ръководството за NAT и port forwarding](../nat-configuration.md) за повече информация как да конфигурирате port forwarding, така че вашият IPFS възел да бъде публично достъпен, позволявайки надеждно извличане на данни от други възли.

За да проверите дали вашият Kubo е публично достъпен, можете да използвате командата `ipfs swarm addrs autonat`.
:::

## Стъпка 1: Подгответе вашия Zarr набор от данни

Когато подготвяте Zarr набор от данни за IPFS, целете приблизително 1 MiB chunks, за да се съчетаят с максималния block size на IPFS от 1 MiB. Въпреки че това не е строгo изискване, използването на по-големи Zarr chunks ще накара IPFS да ги раздели на множество blocks, което може да увеличи латентността при извличане.

За да изчислите dimensions на chunk-овете за целеви размер в байтове, работете обратно от вашия datatype:

```python
import xarray as xr

ds = xr.open_dataset(filename)
# Пример: целеви ~1 MB chunks с float32 данни
ds.to_zarr('output.zarr', encoding={
    'var_name': {'chunks': (1, 512, 512)}
})

# Общ размер: 1 × 512 × 512 × 4 байта (float32) = 1048576 байта = 1 MiB per chunk
```

:::callout
Chunking в Zarr е деликатна тема, надхвърляща обхвата на това ръководство. За повече информация за оптимизирането на размерите на chunk-овете, вижте:

- [Zarr performance guide](https://zarr.readthedocs.io/en/stable/user-guide/performance/)
- [Chunks and chunkability](https://element84.com/software-engineering/chunks-and-chunkability-tyranny-of-the-chunk/)
- [Zarr chunking introduction](https://eopf-toolkit.github.io/eopf-101/03_about_chunking/31_zarr_chunking_intro.html)
- [Cloud optimization practices](https://esipfed.github.io/cloud-computing-cluster/optimization-practices.html)

:::

## Стъпка 2: Добавете набора от данни към IPFS

Първо приложете [unixfs-v1-2025 UnixFS profile](https://github.com/ipfs/specs/pull/499), който конфигурира оптимални default стойности за content-addressed data (CIDv1, raw leaves и 1 MiB chunking):

```bash
ipfs config profile apply unixfs-v1-2025
```

След това добавете вашата Zarr папка към IPFS с помощта на командата `ipfs add`:

```bash
ipfs add --recursive \
        --hidden \
        --pin-name="halo-measurements-2026-01-23" \
        --quieter \
        ./my-dataset.zarr
```

Тази команда:

1. **Merkleizes** папката: превръща файловете и директориите в content-addressed blocks с UnixFS.
2. **Pins** данните локално: предотвратява garbage collection да ги премахне.
3. **Provides** към мрежата IPFS, че вашият възел има тези данни.
4. **Извежда root CID**: идентификаторът на целия набор от данни.

Флагът `--quieter` извежда само root CID, който идентифицира целия набор от данни.

> **Забележка:** Вижте [lifecycle of data in IPFS](../../concepts/lifecycle.md), за да научите повече за това как merkleizing, pinning и providing работят отдолу.

## Стъпка 3: Организиране на данните

Две опции помагат за управлението на множество набори от данни на вашия възел:

- **Named pins** — key/value store, където ключът е име, което избирате, а стойността е CID. Полезно е за етикетиране на отделни набори от данни без допълнителна папъчна структура.
- **MFS (Mutable File System)** — mutable file and directory hierarchy, която можете свободно да организирате, подобно на локална файлова система, базирана върху immutable content-addressed data.

### **Named pins**

Флагът `--pin-name` прикрепя human-readable етикет към pin по време на добавяне на данни. Това улеснява идентифицирането на наборите от данни при изписване на pins, без да се запомнят суровите CIDs.

```bash
# Pin a dataset and give it a descriptive name
ipfs add --recursive --pin-name="sst-global-2024-q1" ./zarr-store/sst/
```

Избройте pin-овете, за да видите етикета заедно с CID:

```bash
ipfs pin ls --type=recursive --names
# bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4 recursive sst-global-2024-q1
```

Можете също да добавите pin name retroactively:

```bash
ipfs pin add --pin-name="precipitation-monthly-2024" bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve
```

Named pins са локални метаданни — съществуват само на вашия възел и не влияят на CID или как другите виждат данните в мрежата.

### **MFS (Mutable File System)**

[MFS (Mutable File System)](../../concepts/file-systems.md#mutable-file-system-mfs): MFS ви дава интерфейс за организиране на content-addressed data под позната файлово-система структура с папки и имена, където root на MFS е CID, който се променя всеки път, когато промените нещо в дървото на MFS.

По подразбиране Kubo има един MFS root, който можете да използвате за организиране на всички данни. MFS root е mutable, но съдържанието, към което сочи, е immutable. Когато добавите файл или директория към MFS, се създава нов CID за актуализираното дърво, но оригиналното съдържание остава непроменено и достъпно чрез своя оригинален CID.

Най-простият начин да добавите съдържание към MFS е да подадете флага `--to-files` при добавяне на съдържание към IPFS. Това добавя съдържанието към IPFS и същевременно създава път в MFS, сочещ към CID на добавеното съдържание:

```bash
ipfs add --recursive ./halo-measurements-2026-01-23 --to-files=/datasets/halo/2026-01-23
```

Можете също да съберете комбиниран набор от данни от множество източници, включително набори, вече публикувани от други сътрудници, без да изтегляте цялото съдържание (обикновено е достатъчно само root block, много под 2 MiB). Например, нека предположим, че два HALO flight dataset-а вече са в мрежата IPFS и искате да ги групирате с трети dataset, който добавяте локално:

```bash
# Забележете, че тези CIDs са само за демонстрационни цели и не съответстват на реални набори от данни в мрежата.
#   2026-01-21 flight → bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4
#   2026-01-22 flight → bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve

# Добавете новия локален flight dataset, поставяйки го директно в MFS
ipfs add --recursive ./halo-measurements-2026-01-23 --to-files=/datasets/halo/2026-01-23
# added bafybeiheegb3h5s4v4igmxqivp4mq5gvp4zyv6lc3nmjjifgybqovzh4ji  halo-measurements-2026-01-23

# Свържете двата remote dataset-а в същата MFS директория —
# remote данните остават в мрежата, без локално изтегляне
ipfs files cp /ipfs/bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4 /datasets/halo/2026-01-21
ipfs files cp /ipfs/bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve /datasets/halo/2026-01-22

# Всяка мутация създава нов root CID — лека versioned snapshot
ipfs files stat --hash /datasets/halo
# bafybeihqixf5ew7mfr74bzb74qiw2mgtnytabnpzjnf5xeejzq4p2ocygu

# За да видите съдържанието на комбинирания набор от данни:
ipfs files ls -l /datasets/halo
# 2026-01-21/  bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4  0
# 2026-01-22/  bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve  0
# 2026-01-23/  bafybeiheegb3h5s4v4igmxqivp4mq5gvp4zyv6lc3nmjjifgybqovzh4ji  0
```

`bafybeihqixf5ew7mfr74bzb74qiw2mgtnytabnpzjnf5xeejzq4p2ocygu` е нов CID, представляващ комбинирания набор от данни, съдържащ всички три HALO flight dataset-а. Оригиналните CIDs се препращат, а не се копират, така че данните не се дублират.

## Стъпка 4: Проверете статуса на providing

След добавяне, Kubo непрекъснато обявява вашето съдържание в мрежата. Проверете статуса:

```bash
ipfs provide stat
```

За подробна диагностика вижте [provide system documentation](https://github.com/ipfs/kubo/blob/master/docs/provide-stats.md).

## Стъпка 5: Откриване на съдържание

Сега, когато данните са налични в публичната мрежа, следващата стъпка е да ги направите откриваеми за други. Изберете подход за споделяне според вашите нужди:

### Вариант A: Споделете CID директно

За еднократно споделяне, предоставете CID директно:

```
ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm
```

### Вариант B: Използвайте IPNS за актуализируеми препратки

Ако искате да споделите стабилен идентификатор, но да можете да актуализирате основния набор от данни, създайте [IPNS](https://docs.ipfs.tech/concepts/ipns/) идентификатор и споделете него вместо това. Това е полезно за набори от данни, които се актуализират редовно — потребителите могат да запазят IPNS името и винаги да извличат най-новата версия.

```bash
# Публикувайте набора от данни под IPNS ключа на вашия възел
ipfs name publish /ipfs/<your-dataset-cid>

# Актуализирайте по-късно до нова версия
ipfs name publish /ipfs/<new-dataset-cid>
```

IPNS се поддържа от всички методи за извличане в раздела [Достъп до публикуваните данни](#accessing-published-data) по-долу. Имайте предвид, че разрешаването на IPNS добавя латентност към процеса на извличане.

### Вариант C: Използвайте DNSLink за human-readable URL адреси

Свържете DNS име с вашия CID, като добавите TXT record:

```
_dnslink.data.example.org  TXT  "dnslink=/ipfs/<cid>"
```

Актуализирането на DNSLink record може да се извърши всеки път, когато публикувате нова версия, позволявайки ви да поддържате human-readable URL, който винаги сочи към най-новия набор от данни. Това е идеално за набори от данни, които се актуализират често и имат нужда от стабилен, лесен за използване URL.

За актуализиране на DNSLink record можете да използвате инструменти като [OctoDNS](https://github.com/octodns/octodns) или [DNSControl](https://dnscontrol.org/), които работят с много DNS доставчици и могат да бъдат интегрирани в CI/CD pipeline-и за автоматизирани актуализации, когато публикувате нови данни. Друга опция, ако използвате GitHub Actions, е да използвате [DNSLink Action](https://github.com/ipshipyard/dnslink-action).

За достъп до данни, свързани с DNSLink, можете да използвате един от следните методи:

- С IPFS gateway: `https://inbrowser.link/ipns/data.example.org`
- С Kubo: `ipfs cat /ipns/data.example.org/zarr.json`
- Използвайки ipfsspec в Python, както е описано по-долу в [Python with ipfsspec](#python-with-ipfsspec), което също поддържа IPNS имена, така че можете да използвате `ipns://data.example.org/zarr.json` директно.

> **Забележка:** схемата `ipns://` може да изглежда подвеждаща, защото се използва и за IPNS, и за DNSLink имена. Причината е, че и двете са mutable.

## Достъп до публикуваните данни

След публикуване потребителите могат да получат достъп до вашите Zarr набори от данни чрез няколко метода:

### IPFS HTTP gateways

Вижте [ръководството за извличане](../../quickstart/retrieve.md).

### Python with ipfsspec

[ipfsspec](https://pypi.org/project/ipfsspec/) въвежда verified IPFS retrieval в Python екосистемата, като имплементира интерфейса [fsspec](https://github.com/fsspec/filesystem_spec), същата абстракция, която се използва от xarray, pandas, Dask и Zarr за достъп до remote данни.

```python
import xarray as xr

# след инсталирането на ipfsspec, `ipfs://` urls се разпознават автоматично

ds = xr.open_dataset(
    "ipfs://bafybeiesyutuduzqwvu4ydn7ktihjljicywxeth6wtgd5zi4ynxzqngx4m",
    engine="zarr"
)
```

### JavaScript with Verified Fetch

```javascript
import { verifiedFetch } from '@helia/verified-fetch'

const response = await verifiedFetch('ipfs://<cid>/zarr.json')
```

## Избор на подход

Помислете за тези фактори, когато планирате стратегията си за публикуване:

| Factor              | Considerations                               |
| ------------------- | -------------------------------------------- |
| **Publishers**      | Single node or multiple providers?           |
| **Dataset size**    | How large are individual datasets?           |
| **Growth rate**     | How frequently do you add new data?          |
| **Content routing** | Public DHT, private DHT, or central indexer? |

За повечето геопространствени случаи, започнете с един Kubo възел, публикуващ в публичния Amino DHT. Преминете към множество провайдери или частна инфраструктура, когато нуждите ви растат.

## Референции

- [Kubo documentation](https://docs.ipfs.tech/install/command-line/)
- [Kubo configuration options](https://github.com/ipfs/kubo/blob/master/docs/config.md)
- [ipfsspec for Python](https://github.com/fsspec/ipfsspec/)
- [Cloud-Optimized Scientific Data (Zarr deep-dive)](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/)
