---
title: Промяна на bootstrap списъка
description: Научете как да променяте списъка с bootstrap peers на IPFS, за да създадете лична IPFS мрежа.
---

# Промяна на bootstrap списъка с peers

IPFS bootstrap списъкът е списък от peers, с които IPFS daemon научава за други peers в мрежата. IPFS идва със стандартен списък от доверени peers, но можете свободно да го променяте според нуждите си. Популярна употреба на персонализиран bootstrap списък е създаването на лична IPFS мрежа.

Първо, нека изведем bootstrap списъка на вашия възел:

```bash
ipfs bootstrap list
> auto
```

Плейсхолдерът `auto` се управлява от [AutoConf](https://github.com/ipfs/kubo/blob/master/docs/config.md#autoconf). За да видите разрешените peers, подайте `--expand-auto`:

```bash
ipfs bootstrap list --expand-auto
> /dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
> /dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa
> /dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb
> /dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt
> /dnsaddr/va1.bootstrap.libp2p.io/p2p/12D3KooWKnDdG3iXw9eTFijk3EWSunZcFi54Zka4wmtqtt6rPxc8
> /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
> /ip4/104.131.131.82/udp/4001/quic-v1/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

Редовете по-горе са адресите на стандартните IPFS bootstrap възли — те се управляват от екипа за разработка на IPFS. Посочените адреси са напълно разрешени и зададени в формат [multiaddr](https://github.com/multiformats/multiaddr), което прави всеки протокол изричен. По този начин вашият възел знае точно къде да достигне bootstrap възлите — местоположението е недвусмислено.

Не променяйте този списък, освен ако не разбирате какво означава това. Bootstrapping е важна точка на повреда на сигурността в децентрализираните системи: злонамерени bootstrap peers биха могли само да ви въведат в други злонамерени peers. Препоръчително е да се запази стандартният списък, предоставен от екипа на IPFS, или — в случая на частни мрежи — списък на възли, които контролирате. Не добавяйте peers към този списък, на които не се доверявате.

Тук добавяме нов peer към bootstrap списъка:

```bash
> ipfs bootstrap add /ip4/25.196.147.100/tcp/4001/p2p/QmaMqSwWShsPg2RbredZtoneFjXhim7AQkqbLxib45Lx4S
```

Тук премахваме възел от bootstrap списъка:

```bash
> ipfs bootstrap rm /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

Забележка: при стандартна конфигурация, където bootstrap списъкът е плейсхолдерът `auto`, премахването на отделни peers връща грешка. Първо заменете `auto` с изрични адреси на peers или премахнете всички peers с `ipfs bootstrap rm --all`.

Да кажем, че искаме да създадем резервно копие на новия bootstrap списък. Можем лесно да направим това, като пренасочим stdout на `ipfs bootstrap list` към файл:

```bash
> ipfs bootstrap list >save
```

Ако някога искаме да започнем от нулата, можем да изтрием целия bootstrap списък наведнъж:

```bash
> ipfs bootstrap rm --all
```

С празен списък можем да възстановим стандартния bootstrap списък:

```bash
> ipfs bootstrap add --default
```

Премахнете целия bootstrap списък отново и възстановете запазения, като изпратите съдържанието на запазения файл към `ipfs bootstrap add`:

```bash
> ipfs bootstrap rm --all
> cat save | ipfs bootstrap add
```
