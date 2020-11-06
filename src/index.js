import React from 'react';
import ReactDom from 'react-dom';
import { Button } from '@material-ui/core';

export const Hello = () => {
  return(
    <Button variant="contained" color="primary">
      Yo! That's your first component with Material dude!
    </Button>
  );
};

const root = document.getElementById('root');
root ? ReactDom.render(<Hello />, root) : false;