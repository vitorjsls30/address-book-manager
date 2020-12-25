import { combineReducers } from 'redux';
import { extractAddresses } from '../../DataManager';

const initialState = extractAddresses();

const addresses = (state = initialState, action) => {
  // here goes the desired actio filters to return the data...
  // if (action.type == ACTION)...
  // returning the mock data for now...
  return state;
};

export default combineReducers({ addresses });