const updateState = (addresses) => {
  const items = getStorageItem('adb-manager');
  setStorageItem('adb-manager', { ...items, addresses });
}

export const extractAddresses = () => {
  if (!window.localStorage) return [];

  const data = getStorageItem('adb-manager');
  return data['items'] || [];
}

export const handleAddressUpdate = (current, id) => {
  const addresses = extractAddresses();
  let currIdx = addresses.findIndex((item) => item.id == id);
  let replace = currIdx == -1 ? 0 : 1;

  currIdx = currIdx > -1 ? currIdx : addresses.length;

  addresses.splice(currIdx, replace, current);
  updateState(addresses);
};

export const filterAddress = (id) => {
  if(!id) return;

  const addresses = extractAddresses();
  const address = addresses.filter(item => item['id'] == id);

  return !!address[0] ? address[0] : {};
};

export const deleteAddress = (id) => {
  const addresses = extractAddresses();
  if(!addresses.length) return;

  const filtered = addresses.filter(item => item.id != id);
  updateState(filtered);
  return filtered;
};

export const setDefaultAddress = (value) => {
  const addresses = extractAddresses();
  const data = { default: value, addresses };
  setStorageItem('adb-manager', data);
};

export const setAddressOption = (id, prop, value) => {
  const addresses = extractAddresses();
  if(!addresses.length) return;

  const address = addresses.filter(item => item.id == id);
  address[0][prop] = value;

  handleAddressUpdate(...address, id);
};

export const setStorageItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || {};
};