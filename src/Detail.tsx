import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailView.module.scss';

type PokemonDetail = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
};

function getAdjacentPokemonUrl(currentUrl: string, offset: number): string {
  const match = currentUrl.match(/\/pokemon\/(\d+)\//);
  if (!match) throw new Error("Invalid Pokémon URL");

  const currentId = parseInt(match[1], 10);
  const newId = currentId + offset;
  const clampedId = Math.max(1, newId);

  return `https://pokeapi.co/api/v2/pokemon/${clampedId}/`;
}

function DetailView() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiPath = (location.state as { apiPath?: string })?.apiPath;

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (!apiPath) {
      navigate('/'); 
      return;
    }

    const fetchPokemon = async () => {
      try {
        const res = await axios.get(apiPath);
        setPokemon(res.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchPokemon();
  }, [apiPath, navigate]);

  if (!pokemon) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.align}>
    <div className={styles.backdrop}>
        <div className={styles.card}>
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className={styles.sprite}
      />
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <button onClick={() => navigate('/detail', { state: { apiPath: getAdjacentPokemonUrl(apiPath ? apiPath : '', -1) } })}>prev</button>
      <button onClick={() => navigate('/detail', { state: { apiPath: getAdjacentPokemonUrl(apiPath ? apiPath : '', +1) } })}>next</button>
      </div>
    </div>
    </div>
  );
}

export default DetailView;