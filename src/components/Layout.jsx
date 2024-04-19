import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types';

function Layout() {
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;
    const navbarLeft = [];
    const navbarRight = [];
    navbarLeft.push({ to: '/', text: 'Főoldal' });
    if (authToken) {
        navbarLeft.push({ to: '/all-tickets', text: 'Összes bejelentés' });
        navbarLeft.push({ to: '/all-users', text: 'Összes felhasználó' });
        navbarRight.push({ to: '/user', text: 'Saját profil' });
    } else {
        navbarRight.push({ to: '/register', text: 'Regisztráció' });
        navbarRight.push({ to: '/login', text: 'Bejelentkezés' });
    }

    return (
        <div>
            <Navbar  leftSide={navbarLeft} rightSide={navbarRight}/>
            <main className='container'>
                <Outlet />
            </main>
        </div>
    );
}

/*
Layout.propTypes = {
    token: PropTypes.string,
};
*/

export default Layout;