import React, { useState, useEffect } from 'react';
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

import { 
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import AddressBook from './Components/AddressBook';
import Address from './Components/Address';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  appBarSpacer: { minHeight: 20 },
  menuIcon: { marginRight: theme.spacing(2) },
  menuItem: { textDecoration: 'none' },
  title: { flexGrow: 1 }
}));


export const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [appBarTitle, setAppBarTitle] = useState('');

  const handleClick = (event, handlerFn) => {
    handlerFn(event.currentTarget);
  }

  const handleClose = (handlerFn) => {
    handlerFn(null);
  }

  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Router>
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
              <MenuItem onClick={() => handleClose(setAnchorEl)}>
                <Link className={classes.menuItem}  to="/">Manage Addresses</Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose(setAnchorEl)}>
                <Link className={classes.menuItem} to="/Address">Add Address</Link>
              </MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {appBarTitle}
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
        <Switch>
          <Route key="1" exact path="/">
            <AddressBook titleSetter={setAppBarTitle} />
          </Route>
          <Route key="3" path="/Address/:id">
            <Address titleSetter={() => setAppBarTitle('Update Address')} />
          </Route>
          <Route key="2" path="/Address">
            <Address titleSetter={() => setAppBarTitle('Add an Address')} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const root = document.getElementById('root');
root ? ReactDom.render(<App />, root) : false;