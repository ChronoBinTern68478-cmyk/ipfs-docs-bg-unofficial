---
title: Хостване на Git хранилище
legacyUrl: https://docs.ipfs.tech/guides/examples/git/
description: Научете как да обслужвате статично Git хранилище по целия свят с помощта на IPFS.
---

# Хостване на Git хранилище

Някога не сте си казвали: "Човече, моят Git сървър не е достатъчно децентрализиран" или "Искам да имам лесен начин да обслужвам статично Git хранилище по целия свят"? Е, вече няма нужда.

В това ръководство обсъждаме как да обслужваме Git хранилище през IPFS мрежата. Крайната цел е URL, който може да се клонира с `git clone`, обслужван през IPFS!

:::callout
Това ръководство използва `gateway.example.net` като заместител за IPFS gateway. Можете да го замените с:

- self-hosted [Kubo](../install/command-line.md) gateway
- За best-effort хостинг и тестване пробвайте [public good `ipfs.io` (`dweb.link` variant)](../concepts/public-utilities.md#public-ipfs-gateways), или всеки от [public gateways](https://ipfs.github.io/public-gateway-checker/), които поддържат "Origin" isolation ([subdomain mode](./address-ipfs-on-web.md#subdomain-gateway))
  :::

Първо изберете Git хранилище, което искате да хоствате, и направете bare clone на него:

```bash
git clone --mirror git@myhost.io/myrepo
```

За тези, които не са особено запознати с Git, bare repository означава, че няма working tree и може да се използва като сървър. Той има малко по-различен формат от обикновеното Git хранилище.

Сега, за да го подготвите за клониране, трябва да направите следното:

```bash
cd myrepo
git update-server-info
```

По желание можете да разопаковате всички Git обекти:

```bash
mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*
```

Правенето на това разделя големия packfile на Git на всички отделни обекти. Това ще позволи на IPFS да дедупликира обектите, ако добавите няколко версии на това Git хранилище.

След като направите това, хранилището е готово за обслужване. Остава само да го добавите към IPFS:

```bash
$ pwd
/code/myrepo
$ ipfs add -r .
...
...
...
added QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95 .
```

Сега, опитайте да го клонирате:

```bash
$ cd /tmp
$ git clone http://QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95.ipfs.localhost:8080/ myrepo
```

Забележка: уверете се, че сменяте този hash с вашия.

Сега може да се чудите: "Е, каква полза има от Git хранилище, което не мога да променям?" Ето един пример за употреба. Да речем, че програмирате на Go. За тези, които не знаят, Go използва пътища от version control за import-и, например:

```go
import (
	"github.com/whyrusleeping/mycoollibrary"
)
```

Това е много полезна функция и решава много проблеми — но често се случва да срещнете проблема, че използвате библиотеката на някой друг и те променят API, което счупва кода ви. Използвайки това, което направихме по-горе, можете да клонирате библиотеката и да я добавите в IPFS, така че import пътищата ще изглеждат нещо като:

```go
import (
	mylib "gateway.example.net/ipfs/QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95"
)
```

И ще имате гаранция, че винаги ще имате същия код!

Забележка: Тъй като Go не позволява използването на localhost за import пътища, използваме публичните HTTP gateways. Това не дава никакви сигурностни гаранции, тъй като атака от тип man-in-the-middle може да ви подмени лош код. Можете да използвате домейнно име, което редиректва към localhost, за да избегнете проблема.
