import React, { useState, useEffect } from 'react';
import * as Label from '@radix-ui/react-label';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './Search.module.scss';
import axios from 'axios';

function Search() {

    type PokemonListItem = {
    name: string;
    url: string;
    };
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('evolution');
  const [order, setOrder] = useState('ascending');
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PokemonListItem[]>([]);

 const getPokemon = async () => {
  const apiPath = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  try {
    const res = await axios.get(apiPath, {});
    setItems(res.data.results);
    console.log(res.data.results);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
  };

  const handleSearch = (q: string | undefined) => {
    setQuery(q ? q : '');
    if (!query) {
        setFilteredItems(items);
        return;
    }
    setFilteredItems(items.filter((p) => p.name.toLowerCase().includes(q ? q.toLowerCase() : '')));
  };

  useEffect(() => {
    getPokemon();
  }, []);



  return (
    <>
    <div className={styles.outer}>
      <div className={styles.cliBox}>
        <p>{`> Welcome! Enter the name of the Pokémon you would like to search for:`}</p>
        <div className={styles.prompt}>
          <span>{`>[trainer@pokéxplorer]`}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rayquaza"
            className={styles.input}
          />
        </div>

        <div className={styles.wrapselect}>
        <div className={styles.section}>
         <Label.Root>Sort By:</Label.Root>
          <ToggleGroup.Root
            className={styles.toggleGroup}
            type="single"
            value={sortBy}
            onValueChange={(val) => val && setSortBy(val)}
          >
            <ToggleGroup.Item className={styles.toggleButton} value="evolution">
              Evolution Stage
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.toggleButton} value="capture-rate">
              Capture Rate
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div className={styles.section}>
          <Label.Root>Order:</Label.Root>
          <ToggleGroup.Root
            className={styles.toggleGroup}
            type="single"
            value={order}
            onValueChange={(val) => val && setOrder(val)}
          >
            <ToggleGroup.Item className={styles.toggleButton} value="ascending">
              Ascending
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.toggleButton} value="descending">
              Descending
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        </div>

      </div>
    </div>
        <div className={styles.results}>
        {filteredItems.slice(0, 20).map((p) => (
            <p key={p.name}>{p.name}</p>
        ))}
        </div>
     </>
  );
}
export default Search;

