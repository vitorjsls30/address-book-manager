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

export default function AddressItem() {
  const classes = useStyles();

  const [billing, setBilling] = useState(false);
  const [shipping, setShipping] = useState(false);

  const handleCheck = (event, handlerFn) => {
    handlerFn(event.target.checked);
  };

  return(
    <FormControl>
      <Card className={classes.root}>
        <CardHeader 
          title={<Typography variant="h5" component="h2">My first Address</Typography>}
          action={
            <FormControlLabel control={<Radio value="my-address" checked={false} color="primary" />} />
          }
          className={classes.header}
        />

        <CardContent className={classes.content}>
          <IconButton color="inherit" className={classes.actions}>
            <Edit />
          </IconButton>
          <IconButton color="inherit" className={classes.actions}>
            <Delete />
          </IconButton>
          <Typography variant="body1">Sorocaba Street, 412, Apartment 01, 13339-390</Typography>
          <Typography variant="subtitle1" component="p">Indaituba - SP</Typography>
        </CardContent>

        <CardActions>
            <FormGroup row={true} >
              <FormControlLabel 
                control={<Checkbox checked={shipping} name="shipping" />}
                label="Shipping"
                onClick={(e) => handleCheck(e, setShipping)}
              />
              <FormControlLabel 
                control={<Checkbox checked={billing} name="billing" />}
                label="Billing"
                onClick={(e) => handleCheck(e, setBilling)}
              />
            </FormGroup>
        </CardActions>
      </Card>
    </FormControl>
  );
}