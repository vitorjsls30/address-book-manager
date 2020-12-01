import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddressItem from './AddressItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  none: {
    textAlign: 'center',
    color: '#898790'
  }
}));

export default function AddressBook (props) {
  const { titleSetter } = props;
  const classes = useStyles();

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
    // TODO - IMPLEMENT THE LOGIC TO INDICATE THAT THIS IS THE DESIRED ADDRESS TO USE
    // AND SAVE IT FOR THE LATER RENDER
    setSelected(value);
  }

  const displayItems = () => {
    return (
      !!items.length ? items.map(address => {
          return (
            <Grid item key={address['id']}>
              <AddressItem address={address} selected={selected} handleSelected={() => handleSelected(address['id'])} />
            </Grid>
          );
        })
      : <Grid item xl={12} lg={12} xs={12} sm={12}>
          <Typography className={classes.none} variant="h6" component="h6">Start Adding Addresses to display them here :)</Typography>
        </Grid>
    );
  }

  return(
    <Container>
        <Grid container className={ classes.root } direction="row" spacing={3}>
          { displayItems() }
        </Grid>
    </Container>
  );
};