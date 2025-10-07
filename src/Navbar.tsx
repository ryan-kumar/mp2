import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './Navbar.module.scss';
import pball from './assets/pball.png';

interface NavbarProps {
  onViewChange: (view: string) => void;
}

function Navbar({ onViewChange }: NavbarProps) {
  const [view, setView] = React.useState('Search'); 

  const handleChange = (event: SelectChangeEvent) => {
    const newView = event.target.value;
    setView(newView);
    onViewChange(newView); 
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.container}>
        <Typography id="NavTitle" variant="h5" sx={{ flexGrow: 1 }}>
          <img className={styles.img} src={pball} alt="pokeball image"/>
          Pokèxplorer
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-view-label">View</InputLabel>
            <Select
              labelId="select-view-label"
              id="select-view"
              value={view}
              label="View"
              onChange={handleChange}
            >
              <MenuItem value="Search">Search</MenuItem>
              <MenuItem value="Gallery">Gallery</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
