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
    type PokemonDetail = {
        name: string;
        id: number;
        sprites: {
            front_default: string;
        };
        types: { type: { name: string } }[];
    };
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('ascending');
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

 const getPokemon = async () => {
  const apiPath = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  try {
    const res = await axios.get(apiPath, {});
    setItems(res.data.results);
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

  const handleSearch = (q: string | undefined) => {
    setQuery(q ? q : '');
    if (query === '') {
        setFilteredItems(items);
        return;
    }
    setFilteredItems(items.filter((p) => p.name.toLowerCase().includes(q ? q.toLowerCase() : '')));
  };

  const resetSelection = () => {
    setSelectedPokemon(null);
  }

  useEffect(() => {
    getPokemon();
  }, []);

  

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
            <ToggleGroup.Item className={styles.toggleButton} value="title">
              Title
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.toggleButton} value="ID">
              ID Number
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
    {filteredItems.length > 0 && (
  <div className={styles.containResults}>
    <div className={styles.resultsContainer}>
      {[...filteredItems]
        .sort((a, b) => {
          const idA = parseInt(a.url.split('/').slice(-2, -1)[0]);
          const idB = parseInt(b.url.split('/').slice(-2, -1)[0]);

          if (sortBy === "ID") {
            return order === "ascending" ? idA - idB : idB - idA;
          } else {
            return order === "ascending"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
        })
        .slice(0, 50)
        .map((p) => (
          <div key={p.name} className={styles.resultRow} onClick={() => getDetails(p.url)}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url
                .split("/")
                .slice(-2, -1)}.png`}
              alt={p.name}
            />
            <span className={styles.resultName}>
              {p.name}&#91;{p.url.split("/").slice(-2, -1)}&#93;<br/>&lt;-------
            </span>
          </div>
        ))}


    </div>
  </div>
)}

    {selectedPokemon && (
  <div className={styles.modalBackdrop} onClick={resetSelection}>
    <div
      className={styles.modalCard}
      onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing
    >
      <h2>{selectedPokemon.name}</h2>
      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
      />
      <p>ID: {selectedPokemon.id}</p>
      <p>
        Types: {selectedPokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <button onClick={resetSelection}>Close</button>
    </div>
  </div>
)}
     </>
  );
}
export default Search;

