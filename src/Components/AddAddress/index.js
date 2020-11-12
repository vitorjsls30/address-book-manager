import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

export default function AddAddress() {
  const classes = useStyles();

  const [cityUF, setCityUF] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [billing, setBilling] = useState(false);

  const handleCheck = (event, handlerFn) => {
    handlerFn(event.target.checked);
  }

  const handleChange = (event) => {
    setCityUF(event.target.value);
  }

  return(
      <React.Fragment>
        <main className={ classes.layout }>
          <Grid container direction="column" spacing={2} alignContent="center">
            <Grid item xs={12} sm={12}>
              <TextField id="name" label="Name" required placeholder="Type your Address name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField id="address" label="Address" required placeholder="Type your Full Address" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField id="city-uf" select required label="Select the City and UF" fullWidth value={cityUF} onChange={handleChange}>
                <MenuItem key="rj" value="rj">RJ</MenuItem>
                <MenuItem key="sp" value="sp">SP</MenuItem>
                <MenuItem key="es" value="es">ES</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField id="zip-code" required label="Zip Code" placeholder="Wich ZIP code?" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup row={true}>
                <FormControlLabel 
                  control={<Checkbox name="shipping" checked={shipping} onClick={(e) => handleCheck(e, setShipping)}/>}
                  label="Ship to this Address?"
                />
                <FormControlLabel 
                  control={<Checkbox name="billing" checked={billing} onClick={(e) => handleCheck(e, setBilling)}/>}
                  label="Billing Address"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
  );
}