---
title: IPFS шлюз
description: Научете защо шлюзовете са важна част от използването на IPFS заедно с наследения уеб.
related:
  'IPFS Docs: Address IPFS on the Web': /how-to/address-ipfs-on-web/
  'IPFS public gateway checker': https://ipfs.fyi/gateways
  'Gateway specifications': https://specs.ipfs.tech/http-gateways/
---

# IPFS шлюз

_Шлюзът на IPFS_ е стандартизирано HTTP API за получаване на данни, адресирани по съдържание, от възли на IPFS и доставчици на CID (частни или публичната IPFS Mainnet). Той позволява използването на HTTP семантика за взаимодействие с IPFS. Например, някои браузъри или инструменти като [Curl](https://curl.se/) или [Wget](https://www.gnu.org/software/wget/) не поддържат IPFS директно и не могат да достъпват съдържание в IPFS чрез канонично адресиране като `ipfs://{CID}/{optional path to resource}`. Докато инструменти като [IPFS Companion](../install/ipfs-companion.md) добавят поддръжка за нативни IPFS URL адреси в браузъра, това не винаги е възможно. Ето защо IPFS шлюзовете позволяват широк набор от приложения да комуникират с IPFS чрез HTTP.

This page discusses:

- [Gateway providers](#gateway-providers)
- [Gateway types](#gateway-types)
  - [Recursive vs. non-recursive gateways](#recursive-vs-non-recursive-gateways)
  - [Trusted vs. trustless gateways](#trusted-vs-trustless-gateways)
  - [Authenticated gateways](#authenticated-gateways)
- [Gateway request lifecycle](#gateway-request-lifecycle)
- [Resolution styles](#resolution-styles)
  - [Path](#path)
  - [Subdomain](#subdomain)
  - [DNSLink](#dnslink)
- [Gateway URL formats](#gateway-url-formats)
- [Working with gateways](#working-with-gateways)
- [Implementing gateways](#implementing-gateways)
- [Learning more](#learning-more)

## Gateway providers

Regardless of who deploys a gateway and where, any IPFS gateway resolves access to any requested IPFS [content identifier](content-addressing.md).

### Your local gateway

Your machine may host a gateway as a local service; e.g., at `localhost:8080`. You have a local gateway service if you installed [IPFS Desktop](../install/ipfs-desktop.md), [Kubo](../install/command-line.md) or another form of IPFS node.

### Public gateways

Public ([recursive](#recursive-vs-non-recursive-gateways)) gateways are provided by various organizations, including the IPFS Foundation as a [public utility](./public-utilities.md#public-ipfs-gateways).

For a list of public gateways, see the [IPFS Gateways Checker](https://ipfs.fyi/gateways).

If your app already calls a public gateway and you want to run your own instead, see [Replace public gateways with self-hosted IPFS](../how-to/replace-public-gateways-with-self-hosted-ipfs.md).

## Gateway types

There are multiple gateway types, each with specific use case, security, performance, and functional implications.

- [Recursive vs. non-recursive gateways](#recursive-vs-non-recursive-gateways)
- [Trusted vs. trustless gateways](#trusted-vs-trustless-gateways)
- [Authentication support](#authenticated-gateways)

### Recursive vs. non-recursive gateways

Recursive gateways are gateways that will attempt to retrieve content from other peers on the network if they do not have it locally. This is the default behavior in [Rainbow](https://github.com/ipfs/rainbow/#readme) and [Kubo](../install/command-line.md) running with [`Gateway.NoFetch=false`](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaynofetch).

Non-recursive gateways are gateways that only serve content that they have themselves. For example, [Kubo](../install/command-line.md) can be configured to act as a non-recursive gateway by setting the [`Gateway.NoFetch=true`](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaynofetch) option.

In general, recursive gateways are more powerful for end-users because they abstract away all details of the peer-to-peer network. However, they are much more resource-intensive for operators and prone to abuse.

[Trustless, verifiable retrieval](../reference/http/gateway.md#trustless-verifiable-retrieval) from non-recursive gateways is becoming a popular way to provide IPFS content to the network ([HTTP](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) as an alternative or in addition to [Bitswap](../concepts/glossary.md#bitswap)).

### Trusted vs. trustless gateways

See [Trusted vs. Trustless Gateways](../reference/http/gateway.md#trusted-vs-trustless) for more information.

### Authenticated gateways

If a gateway provider wants to limit access to requests with authentication, they may need to configure a reverse proxy, develop an IPFS plugin, or set a cache-layer above IPFS.

Configuring a reverse proxy is the most popular way for providers handling authentication. Reverse proxy can also keep the original IPFS API calls which makes gateway adaptable to all IPFS SDK and toolkits.


## Gateway request lifecycle

:::callout
This section uses the _default_ recursive gateway request lifecycle of [IPFS Kubo](https://github.com/ipfs/kubo) to introduce the basic concepts in the lifecycle. However, non-recursive gateways only serve content that they have and/or want to provide. For example, a Kubo gateway with [`Gateway.NoFetch=true`](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaynofetch) will **not** attempt to retrieve content from the network.
:::

When a client request for a CID reaches an IPFS gateway, the gateway first checks whether the CID is cached locally. At this point, one of the following occurs:

- **If the CID is cached locally**, the gateway responds with the content referred to by the CID, and the lifecycle is complete.

- **If the CID is not in the local cache**, a non-recursive gateway would error, however our gateway is recursive and will attempt to retrieve it from the network.

The CID retrieval process is composed of two parts, content discovery / routing and content retrieval:

1. In the **content discovery / routing** step, the gateway will determine <VueCustomTooltip label="An IPFS network peer that can provide data specified by a particular CID upon request." underlined multiline>provider</VueCustomTooltip> location; that is, _where_ the data specified by the CID can be found:

   - Asking peers that it is directly connected to if they have the data specified by the CID.
   - Query the DHT for the IDs and network addresses of peers that have the data specified by the CID.
   - Query [delegated routing](https://specs.ipfs.tech/routing/http-routing-v1/) endpoints over HTTP for peers that have the data specified by the CID.

2. Next, the gateway performs **content retrieval**, which can be broken into the following steps:

   1. The gateway connects to the provider.
   1. The gateway fetches the CIDs content.
   1. The gateway streams the content to the client.

:::callout
- Learn more about content discovery, routing, retrieval and the subsystems involved in each part of the process in [How IPFS works](./how-ipfs-works.md).
- Dive into the technical specifications for gateways in the [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/) page.
:::

## Resolution styles

Gateways typically support three resolution styles:

- [Path](#path)
- [Subdomain](#subdomain)
- [DNSLink](#dnslink)

### Path

The examples discussed above employed path resolution:

```bash
https://{gateway URL}/ipfs/{content ID}/{optional path to resource}
```

Path-resolving gateways, however, violate the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) that protects one website from improperly accessing session data of another website.

:::warning
This type of gateway does not provide origin isolation and should not be used for hosting web apps.

Learn more at [Address IPFS on the web: Path Gateway](../how-to/address-ipfs-on-web.md#path-gateway) and [Path Gateway Specification](https://specs.ipfs.tech/http-gateways/path-gateway/).
:::

### Subdomain

Subdomain resolution style ensures compliance with the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). The canonical form of access, `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}`, ensures origin isolation per CID.

::: callout
Subdomain gateways provide origin isolation and should be used for hosting web apps.

Learn more at [Address IPFS on the web: Subdomain Gateway](../how-to/address-ipfs-on-web.md#subdomain-gateway) and [Subdomain Gateway Specification](https://specs.ipfs.tech/http-gateways/subdomain-gateway/).
:::

### DNSLink

Whenever the content of data within IPFS changes, IPFS creates a new CID based on the content of that data. Many applications require access to the latest version of a file or website but will not know the exact CID for that latest version. The [InterPlanetary Name System (IPNS)](ipns.md) allows a version-independent IPNS identifier to resolve into the current version's IPFS CID.

The version-independent IPNS identifier contains a hash. When a gateway processes a request in the form `https://{gatewayURL}/ipns/{IPNS identifier}/{optional path}`, the gateway employs IPNS to resolve the IPNS identifier into the current version's CID and then fetches the corresponding content.

But the IPNS identifier may instead refer to a fully-qualified domain name in the usual form of `example.com`.

DNSLink resolution occurs when the gateway recognizes an IPNS identifier contains `example.com`. For example, the URL `https://docs.ipfs.tech` returns the current version of that website (a site stored in IPFS) as follows:

1. The gateway receives a request in the form:

   ```bash
   https://{gateway URL}/ipns/{example.com}/{optional path}
   ```

2. The gateway searches the DNS TXT records on the `_dnslink.` subdomain (`_dnslink.example.com`) for a string of the form `dnslink=/ipfs/{CID}`. If found, the gateway uses the specified content identifier to find and serve up `ipfs://{CID}/{optional path}`. 

It is possible to use an HTTP gateway for serving content on the DNSLink domain itself:

1. Point `example.com` at IP of your HTTP gateway, make sure `A`/`AAAA`/`HTTPS` records are set, and TLS termination is configured.
2. Client sends request to:

   ```bash
   https://{example.com}/{optional path}
   ```

3. Gateway detects HTTP header `Host: example.com` in the incoming request and searches DNSLink the same way as in previous example.

::: callout
Learn more at [Address IPFS on the web: DNSLink Gateway](../how-to/address-ipfs-on-web.md#dnslink-gateway) and [DNSLink Gateway Specification](https://specs.ipfs.tech/http-gateways/dnslink-gateway/).
:::

## Gateway URL formats

Currently HTTP gateways typically expose both immutable IPFS and mutable IPNS (either IPNS names or DNSLink) resources using the following URL formats:

| Service | Resolution style | Canonical form of access                                                                                                                                                                      |
| ------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IPFS    | path             | `https://{gateway URL}/ipfs/{CID}/{optional path to resource}`                                                                                                                                |
| IPFS    | subdomain        | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}`                                                                                                                                 |
| IPFS    | DNSLink          | `https://{example.com}/{optional path to resource}` **preferred**, or <br>`https://{gateway URL}/ipns/{example.com}/{optional path to resource}`                                              |
| IPNS    | path             | `https://{gateway URL}/ipns/{IPNS identifier}/{optional path to resource}`                                                                                                                    |
| IPNS    | subdomain        | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}`                                                                                                                     |
| IPNS    | DNSLink          | Useful when IPNS identifier is a domain: <br>`https://{example.com}/{optional path to resource}` **preferred**, or <br>`https://{gateway URL}/ipns/{example.com}/{optional path to resource}` |

## Working with gateways

For more information on working with gateways, see [best practices](../how-to/gateway-best-practices.md) and [troubleshooting](../how-to/troubleshooting.md).

## Implementing gateways

If you would like to read the technical specifications for the various gateway types, and learn more about how to implement a gateway, see the [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/) page for more information.

## Learning more

- [A Practical Explainer for IPFS Gateways – Part 1](https://blog.ipfs.tech/2022-06-09-practical-explainer-ipfs-gateways-1/), [Part 2](https://blog.ipfs.tech/2022-06-30-practical-explainer-ipfs-gateways-2/)
- [Kubo: Gateway configuration options](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway)
- [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/)
