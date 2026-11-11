---
title: Настройка на DNSLink Gateway за обслужване на статични сайтове с Kubo
description: Научете как да настроите DNSLink Gateway с Kubo и Caddy, за да обслужвате IPFS съдържание чрез вашия собствен домейн, включително TLS (HTTPS).
---

# Настройка на DNSLink Gateway за обслужване на статични сайтове с Kubo и Caddy

Това ръководство обяснява как да обслужвате статичен сайт или приложение в IPFS чрез DNSLink Gateway.

За целта ще използвате отделен DNSLink IPFS gateway с [Kubo](../../install/command-line.md) и [Caddy](https://github.com/caddyserver/caddy), за да обслужвате съдържанието през HTTPS чрез персонализирано домейнно име.

Това позволява на потребителите да достъпват [IPFS съдържание чрез познато домейнно име без специални браузърни разширения](./custom-domains.md), без да се налага да знаят конкретния Content Identifier (CID). Gateway-ът автоматично разрешава [DNSLink](../../concepts/dnslink.md) TXT записа, свързан с домейна, до CID, и извлича и обслужва съдържанието на този CID.

Това ръководство предполага, че CID на сайта или приложението вече е pinned в IPFS. Ако не е, вижте ръководството [Deploy Static Apps to IPFS with GitHub Actions](./deploy-github-action.md).

## Цел

В края на това ръководство ще имате:

- Вашият домейн, например `https://yourdomain.com`, който обслужва сайта или приложението, посочено в неговия DNSLink TXT запис.
- Стартиран Kubo IPFS възел, конфигуриран като DNSLink gateway за `yourdomain.com`.
- Caddy web сървър, действащ като reverse proxy и обработващ TLS termination, така че сайтът да се обслужва през HTTPS.

## Забележка за верификация

Имайте предвид, че DNSLink gateway, който ще настроите, ще функционира като _trusted gateway_, в смисъл че читателите се доверяват на сървъра, към който сочи домейнът, че служи правилното съдържание, без да го проверява. Поради това той приема същите предположения за сигурност и [рискове на мрежата](https://blog.ipfs.tech/2025-could-ipfs-prevent-bybit-hack/).

Това може да е подходящо за вашия случай. Въпреки това, ако сайтът или приложението, което разгръщате, изисква по-висока сигурност и по-малко доверие, препоръчваме потребителите ви да ползват верифициращ IPFS клиент, като гледат сайта чрез локален IPFS възел като Kubo или използват [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway), за да заредят сайта, като същевременно проверяват, че съдържанието съвпада с CID от DNSLink TXT записа.

## Предварителни изисквания

Преди да започнете, се уверете, че имате следното:

- Сървър със статичен публичен IP адрес (напр. `YOUR_SERVER_IP`).
- Порт 443 отворен във firewall-а на сървъра, за да се допуска HTTPS трафик.
- Домейнно име (напр. `yourdomain.com`).
- DNS конфигуриран за вашия домейн:
  - **`A` запис**, сочещ `yourdomain.com` към публичния IP адрес на сървъра (`YOUR_SERVER_IP`).
  - _(Ще настроим необходимия [DNSLink](./custom-domains.md#cid-signaling-with-dnslink) `TXT` запис по-късно в ръководството)._
- Kubo инсталиран и инициализиран на вашия сървър.
- Caddy инсталиран на вашия сървър.

## Стъпка 1: Конфигуриране на Kubo

### Коригиране на Kubo Gateway конфигурацията

Първо, трябва да коригирате конфигурацията на Kubo gateway. Тези настройки казват на Kubo да действа като специфичен gateway за вашия домейн и да забрани определени стандартни поведения, като извличането на произволни CID-ове.

С тази конфигурация Kubo ще съпоставя домейна в [`host` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host) на заявките, проксирани от Caddy, и ако съвпада с домейна, конфигуриран в тази стъпка, ще разреши DNSLink TXT записа и ще обслужи съдържанието на CID-а.

#### Команди за изпълнение

1. **Забраняване на извличането на съдържание за произволни CID-ове**:
   Това предотвратява вашият gateway да се използва като general-purpose public gateway. [Config docs](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaynofetch)

   ```bash
   ipfs config --json Gateway.NoFetch true
   ```

2. **Забраняване на DNSLink резолюция глобално (по default)**:
   Ще я активирате само за вашия конкретен домейн в следващата стъпка. [Config docs](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaynodnslink)

   ```bash
   ipfs config --json Gateway.NoDNSLink true
   ```

3. **Активиране на DNSLink за `yourdomain.com`**:
   Това изрично позволява DNSLink резолюция _само_ за заявки, отиващи към този hostname. [Config docs](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewaypublicgateways)

   ```bash
   ipfs config --json Gateway.PublicGateways '{
       "yourdomain.com": {
         "NoDNSLink": false,
         "Paths": []
       }
     }'
   ```

4. **Рестартиране на Kubo daemon** за влизане в сила на промените. Спиране и повторно стартиране на `ipfs daemon`, или ако използвате Kubo като systemd service:
   ```bash
   sudo systemctl restart ipfs
   ```

Тези команди модифицират `config` файла в вашето IPFS repository (обикновено `~/.ipfs/config`). Настройката `Gateway.PublicGateways` дефинира специфични конфигурации за различни hostnames. Тук отменяте глобалната `NoDNSLink` настройка специално за `yourdomain.com`.

## Стъпка 2: Конфигуриране на Caddy

### Настройка на Caddy като reverse proxy

След това конфигурирайте Caddy да обработва входящия HTTPS трафик за `yourdomain.com` и да го проксира към Kubo gateway, който по default слуша на `127.0.0.1:8080`.

За да проверите, че gateway-ът, предоставен от Kubo, слуша, можете да изпълните следната команда:

```bash
ipfs config Addresses.Gateway
```

Трябва да видите нещо подобно:

```shell
/ip4/127.0.0.1/tcp/8080
```

Това потвърждава, че gateway-ът, предоставен от Kubo, слуша на `127.0.0.1:8080`.

#### Caddyfile конфигурация

Създайте или редактирайте вашия `Caddyfile` (обикновено се намира в `/etc/caddy/Caddyfile` или в текущата директория, ако стартирате Caddy ръчно) със следното съдържание:

```caddy
yourdomain.com {
  # Caddy автоматично обработва HTTPS provisioning за вашия домейн

  # Прокси всички заявки към локалния Kubo gateway
  reverse_proxy localhost:8080

  # Незадължително: Конфигуриране на logging
  log {
    output stdout
    format json
    level INFO
  }
}
```

**Обяснение:**

- `yourdomain.com { ... }`: Определя site block за вашия домейн. Caddy автоматично ще получи и поднови TLS сертификат за него, при условие че DNS `A` записът е настроен правилно.
- `reverse_proxy localhost:8080`: Препраща всички входящи заявки за `yourdomain.com` към Kubo daemon, който слуша на порт 8080.
- `log { ... }`: Конфигурира access logging (незадължително, но препоръчително).

**Стартирайте или презаредете Caddy**, за да влезе в сила конфигурацията:

```bash
# Ако използвате systemd:
sudo systemctl reload caddy

# Или, ако Caddy се стартира ръчно в директорията с Caddyfile:
caddy run
```

## Стъпка 3: Настройка на DNSLink TXT запис

### Конфигуриране на DNSLink DNS запис

Сега ще създадете DNSLink `TXT` запис за вашия домейн, който да сочи към CID на сайта или приложението, което искате да обслужвате, което е необходимо в допълнение към `A` записа, сочещ към IP адреса на сървъра.

Когато се правят заявки към `yourdomain.com`, DNSLink gateway-ът автоматично ще разреши DNSLink TXT записа и ще обслужи съдържанието на CID-а. Тъй като `Gateway.NoFetch` е зададен на `true`, gateway-ът няма да извлича данни от други доставчици: съдържанието трябва вече да е налично на вашия Kubo възел.

#### Стъпки за създаване на TXT запис

1. **Получете CID** на съдържанието, което искате да обслужвате.

2. **Pin-нете CID-а на Kubo възела на сървъра**, така че gateway-ът да може да го обслужва, въпреки че `Gateway.NoFetch` е `true`:

   ```bash
   ipfs pin add YOUR_CID
   ```

3. **Отворете dashboard-а на вашия DNS доставчик** за `yourdomain.com`.

4. **Създайте `TXT` запис**:

   - **Name/Host**: `_dnslink` (или пълното име `_dnslink.yourdomain.com`, в зависимост от интерфейса на доставчика)
   - **Type**: `TXT`
   - **Value/Content**: `dnslink=/ipfs/bafybeiay2koog2jnndn5gr2raytxh7evobry5lo2w4s7nhugc7xipy6aze` (заменете примерния CID с вашия реален CID)

   **Забележка:** Името на записа _трябва_ да започва с `_dnslink.`. DNS propagation може да отнеме известно време. Можете да проверите дали се е разпространил с инструменти като `dig` или `nslookup`:

   ```bash
   dig +short TXT _dnslink.yourdomain.com
   # Очакван резултат: "dnslink=/ipfs/bafybeiay2koog2jnndn5gr2raytxh7evobry5lo2w4s7nhugc7xipy6aze"

   # Също така проверете A записа:
   dig +short A yourdomain.com
   # Очакван резултат: YOUR_SERVER_IP
   ```

> **Забележка:** DNSLink записът ще трябва да се обновява всекиtime you update the site or app, leading to a new CID for the build. In order to automate this, you can use the [DNSLink GitHub Action](https://github.com/ipshipyard/dnslink-action), as part of your CI/CD pipeline.

## Step 4: Verify

### Ensure Everything is Working

Once both DNS records (`A` and `TXT`) have propagated and both Kubo and Caddy are running with the correct configurations:

1. Open your web browser and navigate to that domain, e.g. `https://yourdomain.com`.
2. You should see the content associated with your CID served securely over HTTPS via your Caddy server, which fetched it from your Kubo node using the DNSLink record.

Your gateway will now automatically serve the content specified in the `_dnslink.yourdomain.com` TXT record. To update the site, pin the new version to your Kubo node, get the new CID, and update the `TXT` record's value with the new CID path (`dnslink=/ipfs/NEW_CID_HERE`).

## Automate DNSLink Updates

Depending on how you deploy your site, you can automate DNSLink updates using the [DNSLink Action](./dnslink-action.md) as part of your CI/CD pipeline. For a step-by-step guide, see [Automate DNSLink updates with GitHub Actions](./dnslink-action.md).

::: tip Security Best Practice
For production deployments, consider using a [sandboxed DNS zone](./dnslink-action.md#security-sandboxed-dns-zone) to limit what your CI API token can modify. This way, if credentials are compromised, attackers can only modify the DNSLink TXT record, not other DNS records like A, MX, or NS.
:::

You can also use other DNS management tools like [dnscontrol](https://github.com/StackExchange/dnscontrol) or [octodns](https://github.com/octodns/octodns).

## Troubleshooting

### Common Issues and Solutions

- **DNS Propagation Delays**: If your domain isn't resolving, check the DNS settings and ensure the DNSLink record has propagated. You can use `dig` to verify:

  ```bash
  dig +short TXT _dnslink.yourdomain.com
  # Expected Output: "dnslink=/ipfs/bafy..."
  ```

- **Caddy Configuration Errors**: Ensure your `Caddyfile` syntax is correct. Check Caddy logs for any errors.
- **IPFS Node Issues**: Make sure your IPFS node is running and accessible. Restart the daemon if necessary.

## Summary

You've successfully set up a DNSLink Gateway using Kubo and Caddy to serve IPFS content via your domain. Keep your software updated and monitor your server for any issues. For further customization, refer to the [Kubo config documentation](https://github.com/ipfs/kubo/blob/master/docs/config.md) and [Caddy documentation](https://caddyserver.com/docs).
