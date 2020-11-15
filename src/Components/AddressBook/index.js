import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddressItem from './AddressItem';

export default function AddressBook () {
  return(
    <Container>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <AddressItem />
        </Grid>
        <Grid item>
          <AddressItem />
        </Grid>
        <Grid item>
          <AddressItem />
        </Grid>
      </Grid>
    </Container>
  );
};