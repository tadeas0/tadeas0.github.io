---
draft: "false"
date: 2026-05-04
---
![[automatizace-japonskych-kanadanu.png]]

Anetka psala diplomku o formách rezistence Japonských Kanaďanů v internačních táborech. Primárně čerpala z rozhovorů nahraných institutem [National Nikkei Museum & Heritage Centre](https://digital.lib.sfu.ca/japanese-cdn-audio). Problém však byl, že rozhovorů byla tuna. Poslechnout se sice dali, ale další práce s nimi, hledání konkrétních informací, citace atd. by byla hrozně náročná. Tak jsem si řekl, že to přece musí jít nějak jednodušeji.

Nejdřív mě napadlo využít nějaký existující program na přepis mluveného slova. Vyzkoušeli jsme asi 5 různých řešení a pak to vzdali. Všechny programy spadaly do jedné ze dvou kategorií: výsledný text stál za nic nebo stál přepis levou plíci a půl království. Navíc se to všechno muselo dělat manuálně. Vždy bylo potřeba stáhnout ze stránek muzea nahrávku, překliknout na přepisovací nástroj, nahrát to tam, počkat 5 minut a to celé znovu zopakovat ještě stokrát. Prostě hrůza.

V tom jsem si vzpomněl… Vždyť já mám v počítači dedikovanou grafickou kartu! Pravda, je to jen notebooková Nvidia RTX 3050, ale lepší než drátem do oka. Co se dá dělat s grafickou kartou? Přece pouštět AI modely. Po krátkém bádání jsem objevil [OpenAI Whisper](https://github.com/openai/whisper). Speech recognition model tatíčka Sama Altmana. Možnost spouštět si transkripci lokálně na vlastním hardware s sebou přinesla spoustu výhod. Nemusel jsem si za nekřesťanské peníze kupovat extra přepisové minuty na online nástrojích, nemusel jsem soubory po jednom manuálně nahrávat na pochybné servery a hlavně jsem to mohl celé automatizovat.

Pustil jsem se do programování. Řešení mělo 3 časti, každou jako samostatný Python modul: Scraper, Downloader a Transcriber. Nejsložitějším komponentem byl Scraper. Jeho úkolem bylo prolézt stránky institutu, najít linky na všechny nahrávky a spolu se jménem dotazovaného je uložit do CSV souboru. Webovky s nahrávkami sice na první pohled vypadaly velmi jednoduše, nicméně jakmile člověk nakoukl do zdrojáku, našel totální HTML paskvil poskládaný zdánlivě bez jakékoli logiky a struktury. Už jsem to chtěl vzdát… Tuhle prasárnu přece parsovat nebudu… Ještě je každá stránka s rozhovory úplně jiná… Naštěstí jsem si všiml, že všechny odkazy na nahrávky mají jednu společnou vlastnost: URL vždy v jedné části (ne na konci, jak by člověk čekal, ale zhruba někde uprostřed) obsahuje příponu `.mp3`. To mi práci značně zjednodušilo. Stačilo z každé stránky vyfiltrovat všechny linky, které příponu obsahovaly a doufat, že se tam žádné další MP3 soubory nevyskytují. Naštěstí si institut k nahrávkám rozhovorů tajně neukládá nevydaná alba Infant Annihilator, takže můj předpoklad vyšel. Poslední co zbývalo bylo nějak k tomu přiřadit jména dotazovaných. Na ty stačil jednoduchý CSS class selector a bylo hotovo. Výsledkem byl modul, který si spustí headless browser pomocí [Selenium](https://www.selenium.dev/), projede stránky a všechno mi to krásně strukturované nasype do CSV souboru `interviews.csv`.

Downloader modul je velmi prostý, spustí si spoustu vláken a paralelně všechny rozhovory ze seznamu postahuje. Transcriber je také relativně jednoduchý. Většinu práce za něj odvede OpenAI Whisper. Stará se pouze o to, aby se Whisperu předala požadovaná konfigurace a aby se přepisy ukládali na správné místo.

Trojici skriptů jsem nechal běžet přes noc. Všechno vyšlo krásně a pro každý rozhovor mi vypadl jeden [SRT soubor](https://en.wikipedia.org/wiki/SubRip). S SRT formátem se nejčastěji setkáme při ukládání titulek k filmům. Obsahuje časové údaje a text, který se v tu dobu vyskytl. Pro transkripce rozhovorů je ideální. Ukázka formátu:

```
1
00:02:25,600 --> 00:02:29,400
V pěti čtvrtích New Yorku
žije zhruba 8 milionů lidí.
 
2
00:02:29,600 --> 00:02:32,080
V celé oblasti 12 milionů.
```

S tímto korpusem titulkových souborů už mohla Anetka pracovat o hodně lépe. Umožnilo jí to vyhledávat klíčová slova, jednoduše se vracet ke konkrétním rozhovorům a snadněji a přesněji citovat, kdo co řekl a kdy. Obrovská výhoda je také, že se SRT soubory dají nahrát do jakéhokoli LLM, takže si lze např. z [Clauda](https://claude.ai/new) udělat vlastního archiváře. Stačí nahrát pár rozhovorů v SRT formě a hned je možné pokládat dotazy a hledat spojitosti, které by třeba jinak nemuseli být úplně zřetelné.

Celý projekt mi zabral jeden večer. Zjistil jsem, že ceny transkripčních nástrojů pro delší nahrávky jsou kriminální a že univerzitní weby sice z venku vypadají v pořádku, ale pod pokličkou skrývají děsy, které by se mohli rovnat Lovecraftovým Prastarým.
