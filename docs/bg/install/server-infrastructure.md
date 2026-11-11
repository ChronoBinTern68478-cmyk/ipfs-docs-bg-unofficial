---
title: IPFS Cluster
description: IPFS Cluster осигурява оркестрация на данни в рояк от IPFS демони, като разпределя, репликира и следи глобален pin-set сред множество peers. Научете как да го инсталирате тук.
current-ipfs-cluster-version: v1.1.6
---

# Настройте сървърна инфраструктура с IPFS Cluster

Ако искате да инсталирате IPFS в сървърна среда и да предлагате IPFS като услуга, трябва да разгледате [IPFS Cluster](https://ipfscluster.io/) като начин да мащабирате вашето IPFS внедряване извън един IPFS демон. IPFS Cluster осигурява оркестрация на данни в рояк от IPFS демони, като разпределя, репликира и следи глобален pin-set, разпределен между множество peers. Това значително улеснява управлението на множество IPFS възли и гарантира, че данните са налични в рамките на вътрешна мрежа.

IPFS Cluster е разпределено приложение, което работи като sidecar към IPFS peers, поддържа глобален cluster pinset и интелигентно разпределя елементите си към IPFS peers. Това значително улеснява управлението на множество IPFS възли и гарантира, че данните са налични в рамките на вътрешна мрежа.

:::tip
Ако сте потребител на Kubernetes, можете да използвате [Kubernetes operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) за IPFS, наречен [IPFS operator](https://github.com/redhat-et/ipfs-operator), за лесно създаване и управление на кластери, състоящи се от стотици peers.
IPFS operator не се поддържа активно и не се препоръчва за production случаи. Ако операторът е нещо, което бихте искали да включите в вашата инфраструктура,
проверете [официалната документация](https://ipfs-operator.readthedocs.io/) и [source code](https://github.com/redhat-et/ipfs-operator) за инструкции и последния напредък.
:::

## Функции

IPFS Cluster има следните функции:

- _Лесен за стартиране_: Работи независимо от IPFS и API на IPFS демона.
- _Обработва репликация на милиони pin-ове към стотици IPFS демони_: Проследява lifetime на pin-овете асинхронно, моли IPFS да ги pin-не с устойчив темп и повтаря pin-ването при неуспехи.
- _Интелигентна приоритетизация на pin-ване_: Новите pin-ове получават приоритет пред pin заявки, които са остарели или са се проваляли многократно.
- _Добавяне на pin-ове в мащаб_: Pin-овете могат да се добавят с темп от стотици pin-ове в секунда в кластера от момента, в който са проследени и управлявани от cluster peers.
- _Балансирано разпределение_: Разпределя pin-овете равномерно между peers в различни групи и подгрупи (например региони, availability zones), в крайна сметка избирайки тези с най-много свободно дисково пространство.
- _API и CLI_: Осигурява command-line client и напълно функционално Cluster HTTP REST API.
- _Няма централен сървър за управление_: Cluster peers формират разпределена мрежа и поддържат глобален, репликиран, conflict-free списък с pin-ове.
- _Вградено разрешаване на достъпа_: Вграденият модел на разрешения поддържа peers с права да променят cluster pinset и peers, които съхраняват съдържание според указанията, но не могат да модифицират pinset.
- _Именувайте вашите pin-ове_: Поддържа персонализирани фактори на репликация, имена и метаданни за всеки pin.
- _Multi-peer add_: Импортира IPFS съдържание директно към множество демони.
- _Поддръжка на CAR import_: Директно импортира CAR-архивирано съдържание с помощта на custom DAGs.
- _IPFS proxy API_: Cluster peers предоставят допълнителен IPFS proxy API, който се държи точно както IPFS демонът.
- _Готово за интеграция_: Cluster peers могат да бъдат стартирани и управлявани програмно с Go и Javascript клиенти за API.
- _Задвижвано от [libp2p](https://libp2p.io/):_ Изграден върху libp2p, тестваната p2p мрежова библиотека от следващо поколение, използвана от IPFS, Filecoin и Ethereum V2.

<!-- markdown-link-check-disable -->
@[youtube](-SYDlid7Nqs)
<!-- markdown-link-check-enable-->

## Създаване на локален cluster

За да видите дали IPFS Cluster е подходящ за вашия проект, следвайте това бързо ръководство и стартирайте локален IPFS Cluster екземпляр. В края на това ръководство ще имате солидно разбиране как се настройва IPFS Cluster и как да взаимодействате с него. За да създадете локален cluster, изпълнете предварителните условия. След това следвайте процедурата.

:::tip
Ако предпочитате да създадете production-ready cluster, разгледайте [официалната документация на IPFS Cluster →](https://ipfscluster.io/)
:::

### Предварителни условия

Трябва да имате инсталирани [Docker](https://docs.docker.com/install/) и [Docker Compose](https://docs.docker.com/compose/install/). Проверете дали и двете са инсталирани правилно, като проверите версиите:

```shell
docker version

> Client: Docker Engine - Community
> Version:           19.03.13
> API version:       1.40
> ...

docker-compose version

> docker-compose version 1.27.4, build 40524192
> docker-py version: 4.3.1
> ...
```

Ако имате проблеми с инсталирането или използването на Docker или Docker-Compose, вижте [официалната документация →](https://docs.docker.com/).

### Процедура

1. Изтеглете най-новия пакет `ipfs-cluster-ctl` от [dist.ipfs.tech](https://dist.ipfs.tech/#ipfs-cluster-ctl):

    ```shell
    wget https://dist.ipfs.tech/ipfs-cluster-ctl/v1.1.6/ipfs-cluster-ctl_v1.1.6_linux-amd64.tar.gz
    ```

1. Разархивирайте пакета:

    ```shell
    tar xvzf ipfs-cluster-ctl_v1.1.6_linux-amd64.tar.gz

    > ipfs-cluster-ctl/ipfs-cluster-ctl
    > ipfs-cluster-ctl/LICENSE
    > ipfs-cluster-ctl/LICENSE-APACHE
    > ipfs-cluster-ctl/LICENSE-MIT
    > ipfs-cluster-ctl/README.md
    ```

1. Изтеглете файла [`docker-compose.yml`](https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.1.6/docker-compose.yml) и го поставете в директорията `ipfs-cluster-ctl`:

    ```shell
    wget https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.1.6/docker-compose.yml
    ```

1. Стартирайте cluster-а с `docker-compose`:

   :::callout
   В зависимост от правата на вашата система, може да се наложи да изпълните командата като root потребител.
   :::

    ```shell
    docker-compose up

    > Recreating ipfs2 ... done
    > Recreating ipfs1    ... done
    > Recreating ipfs0    ... done
    > Recreating cluster2 ... done
    > ...
    ```

    :::warning

    Може да се появят грешки като следната:

    ```shell
    cluster2    | 2020-10-27T15:20:15.116Z  ERROR   ipfshttp    error posting to IPFS:Post "http://172.18.0.2:5001/api/v0/pin/ls?type=recursive": dial tcp 172.18.0.2:5001: connect: connection refused
    ```

    Можете безопасно да ги игнорирате засега. Те се показват, защото някои от IPFS възлите в кластера все още не са се стартирали напълно. Всичко трябва да се зареди след няколко минути:

    ```shell
    > ipfs1       | API server listening on /ip4/0.0.0.0/tcp/5001
    > ipfs1       | WebUI: http://0.0.0.0:5001/webui
    > ipfs1       | Gateway server listening on /ip4/0.0.0.0/tcp/8080
    > ipfs1       | Daemon is ready
    ```
    :::

1. Отворете нов терминал.

1. Сега можете да взаимодействате с вашия cluster. В нов терминал отидете в директорията `ipfs-cluster-ctl`.

1. Избройте peers в кластера:

    ```shell
    ./ipfs-cluster-ctl peers ls

    > 12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf | cluster2 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
    > - /ip4/172.18.0.5/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
    > ...
    > 12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE | cluster0 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
    > - /ip4/172.18.0.7/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
    > ...
    > 12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w | cluster1 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
    > - /ip4/172.18.0.6/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
    > ...
    ```

1. Добавете файл в кластера:

    ```shell
    wget https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg
    ./ipfs-cluster-ctl add Neptune_-_Voyager_2_\(29347980845\)_flatten_crop.jpg

    > added QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn Neptune_-_Voyager_2_(29347980845)_flatten_crop.jpg
    ```

1. Вижте статуса на този файл през кластера от IPFS възли, използвайки CID отгоре:

    ```shell
    ./ipfs-cluster-ctl status QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn

    > QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn:
    > > cluster2             : PINNED | 2020-10-27T15:42:39.984850961Z
    > > cluster0             : PINNED | 2020-10-27T15:42:39.984556496Z
    > > cluster1             : PINNED | 2020-10-27T15:42:39.984842325Z
    ```

   Изходът показва, че `QmdzvHZ...` е pin-нат в трите IPFS възела в нашия cluster.

1. Когато сте готови да играете, спрете кластера:

   :::callout
   В зависимост от правата на вашата система, може да се наложи да изпълните командата като root потребител.
   :::

    ```shell
    docker-compose kill

    > Killing cluster0 ... done
    > Killing cluster1 ... done
    > Killing cluster2 ... done
    > Killing ipfs1    ... done
    > Killing ipfs0    ... done
    > Killing ipfs2    ... done
    ```

   Терминалът, който изпълнява демона `ipfs-cluster-ctl`, ще затвори всички отворени връзки:

    ```shell
    > ...
    > ipfs0 exited with code 137
    > ipfs1 exited with code 137
    > cluster0 exited with code 137
    > cluster2 exited with code 137
    > cluster1 exited with code 137
    > ipfs2 exited with code 137
    ```

## Следващи стъпки

Ако искате да навлезете по-дълбоко в IPFS Cluster, разгледайте документацията на проекта на [ipfscluster.io →](https://ipfscluster.io/)
