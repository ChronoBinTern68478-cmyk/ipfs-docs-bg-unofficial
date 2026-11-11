---
title: Основни CLI операции с Kubo
description: 'Прост пример за това как да извършвате основни IPFS операции чрез командния ред на Kubo.'
---

# Основни CLI операции с Kubo

Това кратко ръководство има за цел да ви преведе през **основите на използването на IPFS чрез Kubo CLI**. Kubo е [една от многото IPFS реализации](../ipfs-implementations.md). Това е най-старата IPFS реализация и предлага CLI (между другото).

Ще научите как да добавяте, извличате, четете и премахвате файлове в CLI. Ако не сте сигурни за значението на някои термини, можете да проверите [глосарията](../concepts/glossary.md).

Всички инструкции и примери тук са изпълнявани и тествани на M1 Mac. Въпреки това IPFS командите са еднакви на Linux, macOS и Windows. Ще трябва да знаете как да навигирате в директориите на вашия компютър от CLI. Ако не сте сигурни как да използвате CLI, препоръчваме да научите това преди да продължите с това ръководство.

## Инсталиране на Kubo

Следващата стъпка е да инсталирате Kubo за командния ред. Имаме отлично ръководство, което ще ви преведе през [инсталирането на Kubo чрез CLI](../install/command-line.md).

След като инсталирате Kubo, трябва да стартираме нашия възел. Ако това е първият път, когато използвате Kubo, първо ще трябва да инициализирате конфигурационните файлове:

```shell
ipfs init
```

Това ще изведе нещо подобно:

```plaintext
generating ED25519 keypair...done
peer identity: 12D3KooW...
initializing IPFS node at /Users/<user>/.ipfs
```

Сега сме готови да стартираме IPFS daemon, за да пуснем възела онлайн. Изпълнете командата `ipfs daemon`:

```shell
ipfs daemon
```

Това ще изведе нещо подобно:

```plaintext
Initializing daemon...
Kubo version: 0.43.0
Repo version: 18
System version: arm64/darwin
[...]
Daemon is ready
```

Тази команда ще остане в ход, докато не я спрете; не правете това сега! Просто отворете нова инстанция на CLI и продължете с ръководството!

:::warning
Не затваряйте CLI, който сте използвали за инициализиране на daemon-а. Изключвайте daemon-а само когато искате да изключите IPFS възела.
:::

## Добавяне на файлове

Сега, когато нашият Kubo IPFS възел е стартиран, сме готови да добавим файлове към IPFS.

1. В CLI навигирайте до директорията, съдържаща файла или папката, която искате да споделите. В този пример ще навигираме до директорията `~/Documents`:

   ```shell
   cd ~/Documents
   ```

1. След като сте там, покажете съдържанието на директорията, за да се уверите, че сте на правилното място:

   ```shell
   ls
   ```

   Това ще изведе съдържанието на тази папка:

   ```plaintext
   hello-ipfs.txt
   ```

1. Сега ще използваме командата `ipfs add`, за да добавим файл към IPFS. Не забравяйте да добавите разширението на файла в края на името:

   ```shell
   ipfs add hello-ipfs.txt
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
   6 B / 6 B [==========================================================] 100.00
   ```

Сега добавихме файл към IPFS и е готов да бъде споделен с peers в мрежата!

## Извличане на файл

В предишния раздел разгледахме как да добавяме локални файлове към IPFS. Сега ще разгледаме как да извличаме отдалечени файлове от IPFS и да ги запазим на вашия компютър. За този пример ще извлечем папка, съдържаща един текстов файл.

1. В CLI навигирайте до директорията, в която искате да запазите папката. IPFS ще я запази в текущата директория. В този случай ще я запазим в `~/Documents`:

   ```shell
   cd ~/Documents
   ```

1. За да получаваме съдържание чрез IPFS, трябва да кажем на `ipfs daemon` кой CID искаме. В този случай искаме `bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a`.
1. Използвайте командата `ipfs get`, комбинирана с желания CID, за да извлечете папката:

   ```shell
   ipfs get bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   Saving file(s) to bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
   1.76 KiB / 1.76 KiB [==============================================] 100.00% 0s
   ```

   Може да отнеме няколко секунди, докато вашият IPFS възел намери данните, които търсим.

Сега вече извлякохме папката през IPFS и копие от нея е запазено локално на вашия компютър. Вие също така вече хоствате папката и нейното съдържание, за да могат други да го извличат.

## Преглеждане на файл

Можете да преглеждате съдържанието на файл от CLI посредством командата `ipfs cat`. Ще използваме тази команда, за да видим съдържанието на папката, която току-що извлекохме, но можете да използвате и `ipfs cat` на файлове, които вече нямате локално.

```shell
ipfs cat bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
```

Това ще изведе нещо подобно:

```plaintext
Error: this dag node is a directory
```

Опитът да стартираме `ipfs cat` върху CID от горе връща грешка! CID сочи към _директорията_, а не към _файла_. За да видите съдържанието на директорията, ще изпълним `ipfs refs <CID>`.

```shell
ipfs refs bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
```

Това ще изведе нещо подобно:

```plaintext
bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq
```

Командата `ref` връща CID, който сочи към файла _вътре_ в директорията. Сега можем да използваме `ipfs cat` с този нов CID, за да го видим:

```plaintext
ipfs cat bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq
```

Това ще изведе нещо подобно:

