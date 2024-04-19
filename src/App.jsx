import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import 'animate.css';
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
//import { useState, useEffect } from 'react'

function App() {
  /*
  //token állapot ellenőrzése
  const  [token, setToken] = useState(null);

  const tokenFrissites = () => {
    setToken(localStorage.getItem('token'));
  }

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
        { path: 'register', element: <RegisterPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'all-tickets', element: <IndexAll /> },
        { path: 'all-users', element: <IndexAllUser /> }
      ]},
  ]);
  
  return (
    //útválasztó megjelenítése AuthProvider komponenssel
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

/*
LoginPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
RegisterPage.propTypes = {
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
