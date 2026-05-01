import React, { useState, useEffect } from 'react';
import '../styles/list.css';
import PokemonCard from './PokemonCard';

function List() {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonLoad, setPokemonLoad] = useState(0);
  const [search, setSearch] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  const [favoritePokemon, setFavoritePokemon] = useState(() => {
    const savedPokemon = localStorage.getItem('favoritePokemon');
    return savedPokemon ? JSON.parse(savedPokemon) : [];
  });
  const api = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${pokemonLoad}`;

  const savedPokemon = (pokemon) => {
    const exists = favoritePokemon.some((p) => p.id === pokemon.id);

    if (exists) {
      setFavoritePokemon((old) => old.filter((p) => p.id !== pokemon.id));
    } else {
      setFavoritePokemon((old) => [...old, pokemon]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));
  }, [favoritePokemon]);

  const fetchData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();

      const result = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
const finalResult = await Promise.all(result);
      setPokemonList((old) => {
        const combined = [...old, ...finalResult];

        return combined.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id)
        );
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pokemonLoad]);

  return (
    <div id='block'>

      <h3>Pokemon List</h3>
      <input
        type='text'
        placeholder='Search Pokemon'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div id='list'>
        {pokemonList
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((pokemon) => (
            <div
              className='card'
              key={pokemon.id}
              onClick={() => setSelectedPokemon(pokemon)}
            >

              <button
                id='save'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  savedPokemon(pokemon);
                }}
              >
                {favoritePokemon.some((p) => p.id === pokemon.id)
                  ? 'Unsave'
                  : 'Save'}
              </button>

              <h4>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h4>

              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />

            </div>
          ))}
      </div>

      <button
        id='load-more'
        onClick={() => setPokemonLoad(pokemonLoad + 25)}
      >
        Load More
      </button>

      {selectedPokemon && (
        <PokemonCard
          pokemon={selectedPokemon}
          closedCard={() => setSelectedPokemon(null)}
        />
      )}

    </div>
  );
}

export default List;