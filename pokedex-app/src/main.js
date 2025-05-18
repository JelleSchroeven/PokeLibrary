import './style.css';

let allPokemon = []

async function getPokemon() {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
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

    pokemonList.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>`;
        container.appendChild(div);

        /**Klikbaren kaarten**/
        div.addEventListener('click', () => {
            alert(`je klikte op ${pokemon.name}`)/**tijdelijk**/
        })

    });
}

/** zoekfunctie en Filters **/

function applyFilters() {
    const searchTerm = document.getElementById('search').value.toLowerCase();/** filter op Zoekbalk**/
    const selectedType = document.getElementById('type-filter').value;/** filter op Type**/
    const selectedGeneration = document.getElementById('generation-filter').value;/** filter op generatie**/
    const sortOption = document.getElementById('sort-filter').value /** Sorteer functie**/

    const filtered = allPokemon.filter(pokemon => {
        const nameMatches = pokemon.name.toLowerCase().includes(searchTerm);
        const typeMatches = selectedType === "all" ||
            pokemon.types.some(t => t.type.name === selectedType);
        const generationMatches = selectedGeneration === "all" ||
            pokemon.generation === selectedGeneration;

        return nameMatches && typeMatches && generationMatches;
    });
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
            return a.id - b.id; // fallback naar id oplopend
    }
    });

    showPokemon(filtered);
}


document.getElementById('generation-filter').addEventListener('change', applyFilters);
document.getElementById('type-filter').addEventListener('change', applyFilters);
document.getElementById('sort-filter').addEventListener('change', applyFilters);
document.getElementById('search').addEventListener('input', applyFilters);


getPokemon();
