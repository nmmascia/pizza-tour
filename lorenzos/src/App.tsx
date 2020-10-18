import React from 'react';
import './App.css';
import { Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TourPage from './components/TourPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import client from './graphql/client';
import LoggedInRoute from './components/LoggedInRoute';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#910012',
    },
    secondary: {
      main: '#FEA430',
    },
  },
  overrides: {
    MuiCardHeader: {
      root: {
        padding: '8px 16px',
      },
    },
    MuiCardContent: {
      root: {
        padding: '8px 16px',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const App = () => (
  <>
    <CssBaseline />
    <Provider value={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container fixed style={{ minHeight: 'calc(100vh - 56px)' }}>
            <Routes>
              <LoggedInRoute path="/user/:userId/*" element={<UserPage />} />
              <LoggedInRoute path="/tour/:tourId/*" element={<TourPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
