import React from 'react';
import ReactDom from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AddressBook from './Components/AddressBook';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  appBarSpacer: { minHeight: 20 },
  menuIcon: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 }
}));

export const App = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuIcon} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Address Book Manager
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}></div>
      <AddressBook />
    </div>
  );
};

const root = document.getElementById('root');
root ? ReactDom.render(<App />, root) : false;