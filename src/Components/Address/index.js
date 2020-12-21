import React, { useState, useEffect } from 'react';
import Form from '../Common/Form';
import { handleAdddressUpdate, 
  filterAddress, 
  setStorageItem, 
  getStorageItem } from '../Common/DataManager';
import { validateFormField } from '../Common/Validation';
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

  const [addresses, setAddresses] = useState(() => {
    const items = getStorageItem('adb-manager');

    return !!items['addresses'] ? items['addresses'] : [];
  });

  const [formData, setFormData] = useState(() => {
    const address = filterAddress(id, addresses);

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
    const updated = handleAdddressUpdate(formData, addresses, id);
    const items = { addresses: updated };

    setStorageItem('adb-manager', items);
    // TODO - INFORM THE USER WITH A MODAL BEFORE REDIRECT...
    history.replace('/');
  }

  const isValid = () => {
    const validateErrs = validateFormField(formData);
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