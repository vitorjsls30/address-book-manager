import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddressItem from './AddressItem';

export default function AddressBook (props) {
  const { titleSetter } = props;
  // TODO - analyze if this "selected" state can be moved to the "AddressItem" component...
  
  const [selected, setSelected] = useState();
  const [items, setItems] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('adb-manager')) || {};
    const addresses = !!stored['address'] ? [].concat(...stored['address']) : [];
    return addresses;
  });
  
  useEffect(() => {
    titleSetter('Manage Addresses');
  });
  
  const handleSelected = (value) => {
    // TODO - IMPLEMENT THE LOGIC TO INDICATE THAT THIS IS THE DESIRED ADDRESS TO USE...
    setSelected(value);
  }

  const displayItems = () => {
    return (
      !!items.length ? items.map(address => {
          return (<Grid item key={address['id']}>
            {/* TODO - PASS THE address ITEM AS A PROP REFERENCE INTO THE <AddressItem /> Component...*/}
            <AddressItem address={address} selected={selected} handleSelected={() => handleSelected(address['id'])} />
          </Grid>)
        })
      : <Typography variant="h5" component="h3">No items to display...</Typography>
    );
  }

  return(
    <Container>
        <Grid container direction="row" spacing={3}>
          { displayItems() }
        </Grid>
    </Container>
  );
};