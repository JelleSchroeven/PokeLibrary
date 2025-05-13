let allPokemon = []

async function getPokemon() {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    allPokemon = await Promise.all(data.results.map(p => fetch(p.url).then(r => r.json())));
    showPokemon(allPokemon);
}

function showPokemon(pokemonList) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";
    pokemonList.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
        container.appendChild(div);
    });
}

// zoekfunctie

document.getElementById('search-btn').addEventListener('click', () => {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = allPokemon.filter(p => p.name.toLowerCase().includes(term));
    showPokemon(filtered);
});

getPokemon();