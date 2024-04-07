import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function Layout(props) {
    const { token } = props;
    const navbarLeft = [];
    const navbarRight = [];
    navbarLeft.push({ to: '/', text: 'Főoldal' });
    if (token) {
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

Layout.propTypes = {
    token: PropTypes.string,
};

export default Layout;