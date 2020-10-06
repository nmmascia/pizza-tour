import React from 'react';
import './App.css';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TourPage from './components/TourPage';

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
  url: 'http://localhost:3000/graphql',
});

const App = () => (
  <>
    <CssBaseline />
    <Provider value={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container fixed style={{ minHeight: '100vh' }}>
            <Routes>
              <Route path="/tour/:tourId/*" element={<TourPage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
