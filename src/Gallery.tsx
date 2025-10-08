import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Gallery.module.scss';
import axios from 'axios';



function Gallery() {
       type PokemonListItem = {
        name: string;
        url: string;
        };

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

  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const navigate = useNavigate();

 const getPokemon = async () => {
  const apiPath = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  try {
    const res = await axios.get(apiPath, {});
    setItems(res.data.results);
    setFilteredItems(res.data.results);
    //console.log(res.data.results);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
  };


const getDetails = async (apiPath: string | undefined) => {
  apiPath  = apiPath ? apiPath : '';
  try {
    const res = await axios.get(apiPath, {});
    setSelectedPokemon(res.data);
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
  };

  useEffect(() => { getPokemon(); }, []);




    return (
        <>
           <div className={styles.galleryContainer}>
      <div className={styles.grid}>
        {filteredItems.map((p) => (
          <div
            key={p.name}
            className={styles.card}
            onClick={() => navigate('/detail', { state: { apiPath: p.url } })}
          >
            <img
              className={styles.sprite}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url
                .split('/')
                .slice(-2, -1) 
                .join('')}.png`}
              alt={p.name}
            />
            <p className={styles.name}>{p.name}</p>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className={styles.detailPanel}>
          <h3>{selectedPokemon.name}</h3>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className={styles.detailSprite}
          />
          <p>Type: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </div>
      )}
    </div>


        </>
    );
}

export default Gallery;