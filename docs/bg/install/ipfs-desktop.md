---
title: IPFS Desktop
description: "IPFS Desktop ви дава цялата мощ на IPFS в удобно десктоп приложение — пълен IPFS възел, плюс удобни кратки команди в OS менюто и всичко в едно: файлов мениджър, карта на peers и разглеждане на съдържание."
---

# Инсталирайте приложението IPFS Desktop

**IPFS Desktop обединява IPFS възел, файлов мениджър, мениджър на peers и разглеждане на съдържание в едно лесно за използване приложение.**

Използвайте IPFS Desktop, за да се запознаете с IPFS, без да се налага да докосвате терминала — или, ако вече сте опитни, използвайте мощните кратки команди в лентата на задачите/менюто заедно с командния ред, за да ускорите работния си процес с IPFS.

Ако вече имате IPFS възел на вашия компютър, IPFS Desktop ще действа като контролен панел и файлов браузър за този възел. Ако нямате възел, той ще ви инсталира такъв. И в двата случая IPFS Desktop автоматично ще проверява за обновления.

![Status screen of IPFS Desktop](./images/ipfs-desktop/desktop-status.png)

| Files screen                                                               | Explore screen                                                                 | Peers screen                                                               | Settings screen                                                                  | Menubar/taskbar                                                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Screenshot of the Files screen](./images/ipfs-desktop/desktop-files.png) | ![Screenshot of the Explore screen](./images/ipfs-desktop/desktop-explore.png) | ![Screenshot of the Peers screen](./images/ipfs-desktop/desktop-peers.png) | ![Screenshot of the Settings screen](./images/ipfs-desktop/desktop-settings.png) | ![Screenshot of Mac/Windows menus](./images/ipfs-desktop/desktop-menubar-taskbar.png) |

### Основни характеристики

- **Стартирайте своя възел при стартиране на системата (Mac/Windows) и управлявайте го от вашата OS** с удобно меню в лентата на задачите/системния tray.
- **Бързо импортирайте файлове, папки и екранни снимки в IPFS** по различни удобни начини, включително drag-and-drop и (за Windows) кликване с десния бутон върху иконата на файл/папка.
- **Лесно управлявайте съдържанието на вашия възел** с познат файлов браузър, предлагащ бързи преки пътища за преименуване/преместване/закачане на файлове и папки, визуализация на много често срещани файлови формати директно в IPFS Desktop, копиране на идентификатори на съдържание или споделяеми връзки в клипборда и др.
- **Бързо изтегляне за CIDs, IPFS пътища и IPNS пътища** — изберете `Download...` чрез десен клик върху иконата на IPFS в лентата на задачите, поставете хеш и сте готови.
- **Визуализирайте вашите IPFS peers по света** на карта, показваща към кои възли сте свързани, къде се намират, какви връзки използват и др.
- **Разглеждайте „Merkle Forest“ на IPFS файлове** с визуализатор, който ви позволява да видите първо как примерни набори от данни, съхранени в IPFS — или вашите собствени IPFS файлове — се разделят на части, адресирани по съдържание.
- **Поддръжка в цялата OS за IPFS файлове и връзки** (на Mac, Windows и някои Linux варианти) автоматично предава връзки, започващи с `ipfs://` и `ipns://`, за да бъдат отворени в IPFS Desktop.
- **CLI Tutor Mode** ви помага да научавате IPFS команди по време на работа.

### Инструкции за инсталиране

