import React, { useState, useEffect } from 'react';
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

export default function Address(props) {
  const { titleSetter } = props;
  const classes = useStyles();

  const initialValues = {
    name: '',
    address: '',
    zipCode: '',
    cityUF: '',
    shipping: false,
    billing: false
  };
  Object.freeze(initialValues);

  useEffect(() => {
    titleSetter();
  });

  const [formData, setFormData] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const value = !!event.target.checked ? event.target.checked : event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
    setErrors({ ...errors, [event.target.name]: false });
  }

  const clearData = () => {
    setFormData(initialValues);
  }

  const saveData = () => {
    console.log('Yo! your form is valid!! Go go go!');
  }

  const isValid = () => {
    const required = ['name', 'address', 'cityUF', 'zipCode'];
    let validateErrs = {};

    required.forEach(item => {
      if(!formData[item]) {
        validateErrs = { ...validateErrs, [item]: true};
      }
    });

    if(!formData['shipping'] && !formData['billing']) {
      validateErrs = { ...validateErrs, 'shipping': true, 'billing': true };
    }

    setErrors(prevState => {
      return {...prevState, ...validateErrs}
    });
    return !Object.keys(validateErrs).length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(isValid()) {
      saveData();
    }
  }

  return(
      <React.Fragment>
        <main className={ classes.layout }>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <TextField id="name" name="name" label="Name" placeholder="Type your Address name" fullWidth 
                  value={formData['name']} onChange={handleChange} error={errors['name']} />
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <TextField id="address" name="address" label="Address" placeholder="Type your Full Address" fullWidth 
                  value={formData['address']} onChange={handleChange} error={errors['address']} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="city-uf" name="cityUF" className={ classes.inputs } select label="City and UF" value={formData['cityUF']} onChange={handleChange} error={errors['cityUF']}>
                  <MenuItem key="rj" value="rj">RJ</MenuItem>
                  <MenuItem key="sp" value="sp">SP</MenuItem>
                  <MenuItem key="es" value="es">ES</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="zip-code" 
                  name="zipCode" 
                  label="Zip Code" 
                  placeholder="Wich ZIP code?" 
                  value={formData['zipCode']} 
                  onChange={handleChange} 
                  error={errors['zipCode']}
                  InputProps={{ inputComponent: TextFieldCustom }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required error={errors['shipping'] && errors['billing']}>
                  <FormLabel component="legend">Pick at Least One</FormLabel>
                  <FormGroup row={true}>
                    <FormControlLabel 
                      control={<Checkbox name="shipping" checked={formData['shipping']} onChange={handleChange} />}
                      label="Ship to this Address?"
                    />
                    <FormControlLabel 
                      control={<Checkbox name="billing" checked={formData['billing']} onChange={handleChange} />}
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
                  <Button id="save-btn" color="primary" variant="contained" type="submit">
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </main>
      </React.Fragment>
  );
}