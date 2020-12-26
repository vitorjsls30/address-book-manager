import { combineReducers } from 'redux';
import { 
  extractAddresses, 
  handleAddressUpdate,
  setAddressOption, 
} from '../../DataManager';

const stored = extractAddresses();

const initialState = {
  items: stored['items'] || [],
  default: stored['default']
};

const addresses = (state = initialState, action) => {
  const { payload } = action;
  let updated = [];

  switch(action.type) {
    case 'SET_DEFAULT':
      return { ...state, default: payload };
    case 'DELETE_ADDRESS':
      return { ...state, items: state['items'].filter(item => item.id != payload) };
    case 'ADD_ADDRESS':
      updated = handleAddressUpdate(payload['current'], payload['id']);
      return { ...state, items: updated };
    case 'SET_OPTION':
      updated = setAddressOption(payload['id'], payload['prop'], payload['value']);
      return { ...state, items: updated };
  }
  return state;
};

export default combineReducers({ addresses });