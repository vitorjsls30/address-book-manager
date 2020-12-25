import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddressItem from './AddressItem';
import { deleteAddress, 
  setDefaultAddress,
  getStorageItem,
  extractAddresses } from '../../Data/DataManager';

  import { useStore } from 'react-redux';

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
  const store = useStore();

  const { titleSetter, search } = props;
  const classes = useStyles();

  const [selected, setSelected] = useState(() => {
    const items = getStorageItem('adb-manager');
    return items['default'];
  });

  const [items, setItems] = useState(() => {
    const addresses = store.getState();
    return addresses;
  });
  
  useEffect(() => {
    titleSetter('Manage Addresses');
  });

  useEffect(() => {
    const addresses = extractAddresses();
    const filtered = addresses.filter(item => item['name'].toLowerCase().includes(search.toLowerCase()));
    setItems(filtered);
  }, [search]);
  
  const handleSelected = (value) => {
    setDefaultAddress(value);
    setSelected(value);
  }

  const handleDelete = (id) => {
    const items = deleteAddress(id);
    setItems(items);
  }

  const displayItems = () => {
    return (
      !!items.length ? items.map(address => {
          return (
            <Grid item key={address['id']}>
              <AddressItem address={address} 
                selected={selected} 
                handleSelected={() => handleSelected(address['id'])} 
                handleDelete={() => handleDelete(address['id'])}
              />
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