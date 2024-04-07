import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function App() {
  //token állapot ellenőrzése
  const  [token, setToken] = useState(null);

  const tokenFrissites = () => {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    tokenFrissites();
  }, []);

  //útválasztó létrehozása
  const router = createBrowserRouter([
    { path: '/', element: <Layout token = {token}/>, 
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'login', element: <LoginPage tokenFrissites={tokenFrissites}/> },
        { path: 'register', element: <RegisterPage tokenFrissites={tokenFrissites}/> },
        { path: 'user', element: <UserPage tokenFrissites={tokenFrissites}/> },
      ]},
  ]);
  
  return (
    //útválasztó megjelenítése
    <RouterProvider router={router} />
  );
}

LoginPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
RegisterPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
UserPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};

export default App
