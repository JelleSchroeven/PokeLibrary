# PokéLibrary – JavaScript Pokedex Webapp

**PokéLibrary** is een interactieve Pokedex-webapp gebouwd met HTML, CSS en JavaScript. In deze applicatie kun je Pokémon zoeken, filteren, sorteren en als favoriet aanduiden. De gegevens worden opgehaald via de [PokéAPI](https://pokeapi.co/).

---

## Functionaliteiten

-  Zoek Pokémon op naam
-  Filter op type (bv. Fire, Water)
-  Filter op generatie (Gen I–VIII)
-  Sorteer op naam, gewicht, grootte of Pokédex-nummer
-  Voeg Pokémon toe aan favorieten met `localStorage`
-  Toon enkel favorieten via een checkbox
- Donker-/lichtthema toggle met icoon en opslag
-  Lazy loading: automatisch meer Pokémon laden bij scrollen
-  Scroll-to-top knop

---

## Gebruikte API

| API      | Beschrijving              | Link                 |
|----------|---------------------------|----------------------|
| PokéAPI  | Haalt Pokémon-gegevens op | https://pokeapi.co/  |

---

##  Gebruikte JavaScript-concepten

| Concept             | Uitleg                                                               | Voorbeeld (regel)               |
|---------------------|----------------------------------------------------------------------|---------------------------------|
| `fetch()`           | Ophalen van Pokémon en soorten via API                               | Regels 26–45, 50–66             |
| `async/await`       | Asynchroon werken met API-calls                                      | Regels 26, 50                   |
| `Array.map()`       | Omzetten van API-resultaten naar objecten                            | Regel 42, 64                    |
| `Array.filter()`    | Filtering van de dataset op naam, type, generatie, favorieten        | Regel 95                        |
| `Array.sort()`      | Sorteren op naam, ID, gewicht of hoogte                              | Regel 105                       |
| `localStorage`      | Favorieten en themakeuze onthouden                                   | Regels 70, 110                  |
| `addEventListener()`| Gebruikersinteractie zoals klik, input, scroll                        | Regels 143–160                  |
| DOM-manipulatie     | Dynamisch toevoegen van kaarten aan de HTML                          | Regel 56                        |
| `stopPropagation()` | Voorkomt bubbling van favorietknop                                   | Regel 67                        |
| Lazy Loading        | Meer Pokémon laden bij scroll naar onderkant                         | Regels 162–172                  |
| Thema toggling      | Wisselen tussen donker en licht + icoon wisselen                     | Regels 173–187                  |

---

## ️ Installatiehandleiding

1. **Clone de repository**
   ```bash
   git clone https://github.com/JelleSchroeven/PokeLibrary.git
   cd PokeLibrary
   ```

2. **Start een lokale server (bijvoorbeeld met Live Server in VS Code)**
    - Installeer de Live Server-extensie
    - Rechtermuisklik op `index.html` → "Open with Live Server"

3. **Open in je browser**
   ```
   http://localhost:5500/
   ```

---

##  Screenshots
![image](https://github.com/user-attachments/assets/300b12e3-f256-4b76-95da-03ba302342ac)
![image](https://github.com/user-attachments/assets/99d02c54-473d-421d-944c-875bfc44533e)
![image](https://github.com/user-attachments/assets/2d488f4e-1f40-430d-9c8a-5b1b4ea8bd0b)


*(Worden toegevoegd wanneer het project volledig afgewerkt is)*

---

##  Gebruikte bronnen

- [PokéAPI](https://pokeapi.co/)
- [MDN - Flexbox Aligning Items](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container)
- [MDN - Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading)
- [W3Schools - Scroll to Top](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp)
- [StackOverflow - WebStorm warnings](https://stackoverflow.com/questions/20835544/how-to-fight-tons-of-unresolved-variables-warning-in-webstorm)
- Zon-icoon: [PNGEgg Zon](https://www.pngegg.com/en/png-fnkkd)
- Maan-icoon: [PNGEgg Maan](https://www.pngegg.com/en/png-fnkke/download)
- [favorieten knop: ](https://gathering.tweakers.net/forum/list_messages/390126)
- [AI Chatlog : checken of de repo voldoet aan de opgave]( https://chatgpt.com/share/682e3e64-aafc-800a-afff-090f2ef0d5d3)
  

---

##  Auteur

**Naam:** Jelle Schroeven  
**Klas:** 1BaTI  
**Schooljaar:** 2024–2025  
**Project:** Pokedex Webapp – JavaScript Integratieproject
