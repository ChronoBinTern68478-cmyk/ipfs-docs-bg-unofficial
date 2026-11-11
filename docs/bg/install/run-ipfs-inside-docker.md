---
title: Инсталиране на IPFS Kubo в Docker
description: Можете да стартирате IPFS в Docker, за да опростите процесите на внедряване и хоризонтално да мащабирате вашата IPFS инфраструктура.
current-ipfs-version: v0.43.1
---

# Инсталиране на IPFS Kubo в Docker

Можете да стартирате Kubo IPFS в Docker, за да опростите процесите на внедряване, както и хоризонтално да мащабирате вашата IPFS инфраструктура.

## Настройка

1. Вземете Docker образа на IPFS от [hub.docker.com/r/ipfs/kubo](https://hub.docker.com/r/ipfs/kubo/).
1. За да направите файловете видими вътре в контейнера, трябва да монтирате директория на хоста с опцията `-v` към Docker. Изберете директория, която искате да използвате за импортиране и експортиране на файлове от IPFS. Също така изберете директория, където да се съхраняват IPFS файловете, които ще останат след рестартиране на контейнера.

    ```shell
    export ipfs_staging=</absolute/path/to/somewhere/>
    export ipfs_data=</absolute/path/to/somewhere_else/>
    ```

1. Стартирайте контейнер, изпълняващ ipfs, и изложете портовете `4001` (P2P TCP/QUIC транспорт), `5001` (RPC API) и `8080` (Gateway):

    ```shell
    docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.43.1
    ```

    ::: danger НИКОГА НЕ ИЗЛАГАЙТЕ RPC API НА ПУБЛИЧНИЯ ИНТЕРНЕТ

    Портът на API предоставя достъп на административно ниво до вашия IPFS възел. Вижте [RPC API docs](../reference/kubo/rpc.md) за повече информация.

    :::

1. Гледайте лога на ipfs:

    ```shell
    docker logs -f ipfs_host
    ```

1. Изчакайте IPFS да стартира:

    ```shell
    RPC API server listening on /ip4/0.0.0.0/tcp/5001
    WebUI: http://0.0.0.0:5001/webui
    Gateway server listening on /ip4/0.0.0.0/tcp/8080
    Daemon is ready
    ```

    Сега можете да спрете наблюдението на лога.

1. Стартирайте IPFS команди с `docker exec ipfs_host ipfs <args...>`. Например:

    За свързване с peers:

    ```shell
    docker exec ipfs_host ipfs swarm peers
    ```

    За добавяне на файлове:

    ```shell
    cp -r <something> $ipfs_staging
    docker exec ipfs_host ipfs add -r /export/<something>
    ```

    :::tip Използване на локалния ipfs CLI
    Ако имате инсталиран `ipfs` на хоста и портът на RPC API е изложен, можете да изпълнявате команди без `docker exec`. Вижте [Interact with a remote node](../how-to/command-line-quick-start.md#interact-with-a-remote-node) за подробности.
    :::

1. Спиране на работещия контейнер:

    ```shell
    docker stop ipfs_host
    ```

Когато стартирате контейнер с ipfs за първи път с празна data директория, той ще извика `ipfs init`, за да инициализира конфигурационните файлове и да генерира нова двойка ключове. По това време можете да изберете кой профил да приложите, като използвате променливата на средата `IPFS_PROFILE`:

```shell
docker run -d --name ipfs_host -e IPFS_PROFILE=server -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.43.1
```

## Персонализиране на вашия възел

Потребителският инициализационен код може да бъде изпълнен, като се монтират скриптове в директорията `/container-init.d` в контейнера. Те се изпълняват последователно и в лексикографски ред, след като `ipfs init` се изпълни и swarm ключовете бъдат копирани (ако хранилището на IPFS се нуждае от инициализация), и преди да стартира IPFS демонът.

Тъй като това се изпълнява всеки път, когато контейнерът стартира, трябва да проверите дали вашият инициализационен код трябва да бъде идемпотентен, особено ако съхранявате състоянието извън контейнера (напр. използвайки монтирани директории).

Например, това задава персонализиран bootstrap възел преди демонът да стартира:

```shell
#!/bin/sh
set -ex
ipfs bootstrap rm all
ipfs bootstrap add "/ip4/$PRIVATE_PEER_IP_ADDR/tcp/4001/ipfs/$PRIVATE_PEER_ID"
```

Това показва как да монтирате файла в директорията `container-init.d`, когато стартирате контейнера:

```shell
docker run -d --name ipfs \
  -e PRIVATE_PEER_ID=... \
  -e PRIVATE_PEER_IP_ADDR=... \
  -v ./001-test.sh:/container-init.d/001-test.sh \
  -p 4001:4001 \
  -p 127.0.0.1:8080:8080 \
  -p 127.0.0.1:5001:5001 \
  ipfs/kubo
```

:::tip Използване в персонализирани изображения
Вижте примера `gateway` в хранилището [go-ipfs-docker-examples](https://github.com/ipfs-shipyard/go-ipfs-docker-examples) (архивирано)
:::

## Настройка на ограниченията на ресурсите

Когато внедрявате IPFS Kubo в контейнеризирани среди, е важно да съгласувате осъзнаването на ресурсите на Go runtime със зададените ограничения на контейнера чрез променливи на средата:

- `GOMAXPROCS`: Конфигурира максималния брой OS нишки, които могат да изпълняват Go код едновременно (не трябва да е по-голям от твърдото ограничение на контейнера, зададено чрез `docker --cpus`)
- `GOMEMLIMIT`: Задава мекото [ограничение за разпределение на паметта за Go runtime](https://tip.golang.org/doc/gc-guide#Memory_limit) (трябва да бъде малко под твърдото ограничение, зададено за контейнера чрез `docker --memory`)

Пример:

```shell
docker run # (....)
    --cpus="4.0" -e GOMAXPROCS=4 \
    --memory="8000m" -e GOMEMLIMIT=7500MiB \
    ipfs/kubo:v0.43.1
```

## Частни swarms в Docker

Възможно е да инициализирате контейнера с файл за swarm key (`/data/ipfs/swarm.key`) с помощта на променливите `IPFS_SWARM_KEY` и `IPFS_SWARM_KEY_FILE`. `IPFS_SWARM_KEY` създава `swarm.key` със съдържанието на самата променлива, докато `IPFS_SWARM_KEY_FILE` копира ключа от път, съхранен в променливата. `IPFS_SWARM_KEY_FILE` **записва върху** ключа, генериран от `IPFS_SWARM_KEY`.

```shell
docker run -d --name ipfs_host -e IPFS_SWARM_KEY=<your swarm key> -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.43.1
```

Инициализацията на swarm key може да се направи и чрез docker secrets и изисква `docker swarm` или `docker-compose`:

```shell
cat your_swarm.key | docker secret create swarm_key_secret -
docker run -d --name ipfs_host --secret swarm_key_secret -e IPFS_SWARM_KEY_FILE=/run/secrets/swarm_key_secret -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.43.1
```

## Ротация на ключове в Docker

Възможно е да направите ротация на ключове в ефермерен контейнер, който временно изпълнява операции срещу volume, монтирано под `/data/ipfs`:

```shell
# given container named 'ipfs-test' that persists repo at /path/to/persisted/.ipfs
docker run -d --name ipfs-test -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:v0.43.1
docker stop ipfs-test

# key rotation works like this (old key saved under 'old-self')
docker run --rm -it -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:v0.43.1 key rotate -o old-self -t ed25519
docker start ipfs-test # will start with the new key
```
