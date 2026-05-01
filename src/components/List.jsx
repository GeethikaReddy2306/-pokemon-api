import React, { useState } from 'react'
import { useEffect } from 'react'
import '../styles/list.css'
function List() {
        const [pokemonLoad,setPokemonLoad]=useState(25); 
const api = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${pokemonLoad}`;
          
        const[pokemonList,setPokemonList]=React.useState([]);   
        const fetchData=async()=>{
                try{
                       const response=await fetch(api);
                       const data=await response.json();
                 const result=data.results.map((pokemon)=>fetch(pokemon.url).then((res)=>res.json()));
                       const finalResult=await Promise.all(result);
                      setPokemonList((old)=>[...old,...finalResult]);
                }catch(error){
                        console.error(error);
                }
        }
 useEffect(() => {
        fetchData();
 }, [pokemonLoad])


return (
        <div id='block'>
        <div id='list'>
                <h3>Pokemon List</h3>
                {pokemonList.map((pokemon) => (
                        <div id='card' key={pokemon.id}>
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

