---
title: DNSLink
description: Научете как да свържете съдържанието на IPFS с DNS имена чрез DNSLink.
---

# DNSLink

DNSLink използва [DNS `TXT` записи](https://en.wikipedia.org/wiki/TXT_record), за да свърже DNS име, например [`docs.ipfs.tech`](https://docs.ipfs.tech), с IPFS адрес или име на [IPNS](../concepts/ipns.md). Тъй като можете да редактирате DNS записите си, можете да ги използвате, за да сочат винаги към най-новата версия на обект в IPFS. Тъй като DNSLink използва DNS записи, можете да задавате имена, пътища и поддомейни, които са лесни за въвеждане, четене и запомняне.

Адресът на DNSLink изглежда като адрес на [IPNS](ipns.md), но вместо хеширан публичен ключ използва DNS име:

```
/ipns/example.org
```

Както при нормалните IPFS адреси, те могат да включват връзки към други файлове — или други типове ресурси, които IPFS поддържа, като директории и symlink-ове:

```
/ipns/example.org/media/
```

## Публикуване на път към съдържание

Публикувайте съответствието като DNS `TXT` запис, използвайки вашето име на хост, с префикс `_dnslink`.

Това не само прави търсенето на DNSLink по-ефективно, като връща само подходящите `TXT` записи, но също така ви позволява да подобрите сигурността на автоматизирана настройка или да делегирате контрол върху DNSLink записите си на трета страна, без да давате пълен контрол върху оригиналната DNS зона.

Например, [`docs.ipfs.tech`](https://docs.ipfs.tech) се зарежда, защото съществува `TXT` запис за `_dnslink.docs.ipfs.tech`. Ако проверите DNS записите за `_dnslink.docs.ipfs.tech`, ще видите DNSLink записа:

```shell
dig +noall +answer TXT _dnslink.docs.ipfs.tech
> _dnslink.docs.ipfs.tech. 30 IN TXT "dnslink=/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta"

```

## Разрешаване на име на DNSLink

Когато клиент или възел на IPFS се опитва да разреши адрес, той търси `TXT` запис, който е с префикс `dnslink=`. Останалата част може да бъде връзка `/ipfs/` (както в примера по-долу), или `/ipns/`, или дори връзка към друг DNSLink.

```

dnslink=/ipfs/<CID на вашето съдържание тук>

```

Например, нека се върнем към момента, в който проверихме DNS записите за `_dnslink.docs.ipfs.tech` и видяхме DNSLink записа:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.tech
_dnslink.docs.ipfs.tech.  34  IN  TXT "dnslink=/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta"
```

Въз основа на това, този адрес:

```
/ipns/docs.ipfs.tech/introduction/
```

ще ви даде този блок:

```
/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta/introduction/
```

## Допълнителни ресурси

За повече информация как да използвате DNSLink за вашия уебсайт или приложение, вижте ръководството [Custom domains and DNSLink](../how-to/websites-on-ipfs/custom-domains.md).

За пълно ръководство за DNSLink — включително уроци, примери за използване и често задавани въпроси — вижте [dnslink.dev](https://dnslink.dev/).

