import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import * as ROUTES from './constants/routes';
import Hero from './components/Hero/index.js';
import NavigationBar from './components/NavigationBar/index.js';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
        <Route path={ROUTES.HOME} element={<Hero/>}/>
        <Route path={ROUTES.PROFILE} element={<h1>Welcome!</h1>}/>
      </Routes>
    </Router>
  );
};

export default App;
