import React, { useState, useEffect } from 'react';
import Form from '../Common/Form';
import { regularName, zipCode } from '../Common/Validation';
import { useHistory, useParams } from 'react-router-dom';

export default function Address(props) {
  const { titleSetter } = props;
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    titleSetter();
  });

  let initialValues = {
    id: new Date().getTime(),
    name: '',
    address: '',
    zipCode: '',
    city: '',
    uf: '',
    shipping: false,
    billing: false
  };
  Object.freeze(initialValues);

  const getAddress = (id) => {
    if(!window.localStorage || !id) return;

    const address = !!addresses ? addresses.filter(item => item['id'] == id) : [];
    return !!address[0] ? address[0] : {};
  };

  const [addresses, setAddresses] = useState(() => {
    const items = JSON.parse(window.localStorage.getItem('adb-manager')) || {};
    return !!items['addresses'] ? items['addresses'] : [];
  });

  const [formData, setFormData] = useState(() => {
    const address = getAddress(id);
    return !!address ? address : initialValues;
  });

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
    const filtered = addresses.filter(item => item.id != id) || [];
    const items = { addresses: [...filtered, formData] };

    window.localStorage.setItem('adb-manager', JSON.stringify(items));
    // TODO - INFORM THE USER WITH A MODAL BEFORE REDIRECT...
    history.replace('/');
  }

  const isValid = () => {
    const validations = {
      name: regularName,
      address: regularName,
      city: (value) => value == '',
      uf: (value) => value == '',
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