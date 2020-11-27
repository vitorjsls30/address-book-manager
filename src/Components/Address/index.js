import React, { useState, useEffect } from 'react';
import Form from '../Common/Form';

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