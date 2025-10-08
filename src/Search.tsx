import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './Search.module.scss';

function Search() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('evolution');
  const [order, setOrder] = useState('ascending');



  return (
    <div className={styles.outer}>
      <div className={styles.cliBox}>
        <p>{`> Welcome! Enter the name of the Pokémon you would like to search for:`}</p>
        <div className={styles.prompt}>
          <span>{`>[trainer@pokéxplorer]`}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
  );
}
export default Search;

