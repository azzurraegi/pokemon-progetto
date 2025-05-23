import { useState, useEffect } from "react";
import axios from "axios";
import type { Pokemon } from "./interface/interfaces";
import "./styles.css";

export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState<number>(1);
  const [pokemon, setPokemon] = useState<Pokemon>({
    abilities: [],
    base_experience: 0,
    cries: { latest: "", legacy: "" },
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 1,
    is_default: false,
    location_area_encounters: "",
    moves: [],
    name: "Alakazam",
    order: 0,
    past_abilities: [],
    past_types: [],
    species: { name: "", url: "" },
    sprites: {
      front_default: "",
    },
    stats: [],
    types: [],
    weight: 1,
  });

  const MAX_POKEMON = 1025;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`
        );
        setPokemon(response.data);
      } catch (error) {
        alert("Errore nel caricamento del Pokémon");
      }
    };
    fetchPokemon();
  }, [currentPokemon]);

  return (
    <div className="App">
      <h1>Pokémon: {pokemon.name}</h1>
      <h2>Altezza: {pokemon.height}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <div className="button-container">
        <button
          onClick={() => setCurrentPokemon((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          -1
        </button>
        <button
          onClick={() =>
            setCurrentPokemon((prev) =>
              prev < MAX_POKEMON ? prev + 1 : MAX_POKEMON
            )
          }
        >
          +1
        </button>
        <button onClick={() => setCurrentPokemon(1)}>Primo</button>
        <button onClick={() => setCurrentPokemon(MAX_POKEMON)}>Ultimo</button>
      </div>
    </div>
  );
}
