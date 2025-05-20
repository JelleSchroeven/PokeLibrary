# PokéLibrary – Pokedex Webapp

Welkom bij **PokéLibrary**, een interactieve Pokedex-webapp gebouwd met HTML, CSS en JavaScript. In deze applicatie kan je Pokémon filteren, sorteren en favorieten aanduiden. De data wordt opgehaald via de officiële PokéAPI.

##  Functionaliteiten

- ✅ Zoek Pokémon op naam.
- ✅ Filter op type (bijv. fire, grass).
- ✅ Filter op generatie (Gen I–VIII).
- ✅ Sorteer op naam, gewicht, grootte of Pokédex-nummer.
- ✅ Sla favorieten op via `localStorage`.
- ✅ Alleen favorieten tonen via checkbox.

##  Gebruikte JavaScript-concepten

Onderstaande concepten zijn toegepast in dit project, met concrete voorbeelden:

| Concept             | Toelichting                                                                 | Voorbeeld (regel)               |
|---------------------|------------------------------------------------------------------------------|---------------------------------|
| `Array.map()`       | Transformeert de lijst van opgehaalde Pokémon-URLs naar gedetailleerde data | `data.results.map(...)` (regel 11) |
| `Array.filter()`    | Filtert de lijst o.b.v. zoekterm, type, generatie en favoriet               | `allPokemon.filter(...)` (regel 74) |
| `Array.sort()`      | Sorteert Pokémon op ID, naam, gewicht of grootte                            | `filtered.sort(...)` (regel 89) |
| `async/await`       | Voor het asynchroon ophalen van API-data                                    | `async function getPokemon()` (regel 6) |
| `localStorage`      | Slaat favoriete Pokémon op tussen sessies                                   | `localStorage.setItem(...)` (regel 58) |
| `addEventListener()`| Registreert gebruikersinteracties                                           | `document.getElementById(...).addEventListener(...)` (regel 110+) |
| DOM-manipulatie     | Dynamisch toevoegen van kaarten in de UI                                    | `div.innerHTML = ...` (regel 37) |
| `stopPropagation()` | Voorkomt dat een klik op de favorietknop ook de kaartclick activeert        | `e.stopPropagation()` (regel 53) |

## 📁 Bestandsstructuur
src/
├── main.js # JavaScript logica
├── style.css # Stijling
└── index.html # HTML structuur

## 🧪 Gebruikte tools & API

- JavaScript (ES6+)
- HTML5
- CSS3
- [PokeAPI](https://pokeapi.co/)

## 🖼️ Screenshots

*(nog toe te voegen waneer voledig klaar)*

---

## Auteur

**Naam:** Jelle Schroeven  
**Klas:** 1BaTI  
**Schooljaar:** 2024–2025  
**Project:** Pokedex Webapp – JavaScript Integratieproject  


