---
title: Автоматично обновяване на DNSLink с GitHub Actions
description: Ръководство за използване на DNSLink Action за автоматично обновяване на DNS записи при деплой на статични сайтове в IPFS.
---

# Автоматично обновяване на DNSLink с GitHub Actions

Това ръководство обяснява как автоматично да обновявате [DNSLink](../../concepts/dnslink.md) записи, когато разгръщате сайта си в IPFS. В края на него DNS-ът автоматично ще сочи към най-новия CID, когато изпълните push към вашето хранилище.

DNSLink позволява на потребителите да достъпват вашето съдържание, хоствано в IPFS, чрез четимо домейнно име като `docs.ipfs.tech` вместо CID като `bafybeic...`. В комбинация с [ipshipyard/ipfs-deploy-action](./deploy-github-action.md) получавате пълен CI/CD pipeline за IPFS уебсайтове.

## Предварителни изисквания

Преди да започнете, се уверете, че имате:

1. Вашият сайт е разгръщан в IPFS с CID (виж [Deploy static apps to IPFS with GitHub Actions](./deploy-github-action.md))
2. Домейнно име, чийто DNS се управлява от [поддържан доставчик](#step-1-configure-dns-provider) (Cloudflare, DNSimple или Gandi), или всеки друг доставчик чрез [generic DNS tools](#alternative-generic-dns-tools)
3. GitHub хранилище с активирани Actions

## Съображения за сигурност

::: warning API Token Security
DNS API токените са чувствителни данни. Ако бъдат компрометирани, атакуващият може да редактира DNS записите ви и евентуално да пренасочи домейна към злонамерено съдържание.

За open source проекти, които приемат pull request-ове от fork-ове, използвайте [two-workflow pattern](#two-workflow-pattern-for-open-source-projects), за да гарантирате, че кодът от fork-ове никога няма достъп до вашите DNS credentials.
:::

## Стъпка 1: Конфигуриране на DNS доставчик

[ dnslink-action](https://github.com/ipshipyard/dnslink-action) предоставя готови DNSLink обновявания с вградени защитни функции за доставчиците по-долу. Ако вашият доставчик не е изброен, вижте [Alternative: Generic DNS Tools](#alternative-generic-dns-tools).

### Опция A: Cloudflare (препоръчително)

1. Влезте в [Cloudflare dashboard](https://dash.cloudflare.com/) и изберете вашия домейн
2. Отидете в раздела **Overview** и превъртете надолу, за да намерите **Zone ID** ([подробни инструкции](https://github.com/ipshipyard/dnslink-action#finding-your-zone-id))
3. Отидете в **My Profile** > **API Tokens** > **Create Token** ([подробни инструкции](https://github.com/ipshipyard/dnslink-action#creating-an-api-token))
4. Създайте custom token с тези permissions:
   - Zone > DNS > Edit
   - Ограничете токена до вашия конкретен zone
5. Добавете и двете стойности като [GitHub secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions):
   - `CF_ZONE_ID`: Вашият Zone ID
   - `CF_AUTH_TOKEN`: Вашият API token

За визуално ръководство вижте [Cloudflare video tutorial](https://github.com/ipshipyard/dnslink-action#cloudflare-video-tutorial).

### Опция B: DNSimple

1. Влезте в DNSimple и отидете на **Account** > **Access Tokens**
2. Създайте нов API token
3. Добавете го като GitHub secret с име `DNSIMPLE_TOKEN`

### Опция C: Gandi

1. Влезте в [Gandi](https://www.gandi.net/) и отидете на **Account** > **Security** > **Personal Access Tokens**
2. Създайте нов token с permissions за DNS управление
3. Добавете го като GitHub secret с име `GANDI_TOKEN`

## Стъпка 2: Добавяне на DNSLink Action към workflow-а

Добавете [ipshipyard/dnslink-action](https://github.com/ipshipyard/dnslink-action) към вашия workflow след деплоя в IPFS. Action-ът взима CID от [ipshipyard/ipfs-deploy-action](https://github.com/ipshipyard/ipfs-deploy-action) и обновява DNS записа ви.

За пълни примери за workflow, вижте:

- [Simple workflow (no fork PRs)](https://github.com/ipshipyard/ipfs-deploy-action#simple-workflow-no-fork-prs) — единичен workflow за хранилища, които не приемат външни приноси
- [Dual workflows (with fork PRs)](https://github.com/ipshipyard/ipfs-deploy-action#dual-workflows-with-fork-prs) — сигурен модел за open source проекти

За конфигурация специфична за DNS доставчика вижте [ipshipyard/dnslink-action README](https://github.com/ipshipyard/dnslink-action#usage).

## Стъпка 3: Проверка на DNSLink записа

След като workflow-ът се изпълни, проверете DNSLink записа:

```bash
dig +short TXT _dnslink.yourdomain.com
```

Трябва да видите подобен резултат:

```
"dnslink=/ipfs/bafybeic..."
```

## Алтернатива: Generic DNS Tools

Ако вашият DNS доставчик не е поддържан от dnslink-action, или имате нужда от по-голям контрол върху DNS обновяванията, можете да използвате generic DNS automation инструменти в custom workflow стъпка.

DNSLink е TXT запис на `_dnslink` поддомейн. За да го обновите, задайте TXT запис на `_dnslink.yourdomain.com` със стойност:

```
dnslink=/ipfs/<CID>
```

Където `<CID>` е output-ът от [ipshipyard/ipfs-deploy-action](https://github.com/ipshipyard/ipfs-deploy-action).

Инструменти, които поддържат много DNS доставчици:

- [OctoDNS](https://github.com/octodns/octodns) — поддържа [много доставчици](https://octodns.readthedocs.io/en/latest/#providers), включително AWS Route53, Google Cloud DNS, Azure DNS, DigitalOcean и NS1. Може да се изпълнява в CI за синхронизиране на DNS записи от config файлове.
- [Terraform DNS providers](https://registry.terraform.io/search/providers?q=dns) — полезни, ако вече управлявате инфраструктурата си с Terraform.
- API на вашия доставчик директно чрез custom script или GitHub Action стъпка.

## Two-Workflow Pattern за open source проекти

За хранилища, които приемат pull request-ове от fork-ове, използвайте two-workflow pattern, за да запазите secrets сигурни. Това е критично, защото **pull request-овете от fork-ове могат да съдържат злонамерен код, който да изтегли вашите secrets**.

Решението е да отделите build-а (който изпълнява ненадежден код) от деплоя (който използва secrets):

1. **Build workflow**: Изпълнява се при PR events, изгражда сайта, качва artifact. Няма secrets.
2. **Deploy workflow**: Стартира се чрез `workflow_run` event след успешен build. Има достъп до secrets, но изпълнява само доверен action код, не fork code.

За пълни примери на workflow вижте:

- [ipshipyard/ipfs-deploy-action: Dual workflows with fork PRs](https://github.com/ipshipyard/ipfs-deploy-action#dual-workflows-with-fork-prs)
- [ipshipyard/dnslink-action: Dual workflows for secure fork PRs](https://github.com/ipshipyard/dnslink-action#dual-workflows-for-secure-fork-prs)

## Сигурност: Sandboxed DNS Zone

За допълнителна сигурност използвайте sandboxed DNS zone, за да ограничите това, което CI API tokenът може да редактира. По този начин, ако tokenът бъде компрометиран, атакуващият може да променя само TXT записи в отделен zone, а не DNS записите на основния ви домейн (като A, MX или NS).

### Как работи

Вместо да давате директен достъп на CI до DNS на вашия домейн:

1. Създайте отделен zone за DNSLink записи (напр. `dnslinks.example.com`)
2. Създайте API token, ограничен само до този zone
3. На основния домейн добавете CNAME запис, сочещ `_dnslink.yourdomain.com` към `_dnslink.yourdomain.dnslinks.example.com`
4. Action-ът обновява TXT записа в sandboxed zone

За подробни инструкции за настройка вижте [ipshipyard/dnslink-action security documentation](https://github.com/ipshipyard/dnslink-action#security-sandboxed-dnslink-domain).

## HTTP Hosting

DNSLink свързва домейнно име с CID, което позволява на IPFS gateway-овете да обслужват съдържанието. Освен това имате нужда от HTTP hosting за потребители, които достъпват сайта директно чрез `https://yourdomain.com`.

Имате две възможности:

1. **Self-hosted**: Стартирайте собствен Kubo + Caddy setup, който разрешава DNSLink и обслужва съдържанието през HTTPS. Вижте [Setup a DNSLink Gateway](./dnslink-gateway.md).

2. **Third-party hosting**: Разгънете сайта в [GitHub Pages](https://pages.github.com/), [Cloudflare Pages](https://pages.cloudflare.com/) или [Netlify](https://www.netlify.com/). Те обслужват HTTP независимо, докато DNSLink осигурява IPFS достъп за потребители с локални възли или gateway-ове.

## Отстраняване на проблеми

1. **DNSLink не се обновява**

   - Проверете дали API tokenът има permissions за DNS editing
   - Проверете дали `dnslink_domain` съвпада с вашата DNS настройка
   - Прегледайте logs на GitHub Actions за съобщения за грешки

2. **Забавяне на DNS propagation**

   - DNS промените могат да отнемат време, за да се разпространят
   - Използвайте `dig`, за да проверите authoritative nameserver директно

3. **CNAME не се разрешава**
   - Уверете се, че CNAME target включва пълно домейнно име
   - Проверете дали и двете зони са конфигурирани правилно configured

## Getting Help

If you encounter issues:

1. Check the GitHub Actions run logs for detailed error messages
2. Review the [ipshipyard/dnslink-action README](https://github.com/ipshipyard/dnslink-action) for updates
3. Open an issue in the [action's repository](https://github.com/ipshipyard/dnslink-action/issues/new)
