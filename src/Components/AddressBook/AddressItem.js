import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import DeleteModal from '../DeleteModal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: { 
    width: 275
  },
  header: {
    padding: 12
  },
  content: {
    padding: 12
  },
  actions: {
    padding: 5
  }
});

export default function AddressItem(props) {
  const classes = useStyles();
  const { selected, handleSelected, handleDelete, address } = props;

  const [billing, setBilling] = useState(address['billing']);
  const [shipping, setShipping] = useState(address['shipping']);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCheck = (event, handlerFn, name) => {
    dispatch({ 
      type: 'SET_OPTION', 
      payload: { id: address['id'], prop: name, value: event.target.checked } 
    });
    handlerFn(event.target.checked);
  };

  const handleDeleteOpen = () => {
    setOpen(true);
  }

  return(
    <FormControl>
      <Card className={classes.root}>
        <CardHeader 
          title={<Typography variant="h5" component="h2">{ address['name'] }</Typography>}
          action={
            <FormControlLabel control={<Radio name="address" value="my-address" checked={ selected === address['id'] } onChange={ handleSelected } color="primary" />} />
          }
          className={classes.header}
        />

        <CardContent className={ classes.content }>
          <IconButton component={ Link } to={ `Address/${address['id']}` }  color="inherit" className={ classes.actions }>
            <Edit />
          </IconButton>
          <IconButton color="inherit" className={ classes.actions } onClick={ handleDeleteOpen }>
            <Delete />
          </IconButton>
          <Typography variant="body1">{ address['address'] }</Typography>
          <Typography variant="subtitle1" component="p">{ address['city'] } - { address['uf'] }</Typography>
        </CardContent>

        <CardActions>
            <FormGroup row={true} >
              <FormControlLabel 
                control={<Checkbox checked={shipping} name="shipping" onChange={(e) => handleCheck(e, setShipping, 'shipping')} />}
                label="Shipping"
              />
              <FormControlLabel 
                control={<Checkbox checked={billing} name="billing" onChange={(e) => handleCheck(e, setBilling, 'billing')} />}
                label="Billing"
              />
            </FormGroup>
        </CardActions>
      </Card>
      <DeleteModal open={open} handleOpen={setOpen} handleDelete={ handleDelete } id={address['id']} />
    </FormControl>
  );
}