import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddressItem from './AddressItem';

export default function AddressBook (props) {
  const { titleSetter } = props;
  // TODO - analyze if this state can be moved to the "AddressItem" component...
  const [selected, setSelected] = useState();
  const addresses = JSON.parse(localStorage.getItem('adb-manager')) || {};
  const [items, setItems] = useState(addresses);

  useEffect(() => {
    // TODO - test if we can populate the items array here and just reference it on the Grid section...
    titleSetter('Manage Addresses');
  });
  
  const handleSelected = (value) => {
    // TODO - IMPLEMENT THE LOGIC TO INDICATE THAT THIS IS THE DESIRED ADDRESS TO USE...
    setSelected(value);
  }

  const displayItems = () => {
    return (
      items['address'].length > 0 ?
        items['address'].map((address, idx) => {
          return (<Grid item key={idx}>
            {/* TODO - PASS THE address ITEM AS A PROP REFERENCE INTO THE <AddressItem /> Component...*/}
            <AddressItem addressId={idx} selected={selected} handleSelected={() => handleSelected(idx)} />
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