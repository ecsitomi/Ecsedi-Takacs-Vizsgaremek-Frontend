import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'

function App() {

  //útválasztó létrehozása
  const router = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'user', element: <UserPage /> },
      ]},
  ]);
  
  return (
    //útválasztó megjelenítése
    <RouterProvider router={router} />
  );
}

export default App
