---
title: Пренасочвания и персонализирани 404
description: Какво представлява файлът `_redirects` и как да го използвате за уебсайт или single-page приложение (SPA) в IPFS.
---

# Пренасочвания, персонализирани 404 и поддръжка на SPA

::: callout
Тази функционалност е нова и изисква Kubo 0.16 или по-нова версия.
:::

Тази функционалност позволява поддръжка за пренасочвания, [single-page applications](#examples), [персонализирани 404 страници](#add-a-custom-404-page-to-your-website) и миграция към IPFS-backed hosting [без да се нарушават съществуващи връзки](https://www.w3.org/Provider/Style/URI).

## Оценка

Тази функционалност е ограничена до уебсайтове, хоствани в web контексти с уникални [Origins](https://en.wikipedia.org/wiki/Same-origin_policy) за root-ове на съдържанието, например [subdomain](../../how-to/address-ipfs-on-web.md#subdomain-gateway) или [DNSLink](../../how-to/address-ipfs-on-web.md#dnslink-gateway) gateway-ове.

Логиката за пренасочване се оценява само ако заявеният път не е в [DAG](../../concepts/glossary.md#dag). Всеки външен ефект от проверката за съществуване на `_redirects` файл или оценяването на правилата за пренасочване ще се проявява само при невалидни пътища. Ако има грешки при четене или парсване на `_redirects` файла, грешките ще бъдат върнати с HTTP 500 статус код.

## Как да настроите

За да дефинирате правила, които ще се изпълняват, когато заявеният път не бъде открит в DAG, трябва да има файл с име `_redirects`, съхранен под root CID на уебсайта. Този `_redirects` файл трябва да бъде текстов файл, съдържащ една или повече редове, според формата, обяснен по-долу.

### Формат на `_redirects` файла

Всеки ред в `_redirects` файла има 3 основни компонента:

```plaintext
from  to  [status]
```

1. `from` пътят. Определя пътя, от който ще се пренасочва.
1. `to` пътят. Определя пътя, към който ще се пренасочва.
1. Компонентът `status`. Той е незадължителен и определя HTTP статус кода, който ще бъде върнат. (301, 404 и др.)

Например, ако премахнете `home.html` и искате временно да пренасочите трафика от `home.html` към `index.html`, `_redirects` файлът трябва да съдържа ред, който изглежда по следния начин:

```plaintext
/home.html /index.html 302
```

### Статусни кодове

- `200` - OK (пренасочването ще се третира като rewrite, връщайки payload от алтернативен път без да се променя URL, показван в браузъра).
- `301` - Permanent redirect (по default статус).
- `302` - Found (често се използва за временни пренасочвания).
- `404` - Not found (дефинира персонализирана 404 страница).
- `410` - Gone (заявеният ресурс е премахнат завинаги).
- `451` - Unavailable for legal reasons.

### Placeholder-и

Placeholder-ите са именувани променливи, които могат да се използват за съвпадение на сегменти от пътя в `from` и да бъдат вмъкнати в `to` пътя.

Това е полезно за пренасочване на потребителите към желаното им съдържание, дори ако организацията на уебсайта е се променила.

Например, ако искам да потърся статия, озаглавена "hello world", публикувана на 15 юни 2022 г., мога да я потърся по този начин: `/posts/06/15/2022/hello-world` и да бъда пренасочен към `/articles/2022/06/15/hello-world`

```plaintext
/posts/:month/:day/:year/:title  /articles/:year/:month/:day/:title  301
```

Има и специален catch-all placeholder, наречен `:splat`, който представлява всичко, уловено чрез `*`.

```plaintext
/blog/*  /new-blog/:splat  302
```

### Съвместимост

IPFS hosting поддържа само част от съществуващите стандарти, поддържани от [Cloudflare](https://developers.cloudflare.com/pages/platform/redirects) и [Netlify](https://docs.netlify.com/routing/redirects/).
Няма overwrite/shadowing: файлът се оценява само когато заявеният път не е намерен в [DAG](../../concepts/glossary.md#dag).

::: tip
За повече информация за поддържаните функции, вижте спецификацията на файла [`_redirects`](https://specs.ipfs.tech/http-gateways/web-redirects-file/).
:::

## Примери

### Catch all и PWA/SPA поддръжка

Статусът `200` се третира като rewrite, връщайки OK без да се променя URL, показван в браузъра. Този статусен код може да се използва за изграждане на [Progressive Web Apps](https://en.wikipedia.org/wiki/Progressive_web_app) и [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application).

```plaintext
/app/* /app/index.html 200
```

Отварянето на `/app/this-does-not-exist` ще върне HTTP 200 отговор със съдържанието от `/app/index.html`

### Пренасочване на стар URL към ново място

Статусът `301` е permanent redirect, това е по default статусен код, използван, когато не е посочен друг.
Двете правила по-долу означават едно и също:

```plaintext
/old/docs.html /new/documentation.html
/old/docs.html /new/documentation.html 301
```

Статусът `302` обикновено се използва за временни пренасочвания.

```plaintext
/home /under-construction.html 302
```

За по-напреднали и catch-all пренасочвания, вижте [Placeholder-и](#placeholders).

### Добавяне на персонализирана 404 страница към вашия уебсайт

Тъй като `_redirects` се оценява само когато заявеният път не съществува,
можете да дефинирате персонализирана 404 страница за вашия уебсайт:

```plaintext
/* /custom-404.html 404
```

С горното правило, отварянето на `/this-does-not-exist` ще върне HTTP 404 Not Found отговор със съдържанието на персонализирана грешна страница, дефинирана в `custom-404.html`.
