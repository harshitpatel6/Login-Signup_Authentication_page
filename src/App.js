import React from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
              
          <Route path="/" element={<HomePage />} />

          <Route path='/HomePage' element={<HomePage />}/>
 
          <Route path="/LoginForm" element={<LoginForm />} />

          <Route path="/SignupForm" element={<SignupForm />} />

          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        
          </Routes>
        </Router>
    </>
  );
}

export default App;