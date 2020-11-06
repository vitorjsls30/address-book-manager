import React from 'react';
import ReactDom from 'react-dom';

export const Hello = () => {
  return(<h3>Yo! That's your first component!</h3>);
};

const root = document.getElementById('root');
root ? ReactDom.render(<Hello />, root) : false;