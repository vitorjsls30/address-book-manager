const updateState = (addresses) => {
  const data = getStorageItem('adb-manager');
  setStorageItem('adb-manager', { ...data, items: addresses });
}

export const extractAddresses = () => {
  if (!window.localStorage) return [];

  const data = getStorageItem('adb-manager') || {};
  return { items: data['items'] || [], default: data['default'] };
}

export const handleAddressUpdate = (current, id) => {
  const addresses = extractAddresses()['items'];
  let currIdx = addresses.findIndex((item) => item.id == id);
  let replace = currIdx == -1 ? 0 : 1;

  currIdx = currIdx > -1 ? currIdx : addresses.length;

  addresses.splice(currIdx, replace, current);
  updateState(addresses);
  return addresses;
};

export const setAddressOption = (id, prop, value) => {
  const addresses = extractAddresses()['items'];
  if(!addresses.length) return;

  const address = addresses.filter(item => item.id == id);
  address[0][prop] = value;

  return handleAddressUpdate(...address, id);
};

export const setStorageItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || {};
};