import './style.css';


// lazy loading , laat eerstse 40 in 1 keer 
let allPokemon = [];
let loadedPokemon = [];
let offset = 0;
const limit = 40;
let isLoading = false;

//terug naar top functie
function scrollFunction() {
    const scrollToTop = document.getElementById("backToTopBtn");
    if (!scrollToTop) return;

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// zet de generatie namen om naar getallen
function generatieNaarGetal(generationName) {
    const map = {
        "generation-i": 1,
        "generation-ii": 2,
        "generation-iii": 3,
        "generation-iv": 4,
        "generation-v": 5,
        "generation-vi": 6,
        "generation-vii": 7,
        "generation-viii": 8,
    };
    return map[generationName] || '?';
}

// Laad op de achtergrond alle Pokémon (voor filters & zoekfuncties correct te doen werken)
async function preloadAllPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
        const data = await response.json();

        const batch = await Promise.all(data.results.map(async p => {
            const pokemonData = await fetch(p.url).then(r => r.json());
            const speciesData = await fetch(pokemonData.species.url).then(r => r.json());
            pokemonData.generation = speciesData.generation.name;
            return pokemonData;
        }));

        allPokemon = batch;
        console.log(" Alle Pokémon vooraf geladen");
    } catch (error) {
        console.error("Fout bij preload:", error);
    }
}

// Lazy loading ophalen volgende 40 pokemon
async function getPokemonBatch(offset, limit) {
    console.log(`Bezig met batch ophalen: offset ${offset}, limit ${limit}`);
    isLoading = true;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const batch = await Promise.all(data.results.map(async p => {
            const pokemonData = await fetch(p.url).then(r => r.json());
            const speciesData = await fetch(pokemonData.species.url).then(r => r.json());
            pokemonData.generation = speciesData.generation.name;
            return pokemonData;
        }));

        allPokemon.push(...batch);

        const loadedIds = new Set(loadedPokemon.map(p => p.id));
        const uniqueBatch = batch.filter(p => !loadedIds.has(p.id));
        loadedPokemon.push(...uniqueBatch);

        showPokemon(loadedPokemon);

    } catch (error) {
        console.error("Fout bij het laden van Pokémon batch:", error);
    }

    isLoading = false;
}

// Toon lijst van Pokémon
function showPokemon(pokemonList) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    pokemonList.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${pokemon.id}) ${pokemon.name} </h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Height: ${pokemon.height * 10} CM</p>
            <p>Weight: ${pokemon.weight / 10} KG</p>
            <p>Generatie: ${generatieNaarGetal(pokemon.generation)}</p>
            <button class="favorite-btn" data-id="${pokemon.id}">
                <img src="pokeball-png-45330.png" alt="Favoriet">
            </button>
        `;

        const button = div.querySelector('.favorite-btn');
        const isFavorite = favorites.includes(pokemon.id);
        if (!isFavorite) {
            button.classList.add('not-favorite');
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

// Filters toepassen op getoonde pokemon
let hasPreloaded = false;

async function applyFilters() {
    if (!hasPreloaded) {
        await preloadAllPokemon();
        hasPreloaded = true;
    }
//alle filterrrs en zoekbalk
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedType = document.getElementById('type-filter').value;
    const selectedGeneration = document.getElementById('generation-filter').value;
    const sortOption = document.getElementById('sort-filter').value;
    const favoritesOnly = document.getElementById('favorites-only').checked;
    const favorites = (JSON.parse(localStorage.getItem("favorites")) || []).map(Number);

    const filtered = allPokemon.filter(pokemon => {
        const nameMatches = pokemon.name.toLowerCase().includes(searchTerm);
        const typeMatches = selectedType === "all" || pokemon.types.some(t => t.type.name === selectedType);
        const generationMatches = selectedGeneration === "all" || pokemon.generation === selectedGeneration;
        const isFavorite = !favoritesOnly || favorites.includes(Number(pokemon.id));

        return nameMatches && typeMatches && generationMatches && isFavorite;
    });
//sorteer functie
    filtered.sort((a, b) => {
        switch (sortOption) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'id-asc': return a.id - b.id;
            case 'id-desc': return b.id - a.id;
            case 'weight-asc': return a.weight - b.weight;
            case 'weight-desc': return b.weight - a.weight;
            case 'height-asc': return a.height - b.height;
            case 'height-desc': return b.height - a.height;
            default: return a.id - b.id;
        }
    });

    showPokemon(filtered);
}

// Start script zodra DOM geladen is, laat en checked of er een filter is geactiveerd / geselecteerd
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('generation-filter').addEventListener('change', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('favorites-only').addEventListener('change', applyFilters);

    getPokemonBatch(offset, limit);
// is er geklikt op de back to top knop?
    document.getElementById('backToTopBtn').addEventListener('click', topFunction);
    window.onscroll = scrollFunction;
// dark of light theme laatste keer?
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeIcon(savedTheme);

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    if (!themeToggle || !themeIcon) {
        console.error("Theme toggle knop of icoon niet gevonden");
        return;
    }
//is de thema knop geklickt?
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-theme");
        document.body.classList.toggle("dark-theme", !isDark);
        document.body.classList.toggle("light-theme", isDark);
        localStorage.setItem("theme", isDark ? "light" : "dark");
        themeIcon.src = isDark ? "/moon-icon.png" : "/sun-icon.png";
    });

    function isFilterActief() {
        return (
            document.getElementById('generation-filter').value !== "all" ||
            document.getElementById('type-filter').value !== "all" ||
            document.getElementById('search').value.trim() !== "" ||
            document.getElementById('favorites-only').checked
        );
    }

    window.addEventListener("scroll", () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 80 &&
            !isLoading &&
            !isFilterActief()
        ) {
            offset += limit;
            getPokemonBatch(offset, limit);
        }
    });
});

// Thema functies
function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.classList.remove(`${currentTheme}-theme`);
    document.body.classList.add(`${newTheme}-theme`);
    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    icon.src = theme === "dark" ? "/sun-icon.png" : "/moon-icon.png";
}
