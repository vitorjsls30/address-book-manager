import { combineReducers } from 'redux';
import { extractAddresses } from '../../DataManager';

const initialState = {
  addresses: extractAddresses()
};

const addresses = (state = initialState['addresses'], action) => {
  console.log('returning state', state);
  return state;
};

export default combineReducers({ addresses });