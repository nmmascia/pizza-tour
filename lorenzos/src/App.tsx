import React from 'react';
import './App.css';
import { createClient, Provider } from 'urql'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


const client = createClient({
  url: 'http://localhost:3000',
});

const App = () => (
  <Provider value={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/user">
          <Route path=":userId" element={<div>UserPage</div>} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
