const dropdown = document.getElementById("dropdown");
const image = document.getElementById("image");
const info = document.getElementById("info");
const noPicture = document.getElementById("noPicture");

let currentPokemon = null;
let showingFront = true;


async function loadPokemonList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");

        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon list");
        }

        const data = await response.json();

        data.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.value = pokemon.name;
            option.textContent = pokemon.name;
            dropdown.appendChild(option);
        });

    } catch (error) {
        info.innerHTML = `<p style="color:red;">Error loading Pokémon list</p>`;
        console.error(error);
    }
}


async function loadPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon data");
        }

        const data = await response.json();
        currentPokemon = data;

        
        image.src = data.sprites.front_default;
        image.style.display = "block";
        noPicture.style.display = "none";
        showingFront = true;

        
        info.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Weight:</strong> ${data.weight}</p>
            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
        `;

    } catch (error) {
        info.innerHTML = `<p style="color:red;">Error loading Pokémon data</p>`;
        image.style.display = "none";
        noPicture.style.display = "inline";
        console.error(error);
    }
}


dropdown.addEventListener("change", () => {
    const selected = dropdown.value;

    if (!selected) {
        image.style.display = "none";
        noPicture.style.display = "inline";
        info.innerHTML = "";
        return;
    }

    loadPokemon(selected);
});


image.addEventListener("click", () => {
    if (!currentPokemon) return;

    if (showingFront) {
        image.src = currentPokemon.sprites.back_default;
    } else {
        image.src = currentPokemon.sprites.front_default;
    }

    showingFront = !showingFront;
});


loadPokemonList();