```plaintext
MMMMMMMMMMN0xo;';ox0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMWXOdoloxkkkxolodOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMN0xdoodkOOOOOOOOOkdoodx0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MKo;;oxOOOOOOOOOOOOOOOOOxo;;oKMMMMMXOKMMMN0kkkkkO0NWMMXOkkkkkkOXMMWKkddddk0NMMMM
Wd...':okOOOOOOOOOOOOOko:'...dWMMMWd.lWMM0,.;ccc:;,oXWd.'clllco0WO:,:loolcckWMMM
Wdckdc,..;lxOOOOOOOxl;..';lo;dWMMMWo.lWMM0''0MMMWK:.oNo.lWMMMMMMX:.dWMMMMMWWMMMM
WdcOKK0ko;'.,:c:c:,..,:oxxxd;dWMMMWo.lWMM0''0MMMMNc.oNo.lNWWWWWMNl.;x0XNWMMMMMMM
WdcOKKKKKKOd:.   .,cdxxxxxxd;dWMMMWo.lWMM0'.coool;'cKWo..clllldXMNkl:;;;:lxXMMMM
WdcOKKKKKKKK0l. .:dxxxxxxxxd;dWMMMWo.lWMM0'.cooodkKWMWo.:0K000KWMMMMWNK0xc.,0MMM
WdcOKKKKKKKKK0: ,dxxxxxxxxxd:dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMMMMMMMMMMX:.dWMM
Wd;xKKKKKKKKK0: ,dxxxxxxxxxl,dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMWOdk0KXXKd.,0MMM
Mk',d0KKKKKKK0: ,dxxxxxxxdc.'kMMMMMO:xWMMKllXMMMMMMMMWk:kWMMMMMMWOlcccccccdKWMMM
MWKkdooxOKKKK0: ,dxxxxdlclokKWMMMMMWWWMMMMWWMMMMMMMMMMMWMMMMMMMMMMMWWNNNNWMMMMMM
MMMMWNOxdodk00: ,ddoccldONWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMWKkdol' .:lokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMWKd'.'dKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
```

Важно е да се отбележи, че `ipfs cat` работи само с plaintext файлове. Както се вижда по-горе, опитът да `cat`-нем директория връща грешка. Ако се опитате да `cat`-нете изображение или текстов файл, който не е plaintext, терминалът ще бъде запълнен с нечетими редове.

## Закрепване на файл

Можем да _pin-нем_ данни, които искаме да запазим в нашия IPFS възел, за да се уверим, че няма да загубим тези данни.

1. Използвайте командата `ipfs pin add`:

   ```shell
   ipfs pin add bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   pinned bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a recursively
   ```

По подразбиране обектите, които извличате през IPFS, не се pin-ват към вашия възел. Ако искате да предотвратите файловете да бъдат изчистени от garbage collection, трябва да ги pin-нете. Забелязвате, че pin-ът, който току-що добавихте, е `recursive` pin, което означава, че това е директория, съдържаща други обекти. Разгледайте [страницата за pinning, за да научите повече как това работи](../concepts/persistence.md).

## Премахване на файл

Ако решим, че вече не искаме да хостваме файл, всичко, което трябва да направим, е да премахнем pin-а.

1. Първо трябва да вземем CID на файла или папката, която искаме да unpin-нем. За да видите списък на съдържанието, което сте pin-нали, изпълнете `ipfs pin ls`:

   ```shell
   ipfs pin ls
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB indirect
   QmQGiYLVAdSHJQKYFRTJZMG4BXBHqKperaZtyKGmCRLmsF indirect
   QmU5k7ter3RdjZXu3sHghsga1UQtrztnQxmTL22nPnsu3g indirect
   QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn recursive
   QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y indirect
   QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y indirect
   QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm indirect
   QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
   QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
   ```

1. Ако знаете точно кой CID искате да премахнете, тогава е чудесно! Ако обаче не сте сигурни кой е CID-ът, можете да използвате командата `ipfs add` отново върху файла или папката, която искате да премахнете, за да разберете. Ще unpin-нем файла `hello-ipfs.txt`, който използвахме по-рано.

   ```shell
   cd ~/Documents
   ipfs add hello-ipfs.txt
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
   6 B / 6 B [==========================================================] 100.00
   ```

   Въпреки че IPFS ни дава същия изход както преди, всъщност не добавяме отново файла. Въпреки това можем да вземем CID от този изход.

1. Сега можем да използваме командата `ipfs pin rm`, за да unpin-нем файла:

   ```shell
   ipfs pin rm QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   unpinned QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE
   ```

1. Файлът `hello-ipfs.txt` вече е unpinned, но не е напълно премахнат от нашия възел. За да го премахнем напълно, трябва да изпълним garbage collection. Командата ще премахне всичко от вашия възел, което няма pin:

   ```shell
   ipfs repo gc
   ```

   Това ще изведе нещо подобно:

   ```plaintext
   removed bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
   removed bafkreieceevgg2auxo4u3rjgeiqfr4ccxh6ylkgxt2ss6k2leuad5xckxe
   removed bafkreiblcvcr7letdbp2k2thkbjyunznrwq3y6pyoylzaq4epawqcca2my
   [...]
   ```

Целевият файл вече е напълно премахнат от вашия IPFS възел, както и всички други файлове, които не бяха pin-нати. Ако съдържанието, което току-що беше garbage collected, е било запазено на локалния ви компютър, то все още е там. Ако искате да го премахнете от локалното хранилище на вашия компютър, ще трябва да намерите къде е запазено и да го изтриете по обичайния начин.
