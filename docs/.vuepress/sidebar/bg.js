// .vuepress/sidebar/bg.js
module.exports = {
  '/bg/install/': [
     {
              title: 'Install',
              sidebarDepth: 1,
              collapsable: false,
              children: installMenuChildren
            },
    ],
  '/quickstart/':  [
    {
      title: 'Бърз старт',
      sidebarDepth: 1,
      collapsable: false,
      children: [
        ['/bg/quickstart/retrieve', 'Извличане от IPFS'],
        ['/bg/quickstart/pin','Pin (Browser)'],
        ['/bg/quickstart/pin-cli','Pin (CLI)'],
        ['/bg/how-to/websites-on-ipfs/deploy-github-action', 'Deploy to IPFS with GitHub Actions' ],
      ]
    },
    // ...
  ],
  '/bg/concepts/': [
    ['/bg/concepts/what-is-ipfs', 'Основни концепции'],
     {
              title: 'Basics',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                  '/bg/concepts/what-is-ipfs',
                  '/bg/concepts/ipfs-solves',
                  '/bg/concepts/how-ipfs-works',
              ]
            },
    
            {
              title: 'Ideas and theory',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                  '/bg/concepts/lifecycle',
                  '/bg/concepts/hashing',
                  '/bg/concepts/immutability',
                  '/bg/concepts/persistence',
                  '/bg/concepts/privacy-and-encryption',
                  '/bg/concepts/nodes',
              ]
            },
            {
              title: 'Subsystems and components',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/concepts/content-addressing',
                '/bg/concepts/bitswap',
                '/bg/concepts/dht',
                '/bg/concepts/dnslink',
                '/bg/concepts/file-systems',
                '/bg/concepts/ipfs-gateway',
                ['https://ipld.io/docs/intro/primer/', 'IPLD (InterPlanetaryLinkedData)' ],
                '/bg/concepts/ipni',
                '/bg/concepts/ipns',
                '/bg/concepts/libp2p',
                '/bg/concepts/merkle-dag'
              ]
            },
            {
              title: 'Implementations',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['/bg/concepts/implementations', 'Implementations explained'],
                ['/bg/concepts/ipfs-implementations', 'List of implementations']
              ]
            },
            '/bg/concepts/cod',
            '/bg/concepts/comparisons',
            '/bg/concepts/public-utilities',
            ['/bg/concepts/measuring', 'Measuring the network'],
            '/bg/concepts/faq',
            '/bg/concepts/glossary',
            '/bg/concepts/further-reading/academic-papers'
          ],
          '/bg/how-to/': [
            '/bg/how-to/desktop-app',
            {
              title: 'IPFS Kubo Tutorials',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/kubo-basic-cli',
                '/bg/how-to/command-line-quick-start',
                '/bg/how-to/configure-node',
                '/bg/how-to/modify-bootstrap-list',
                '/bg/how-to/nat-configuration',
                '/bg/how-to/kubo-rpc-tls-auth',
                '/bg/how-to/kubo-garbage-collection',
                '/bg/how-to/troubleshooting-kubo',   
                '/bg/how-to/webtransport',   
                '/bg/install/run-ipfs-inside-docker',
                '/bg/how-to/observe-peers',
                '/bg/how-to/peering-with-content-providers'
              ]
            },
            {
              title: 'Scientific Data',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/scientific-data/landscape-guide',
                '/bg/how-to/scientific-data/publish-geospatial-zarr-data',
              ]
            },
            {
              title: 'Troubleshooting',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/troubleshooting',
                '/bg/how-to/troubleshooting-kubo',
                '/bg/reference/diagnostic-tools',
                '/bg/how-to/nat-configuration',
              ]
            },
            {
              title: 'Manage files',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/work-with-blocks',
                '/bg/how-to/pin-files',
                '/bg/how-to/work-with-pinning-services',
                '/bg/how-to/take-snapshot',
                '/bg/how-to/store-play-videos',
                '/bg/how-to/host-git-repo',
                '/bg/how-to/move-ipfs-installation/move-ipfs-installation',
                '/bg/how-to/content-addressing-data-sets',
              ]
            },
            {
              title: 'Websites on IPFS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/websites-on-ipfs/single-page-website',
                '/bg/how-to/websites-on-ipfs/multipage-website',
                '/bg/how-to/websites-on-ipfs/static-site-generators',
                '/bg/how-to/websites-on-ipfs/redirects-and-custom-404s',
                '/bg/how-to/websites-on-ipfs/custom-domains',
                '/bg/how-to/websites-on-ipfs/deploy-github-action',
                '/bg/how-to/websites-on-ipfs/dnslink-action',
                '/bg/how-to/websites-on-ipfs/dnslink-gateway',
              ]
            },
            {
              title: 'IPFS on the web',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/ipfs-in-web-apps',
                '/bg/how-to/address-ipfs-on-web',
              ]
            },
            {
              title: 'IPNS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/publish-ipns'
              ]
            },
            {
              title: 'IPFS Gateway',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/gateway-best-practices',
                '/bg/how-to/replace-public-gateways-with-self-hosted-ipfs',
                '/bg/how-to/troubleshooting',
              ]
            },
            {
              title: 'IPFS Companion',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/companion-node-types',
                '/bg/how-to/dnslink-companion'
              ]
            },
            {
              title: 'IPFS & Blockchain Networks',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/how-to/best-practices-for-nft-data'         
              ]
            },
            {
              title: 'Privacy and Encryption',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['/bg/how-to/privacy-best-practices', 'Privacy and Encryption'], 
              ]
            },
          ],
          '/bg/reference/': [
            '/bg/reference/diagnostic-tools',
            '/bg/reference/http/gateway',
            '/bg/reference/js/api',
            '/bg/reference/go/api',
            {
              title: 'Kubo CLI',
              sidebarDepth: 1,
              collapsable: true,
              path: '/bg/reference/kubo/cli'
            },
            {
              title: 'Kubo RPC API',
              sidebarDepth: 1,
              collapsable: true,
              path: '/bg/reference/kubo/rpc'
            },
            '/bg/reference/kubo-rpc-cli.md',
            {
              path: 'https://specs.ipfs.tech',
              title: 'IPFS Specifications',
            }
          ],
          '/bg/community/': [
            ['/bg/community/', 'Join the community'],
            '/bg/community/contribute/ways-to-contribute',
            {
              title: 'Write the docs',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/bg/community/contribute/grammar-formatting-and-style',
                '/bg/community/contribute/writing-guide',
                '/bg/community/contribute/code-persona',
                '/bg/community/contribute/contribution-tutorial'
              ]
            },
            '/bg/project/history',
            '/bg/project/repository-guide',
            '/bg/project/related-projects',
            ['https://github.com/ipfs/specs', 'Specifications'],
            ['/bg/concepts/further-reading/academic-papers', 'Research'],
            [
              'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
              'Code of conduct'
            ],
          ],
          '/bg/project/' : [
                ['/bg/community/',  'Join the community'],
                '/bg/community/contribute/ways-to-contribute',
                {
                  title: 'Write the docs',
                  sidebarDepth: 1,
                  collapsable: true,
                  children: [
                    '/bg/community/contribute/grammar-formatting-and-style',
                    '/bg/community/contribute/writing-guide',
                    '/bg/community/contribute/code-persona',
                    '/bg/community/contribute/contribution-tutorial'
                  ]
                },
                '/bg/project/history',
                '/bg/project/repository-guide',
                '/bg/project/related-projects',
                ['https://github.com/ipfs/specs', 'Specifications'],
                ['/bg/concepts/further-reading/academic-papers', 'Research'],
                [
                  'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                  'Code of conduct'
                ],
          ],
          '/bg/case-studies/' : [
            {
              title: 'Case Studies',
              collapsable: false,
              children: [
                ['/bg/case-studies/arbol', 'Arbol'],
                ['/bg/case-studies/audius', 'Audius'],
                ['/bg/case-studies/orcestra', 'ORCESTRA'],
                ['/bg/case-studies/likecoin', 'LikeCoin'],
                ['/bg/case-studies/morpheus', 'Morpheus.Network'],
                ['/bg/case-studies/snapshot', 'Snapshot'],
                ['/bg/case-studies/vereign', 'Vereign']
              ]
            }
          ],
          '/': [
            '/bg/install/',
            '/bg/concepts/',
            '/bg/how-to/',
            '/bg/reference/',
            '/bg/project/',
            {
              title: 'Case Studies',
              collapsable: true,
              children: [
                ['/bg/case-studies/arbol', 'Arbol'],
                ['/bg/case-studies/audius', 'Audius'],
                ['/bg/case-studies/orcestra', 'ORCESTRA'],
                ['/bg/case-studies/likecoin', 'LikeCoin'],
                ['/bg/case-studies/morpheus', 'Morpheus.Network'],
                ['/bg/case-studies/snapshot', 'Snapshot'],
                ['/bg/case-studies/vereign', 'Vereign']
              ]
            },
            ['/bg/concepts/glossary', 'Glossary'],
          ]
  ],




                
           
          
          

           
        }
