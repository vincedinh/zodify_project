import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import * as ROUTES from './constants/routes';
/** FIREBASE AUTH DISABLED FOR NOW */

import WebApp from './pages/WebApp'
import Hero from './components/Hero/index.js';
import NavigationBar from './components/NavigationBar/index.js';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import PrivateRoute from './components/privateRoute';
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  // const {isLoading} = useAuth();

  // return isLoading ? (
    // <h1>Loading data...</h1>
  // ): 
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path={ROUTES.HOME} element={<Hero/>}/>
        <Route path={ROUTES.WEB_APP} element={<PrivateRoute/>}>
          <Route path={ROUTES.WEB_APP} element={<WebApp/>}/>
        </Route>
        <Route path={ROUTES.ABOUT} element={<About/>}/>
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy/>}/>
        <Route path={ROUTES.CONTACT} element={<Contact/>}/>
        </Routes>
        <Footer/>
    </Router>
  );
};

export default App;
