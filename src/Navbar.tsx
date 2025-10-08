import React, { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import styles from './Navbar.module.scss';
import pball from './assets/pball.png';

interface NavbarProps {
  onViewChange: (view: string) => void;
}

function Navbar({ onViewChange }: NavbarProps) {
  const [view, setView] = useState('Search');

  const handleChange = (value: string) => {
    setView(value);
    onViewChange(value);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <img className={styles.pokeball} src={pball} alt="pokeball" />
        <h1 className={styles.title}>Pokéxplorer</h1>
      </div>


       <div className={styles.section}>
          <ToggleGroup.Root
            className={styles.toggleGroup}
            type="single"
            value={view}
            onValueChange={(val) => val && handleChange(val)}
          >
            <ToggleGroup.Item className={styles.toggleButton} value="Search">
              Search
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.toggleButton} value="Gallery">
              Gallery
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
    </header>
  );
}

export default Navbar;