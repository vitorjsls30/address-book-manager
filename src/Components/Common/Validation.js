export const regularName = (name) => {
  if(/^[a-zA-Z\u00C0-\u017F 0-9]+$/.test(name)) {
    return null;
  }
  if(!name.trim().length >= 3) {
    return null
  }
  return true;
}

export const zipCode = (address) => {
  if(/^\d{5}-?\d{3}$/.test(address)) {
    return null;
  }
  if(!address.trim().length >= 9) {
    return null
  }
  return true;
}

export const validateFormField = (formData) => {
  let validateErrs = {};

  const validations = {
    name: regularName,
    address: regularName,
    city: (value) => value == '',
    uf: (value) => value == '',
    zipCode: zipCode
  };

  const required = Object.entries(validations);
  required.forEach(item => {
    const [field, validation] = item;
    if(validation(formData[field])) {
      validateErrs = { ...validateErrs, [field]: true};
    }
  });

  if(!formData['shipping'] && !formData['billing']) {
    validateErrs = { ...validateErrs, shipping: true, billing: true };
  }

  return validateErrs;
}