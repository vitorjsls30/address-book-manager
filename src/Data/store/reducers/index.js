import { combineReducers } from 'redux';
import { extractAddresses } from '../../DataManager';

const stored = extractAddresses();

const initialState = {
  items: stored['items'] || [],
  default: stored['default']
};

const addresses = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_DEFAULT':
      return { ...state, default: action.payload };
    case 'DELETE_ADDRESS':
      return { ...state, items: state['items'].filter(item => item.id != action.payload) }
  }
  console.log('returning state is', state);
  return state;
};

export default combineReducers({ addresses });