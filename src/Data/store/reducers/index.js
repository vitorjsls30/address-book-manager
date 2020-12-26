import { combineReducers } from 'redux';
import { extractAddresses } from '../../DataManager';

const initialState = {
  items: extractAddresses(),
  default: null
};

const addresses = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_DEFAULT':
      console.log('SET_DEFAULT', { ...state, default: action.payload });
      return { ...state, default: action.payload };
  }
  console.log('returning state is', state);
  return state;
};

export default combineReducers({ addresses });