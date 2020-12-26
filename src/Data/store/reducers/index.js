import { combineReducers } from 'redux';
import { 
  extractAddresses, 
  handleAddressUpdate } from '../../DataManager';

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
      return { ...state, items: state['items'].filter(item => item.id != action.payload) };
    case 'ADD_ADDRESS':
      const { current, id } = action.payload;
      const updated = handleAddressUpdate(current, id);
      return { ...state, items: updated };
  }
  console.log('returning state is', state);
  return state;
};

export default combineReducers({ addresses });