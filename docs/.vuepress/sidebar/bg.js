// .vuepress/sidebar/bg.js
module.exports = {
  '/bg/install/': [
    ['/bg/concepts/what-is-ipfs', 'Основни концепции'],
    {
      title: 'Бърз старт',
      sidebarDepth: 1,
      collapsable: false,
      children: [
        ['/bg/quickstart/retrieve', 'Извличане от IPFS'],
        // ...
      ]
    },
    // ...
  ],
  '/bg/concepts/': [
    // ...
  ],
  // ... останалите секции
}