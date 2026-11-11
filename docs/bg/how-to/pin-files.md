---
title: Закрепване на файлове
description: Научете как да pin-вате файлове в IPFS, за да запазвате файловете и други обекти локално.
---

# Използване на IPFS за pin-ване на файлове

Pin-ването е много важна концепция в IPFS. Семантиката на IPFS се опитва да направи усещането, че всеки един обект е локален — няма „изтегли този файл за мен от отдалечен сървър“, а просто `ipfs cat` или `ipfs get`, които действат по един и същ начин независимо къде се намира реалният обект.

Въпреки че това е приятно, понякога искате да имате контрол върху това какво запазвате. **Pin-ване** е механизъм, който ви позволява да кажете на IPFS да съхранява винаги даден обект някъде — по подразбиране на локалния ви възел, въпреки че това може да е различно, ако използвате [remote pinning service](work-with-pinning-services.md). IPFS има доста агресивен кеш механизъм, който ще запази обект локално за кратко време след всяка IPFS операция върху него, но тези обекти могат да бъдат garbage-collected редовно. За да предотвратите това, просто pin-нете CID, който ви е важен, или го добавете към [MFS](../concepts/file-systems.md#mutable-file-system-mfs). Обектите, добавени чрез `ipfs add`, са recursively pin-нати по подразбиране. Нещата в MFS не са pin-нати по подразбиране, но са защитени от garbage collection, така че може да се мисли за MFS като механизъм за имплицитно pin-ване.

Нека разгледаме този пример, за да проучим pin-ването към локалния IPFS възел по-подробно:

1. Първо създайте файл `foo` със съдържание `ipfs rocks`:

   ```shell
   echo "ipfs rocks" > foo
   ```

   Командата `echo` не дава изход, когато се използва _output redirection_ `>`.

1. След това добавете `foo` към IPFS с команда `ipfs add`:

   ```shell
   ipfs add foo

   > added QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy foo
   ```

1. След това генерирайте списък на всички обекти, които сте pin-нали в локалното хранилище.

   ```shell
   ipfs pin ls --type=all

   > QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
   > QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy recursive
   > QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
   > ...
   ```

   Командата `pin ls` ще изброи всички обекти, които са pin-нати в локалното хранилище; `--type=all` означава, че ще изброи всички видове pins (recursive, indirect и т.н.).

1. След това използвайте командата `pin rm <foo hash>`, за да unpin-нете целевия обект.

   ```shell
   ipfs pin rm <foo hash>

   > unpinned QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
   ```

   Това ще премахне обекта с hash `foo` от pin-натите елементи.

1. След това опитайте да изпълните същата команда, както в предишната стъпка.

   ```shell
   ipfs pin rm <foo hash>

   > Error: not pinned or pinned indirectly
   ```

   Опитът да се изпълни `ipfs pin rm <foo hash>` отново тук ще върне грешка, защото предишната стъпка вече е премахнала pin-а от `<foo hash>`.

1. След това генерирайте нов списък на всички pin-нати обекти.

   ```shell
   ipfs pin ls --type=all

   > QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
   > QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
   > ...
   ```

   Забелязвате, че този списък е същият като предишния, с изключение на това, че `<foo hash>` вече не е изброен.

## Три вида pins

Както вероятно сте забелязали в примера по-горе, първата команда `ipfs pin rm` не работи — тя трябваше да ви предупреди, че даденият hash е _pinned recursively_. Какво означава това? Има три типа pins в света на IPFS:

- **Direct pins**, които pin-ват само един блок и никакви други обекти в отношения с него.
- **Recursive pins**, които pin-ват даден блок и всичките му деца.
- **Indirect pins**, които са резултат от родителят на даден блок да бъде pin-нат recursive.

Пин-нат обект не може да бъде garbage-collected — проверете това:

1. Първо добавете `foo` към IPFS.

   ```bash
   ipfs add foo

   > added QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy foo
   > 11 B / 11 B [===================] 100.00%
   ```

   Това ще добави файла `foo` в IPFS.

1. След това използвайте командата `repo gc`, за да извършите garbage collection на хранилището.

   ```bash
   ipfs repo gc

   > removed QmVoSaWpZYicoLSAcdwxDPt2Gk4WVFCfBFTBtwwY2ASD9P
   > removed QmcpK3cSDyPGiNriMZrZTNu8YCPBSiMAApuvMqXaJVyuWr
   > removed QmdpczDhBmrkxerCUWkEcRExcTHFcA4EcDCeYNdXcV5iqE
   > ...
   ```

   Командата `repo gc` ще премахне всички unpinned обекти от IPFS.

1. След това използвайте командата `cat <foo hash>`, за да покажете съдържанието на `foo`.

   ```bash
   ipfs cat <foo hash>

   > ipfs rocks
   ```

   Командата ще върне `ipfs rocks`, тъй като `<foo hash>` е pin-нат, следователно не може да бъде премахнат.

Но ако `foo` по някаква причина стане unpinned ...

1. Използвайте командата `pin rm`, за да unpin-нете `<foo hash>`.

   ```bash
   ipfs pin rm <foo hash>

   > unpinned QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
   ```

   Това ще unpin-не `foo`.

1. Сега изпълнете garbage collection командата отново.

   ```bash
   ipfs repo gc

   > removed QmPPjksRv8SqiibAy6bSAXBnnfcBf3QnTnApxWjcFUTTkZ
   > removed QmS3wrDNoaRtRi84K7Hf8jzh5sBZcwrQFj7CZLmmmacS2U
   > removed QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
   ```

   Както преди, това ще премахне всички unpinned обекти от IPFS.

1. Накрая изпълнете `cat <foo hash>` отново, за да видите дали връща съдържанието на `foo`.

   ```bash
   ipfs cat <foo hash>

   > ipfs rocks
   ```

   Забелязвате, че все още връща правилния отговор; това е, защото въпреки че `<foo hash>` беше премахнат от локалното хранилище, данните все още съществуват в IPFS.

## Локално срещу remote pinning

Всичката информация по-горе предполага, че pin-вате елементи локално — тоест към локалния си IPFS възел. Това е стандартното поведение за IPFS, но е възможно също да pin-вате файловете си към _remote pinning service_. Тези трети страни предоставят възможност да pin-вате файлове не към собствения ви локален възел, а към възли, които те управляват. Не се налага да се притеснявате за наличното дисково пространство или време на работа на собствения си възел.

Въпреки че можете да използвате собствен GUI, CLI или други dev инструменти на remote pinning service за управление на IPFS файлове, pin-нати към тяхната услуга, можете също така да работите директно с pinning services чрез вашата локална IPFS инсталация — което означава, че не е нужно да учите уникалния API или други инструменти на конкретна pinning услуга.

- [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) предлага спецификация, която позволява на разработчиците да интегрират всяка pinning услуга, която поддържа спецификацията, или да създадат своя собствена. Благодарение на формата OpenAPI, и клиенти, и сървъри могат да бъдат [генерирани](https://github.com/ipfs/pinning-services-api-spec#code-generation) от YAML спецификацията.

- Ако използвате Kubo 0.8+ от командния ред, имате достъп до `ipfs pin remote` команди, които действат като клиент за взаимодействие с API на pinning услуги. Добавете любимата си pinning услуга/и, pin-нете CIDs под човешки имена, получавайте статути на pin-ване и още, директно от CLI. [Научете как →](work-with-pinning-services.md)

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) и еквивалентният му in-browser IPFS web интерфейс, [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui), и двата поддържат remote pinning services, така че можете да pin-вате към любимата си pinning услуга директно от UI. [Научете как →](work-with-pinning-services.md)
