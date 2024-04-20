import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types';

function Layout() {
    //van e token
    const authContext = useContext(AuthContext);
    const { authToken, logout } = authContext;
    //navbar elemek tömbösítve
    const navbarLeft = [];
    const navbarRight = [];
    const navbarOthers = [];

    navbarLeft.push({ to: '/', text: 'Főoldal' }); //főoldal mindig van
    if (authToken) { //token függvényében
        //Bal
        navbarLeft.push({ to: '/all-tickets', text: 'Összes bejelentés' });
        navbarLeft.push({ to: '/all-users', text: 'Összes felhasználó' });
        navbarLeft.push({ to: '/create-ticket', text: 'Bejelentés küldése' });
        //Jobb
        navbarRight.push({ to: '/user', text: 'Saját profil' });
        navbarOthers.push(
            <button className="nav-link" onClick={() => logout()}>Kijelentkezés</button>
        );
    } else { //ha nincs token akkor reg/log
        navbarRight.push({ to: '/register', text: 'Regisztráció' });
        navbarRight.push({ to: '/login', text: 'Bejelentkezés' });
    }

    return ( //megjelenítés
        <div>
            <Navbar  leftSide={navbarLeft} rightSide={navbarRight} others={navbarOthers} logout={logout}/>
            <main className='container mt-2'>
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