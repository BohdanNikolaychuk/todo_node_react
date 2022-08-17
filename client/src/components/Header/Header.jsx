import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

import { isAuth, logOut } from '../../redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const isAuthSelect = useSelector(isAuth);
  const dispatch = useDispatch();
  const onLogOut = () => {
    if (window.confirm('Are you sure want log out')) {
      dispatch(logOut());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo App
            </Typography>
            {isAuthSelect ? (
              <>
                <Link style={{ textDecoration: 'none' }} to="/add">
                  <Button sx={{ mr: 5 }} variant="contained" color="secondary">
                    Add Todo
                  </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/">
                  <Button sx={{ mr: 5 }} variant="contained" color="secondary">
                    Back to Post
                  </Button>
                </Link>
                <Button onClick={() => onLogOut()} variant="outlined" color="info">
                  Log out
                </Button>
              </>
            ) : (
              <>
                {' '}
                <Link style={{ textDecoration: 'none' }} to="login">
                  <Button sx={{ mr: 5 }} variant="contained">
                    sign in
                  </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="register">
                  <Button variant="outlined" color="info">
                    sign up
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
