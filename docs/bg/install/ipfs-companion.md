---
title: IPFS Companion
description: Разширението на браузъра IPFS Companion ви позволява да взаимодействате с вашия IPFS възел и разширената IPFS мрежа през браузъра. Научете как да го инсталирате тук.
---

# Инсталирайте браузърното разширение IPFS Companion

IPFS Companion ви позволява да взаимодействате с вашия IPFS възел и разширената IPFS мрежа през браузъра. Добавката е налична за Brave, Chrome, Edge, Firefox, Opera и всеки друг Chromium-базиран уеб браузър.

Тя осигурява поддръжка за `ipfs://` и `ipns://` адреси, автоматично зарежда уебсайтове и пътища към файлове от локален IPFS gateway, позволява лесно импортиране и споделяне на файл с IPFS и още много други.

## Предварителни изисквания

За пълната функционалност да бъде активирана, IPFS Companion изисква локален IPFS възел. Поради това се препоръчва да имате инсталиран и стартиран IPFS възел на вашия компютър. Всяка от следните опции ще отговаря на изискването:

- [Инсталирайте приложението IPFS Desktop](../install/ipfs-desktop.md)
- [Инсталирайте IPFS Kubo CLI и Daemon](../install/command-line.md)

## Инсталиране

Най-лесният начин да инсталирате IPFS Companion е през конкретния магазин за разширения и добавки на вашия браузър:

| [Firefox](https://www.mozilla.org/firefox/new/) \| [Firefox for Android](https://play.google.com/store/apps/details?id=org.mozilla.firefox)          | [Chrome](https://www.google.com/chrome/) \| [Brave](https://brave.com/) \| [Opera](https://www.opera.com/) \| [Edge](https://www.microsoft.com/en-us/edge/download)                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Install From AMO](https://ipfs.io/ipfs/QmWNa64XjA78QvK3zG2593bSMizkDXXcubDHjnRDYUivqt)](https://addons.mozilla.org/firefox/addon/ipfs-companion/) | [![Install from Chrome Store](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)](https://chromewebstore.google.com/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch) |


## Функции

IPFS Companion усилва браузъра ви за DWeb с функции, включващи следното:

### Разпознаване на URL адреси с IPFS пътища

IPFS Companion разпознава и проверява заявки за IPFS-подобни пътища, като `/ipfs/{cid}` или `/ipns/{peerid_or_host-with-dnslink}`, на всеки уебсайт. Ако пътят е валиден IPFS адрес, той се пренасочва да се зарежда от локалния ви gateway, който преобразува данните от един протокол в друг. Gateway на `localhost` също автоматично ще превключи към subdomain, за да осигури уникален origin за всеки уебсайт. Осигуряването на уникален origin съответства на операции, които са ограничени до съдържание, което споделя един и същ протокол, домейн и порт, известни като [same-origin content](https://en.wikipedia.org/wiki/Same-origin_policy#:~:text=In%20computing%2C%20the%20same%2Dorigin,pages%20have%20the%20same%20origin).

> `https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`
> → `http://localhost:8080/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`
> → `http://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.localhost:8080`

### Разпознаване на URL адреси с DNSLink

IPFS Companion разпознава информация за DNSLink в DNS записите на уебсайтове. DNSLink е прост протокол, който свързва съдържанието и наличността от DNS и използва DNS разпределената архитектура. Вижте [Glossary > DNSLink](../concepts/glossary.md#dnslink). Ако сайтът използва DNSLink, IPFS Companion пренасочва HTTP заявката към локалния ви gateway:

> `http://docs.ipfs.tech`
> → `http://localhost:8080/ipns/docs.ipfs.tech` → `http://docs.ipfs.tech.ipns.localhost:8080/`

### Превключване на пренасочванията глобално или за конкретен сайт

Можете да деактивирате и повторно активирате локалните gateway пренасочвания по няколко начина:

- Спирайте пренасочванията глобално в настройките на IPFS Companion.
- Спирайте пренасочванията за конкретен сайт с превключвателя под _текущия раздел_ или в настройките на IPFS Companion.

### Достъп до често използвани IPFS действия от лентата на браузъра

IPFS Companion ви позволява бързо и лесно да получавате достъп до често срещани действия от лентата на браузъра с няколко клика:

- Вижте колко peers сте свързани, като погледнете иконата на куб в лентата на браузъра.
- Проверявайте статуса на вашия IPFS API и gateway, като кликнете върху иконата на куб, за да се покаже главното меню.
- Щракнете с десния бутон върху изображения и други ресурси на страницата, за да ги добавите лесно към IPFS, включително опцията да запазите имената на файловете.
- Изберете опцията _Import_ в главното меню за бърз drag-and-drop импорт от таб на браузъра.
- Закачайте или премахвайте IPFS ресурси директно от главното меню.
- Копирайте споделяеми публични gateway връзки, IPFS пътища на съдържанието или CIDs на IPFS ресурси директно от главното меню.
- Стартирайте [IPFS Web UI dashboard](https://github.com/ipfs/ipfs-webui) от главното меню с един клик.
- Превключвайте gateway пренасочванията или изключвайте/включвайте всички функции на IPFS Companion бързо и лесно от главното меню.

## Допълнителна документация

Ако искате да навлезете по-дълбоко в IPFS Companion, разгледайте документацията на проекта на [github.com/ipfs/ipfs-companion →](https://github.com/ipfs/ipfs-companion)
