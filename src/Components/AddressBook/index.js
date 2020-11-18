import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddressItem from './AddressItem';

export default function AddressBook (props) {
  const { titleSetter } = props;
  const [selected, setSelected] = useState();

  useEffect(() => {
    titleSetter('Manage Addresses');
  });
  
  const handleSelected = (value) => {
    setSelected(value);
  }

  return(
    <Container>
        <Grid container direction="row" spacing={3}>
          {
            [1,2,3].map(addressId => {
              return (<Grid item key={addressId}>
                <AddressItem addressId={addressId} selected={selected} handleSelected={() => handleSelected(addressId)} />
              </Grid>)
            })
          }
        </Grid>
    </Container>
  );
};