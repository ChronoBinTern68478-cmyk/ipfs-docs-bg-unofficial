---
title: Използване на `window.ipfs`
description: Научете за експонирането на IPFS API в IPFS Companion чрез "window.ipfs".
---

# Използване на `window.ipfs` в IPFS Companion

Научете за експонирането на IPFS API в IPFS Companion чрез `window.ipfs`.

::: danger

## `window.ipfs` в момента е деактивиран

IPFS Companion 2.11 спря да инжектира `window.ipfs`. В момента той е постоянно деактивиран според коментарите в [window.ipfs Meta Issue](https://github.com/ipfs/ipfs-companion/issues/589#issuecomment-712356448), от 19 октомври 2020 г., и [Remove legacy window.ipfs](https://github.com/ipfs/in-web-browsers/issues/172) от 14 декември 2020 г. Тази страница е предоставена само за справка.

<!-- below disclaimer will be restored  when window.ipfs injection resumes
### Disclaimer

The interface is experimental and might change: there is a substantial amount of [ongoing work](https://github.com/ipfs/ipfs-companion/issues/589). Want to help with shaping it? See [#589](https://github.com/ipfs/ipfs-companion/issues/589) and [issues with the `area/window-ipfs` label](https://github.com/ipfs-shipyard/ipfs-companion/labels/area%2Fwindow-ipfs).
-->

:::

## Предистория

IPFS Companion експонира подмножество от IPFS API-та като `window.ipfs` на всяка уеб страница. Това означава, че уебсайтовете могат да открият, че `window.ipfs` вече съществува, и да го използват вместо да стартират собствен `js-ipfs` възел, което спестява ресурси, батерия и др.

За повече контекст вижте:

- Първа версия: [window.ipfs v1](https://github.com/ipfs-shipyard/ipfs-companion/issues/330)
- Втора версия (отхвърлена): [window.ipfs v2](https://github.com/ipfs/ipfs-companion/issues/589)

## Създаване на приложения с `window.ipfs`

Ако потребител е инсталирал IPFS Companion, `window.ipfs` ще бъде наличен веднага щом първият скрипт се изпълни на вашата уеб страница, така че ще можете да го откриете с прост `if` израз:

```js
if (window.ipfs && window.ipfs.enable) {
  const ipfs = await window.ipfs.enable({ commands: ['id', 'dag', 'version'] })
  console.log(await ipfs.id())
} else {
  // Резервен вариант
}
```

За да добавяте и извличате съдържание, можете да актуализирате горния пример така:

<!-- TODO: update below example to use async iterators:
https://blog.ipfs.tech/2020-02-01-async-await-refactor/
-->

```js
if (window.ipfs && window.ipfs.enable) {
  try {
    const ipfs = await window.ipfs.enable({ commands: ['add', 'cat'] })
    const [{ hash }] = await ipfs.add(Buffer.from('=^.^='))
    const data = await ipfs.cat(hash)
    console.log(data.toString()) // =^.^=
  } catch (err) {
    if (err.code === 'ERR_IPFS_PROXY_ACCESS_DENIED') {
      // Proxy съществува, но потребителят отказа достъп.
      // (тук идва fallback към js-ipfs или js-ipfs-http-client)
    } else {
      // Възникна друга грешка (обработка на грешки)
      throw err
    }
  }
} else {
  // Няма IPFS Proxy
  // (тук идва fallback към js-ipfs или js-ipfs-http-client)
}
```

::: tip

Използвайте [ipfs-provider](https://github.com/ipfs-shipyard/ipfs-provider), за да гарантирате, че вашето приложение следва бъдещи промени в този интерфейс. Това намалява количеството код, необходимо за надежден fallback към HTTP API или embedded js-ipfs, когато `window.ipfs` не е наличен.

:::

### Кодове на грешки

Грешките, върнати от IPFS proxy, могат да бъдат идентифицирани по стойността на атрибута `code`.

`ERR_IPFS_PROXY_ACCESS_DENIED` се хвърля, когато текущият scope няма права за заявените команди.

Незадължителните атрибути `scope` и `permissions` предоставят подробна информация:

- Ако достъпът е отказан за конкретна команда, списъкът `permissions` е наличен и включва имената на блокираните команди.
- Ако целият IPFS proxy е бил деактивиран от потребителя, списъкът `permissions` изобщо липсва.

## Въпроси и отговори

### Какво представлява `window.ipfs`?

Това е IPFS proxy endpoint, който ви позволява да получите IPFS API инстанция. В зависимост от конфигурацията на IPFS Companion, може да говорите директно с `js-ipfs` възел, работещ в Companion, с `kubo` daemon чрез `js-ipfs-http-client`, или с `js-ipfs` daemon чрез `js-ipfs-http-client` ... и потенциално други възможности в бъдеще. Имайте предвид, че обектът, върнат от `window.ipfs.enable`, _не_ е инстанция на `js-ipfs` или `js-ipfs-http-client`, а proxy към един от тях, така че не очаквайте да можете да разпознаете нито един от тях или да използвате каквито и да било недокументирани или специфични за инстанцията функции.

За информация за наличните функции вижте документите на [js-ipfs](https://github.com/ipfs/js-ipfs) и [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client). Ако установите, че липсват някои нови функции, proxy вероятно е остарял. Моля, проверете [текущия статус](https://github.com/tableflip/ipfs-postmsg-proxy#current-status) и изпратете PR.

### Как да направя fallback, ако `window.ipfs` не е наличен?

Вижте [примерния код](https://github.com/ipfs/ipfs-companion/blob/v2.19.1/examples/window.ipfs-fallback.html) за получаване на IPFS инстанция с fallback.

**Съвет:** Използвайте библиотеката [window.ipfs-fallback](https://www.npmjs.com/package/window.ipfs-fallback), която се грижи за procedure на fallback. Тя гарантира, че вашето приложение следва промените в API и не се счупва в бъдеще.

### Какво е със конфигурацията на IPFS възела?

В момента достъпът до командата `config` е блокиран и не можете да правите никакви предположения за това как е конфигуриран възелът. Например, потребителят може да няма активирани експериментални функции като PubSub.

Създайте отделен js-ipfs инстанс, ако имате нужда от нестандартна конфигурация или експериментални функции.

### Има ли контрол на разрешенията (ACL)?

Да. Потребителите на IPFS Companion могат селективно да контролират достъпа до proxy-натите команди, така че извикванията могат да бъдат отхвърлени (или да върнат callback) с [грешка](#error-codes), ако потребителят реши да откаже достъп. Първия път, когато извикате proxy функция, потребителят ще бъде подканен да разреши или откаже достъпа, и това решение ще бъде запомнено за следващи извиквания. Ето как изглежда това:

![single permission dialog in Firefox](./images/companion-permissions.png =740x463)

### Трябва ли да потвърждавам всяко API извикване?

Достъпът до командите се потвърждава само веднъж [за всеки scope](#how-are-permissions-scoped). Ако подадете списък с команди, когато искате да получите API инстанция чрез `window.ipfs.enable({commands})`, на потребителя ще бъде показан само един permission dialog:

![bulk permission dialog in Firefox](./images/companion-permissions-bulk.png =740x460)

За всичко останало само първото извикване изисква решение от потребителя. Вие ще можете да извиквате вече разрешените IPFS команди, и потребителите няма да бъдат подканени да разрешават/отказват достъп втори път.

Имайте предвид, че потребителите могат да променят решенията си за разрешенията след това, така че не трябва да очаквате винаги да имате разрешение да извиквате команда, дори ако тя е била успешно извиквана преди.

### Мога ли да деактивирам това?

Потребителите могат постоянно да откажат достъп до всички IPFS команди, като изключат експеримента `window.ipfs` в настройките на IPFS Companion.

### Как се scope-ват разрешенията?

Разрешенията са ограничени до **origin и path** (и sub-paths) на файла, от който е поискано разрешението.

Scoped permissions в `window.ipfs` работят по подобен начин на [service worker registrations](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Examples), с изключение че потребителят не може да контролира scope, а той се задава от origin и path, от които е поискано разрешението.

Scope-based permissions позволяват на приложения, работещи на IPFS gateway, да получат различни разрешения. Помислете за следните два уебсайта, работещи на ipfs.io gateway:

- [QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4](https://ipfs.io/ipfs/QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4/)
- [QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV](https://ipfs.io/ipfs/QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV/)

С [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), на тези две приложения ще бъдат дадени едни и същи разрешения. С scoped permissions те ще получат различен набор от разрешения. Например:

- Разреши `files.add` за `https://domain.com/`
  - ...ще позволи `files.add` за:
    - `https://domain.com/file`
    - `https://domain.com/file2.html`
    - `https://domain.com/sub/paths`
    - `https://domain.com/sub/paths/files`
    - др.
- Разреши `files.add` за `https://domain.com/feature`
  - ...ще позволи `files.add` за:
    - `https://domain.com/feature/file`
    - `https://domain.com/feature/file2.html`
    - `https://domain.com/feature/sub/paths`
    - `https://domain.com/feature/sub/paths/files`
    - `https://domain.com/featuresearch/sub/paths/files` (забележете substring)
    - `https://domain.com/features.html` (забележете substring)
    - др.
  - ...ще доведе до допълнителен prompt за `files.add` за:
    - `https://domain.com/`
    - `https://domain.com/files`
    - др.

### Сандбоксирани ли са файловете в Mutable File System (MFS) към директория?

Да. За да избегнете конфликти, всяко приложение получава собствена MFS директория, където може да съхранява файлове. При използване на MFS команди ([повече информация](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system)), тази директория автоматично се добавя към пътищата, които предавате. MFS директорията на приложението се основава на **origin и path**, където работи приложението. Например:

- `files.write` към `/myfile.txt` на `https://domain.com/`
  - записва в `/dapps/https/domain.com/myfile.txt`
- `files.write` към `/path/to/myfile.txt` на `https://domain.com/feature`
  - записва в `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.read` от `/feature/path/to/myfile.txt` на `https://domain.com/`
  - чете от `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.stat` към `/` на `https://domain.com/feature`
  - stats `/dapps/https/domain.com/feature`
- `files.read` от `/../myfile.txt` на `https://domain.com/feature`
  - чете от `/dapps/https/domain.com/feature/myfile.txt` (без да се движи над root-а на приложението)
