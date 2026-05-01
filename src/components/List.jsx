import React, { useState } from 'react'
import { useEffect } from 'react'
import '../styles/list.css'
function List() {
        const [pokemonLoad,setPokemonLoad]=useState(25); 
        const api = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${pokemonLoad}`;
         const [search,setSearch]=useState(''); 
        const[pokemonList,setPokemonList]=useState([]); 
        const [favoritePokemon,setFavoritePokemon]=useState(() => {     
        const savedPokemon=localStorage.getItem('favoritePokemon');
        return savedPokemon?JSON.parse(savedPokemon):[];
});
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
        const fetchData=async()=>{
                
                       const response=await fetch(api);
                       const data=await response.json();
                 const result=data.results.map((pokemon)=>fetch(pokemon.url).then((res)=>res.json()));
                       const finalResult=await Promise.all(result);
                      setPokemonList((old)=>[...old,...finalResult]);
                
        }
 useEffect(() => {
        fetchData();
 }, [])


return (
        <div id='block'>
        <div id='list'>
                <h3>Pokemon List</h3>
                <input type='text' placeholder='Search Pokemon' onChange={(e)=>setSearch(e.target.value)} />
                {pokemonList.filter((pokemon) => 
                        pokemon.name.includes(search)
                ).map((pokemon) => (
                        <div id='card' key={pokemon.id}>
                                        <button id='save' onClick={() => savedPokemon(pokemon)}>        
                                                {favoritePokemon.some((p) => p.id === pokemon.id) ? 'Unsave' : 'Save'}</button>
                                <h4>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                         </div>
                ))}
        </div>
        <button id='load-more' onClick={() => setPokemonLoad(pokemonLoad + 25)}>
                Load More
        </button>
        </div>
)    
}   
export default List;

