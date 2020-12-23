import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MaskedInput from 'react-text-mask';

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

const TextFieldCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput 
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'_'}
    />
  );
};

export default function Form(
  { 
    handleSubmit,
    handleChange,
    clearData,
    values,
    errors
  })
  {
    const classes = useStyles();

    const [disabled, setDisabled] = useState(true);

    const fieldHandler = (event) => {
      setDisabled(false);
      handleChange(event);
    };

    return(
      <main className={ classes.layout }>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignContent="center">
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <TextField id="name" name="name" label="Name" placeholder="Type your Address name" fullWidth 
                value={values['name']} onChange={fieldHandler} error={errors['name']} />
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <TextField id="address" name="address" label="Address" placeholder="Type your Full Address" fullWidth 
                value={values['address']} onChange={fieldHandler} error={errors['address']} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="city" name="city" label="City" placeholder="City Name..." value={values['city']} 
                onChange={fieldHandler} error={errors['city']} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="uf" name="uf" className={ classes.inputs } select label="UF" value={values['uf']} onChange={fieldHandler} error={errors['uf']}>
                <MenuItem key="rj" value="rj">RJ</MenuItem>
                <MenuItem key="sp" value="sp">SP</MenuItem>
                <MenuItem key="es" value="es">ES</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="zip-code" 
                name="zipCode" 
                label="Zip Code" 
                placeholder="Wich ZIP code?" 
                value={values['zipCode']} 
                onChange={fieldHandler} 
                error={errors['zipCode']}
                InputProps={{ inputComponent: TextFieldCustom }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required error={errors['shipping'] && errors['billing']}>
                <FormLabel component="legend">Pick at Least One</FormLabel>
                <FormGroup row={true}>
                  <FormControlLabel 
                    control={<Checkbox name="shipping" checked={values['shipping']} onChange={fieldHandler} />}
                    label="Ship to this Address?"
                  />
                  <FormControlLabel 
                    control={<Checkbox name="billing" checked={values['billing']} onChange={fieldHandler} />}
                    label="Billing Address?"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className={classes.buttons}>
                <Button id="clear-btn" onClick={clearData} >
                  Clear
                </Button>
                <Button id="save-btn" color="primary" variant="contained" type="submit" disabled={disabled}>
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </main>
    );
};