import { combineReducers } from 'redux';

const mock = {
  addresses: [],
  default: null
};

const addresses = (state = mock, action) => {
  // here goes the desired actio filters to return the data...
  // if (action.type == ACTION)...
  // returning the mock data for now...
  return state;
};

export default combineReducers({ addresses });