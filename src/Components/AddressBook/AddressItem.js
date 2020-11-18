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

const useStyles = makeStyles({
  root: { 
    maxWidth: 275
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
  const { selected, handleSelected, addressId } = props;

  const [billing, setBilling] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheck = (event, handlerFn) => {
    handlerFn(event.target.checked);
  };

  const handleDeleteOpen = () => {
    setOpen(true);
  }

  return(
    <FormControl>
      <Card className={classes.root}>
        <CardHeader 
          title={<Typography variant="h5" component="h2">My first Address</Typography>}
          action={
            <FormControlLabel control={<Radio name="address" value="my-address" checked={selected === addressId} onChange={handleSelected} color="primary" />} />
          }
          className={classes.header}
        />

        <CardContent className={classes.content}>
          <IconButton component={Link} to={`Address/${addressId}`}  color="inherit" className={classes.actions}>
            <Edit />
          </IconButton>
          <IconButton color="inherit" className={classes.actions} onClick={handleDeleteOpen}>
            <Delete />
          </IconButton>
          <Typography variant="body1">Sorocaba Street, 412, Apartment 01, 13339-390</Typography>
          <Typography variant="subtitle1" component="p">Indaituba - SP</Typography>
        </CardContent>

        <CardActions>
            <FormGroup row={true} >
              <FormControlLabel 
                control={<Checkbox checked={shipping} name="shipping" onChange={(e) => handleCheck(e, setShipping)} />}
                label="Shipping"
              />
              <FormControlLabel 
                control={<Checkbox checked={billing} name="billing" onChange={(e) => handleCheck(e, setBilling)} />}
                label="Billing"
              />
            </FormGroup>
        </CardActions>
      </Card>
      <DeleteModal open={open} handleOpen={setOpen}/>
    </FormControl>
  );
}