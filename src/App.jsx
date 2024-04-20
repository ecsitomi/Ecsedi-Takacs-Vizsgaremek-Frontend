import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import 'animate.css';
import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import HomePage from './pages/HomePage';
import PropTypes from 'prop-types'
import IndexAll from './pages/IndexAll'
import IndexAllUser from './pages/IndexAllUser'
import { AuthProvider } from './context/AuthContext';
import CreateTicketPage from './pages/CreateTicketPage';
//import { useState, useEffect } from 'react'

function App() {
  //ők most azért kellenek mert a register page csak így tud átnavigálni a login page-re
  //token állapot ellenőrzése
  const  [token, setToken] = useState(null);
  const tokenFrissites = () => {
    setToken(localStorage.getItem('token'));
  }
  /*

  useEffect(() => {
    tokenFrissites();
  }, []);
  */

  //útválasztó létrehozása
  const router = createBrowserRouter([
    { path: '/', element: <Layout />, 
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage tokenFrissites={tokenFrissites}/> },
        { path: 'user', element: <UserPage /> },
        { path: 'all-tickets', element: <IndexAll /> },
        { path: 'all-users', element: <IndexAllUser /> },
        { path: 'create-ticket', element: <CreateTicketPage /> },
      ]},
  ]);
  
  return (
    //útválasztó megjelenítése AuthProvider komponenssel
    //Register oldal külön van hozzáadva, mert ott a funkciók nem az authcontext szerint működnek
    <AuthProvider>
      <RouterProvider router={router} >
        {/*<RegisterPage navigate={navigate} />*/}
      </RouterProvider>
    </AuthProvider>
  );
}

RegisterPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
/*
LoginPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
UserPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
IndexAll.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
IndexAllUser.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
*/

export default App
