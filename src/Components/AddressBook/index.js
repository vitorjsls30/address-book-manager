import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddressItem from './AddressItem';
import { deleteAddress, 
  setStorageItem
} from '../../Data/DataManager';

import { useStore, useSelector, useDispatch } from 'react-redux';

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
  const sectionTitle = 'Manage Addresses';
  const store = useStore();
  const dispatch = useDispatch();

  const { titleSetter, search } = props;
  const classes = useStyles();

  const defaultItem = useSelector(state => state['addresses']['default']);
  const [selected, setSelected] = useState(defaultItem);

  const addresses = useSelector(state => state['addresses']['items']);
  const [items, setItems] = useState(addresses);
  
  useEffect(() => {
    titleSetter(sectionTitle);
  }, [sectionTitle]);

  useEffect(() => {
    const filtered = addresses.filter(item => item['name'].toLowerCase().includes(search.toLowerCase()));
    setItems(filtered);
  }, [search]);
  
  const handleSelected = useCallback((value) => {
    setSelected(value);
    dispatch({ type: 'SET_DEFAULT', payload: value });

    const updated = store.getState()['addresses'];
    setStorageItem('adb-manager', updated);
  }, [dispatch]);

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