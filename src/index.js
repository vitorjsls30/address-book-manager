import React from 'react';
import ReactDom from 'react-dom';
import AddressBook from './Components/AddressBook';

export const App = () => {
  return(
    <AddressBook />
  );
};

const root = document.getElementById('root');
root ? ReactDom.render(<App />, root) : false;