За да инсталирате IPFS Desktop, следвайте специфичните инструкции за вашата операционна система. IPFS Desktop е създаден с помощта на [Electron framework](https://www.electronjs.org), така че приложението трябва да работи навсякъде, където работи Electron.

| [Windows](#windows)                                                 | [macOS](#macos)                                               | [Ubuntu](#ubuntu)                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| [![Windows icon](./images/ipfs-desktop/windows-icon.png)](#windows) | [![macOS icon](./images/ipfs-desktop/apple-icon.png)](#macos) | [![Ubuntu icon](./images/ipfs-desktop/ubuntu-icon.png)](#ubuntu) |

Или, ако предпочитате да използвате мениджър на пакети, разгледайте този [списък с пакети на трети страни](#package-managers), поддържан от общността на IPFS.

## Windows

1. Отидете на [IPFS Desktop downloads page](https://github.com/ipfs/ipfs-desktop/releases)
2. Намерете връзката, която завършва с `.exe` за най-новата версия на IPFS Desktop:

   ![The IPFS Desktop download page.](./images/ipfs-desktop/install-windows-download-exe-page.png)
   (Ако списъкът е дълъг, може да бъде скрит под линка "Show all assets".)

3. Стартирайте `.exe` файла, за да започнете инсталирането.
4. Изберете дали искате да инсталирате приложението само за вас или за всички потребители на компютъра. Кликнете **Next**:

   ![The IPFS Desktop install options window.](./images/ipfs-desktop/install-windows-install-options.png)

5. Изберете местоположението за инсталиране на приложението. По подразбиране обикновено е добре. Кликнете **Next**:

   ![The IPFS Desktop installation location window.](./images/ipfs-desktop/install-windows-install-location.png)

6. Изчакайте инсталацията да завърши и кликнете **Finish**:

   ![The IPFS Desktop installation finished window.](./images/ipfs-desktop/install-windows-install-finish.png)

7. Сега можете да намерите IPFS икона в лентата на състоянието:

   ![The IPFS Desktop status bar menu in the Windows status bar.](./images/ipfs-desktop/install-windows-ipfs-desktop-status-bar.png)

Приложението IPFS Desktop вече е инсталирано. Сега, [добавете вашия сайт](../how-to/websites-on-ipfs/single-page-website.md#add-your-site).

## macOS

1. Изтеглете най-новия `.dmg` файл от [ipfs/ipfs-desktop releases page](https://github.com/ipfs/ipfs-desktop/releases)

   ![List of available download links in GitHub.](./images/ipfs-desktop/install-macos-dmg-file-link.png)

2. Отворете файла `ipfs-desktop.dmg`.
3. Плъзнете иконата на IPFS в папката **Applications**:

   ![Drag-to-install window in MacOS.](./images/ipfs-desktop/install-macos-drag-ipfs-drag.png)

4. Отворете папката **Applications** и стартирайте приложението IPFS Desktop.
5. Може да получите предупреждение, че _IPFS Desktop.app can't be opened_. Кликнете **Show in Finder**:

   ![An error message showing that the computer cannot install the application.](./images/ipfs-desktop/install-macos-ipfs-cannot-be-opened.png)

6. Намерете **IPFS Desktop.app** в папката **Applications**.
7. Задръжте клавиша `control`, кликнете върху **IPFS Desktop.app** и изберете **Open**:

   ![Right click context menu of IPFS Desktop.app.](./images/ipfs-desktop/install-macos-force-open.png)

8. Кликнете **Open** в новия прозорец:

   ![Open confirmation window.](./images/ipfs-desktop/install-macos-open-confirmation.png)

9. Сега можете да намерите IPFS икона в лентата на състоянието:

   ![The IPFS Desktop status bar menu in the macOS status bar.](./images/ipfs-desktop/install-macos-ipfs-desktop-status-bar.png)

Приложението IPFS Desktop вече е инсталирано. Сега, [добавете вашия сайт](../how-to/websites-on-ipfs/single-page-website.md#add-your-site).

## Ubuntu

Въпреки че тези инструкции са специфични за Ubuntu, те вероятно ще работят и за повечето Ubuntu-подобни Linux дистрибуции. За не-Ubuntu Linux дистрибуции, проверете [IPFS Desktop GitHub repository](https://github.com/ipfs/ipfs-desktop#install) за инструкции за инсталиране.

### Инсталиране с `.deb`

1. Изтеглете най-новия `.deb` инсталатор от [IPFS Desktop GitHub repository](https://github.com/ipfs/ipfs-desktop#linuxfreebsd).
2. Кликнете двукратно, за да инсталирате пакета с Ubuntu Software, или отидете в папката, където сте изтеглили инсталатора и инсталирайте го от командния ред:

    ```shell
    sudo dpkg -i ./ipfs-desktop-[version]-amd64.deb
    ```

    Заменете `[version]` с номер на версията на IPFS пакета, който току-що сте изтеглили.

### Инсталиране с AppImage

:::warning
Когато инсталирате IPFS Desktop с изпълним AppImage файл, няма да имате достъп до командните `ipfs` команди. Това ограничение се дължи на начина, по който AppImages работят и как контейнеризират своите процеси.

Ако сте сигурни, че не ви трябват командните `ipfs` команди, можете да продължите с инсталирането на AppImage. В противен случай, помислете за използване на [deb инсталатора ↑](#install-with-deb)
:::

1. Изтеглете най-новия `.AppImage` пакет от [IPFS Desktop GitHub repository](https://github.com/ipfs/ipfs-desktop#linuxfreebsd).
2. Отидете в папката, където сте изтеглили `.AppImage` файла, и го направете изпълним:

   ```shell
   cd Downloads
   chmod a+x ./ipfs-desktop-linux.AppImage
   ```

3. Отворете `.AppImage`, като извикате `./ipfs-desktop-linux.AppImage` от командния ред:

   ```shell
   ./ipfs-desktop-linux.AppImage
   ```

   Можете също да стартирате `.AppImage` файла, като го отворите двойно кликване във файловия мениджър.

## Мениджъри на пакети

| Мениджър на пакети                                                                                               | Команда                      |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| [Homebrew](https://formulae.brew.sh/formula/ipfs#default)                                                                    | `brew install ipfs --cask`     |
| [Chocolatey](https://community.chocolatey.org/packages/ipfs-desktop)                                                         | `choco install ipfs-desktop` |
| [Scoop](https://github.com/ScoopInstaller/Extras/blob/master/bucket/ipfs-desktop.json) поддържан от [@NatoBoram](https://github.com/NatoBoram) | `scoop bucket add extras && scoop install ipfs-desktop` |
| [AUR](https://aur.archlinux.org/packages/ipfs-desktop/) поддържан от [@RubenKelevra](https://github.com/RubenKelevra) | `ipfs-desktop`               |

## Следващи стъпки

След като сте инсталирали IPFS Desktop, можете да започнете да споделяте файлове и да взаимодействате с други възли в мрежата! Разгледайте как да [хоствате уебсайт чрез IPFS →](../how-to/websites-on-ipfs/single-page-website.md)
