import React from 'react'
import { useEffect } from 'react'
import '../styles/list.css'
const api="https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
function List() {
        const[pokemonList,setPokemonList]=React.useState([]);   
        const fectchData=async()=>{
                try{
                       const response=await fetch(api);
                       const data=await response.json();
                 const result=data.results.map((pokemon)=>fetch(pokemon.url).then((res)=>res.json()));
                       const finalResult=await Promise.all(result);
                      setPokemonList(finalResult);
                }catch(error){
                        console.error(error);
                }
        }
 useEffect(() => {
        fectchData();
 }, [])


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
        </div></div>
)    
}   
export default List;
