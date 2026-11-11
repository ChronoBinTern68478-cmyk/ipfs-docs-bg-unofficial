---
title: Kubo
description: Използването на IPFS Kubo през командния ред ви позволява да правите всичко, което IPFS Desktop може, но на по-гранулирано ниво, защото можете да посочите кои команди да изпълнявате. Научете как да го инсталирате тук.
current-ipfs-version: v0.43.1
---

# Инсталирайте IPFS Kubo

Това ръководство описва наличните процеси на инсталиране за IPFS Kubo, Go-базирана имплементация на протокола InterPlanetary File System (IPFS). Kubo беше първата имплементация на IPFS и е най-широко използваната имплементация днес. Kubo ви позволява да правите всичко, което IPFS Desktop може, но на по-гранулирано ниво, защото можете да посочите кои команди да изпълнявате. Kubo има следните функции:

- Стартира IPFS-нода като мрежова услуга, която е част от LAN и WAN ([Amino](https://probelab.io/ipfs/amino/)) DHT
- Функционалност на [HTTP Gateway](https://specs.ipfs.tech/http-gateways/) (`/ipfs` и `/ipns`) за доверено и [trustless](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) извличане на съдържание
- Клиент и сървърна имплементация на [HTTP Routing V1](https://specs.ipfs.tech/routing/http-routing-v1/) (`/routing/v1`) за търсене чрез [delegated routing](https://github.com/ipfs/kubo/blob/master/docs/delegated-routing.md)
- [HTTP Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/) (`/api/v0`) за достъп и управление на демона
- [Command Line Interface](https://docs.ipfs.tech/reference/kubo/cli/) (`ipfs --help`), базиран на RPC API (`/api/v0`)
- [WebUI](https://github.com/ipfs/ipfs-webui/#readme) за управление на Kubo нода
- Поддръжка на [Content blocking](https://github.com/ipfs/kubo/blob/master/docs/content-blocking.md) за оператори на публични възли
- Бинарни файлове за Windows, macOS, Linux, FreeBSD и OpenBSD

Инсталирането на Kubo през командния ред е полезно за много сценарии, като например създаване на приложения и услуги върху IPFS нода или настройване на възел без потребителски интерфейс (както обикновено е при отдалечени сървъри или виртуални машини).

За да започнете, запознайте се с системните изисквания. След това решете дали искате да инсталирате Kubo с един от 5-те официални бинарни дистрибуции или да съберете Kubo от източник. След като инсталирате Kubo, определете кой възел да използвате в командния ред. Накрая разгледайте следващите стъпки.

:::warning
Събирането от източник се препоръчва само ако стартирате Kubo на система с тежки ограничения на ресурсите или допринасяте за проекта Kubo.
:::

## Системни изисквания

Kubo работи на повечето Windows, macOS, Linux, FreeBSD и OpenBSD системи, които отговарят на следните изисквания:

- 6 GiB RAM.
- 2 CPU ядра (kubo е силно паралелен).

Имайте предвид следното:
- Количеството дисково пространство, което вашата IPFS инсталация използва, зависи от това колко данни споделяте. Базовата инсталация използва около 12 MB дисково пространство.
- Можете да активирате автоматично почистване на отпадъци чрез [--enable-gc](../reference/kubo/cli.md#ipfs-daemon) и да регулирате [по подразбиране максималното дисково съхранение](https://github.com/ipfs/kubo/blob/v0.43.1/docs/config.md#datastorestoragemax) за данни, извлечени от други peers.

<!-- TODO: hide this footgun until https://github.com/ipfs/kubo/pull/10524 is merged and released in stable kubo 
### Kubo на системи с ограничени ресурси

Ако стартирате Kubo на система с ограничени ресурси (например Raspberry Pi), трябва да инициализирате демона с профила `lowpower`.

```bash
ipfs init --profile=lowpower
```

Това намалява натоварването на демона в системата, но може да влоши откриването на съдържание и производителността на извличане на данни.

-->

## Инсталиране на официални бинарни дистрибуции

Този раздел описва как да изтеглите и инсталирате Kubo бинарния файл от `dist.ipfs.tech` на Windows, macOS, Linux, FreeBSD и OpenBSD операционни системи. Екипът на IPFS публикува най-новите официални предварително компилирани Kubo бинарни файлове на [уебсайта dist.ipfs.tech](https://dist.ipfs.tech#kubo). Новите версии на IPFS Kubo бинарните файлове автоматично се показват на страницата Kubo в `dist.ipfs.tech`.

:::callout
Ако нямате достъп до [dist.ipfs.tech](https://dist.ipfs.tech#kubo), можете също да изтеглите Kubo от GitHub [releases](https://github.com/ipfs/kubo/releases/latest) страницата на проекта или от `/ipns/dist.ipfs.tech` през [dweb.link](https://dweb.link/ipns/dist.ipfs.tech#kubo) gateway.
:::

За инструкции за инсталиране за вашата операционна система изберете подходящия раздел.

:::: tabs

::: tab Linux id="install-kubo-linux"

### Linux

1. Изтеглете Linux бинарния файл от [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.43.1/kubo_v0.43.1_linux-amd64.tar.gz
   ```

1. Разархивирайте файла:

   ```bash
   tar -xvzf kubo_v0.43.1_linux-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Преминете в папката `kubo`:

   ```bash
   cd kubo
   ```

1. Стартирайте инсталационния скрипт

   ```bash
   sudo bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Проверете дали Kubo е инсталиран правилно:

   ```bash
   ipfs --version

   > ipfs version 0.43.1
   ```

:::

::: tab Windows id="install-kubo-windows"

### Windows

1. Изтеглете Windows бинарния файл от [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```powershell
   wget https://dist.ipfs.tech/kubo/v0.43.1/kubo_v0.43.1_windows-amd64.zip -Outfile kubo_v0.43.1.zip
   ```

1. Разархивирайте файла на подходящо място, например `~\Apps\kubo_v0.43.1`.

   ```powershell
   Expand-Archive -Path kubo_v0.43.1.zip -DestinationPath ~\Apps\kubo_v0.43.1
   ```

1. Преминете в папката `kubo_v0.43.1`

   ```powershell
   cd ~\Apps\kubo_v0.43.1\kubo
   ```

1. Проверете дали `ipfs.exe` работи:

   ```powershell
   .\ipfs.exe --version

   > ipfs version 0.43.1
   ```

   В този момент Kubo е използваем. Въпреки това силно се препоръчва първо да добавите `ipfs.exe` към вашия `PATH`, като следвате следните стъпки:

1. Запазете текущата работна директория в временна променлива:

   ```powershell
   $GO_IPFS_LOCATION = pwd
   ```

1. Създайте PowerShell профил:

   ```powershell
   if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
   ```

   Тази команда първо проверява дали имате зададен профил. Ако имате, тя го оставя и не създава нов. Можете да прегледате съдържанието на профила си, като го отворите в редактор, като Notepad:

   ```powershell
   notepad $PROFILE
   ```

1. Добавете местоположението на вашия Kubo демон и го добавете към `PATH` на PowerShell, като го добавите в края на вашия PowerShell профил:

   ```powershell
   Add-Content $PROFILE "`n[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;$GO_IPFS_LOCATION')"
   ```

1. Заредете вашия `$PROFILE`:

   ```powershell
   & $profile
   ```

1. Отидете в домашната си папка

   ```powershell
   cd ~
   ```

1. Проверете дали Kubo е инсталиран правилно:

   ```powershell
   ipfs --version

   > ipfs version 0.43.1
   ```

:::

::: tab macOS id="install-kubo-mac"

### macOS

> Методът за инсталиране с `brew` поддържа както Intel, така и Apple Silicon хардуер. Ако предпочитате ръчна инсталация, артефактите `darwin-amd64` (Intel) и `darwin-arm64` (Apple Silicon) са налични [тук](https://dist.ipfs.tech/#kubo).

1. Отворете терминал.

1. Използвайте `brew`, за да инсталирате Kubo:

   ```shell
   brew install ipfs
   ```

1. Потвърдете инсталацията на Kubo:

   ```bash
   ipfs --version
   ```

   Ако Kubo е инсталиран, се показва номерът на версията. Например:

   ```bash
   > ipfs version 0.43.1
   ```
:::

::: tab FreeBSD id="install-kubo-freeBSD"

### FreeBSD

1. Изтеглете FreeBSD бинарния файл от [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.43.1/kubo_v0.43.1_freebsd-amd64.tar.gz
   ```

1. Разархивирайте файла:

   ```bash
   tar -xvzf kubo_v0.43.1_freebsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Преминете в папката `kubo`:

   ```bash
   cd kubo
   ```

1. Стартирайте инсталационния скрипт:

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Проверете дали Kubo е инсталиран правилно:

   ```bash
   ipfs --version

   > ipfs version 0.43.1
   ```

:::

::: tab OpenBSD id="install-kubo-openBSD"

### OpenBSD

1. Изтеглете OpenBSD бинарния файл от [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.43.1/kubo_v0.43.1_openbsd-amd64.tar.gz
   ```

1. Разархивирайте файла:

   ```bash
   tar -xvzf kubo_v0.43.1_openbsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Преминете в папката `kubo`:

   ```bash
   cd kubo
   ```

1. Стартирайте инсталационния скрипт:

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Проверете дали Kubo е инсталиран правилно:

   ```bash
   ipfs --version

   > ipfs version 0.43.1
   ```

:::

::::




## Компилиране на Kubo от източник

За актуални инструкции как ръчно да изтеглите, компилирате и съберете Kubo от източник, вижте раздела [Събиране от източник](https://github.com/ipfs/kubo/blob/v0.43.1/README.md#build-from-source) в хранилището на Kubo.

## Определяне кой възел да използвате с командния ред

CLI автоматично се свързва с работещ IPFS демон, като прочита файла `$IPFS_PATH/api` (обикновено `~/.ipfs/api`), който съдържа адреса на [RPC API](../reference/kubo/rpc.md).

- **Локален демон**: Изпълнението на `ipfs daemon` създава този файл автоматично.
- **Отдалечен възел**: За свързване към демон на друга машина или в контейнер, вижте [Свързване с отдалечен възел](../how-to/command-line-quick-start.md#interact-with-a-remote-node).

:::tip
За API със TLS защита, вижте [Защитен Kubo RPC с TLS и HTTP Auth](../how-to/kubo-rpc-tls-auth.md). Ако се интересувате само от извличане, вместо това вижте [HTTP Gateway](../reference/http/gateway.md), който е независим от имплементацията.
:::

## Следващи стъпки

След като сте инсталирали IPFS Kubo:

- Разгледайте [Урок за IPFS Kubo в ръководствата](../how-to/command-line-quick-start.md), който ще ви преведе през стартирането на Kubo възел онлайн и взаимодействието с мрежата.
