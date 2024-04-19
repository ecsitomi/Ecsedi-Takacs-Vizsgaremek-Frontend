import '../App.css'
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types'; Kontextus miatt nem kell

function UserPage() {
  //KONTEXTUSBÓL KÉRJÜK LE
  //const { tokenFrissites } = props;
  //const apiUrl = "http://localhost:8000/api";
  // const [user, setUser] = useState(null); //user állapotában tároljuk a tokent, 
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  //console.log(authContext);
  const { user, authToken, logout, logoutEverywhere } = authContext;

  //Felhasználó adatainak letöltése
  /* ÁTKERÜLT az AuthContext.jsx-be
  const loadUserData = async () => {
    const token = localStorage.getItem("token");
    const url = apiUrl + "/user";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    //Válasz
    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  */

  //Van-e bejelentkezett felhasználó? Ha igen, akkor betölti az adatait az oldal indulásakor
  useEffect(() => {
    //const token = localStorage.getItem("token"); KONTEXTUSBÓL KÉRJÜK LE
    if (authToken) {
      //loadUserData();
      //tokenFrissites();
    } else {
      //setUser(null);
      navigate("/login");
    }
  }, [authToken, navigate]);

  //Kijelentkezés erről az eszközről
  //ÁTKERÜLT az AuthContext.jsx-be
  /*
  const logout = async () => {
    //const token = localStorage.getItem("token"); KONTEXTUSBÓL KÉRJÜK LE
    const url = apiUrl + "/logout";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    //Válasz
    if (response.ok) {
      localStorage.removeItem("token");
      tokenFrissites();
      navigate("/login");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };
  */

  //Kijelentkezés minden eszközről
  //ÁTKERÜLT az AuthContext.jsx-be
  /*
  const logoutEverywhere = async () => {
    //const token = localStorage.getItem("token"); KONTEXTUSBÓL KÉRJÜK LE
    const url = apiUrl + "/logout-everywhere";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    //Válasz
    if (response.ok) {
      localStorage.removeItem("token");
      tokenFrissites();
      navigate("/login");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };
  */

  //Megjelenítés
  return user ? (
    <div>
      <h2>Profil</h2>
      <h4>Bejelentkezve: {user.name}</h4>
      <div className='d-grid gap-2'>
        <button className="btn btn-primary" type="button" onClick={() => logout()}>Kijelentkezés</button>
        <button className="btn btn-primary" type="button" onClick={() => logoutEverywhere()}>Kijelentkezés mindenhonnan</button>
      </div>
    </div>
  ) : (
    <h2>Adatok betöltése...</h2>
  );
}

//context miatt nem kell prop
/*
UserPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
*/

export default UserPage
