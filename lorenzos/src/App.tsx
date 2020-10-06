import React from 'react';
import './App.css';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TourPage from './components/TourPage';
import TourLocationPage from './components/TourLocationPage';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#910012',
    },
    secondary: {
      main: '#FEA430',
    },
  },
});

theme = responsiveFontSizes(theme);

const client = createClient({
  url: 'http://localhost:3000',
});

const App = () => (
  <>
    <CssBaseline />
    <Provider value={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container fixed>
            <Routes>
              <Route path="/user/:userId">
                <Route path="tour/:tourId" element={<TourPage />}>
                  <Route path="tour-location/:tourLocationId" element={<TourLocationPage />} />
                  <Route element={<div> UPCOMING EVENTS</div>} />
                </Route>
              </Route>
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
