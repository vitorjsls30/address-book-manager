import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8)
  },
  inputs: {
    width: 200
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function AddAddress(props) {
  const { titleSetter } = props;
  const classes = useStyles();

  useEffect(() => {
    titleSetter('Add an Address');
  });

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cityUF, setCityUF] = useState('');
  const [shipping, setShipping] = useState(false);
  const [billing, setBilling] = useState(false);

  const handleCheck = (event, handlerFn) => {
    handlerFn(event.target.checked);
  }

  const handleChange = (event) => {
    setCityUF(event.target.value);
  }

  const clearData = () => {
    setName('');
    setAddress('');
    setCityUF('');
    setZipCode('');
    setShipping(false);
    setBilling(false);
  }

  const saveData = () => {
  }

  return(
      <React.Fragment>
        <main className={ classes.layout }>
          <Grid container spacing={2} alignContent="center">
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <TextField id="name" label="Name" required placeholder="Type your Address name" fullWidth 
                value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <TextField id="address" label="Address" required placeholder="Type your Full Address" fullWidth 
                value={address} onChange={(e) => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="city-uf" className={ classes.inputs } select required label="City and UF" value={cityUF} onChange={handleChange}>
                <MenuItem key="rj" value="rj">RJ</MenuItem>
                <MenuItem key="sp" value="sp">SP</MenuItem>
                <MenuItem key="es" value="es">ES</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="zip-code" required label="Zip Code" placeholder="Wich ZIP code?" 
                value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup row={true}>
                <FormControlLabel 
                  control={<Checkbox name="shipping" checked={shipping} onClick={(e) => handleCheck(e, setShipping)}/>}
                  label="Ship to this Address?"
                />
                <FormControlLabel 
                  control={<Checkbox name="billing" checked={billing} onClick={(e) => handleCheck(e, setBilling)}/>}
                  label="Billing Address?"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className={classes.buttons}>
                <Button id="clear-btn" onClick={clearData} >
                  Clear
                </Button>
                <Button id="clear-btn" onClick={saveData} color="primary" variant="contained">
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
  );
}