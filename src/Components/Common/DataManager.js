export const handleAdddressUpdate = (current, addresses, id) => {
  let currIdx = addresses.findIndex((item) => item.id == id);
  let replace = currIdx == -1 ? 0 : 1;

  currIdx = currIdx > -1 ? currIdx : addresses.length;

  addresses.splice(currIdx, replace, current);
  return addresses;
};

export const filterAddress = (id, addresses) => {
  if(!window.localStorage || !id) return;

  const address = !!addresses ? addresses.filter(item => item['id'] == id) : [];
  return !!address[0] ? address[0] : {};
};

export const deleteAddress = (id) => {
  const items = getStorageItem('adb-manager');
  if(!items['addresses']) return;

  const filtered = items['addresses'].filter(item => item.id != id);
  return filtered;
};

export const setStorageItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || {};
};