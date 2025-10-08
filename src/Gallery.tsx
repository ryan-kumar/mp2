import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Gallery.module.scss';
import axios from 'axios';



function Gallery() {
       type PokemonListItem = {
        name: string;
        url: string;
        };

 
  const [filteredItems, setFilteredItems] = useState<PokemonListItem[]>([]);

  const navigate = useNavigate();

 const getPokemon = async () => {
  const apiPath = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  try {
    const res = await axios.get(apiPath, {});
    setFilteredItems(res.data.results);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
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

    </div>


        </>
    );
}

export default Gallery;