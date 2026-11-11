---
title: Непроменяемост
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/386
description: Научете за концепцията за непроменяемост на данните и защо тя е критична за начина, по който работи IPFS.
related:
  'IPFS Docs: Content addressing and CIDs': /concepts/content-addressing/
  'Video: How IPFS deals with files (IPFS Camp 2019)': https://www.youtube.com/watch?v=Z5zNPwMDYGg
  'Tutorial: How IPFS deals with files (IPFS Camp 2019)': https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A
  'Wikipedia: Content-addressable storage': https://en.wikipedia.org/wiki/Content-addressable_storage
---

# Непроменяемост

Непроменяем обект е обект, чийто състояние не може да бъде променяно или модифицирано след създаването му. След като файл е добавен към мрежата на IPFS, съдържанието на файла не може да бъде променяно без промяна на [идентификатора на съдържанието (CID)](../concepts/content-addressing.md) на файла. Тази характеристика е отлична за съхраняване на данни, които не се нуждаят от промяна. Въпреки това, когато става дума за съдържание, което трябва да бъде променяно или актуализирано, непроменяемостта става проблем. Тази страница обсъжда как да се запази _променливо_ състояние, построено от _непроменяеми_ градивни елементи.

CID е _абсолютен_ указател към съдържание. Няма значение кога заявяваме CID, стойността му винаги ще бъде една и съща. Това е част от архитектурата на съдържанието и не може да бъде променено. За да управляваме _непроменяеми_ файлове в _променлива_ система, трябва да добавим друг слой, който стои над CID.

Като основен пример, нека имаме два блока съдържание със низовете `hello` и `world`, хеширани в два листни възела с CID `A` и `B`. Ако конкатенираме тези два възела, получаваме CID `C`. Над този root CID задаваме указател `Pointer`.

```shell
   +-----------+
   |  Pointer  |
   +-----------+
         ↓
      +-----+
   +--|  C  |-+
   |  +-----+ |
   |          |
+-----+    +-----+
|  A  |    |  B  |
+-----+    +-----+
"hello"    "world"
```

Ако променим съдържанието на `B` на `IPFS!`, всички горни пътища също ще се променят. В този прост пример, единственият горен път е `C`. Ако поискамe съдържание от указателя, получаваме ново съдържание, тъй като указателят вече сочи към напълно различен възел. Възел `B` не се редактира, актуализира или променя по друг начин. Вместо това създаваме нов DAG, в който указателят сочи към CID `E`, който свързва възел `A` и нов възел, възел `D`.

```shell
   +-----------+
   |  Pointer  | --------------+
   +-----------+               |
                               ↓
      +-----+               +-----+
   +--|  C  |-+         +-- |  E  | --+
   |  +-----+ |         |   +-----+   |
   |          |         |             |
+-----+    +-----+     +-----+    +-----+
|  A  |    |  B  |     |  A  |    |  D  |
+-----+    +-----+     +-----+    +-----+
"hello"    "world"     "hello"    "IPFS!"
```

Again, node `B` does not change. It will always refer to the same content, `world`. Node `A` also appears in the new DAG. This does not necessarily mean we copied the memory/buffer that contained the `hello` string into our new message; that would imply the location-addressed paradigm that focuses on the _where_ and not the _what_. In a content-addressed system, any time someone writes the string `hello` it will always have CID `A`, regardless of whether we copied the string from a previous location or we wrote it from scratch.

## Example

In this example, we have a website that displays two headers called `header_1` and `header_2`. The content of the headers is supplied from the variables `string_1` and `string_2`.

```html
<body>
  <h1 id="header_1"></h1>
  <h1 id="header_2"></h1>
</body>
<script>
  let string_1 = 'hello'
  let string_2 = 'world'
  document.getElementById('header_1').textContent = string_1
  document.getElementById('header_2').textContent = string_2
</script>
```

The CID of this website is `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`. Users can go to [`example.com/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`](https://gateway.pinata.cloud/ipfs/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP) to view the site. If we change `string_2` to `IPFS` then the CID of the website changes to `Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`. Now users can go to [`example.com/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`](https://gateway.pinata.cloud/ipfs/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5).

Having a user visit the site using the CID is cumbersome since the CID will change every time a variable is updated. So instead, we can use a _pointer_ that maintains the CID of the page with the latest update. This way, users can go to `example.com`, and always be directed to the latest content. This pointer is _mutable_; it can be updated to reflect the changes downstream.

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer | ---> | QmWLd... |
+--------+      +---------+      +----------+
```

In the website example, when we change a variable, the CID of the webpage is different. The pointer must be updated to redirect users to the latest webpage. What's important is that the _old_ CID still exists. Nothing is overwritten. The original CID `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP` will always refer to a webpage with the headers `hello` and `world`. What we're doing is constructing a new [DAG](../concepts/merkle-dag.md).

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer |      | QmWLd... |
+--------+      +---------+      +----------+
                     |
                     |           +----------+
                     + --------> | Qme1A... |
                                 +----------+
```

This process is essentially what the [InterPlanetary Naming Service (IPNS)](../concepts/ipns.md) does! CIDs can be difficult to deal with and hard to remember, so IPNS saves users from the cumbersome task of dealing with CIDs directly. More importantly, CIDs change with the content because they are the content. Whereas the inbound reference of URLs/pointers stay the same, and the outbound referral changes:

```shell
+--------+      +----------------+      +-------------------------------------------------------------+
|  User  | ---> | docs.ipfs.tech | ---> | bafybeigsddxhokzs3swgx6mss5i3gm6jqzv5b45e2xybqg7dr3jmsykrku |
+--------+      +----------------+      +-------------------------------------------------------------+
```
