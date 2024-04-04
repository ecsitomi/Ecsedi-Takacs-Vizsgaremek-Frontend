import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
        <ul>
            <li><Link to = "/">Főoldal</Link></li>
            <li><Link to = "/register">Regisztráció</Link></li>
            <li><Link to = "/login">Bejelentkezés</Link></li>
            <li><Link to = "/user">Saját profil</Link></li>
        </ul>
    </nav>
  );
}

export default Navbar;