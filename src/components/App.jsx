import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { ContactsPage } from 'pages/ContactsPage';
import { GlobalStyle } from './GlobalStyle';
import { LogInPage } from 'pages/LogInPage';
import { RegisterPage } from 'pages/RegisterPage';
import { refreshUser } from 'redux/auth/operations';
import { Navigator } from './Navigator/Navigator';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Container>
      <Navigator />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/log-in" component={<ContactsPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/log-in" component={<ContactsPage />} />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        ></Route>
        <Route
          path="/log-in"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LogInPage />} />
          }
        ></Route>
      </Routes>
      <GlobalStyle />
    </Container>
  );
};
