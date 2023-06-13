import { useEffect, useState } from "react"
import { getOne, getPokemons } from "../services/auth.service"
import { Pokemon } from "../interfaces/pokemon.interface"


export default function PokemonCard() {

  const [pokemons, setPokemons] = useState<string[]>([])
  const [pokeDta, setPokeData] = useState<Pokemon[]>([])

  useEffect(() => {
    getPokemons().then(res => {
      const pokes: Array<string> = []
      res.forEach(poke => pokes.push(poke.url))
      setPokemons(values => ([...values, ...pokes]))

      pokes.forEach(url => {
        const id = url.split('/').reverse()[1];
        getOne(parseInt(id)).then((onePoke) => {
          setPokeData(pokemons => ([...pokemons, onePoke]))
        })
      })

    })
  }, [])

  return (
    <>
      <h1 className="text-center font-bold text-5xl my-4">
        Michael Ortiz || David Castro || Tatiana Demera
      </h1>
      <section className="flex flex-wrap items-center bg-emerald-300 justify-evenly text-center w-full">
        {
          !pokeDta.length ? <h1>NO POKEMONS FOUND...</h1> :
            pokeDta.map((uniquePoke, index) => (
              <div key={index} className={`w-1/12 h-[200px] border-2 border-emerald-600 m-2 p-2 rounded-md shadow-md shadow-black bg-lime-500`}>
                <img src={uniquePoke.sprites["front_default"]} alt={uniquePoke.name} className="rounded-md bg-emerald-50 mx-auto" />
                <h1>{uniquePoke.name}</h1>
                <h3 className="font-semibold">B.E: <span className="font-normal">{uniquePoke.base_experience}</span></h3>
                <h3 className="font-semibold">Sp: <span className="font-normal">{uniquePoke.species.name}</span></h3>
              </div>
            ))
        }
      </section >
    </>
  )
}
