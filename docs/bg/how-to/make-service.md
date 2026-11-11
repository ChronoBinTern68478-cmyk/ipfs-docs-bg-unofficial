---
title: Създаване на услуга
description: Научете как да създадете проста demo услуга на IPFS.
---

# Създаване на услуга

::: warning
Този пример е остарял и трябва да се използва само като справка. Няколко стъпки на тази страница вече не са приложими или водят до грешки с IPFS. Тази страница е премахната от навигацията в страничната лента.
:::

IPFS има няколко стандартни услуги, които се стартират по подразбиране, като [DHT](../concepts/dht.md), [Bitswap](../concepts/bitswap.md) и diagnostics service. Всички те просто регистрират handler на IPFS PeerHost и слушат за нови връзки. Пакетът `corenet` има много чист интерфейс към тази функционалност. Нека се опитаме да създадем проста demo услуга, за да я изпробваме!

Започваме със създаване на host на услугата:

```go
package main

import (
	"fmt"

	core "github.com/ipfs/kubo/core"
	corenet "github.com/ipfs/kubo/core/corenet"
	fsrepo "github.com/ipfs/kubo/repo/fsrepo"

	"code.google.com/p/go.net/context"
)
```

Нямаме нужда от много импорти. Сега единственото друго нещо, от което се нуждаем, е main функцията:

Настройваме IPFS възел.

```go
func main() {
	// Basic ipfsnode setup
	r, err := fsrepo.Open("~/.ipfs")
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cfg := &core.BuildCfg{
		Repo:   r,
		Online: true,
	}

	nd, err := core.NewNode(ctx, cfg)

	if err != nil {
		panic(err)
	}
```

Това е просто основният шаблон на код за инициализиране на стандартен IPFS възел от конфигурацията в директорията `~/.ipfs` на потребителя.

След това ще създадем услугата.

```go
	list, err := corenet.Listen(nd, "/app/whyrusleeping")
	if err != nil {
		panic(err)
	}

	fmt.Printf("I am peer: %s\n", nd.Identity.Pretty())

	for {
		con, err := list.Accept()
		if err != nil {
			fmt.Println(err)
			return
		}

		defer con.Close()

		fmt.Fprintln(con, "Hello! This is whyrusleepings awesome ipfs service")
		fmt.Printf("Connection from: %s\n", con.Conn().RemotePeer())
	}
}
```

И това е всичко, от което се нуждаете, за да напишете услуга върху IPFS. Когато клиент се свърже, ние му изпращаме поздрав, отпечатваме идентификатора му на peer в лога и затваряме сесията. Това е най-простата възможна услуга; можете да напишете всичко, което искате, за да обработвате връзката.

Сега имаме нужда от клиент, който да се свърже с нас:

```go
package main

import (
	"fmt"
	"io"
	"os"

	core "github.com/ipfs/kubo/core"
	corenet "github.com/ipfs/kubo/core/corenet"
	peer "github.com/ipfs/kubo/p2p/peer"
	fsrepo "github.com/ipfs/kubo/repo/fsrepo"

	"golang.org/x/net/context"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please give a peer ID as an argument")
		return
	}
	target, err := peer.IDB58Decode(os.Args[1])
	if err != nil {
		panic(err)
	}

	// Basic ipfsnode setup
	r, err := fsrepo.Open("~/.ipfs")
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cfg := &core.BuildCfg{
		Repo:   r,
		Online: true,
	}

	nd, err := core.NewNode(ctx, cfg)

	if err != nil {
		panic(err)
	}

	fmt.Printf("I am peer %s dialing %s\n", nd.Identity, target)

	con, err := corenet.Dial(nd, target, "/app/whyrusleeping")
	if err != nil {
		fmt.Println(err)
		return
	}

	io.Copy(os.Stdout, con)
}
```

Този клиент ще настрои своя IPFS възел (забележка: това е сравнително скъпо и обикновено не стартирате инстанция само за едно свързване) и ще се свърже с услугата, която току-що създадохме.

За да го тествате, изпълнете следното на един компютър:

```bash
ipfs init # ако още не сте го направили
go run host.go
```

Това трябва да отпечата ID на peer-а, копирайте го и използвайте на втори компютър:

```bash
ipfs init # ако още не сте го направили
go run client.go <peerID>
```

Трябва да отпечата `Hello! This is whyrusleepings awesome ipfs service`

Сега може да се запитате: „За какво ми е това? Как е по-добре от пакета `net`?“ Ето предимствата:

1. Набираете конкретен peerID, независимо от това какъв IP адрес има в момента.
2. Използвате NAT traversal, вграден в нашия net пакет.
3. Вместо „порт“ номер, получавате много по-смислен protocol ID string.
