import React, { useState } from 'react';
import ReactDom from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const handleClick = (event, handlerFn) => {
    handlerFn(event.currentTarget);
  }

  const handleClose = (handlerFn) => {
    handlerFn(null);
  }

  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuIcon} color="inherit" onClick={(e) => handleClick(e, setAnchorEl)}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(setAnchorEl)}
          >
            <MenuItem onClick={() => handleClose(setAnchorEl)}>Manage Addresses</MenuItem>
            <MenuItem onClick={() => handleClose(setAnchorEl)}>Add Address</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Manage Addresses
          </Typography>
          <IconButton color="inherit" onClick={(e) => handleClick(e, setUserAnchorEl)}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            keepMounted
            open={Boolean(userAnchorEl)}
            onClose={() => handleClose(setUserAnchorEl)}
          >
            <MenuItem onClick={() => handleClose(setUserAnchorEl)}>Details</MenuItem>
            <MenuItem onClick={() => handleClose(setUserAnchorEl)}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}></div>
      <AddressBook />
    </div>
  );
};

const root = document.getElementById('root');
root ? ReactDom.render(<App />, root) : false;