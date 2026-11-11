---
title: Съхраняване и възпроизвеждане на видеа
description: Научете как да съхранявате, възпроизвеждате и работите с видеа в IPFS, InterPlanetary File System.
---

# Съхраняване и възпроизвеждане на видеа

IPFS може да се използва за съхраняване и възпроизвеждане на видеа. Да кажем, че добавяме видео:

```bash
ipfs add -q sintel.mp4 | tail -n1
```

Можете да видите получения hash по няколко различни начина.

От командния ред:

```bash
ipfs cat $video_hash | mplayer -vo xv -
```

Чрез локален gateway (имайте предвид, че методът с gateway работи с повечето video player-и и браузъри):

```bash
mplayer http://localhost:8080/ipfs/$video_hash
```

Или го отворете в браузър (в този пример Chrome):

```bash
chromium http://localhost:8080/ipfs/$video_hash
```
