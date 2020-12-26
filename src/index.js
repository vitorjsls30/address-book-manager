import React, { useState } from 'react';
import ReactDom from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { 
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Data/store';

import AddressBook from './Components/AddressBook';
import Address from './Components/Address';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  grow: { flexGrow: 1 },
  appBarSpacer: { minHeight: 20 },
  menuIcon: { marginRight: theme.spacing(2) },
  menuItem: { textDecoration: 'none' },
  title: { 
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
   },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: '100%',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(3),
      width: '30%'
    },
  },
  searchIcon: {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%'
  }
}));

export const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [appBarTitle, setAppBarTitle] = useState('');
  const [search, setSearch] = useState('');

  const handleClick = (event, handlerFn) => {
    handlerFn(event.currentTarget);
  }

  const handleClose = (handlerFn) => {
    handlerFn(null);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
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
              <MenuItem component={Link} to="/" onClick={() => handleClose(setAnchorEl)}>
                Manage Addresses
              </MenuItem>
              <MenuItem  component={Link} to="/Address" onClick={() => handleClose(setAnchorEl)}>
                Add Address
              </MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {appBarTitle}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase 
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                name="search-bar" 
                id="search-bar" 
                placeholder="Search an Address..." 
                fullWidth={true}
                variant="outlined" 
                onChange={handleSearch}
                />
            </div>
            <div className={classes.grow}></div>
            <IconButton disabled={ true } color="inherit" onClick={(e) => handleClick(e, setUserAnchorEl)}>
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
            <AddressBook titleSetter={setAppBarTitle} search={search}/>
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
root ? ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  , root) : false;