import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useActivePage } from 'hooks/useActivePage';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { logOut } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUsersEmail } from 'redux/auth/selectors';

export const Navigator = () => {
  const dispatch = useDispatch();
  const activePageIndex = useActivePage();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usersEmail = useSelector(selectUsersEmail);

  const [activePage, setActivePage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setActivePage(activePageIndex);
    handleClose();
  }, [activePageIndex]);

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: '#eceff1',
          color: '#263238',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contacts
          </Typography>
          {isLoggedIn && (
            <div>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                variant="outlined"
                onClick={handleMenu}
                endIcon={<AccountCircle />}
              >
                {usersEmail}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logOutUser}>Log out</MenuItem>
              </Menu>
            </div>
          )}
          {!isLoggedIn && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activePage}>
                <Tab
                  label="Register"
                  component={NavLink}
                  to="/register"
                  sx={{
                    ml: 'auto',
                  }}
                />
                <Tab label="Log In" component={NavLink} to="/login" />
              </Tabs>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
