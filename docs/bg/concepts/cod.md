---
title: Изчисление върху данни (CoD)
description: Научете за изчисление върху данни с данни, адресирани по съдържание, в IPFS
---

# Изчисление върху данни с данни, адресирани по съдържание

Терминът „Compute-over-data“ (CoD) обикновено се отнася до парадигма за изчисления, при която обработката на данните се извършва близо до местоположението на данните. Тази концепция е особено релевантна в контекста на големи данни и разпределени изчисления, където прехвърлянето на големи обеми данни през мрежа може да бъде неефективно и скъпо. Като се изпълняват изчисления близо до мястото, където данните се съхраняват (compute-over-data), е възможно по-бързо обработване и по-ниски изисквания към мрежовата честотна лента.

Потребителите на IPFS могат да изпълняват CoD върху данни в IPFS чрез [платформата Bacalhau](#bacalhau) и [спецификацията InterPlanetary Virtual Machine (IPVM)](#ipvm), които и двете нативно поддържат данни, адресирани по съдържание.

## Bacalhau

Bacalhau е платформа за бързи, рентабилни, сигурни, разпределени изчисления. Bacalhau работи чрез изпълнение на jobs, при които данните се генерират и съхраняват, известни още като Compute Over Data (или CoD). С Bacalhau можете да рационализирате съществуващи работни процеси без големи рефакторинги, като изпълнявате произволни Docker контейнери и WebAssembly (WASM) образи като compute tasks. Името _Bacalhau_ е измислено от португалската дума за „солена риба код“.

### Функции

Bacalhau може:

- Да опрости управлението на compute jobs, като осигури **унифицирана платформа** за управление на jobs в различни региони, облаци и edge устройства.
- Да осигури надеждна и устойчивa на мрежови разделения orchestration, така че jobs да завършват дори при мрежови прекъсвания.
- Да предостави пълен и постоянен audit log, така че да сте сигурни, че jobs се изпълняват сигурно.
- Да стартира [private workloads](https://docs.bacalhau.org/next-steps/private-cluster), за да намали риска от изтичане на данни извън вашата организация.
- Да намали ingress и egress разходите, тъй като jobs се обработват по-близо до източника.
- Да работи с данни [mounted anywhere](https://docs.bacalhau.org/#how-it-works) на вашата машина.
- Да се интегрира със услуги, работещи на възли, за да изпълнява jobs, като [DuckDB](https://docs.bacalhau.org/examples/data-engineering/DuckDB/).
- Да работи в мащаб върху паралелни jobs и batch process петабайти данни.
- Да генерира автоматично art с помощта на [Stable Diffusion AI model](https://web.archive.org/web/20250313163631/https://www.waterlily.ai/), обучен на оригиналните произведения на избрания артист.

### Допълнителни ресурси за Bacalhau

- [Bacalhau documentation](https://docs.bacalhau.org/)
- [GitHub](https://github.com/bacalhau-project/bacalhau)

## IPVM

Спецификацията InterPlanetary Virtual Machine (IPVM) дефинира най-лесния, най-бързия, най-сигурния и отворен начин за стартиране на децентрализирани compute jobs в IPFS. Един начин да опишем IPVM е като „отворен, децентрализиран и local-first конкурент на AWS Lambda“.

IPVM използва [WebAssembly (WASM)](https://webassembly.org/), content addressing, [simple public key infrastructure (SPKI)](https://en.wikipedia.org/wiki/Simple_public-key_infrastructure) и object capabilities, за да освободи изчисленията от конкретни, предварително договорени услуги, като големи доставчици на облачни изчисления. По подразбиране изпълнението се мащабира гъвкаво на устройството, чак до edge points-of-presence (PoPs) и data centers.

Основната, базирана на Rust имплементация и runtime на IPVM е [Homestar project](https://github.com/ipvm-wg/homestar/). IPVM поддържа interoperability с [Bacalhau](https://bacalhau.org).

### Допълнителни ресурси за IPVM

- [github.com/ipvm-wg/homestar/](https://github.com/ipvm-wg/homestar/)
- [Seamless Services for an Open World](https://youtu.be/Kr3B3sXh_VA) от Brooklyn Zelenka
- [Foundations for Open-World Compute](https://youtu.be/dRz5mau6fsY) от Zeeshan Lakhani
- [Foundations for Open-World Compute: Homestar, an IPVM Tale](https://youtu.be/BFAMy5-VHak) от Zeeshan Lakhani
- [IPVM: The Long-Fabled Execution Layer](https://www.youtube.com/watch?v=3y1RB8wt_YY) от Brooklyn Zelenka
- [IPVM: Content Addressed Compute for an Open World](https://youtu.be/jhtEYr3ORfk) от Brooklyn Zelenka
- [IPVM - IPFS and WASM](https://www.youtube.com/watch?v=rzJWk1nlYvs) от Brooklyn Zelenka
- [IPVM: Use Cases & System Designs](https://www.youtube.com/watch?v=FhwzEKNZEIA) от Juan Benet
- [IPVM: High-Level Spec](https://github.com/ipvm-wg/spec)
- [IPVM Workflow Spec](https://github.com/ipvm-wg/workflow)
- [UCAN Invocation Spec](https://github.com/ucan-wg/invocation)
