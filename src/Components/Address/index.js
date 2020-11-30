import React, { useState, useEffect } from 'react';
import Form from '../Common/Form';
import { regularName, zipCode } from '../Common/Validation';
import { useHistory } from 'react-router-dom';

export default function Address(props) {
  const { titleSetter } = props;

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
  const history = useHistory();


  const handleChange = (event) => {
    let value = event.target.value;
    
    if(event.target.type == 'checkbox') {
      value = event.target.checked;
    }

    setFormData({ ...formData, [event.target.name]: value });
    setErrors({ ...errors, [event.target.name]: false });
  }

  const clearData = () => {
    setFormData(initialValues);
  }

  const saveData = () => {
    if(!window.localStorage) {
      return;
    }

    let items = JSON.parse(window.localStorage.getItem('adb-manager')) || {};
    const addresses = !!items && items.hasOwnProperty('address')? items['address'] : [];
    items = { address: [...addresses, formData] };
    window.localStorage.setItem('adb-manager', JSON.stringify(items));
    // TODO - INFORM THE USER BEFORE REDIRECT...
    history.replace('/');
  }

  const isValid = () => {
    const validations = {
      name: regularName,
      address: regularName,
      cityUF: (value) => value == '',
      zipCode: zipCode
    }
    const required = Object.entries(validations);
    let validateErrs = {};

    required.forEach(item => {
      const [field, validation] = item;
      if(validation(formData[field])) {
        validateErrs = { ...validateErrs, [field]: true};
      }
    });

    if(!formData['shipping'] && !formData['billing']) {
      validateErrs = { ...validateErrs, shipping: true, billing: true };
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
        <Form 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          clearData={clearData}
          values={formData}
          errors={errors}
        />
      </React.Fragment>
  );
}