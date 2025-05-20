import './style.css';

let allPokemon = []

console.log("Script gestart");


async function getPokemon() {
    console.log("Bezig met data ophalen van API...");

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();

    allPokemon = await Promise.all(data.results.map(async p => {
        const pokemonData = await fetch(p.url).then(r => r.json());
        const speciesData = await fetch(pokemonData.species.url).then(r => r.json());

        // Voegt de generatie info toe aan het pokemon object
        pokemonData.generation = speciesData.generation.name; // bv. 'generation-i'

        return pokemonData;
    }));

    applyFilters();
    }


/**pokemonlijst**/

function showPokemon(pokemonList) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    pokemonList.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <button class="favorite-btn" data-id="${pokemon.id}">
                <img src="pokeball-png-45330.png" alt="Favoriet">
            </button>
        `;

        const button = div.querySelector('.favorite-btn');
        const isFavorite = favorites.includes(pokemon.id);
        if (!isFavorite) {
            button.classList.add('not-favorite'); // fix hier: juiste class
        }

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const favs = JSON.parse(localStorage.getItem("favorites")) || [];
            const index = favs.indexOf(pokemon.id);
            if (index === -1) {
                favs.push(pokemon.id);
                button.classList.remove('not-favorite');
            } else {
                favs.splice(index, 1);
                button.classList.add('not-favorite');
            }
            localStorage.setItem("favorites", JSON.stringify(favs));
        });

        div.addEventListener('click', () => {
            alert(`je klikte op ${pokemon.name}`);
        });

        container.appendChild(div);
    });
}



/** zoekfunctie en Filters **/

function applyFilters() {
    const searchTerm = document.getElementById('search').value.toLowerCase();/** filter op Zoekbalk**/
    const selectedType = document.getElementById('type-filter').value;/** filter op Type**/
    const selectedGeneration = document.getElementById('generation-filter').value;/** filter op generatie**/
    const sortOption = document.getElementById('sort-filter').value /** Sorteer functie**/
    const favoritesOnly = document.getElementById('favorites-only').checked;
    //favorieten worden altijd als nummers gelezen
    const favorites = (JSON.parse(localStorage.getItem("favorites")) || []).map(Number);
//test
    console.log("🔍 Checkbox actief?", favoritesOnly);
    console.log("💾 Favorieten uit localStorage:", favorites);

    const filtered = allPokemon.filter(pokemon => {
        const nameMatches = pokemon.name.toLowerCase().includes(searchTerm);
        const typeMatches = selectedType === "all" || pokemon.types.some(t => t.type.name === selectedType);
        const generationMatches = selectedGeneration === "all" || pokemon.generation === selectedGeneration;
        const isFavorite = !favoritesOnly || favorites.includes(pokemon.id);

        return nameMatches && typeMatches && generationMatches && isFavorite;
    });

    console.log("Gefilterde lijst", filtered);// Test

    /** De sorteer functie (de logica)**/
    filtered.sort((a, b) => {
    switch (sortOption) {
        case 'name-asc':
            return a.name.localeCompare(b.name);
        case 'name-desc':
            return b.name.localeCompare(a.name);
        case 'id-asc':
            return a.id - b.id;
        case 'id-desc':
            return b.id - a.id;
        case 'weight-asc':
            return a.weight - b.weight;
        case 'weight-desc':
            return b.weight - a.weight;
        case 'height-asc':
            return a.height - b.height;
        case 'height-desc':
            return b.height - a.height;
        default:
            return a.id - b.id; // standaard sort naar id oplopend
    }
    });
//test
    console.log("✅ Gefilterde lijst:", filtered.map(p => p.name));

    showPokemon(filtered);
}

window.addEventListener("DOMContentLoaded", () =>{
    document.getElementById('generation-filter').addEventListener('change', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('favorites-only').addEventListener('change', applyFilters);

    getPokemon();
});



