const pokedex = document.querySelector("#pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 800; i++) {
    if (i !== null) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(" | ")
    }));

    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);

  const pokemonHTMLString = pokemon
    .map(
      (p) => `<li class="card">
  <img class="card-image" src="${p.image}" />
  <h2 class="card-title"><span class="id">${p.id}. </span> ${p.name}</h2>
  <h4 class="card-subtitle">Type: ${p.type}
</li>`
    )
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();