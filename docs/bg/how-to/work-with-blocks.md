---
title: Работа с блокове
description: Научете как файловете ви се разделят на блокове в IPFS и как да работите с тях.
---

# Работа с блокове

Командата `ipfs add` ще създаде Merkle DAG от данните във файловете, които посочите. При това тя следва [UnixFS data format](https://github.com/ipfs/go-unixfs/blob/master/pb/unixfs.proto). Това означава, че вашите файлове се разделят на блокове, а след това се подреждат в дървовидна структура чрез „link nodes“, за да се свържат заедно. „Хешът“ на даден файл всъщност е хешът на root (най-горния) възел в DAG. За даден DAG можете лесно да видите под-блоковете под него с `ipfs ls`.

Например:

```bash
# Уверете се, че този файл е по-голям от 256k.
ipfs add alargefile
ipfs ls thathash
```

Горната команда трябва да изведе нещо подобно:

```bash
ipfs@earth ~> ipfs ls qms2hjwx8qejwm4nmwu7ze6ndam2sfums3x6idwz5myzbn
> qmv8ndh7ageh9b24zngaextmuhj7aiuw3scc8hkczvjkww 7866189
> qmuvjja4s4cgyqyppozttssquvgcv2n2v8mae3gnkrxmol 7866189
> qmrgjmlhlddhvxuieveuuwkeci4ygx8z7ujunikzpfzjuk 7866189
> qmrolalcquyo5vu5v8bvqmgjcpzow16wukq3s3vrll2tdk 7866189
> qmwk51jygpchgwr3srdnmhyerheqd22qw3vvyamb3emhuw 5244129
```

Това показва всички непосредствени sub-blocks на вашия файл, както и размера им и техните деца на диска.

## Какво да правим с блоковете

Ако се чувствате авантюристично, можете да извлечете много различна информация от тези различни блокове. Можете да използвате хешовете на sub-blocks като вход към `ipfs cat`, за да видите само данните в даден sub-tree (данните на този блок и неговите деца). За да видите само данните на даден блок, без неговите деца, използвайте `ipfs block get`. Но внимавайте, защото `ipfs block get` на intermediatе block ще отпечата суровите двоични данни на неговата DAG структура на екрана.

Командата `ipfs block stat` ще ви каже точния размер на даден блок (без неговите деца), а `ipfs refs` ще ви каже всички деца на този блок. По подобен начин `ipfs ls` или `ipfs object links` ще покажат всички деца и техните размери. `ipfs refs` е по-подходяща команда за скриптове, които да работят на всеки child block на даден обект.

## Блокове срещу обекти

В IPFS блокът се отнася до една единица данни, идентифицирана по ключ (hash). Блокът може да бъде всякакъв вид данни и не е задължително да има някакъв формат, свързан с него. Обект, от друга страна, се отнася до блок, който следва Merkle DAG protobuf data format. Той може да бъде разчетен и манипулиран чрез команда `ipfs object`. Всеки hash може да представлява обект или блок.

## Създаване на блок от нулата

Създаването на собствени блокове е лесно! Просто поставете данните във файл и стартирайте `ipfs block put <yourfile>` върху него. Или можете да изпратите данните от файла в `ipfs block put` чрез pipe, например:

```bash
echo "This is some data" | ipfs block put
> QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM

ipfs block get QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM
> This is some data
```

Забележка: Когато създавате собствени block данни, няма да можете да четете данните с `ipfs cat`. Това е, защото въвеждате сурови данни без UnixFS data format. За да четете raw blocks, използвайте `ipfs block get`, както е показано в примера.
