# PokéLibrary – Pokedex Webapp

**PokéLibrary** is een interactieve Pokedex-webapp gebouwd met HTML, CSS en JavaScript. De app laat je toe Pokémon te zoeken, filteren, sorteren en markeren als favoriet. De gegevens worden opgehaald via de officiële PokéAPI.

---

## ✅ Functionaliteiten

- Zoek Pokémon op naam via een live zoekbalk.
- Filter op **type** (bv. Fire, Grass).
- Filter op **generatie** (Gen I–VIII).
- Sorteer op naam, gewicht, grootte of Pokédex-nummer.
- Sla favorieten op met `localStorage`.
- Toon enkel favorieten via checkbox.
- Thema wisselen (donker/licht) met toggle-knop.
- Lazy loading: automatisch meer Pokémon laden bij scrollen.

---

## 📦 Gebruikte JavaScript-concepten

| Concept               | Beschrijving                                                                 | Regelvoorbeeld uit code         |
|------------------------|------------------------------------------------------------------------------|----------------------------------|
| `Array.map()`         | Verwerkt API-respons en transformeert naar een array van Pokémon-data        | `data.results.map(...)` (± regel 42) |
| `Array.filter()`      | Filtert Pokémon o.b.v. type, naam, generatie en favoriet                     | `allPokemon.filter(...)` (± regel 95) |
| `Array.sort()`        | Sorteert Pokémon volgens de geselecteerde optie                              | `filtered.sort(...)` (± regel 108) |
| `async/await`         | Voor het asynchroon ophalen van data van de API                              | `async function getPokemonBatch(...)` (± regel 25) |
| `localStorage`        | Opslaan en ophalen van favorieten tussen sessies                             | `localStorage.setItem(...)` / `getItem(...)` (± regel 69) |
| `addEventListener()`  | Gebruikersinteracties afhandelen zoals clicks of input events                | `addEventListener(...)` (± regel 143) |
| DOM-manipulatie       | Dynamisch aanmaken en vullen van elementen (HTML kaarten)                    | `div.innerHTML = ...` (± regel 55) |
| `stopPropagation()`   | Voorkomt dat klikken op een knop de onderliggende kaart ook triggert         | `e.stopPropagation()` (± regel 67) |
| Lazy Loading          | Pokémon laden bij scrollen (in batches van 40)                               | `window.addEventListener('scroll', ...)` (± regel 163) |

---

## 🧪 Gebruikte tools & API

- ✅ **JavaScript (ES6+)**
- ✅ **HTML5**
- ✅ **CSS3 (Flexbox, dark/light theme)**
- ✅ **[PokeAPI](https://pokeapi.co/)** – Voor Pokémongegevens

---

## 🔗 Bronnen

- [PokeAPI](https://pokeapi.co/)
- [MDN Web Docs – Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading)
- [MDN Flexbox alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container)
- [StackOverflow – WebStorm Unresolved Variables](https://stackoverflow.com/questions/20835544/how-to-fight-tons-of-unresolved-variables-warning-in-webstorm)
- [W3Schools – Scroll to top](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp)
- Zon-icoon: [PNGEgg Zon](https://www.pngegg.com/en/png-fnkkd)
- Maan-icoon: [PNGEgg Maan](https://www.pngegg.com/en/png-fnkke/download)

---

## 👤 Auteur

**Naam:** Jelle Schroeven  
**Klas:** 1BaTI  
**Schooljaar:** 2024–2025  
**Project:** Pokedex Webapp – JavaScript Integratieproject
