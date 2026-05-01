import React from 'react';
import '../styles/PokemonCard.css';
function PokemonCard({ pokemon, closedCard }) {

  if (!pokemon) return null;

  return (
    <div id='overlay' onClick={closedCard}>

      <div id='content' onClick={(e) => e.stopPropagation()}>

        <button id='close' onClick={closedCard}>X</button>

        <h1>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>

        <img 
          src={pokemon.sprites.other["official-artwork"].front_default} 
          alt={pokemon.name} 
        />

        <div id='state'>
          {pokemon.stats?.map((stat) => (
            <p key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>

      </div>

    </div>
  );
}

export default PokemonCard;