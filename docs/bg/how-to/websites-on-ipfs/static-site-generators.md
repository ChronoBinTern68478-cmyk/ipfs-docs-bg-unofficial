---
title: Генератори на статични сайтове
description: Ръководство за конфигуриране на популярни генератори на статични сайтове (Next.js, Hugo, VuePress, Middleman, Jekyll) за оптимален деплой в IPFS, включително най-добри практики и съвети за конфигуриране.
---

# Генератори на статични сайтове

Генераторите на статични сайтове като Hugo, Jekyll, Middleman, Next.js и VuePress са популярни платформи за бързо създаване на статични сайтове. Това ръководство показва как да конфигурирате всеки от тези генератори за деплой в IPFS.

Вижте [IPFS Deploy GitHub Action Guide](./deploy-github-action.md), за да автоматизирате деплоя на вашия статичен сайт в IPFS с GitHub Actions.

## Next.js

Когато деплоирате Next.js сайт в IPFS, уверете се, че сайтът използва [Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation), така че да може да бъде [създаден като статичен сайт](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

1. Първо, уверете се, че вашият `next.config.js` файл има следните настройки:

```js
module.exports = {
  output: 'export', // Enables static exports
  trailingSlash: true // Required for IPFS gateway compatibility
}
```

Основни точки за конфигурацията:

- `output: "export"` казва на Next.js да генерира статичен сайт
- `trailingSlash: true` гарантира, че routing-ът работи, когато сайтът се сервира през IPFS gateways (които изискват `index.html` файл за всяка route)

За да създадете вашия Next.js сайт:

```bash
npx next build
```

Статичният сайт ще бъде генериран в директорията `./out`.

### Важни съображения

- Използвайте само [Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) функции.
- Server-side функции като `getServerSideProps` или API routes няма да работят.
- Dynamic route-овете трябва да бъдат предварително рендерирани по време на build.
- Използвайте relative URL адреси за всички вътрешни връзки.

## Hugo

Вижте [Quick Start](https://gohugo.io/getting-started/quick-start/) на Hugo, за да инсталирате и настроите проекта си.

В `config.toml` добавете `relativeURLs` и задайте стойността му на `true`.

```
relativeURLs=true
```

Създаване на статични страници

```bash
hugo -D
```

По default изходът ще бъде в директорията `./public/`. Качете папката `public` в IPFS.

## VuePress

Вижте [Getting Started](https://vuepress.vuejs.org/guide/getting-started.html) на VuePress, за да инсталирате и настроите проекта си.

За да създадете статичен сайт:

```bash
vuepress build
```

По default изходът ще бъде в директорията `./.vuepress/dist`.

Използвайте команда, която преобразува статичен сайт да използва само relative URL адреси. В този пример ще използваме [all-relative](https://www.npmjs.com/package/all-relative)

```bash
cd .vuepress/dist/
npx all-relative
```

Качете папката `dist` в IPFS.

## Middleman

Вижте [Installation](https://middlemanapp.com/basics/install/) на Middleman, за да инсталирате Ruby и Middleman.

1. Активирайте relative links и забранете strip на index файла в `config.rb` на вашия проект:

   ```ruby
   set :relative_links, true
   set :strip_index_file, false
   ```

Връзките, генерирани от `link_to` helper-а или от Markdown, ще станат relative.

1. Създайте вашия статичен сайт:

   ```bash
   middleman build
   ```

   Middleman ще изведе сайта ви в папката `./build`.

1. Качете папката `build` в IPFS.

## Jekyll

Вижте [Installation](https://jekyllrb.com/docs/installation/) на Jekyll, за да инсталирате Ruby и Jekyll.

Вижте [Quickstart](https://jekyllrb.com/docs/) на Jekyll, за да настроите проекта си.

За да създадете статичен сайт:

```bash
jekyll build
```

По default изходът ще бъде в `./_site`.

Използвайте команда, която преобразува статичен сайт да използва само relative URL адреси. В този пример ще използваме [all-relative](https://www.npmjs.com/package/all-relative)

```bash
cd _site/
npx all-relative
```

Качете папката `_site` в IPFS.

## WordPress

Въпреки че WordPress не е генератор на статични сайтове, е възможно да бъде превърнат в статичен уебсайт, който да се деплойва в IPFS.

Има няколко плъгина, които помагат за генериране на статична версия на WordPress сайта:

- [WP2Static](https://github.com/elementor/wp2static)
- [Simply Static](https://wordpress.org/plugins/simply-static/)
