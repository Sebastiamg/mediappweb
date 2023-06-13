import axios from 'axios'
import { Pokemon, Species } from '../interfaces/pokemon.interface';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

const pokemonPrefix = '/pokemon';

async function getPokemons(): Promise<Species[]> {
  const res = await apiClient.get(pokemonPrefix)
  // console.log(res.data.results);
  return res.data.results
}

async function getOne(id: number): Promise<Pokemon> {
  const res = await apiClient.get(pokemonPrefix.concat(`/${id}`))
  // console.log(res.data)
  return res.data
}

async function postPokemon(pokemon: Pokemon): Promise<Pokemon> {
  const res = await apiClient.post<Pokemon>(pokemonPrefix, pokemon)
  console.log(res.data)
  return res.data
}

async function updatePokemon(id: number, pokemon: Pokemon) {
  const res = await apiClient.put<Pokemon>(pokemonPrefix.concat(`/${id}`), pokemon)
  console.log(res.data)
  return res.data
}

async function deletePokemon(id: number): Promise<Pokemon> {
  const res = await apiClient.delete(pokemonPrefix.concat(`/${id}`))
  console.log(res)
  return res.data
}



export { getPokemons, getOne, postPokemon, updatePokemon, deletePokemon }

