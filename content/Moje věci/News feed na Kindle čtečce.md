---
date: 2026-05-01
---
![[kindle-news-feed.jpg]]

Nedávno jsem objevil super věc. Jmenuje se [KindleEar](https://github.com/cdhigh/KindleEar) a každé ráno mi posílá výběr článků přímo do Kindle čtečky. Momentálně si nechávám posílat články z 5 různých zpravodajských serverů včetně například ČT24 a TechCrunch. Začnu kvůli tomu víc číst zprávy? Pravděpodobně ne, ale byl to fajn projekt. A když už se mi náhodou chtít bude, tak tu možnost mám. A dokonce i na e-ink displeji.

# Jak to funguje?

Základním prvkem celého systému je technologie [RSS](https://en.wikipedia.org/wiki/RSS). Ta umožňuje uživateli odebírat novinky z webu. Zpravodajské servery publikují tzv. RSS feed, který obsahuje metadata o jejich nejnovějších článcích. [KindleEar](https://github.com/cdhigh/KindleEar) je software, který tyto RSS feedy umí konzumovat. Každý den pomocí nich zkontroluje, zda nevyšli nové články, stáhne je, převede do EPUB formátu a výsledný soubor mi mailem pošle do Kindle čtečky.

U nás doma běží KindleEar na mini-počítači [Raspberry Pi Zero 2 W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/). Každé ráno v 6 hodin si projede zvolené zpravodajské servery a přes můj Gmailový účet mi to vystřelí do čtečky.

## Raspberry Pi Zero 2W

Raspberry Pi Zero 2W nám leží pod televizí vedle set-top boxu

![[raspberry-pi-zero-2w.jpg|500]]
