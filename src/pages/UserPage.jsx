import '../App.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserPage(props) {
  const { tokenFrissites } = props;
  const apiUrl = "http://localhost:8000/api";
  const [user, setUser] = useState(null); //user állapotában tároljuk a tokent
  const navigate = useNavigate();

  //Felhasználó adatainak letöltése
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

  //Van-e bejelentkezett felhasználó? Ha igen, akkor betölti az adatait az oldal indulásakor
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserData();
      tokenFrissites();
    } else {
      setUser(null);
      navigate("/login");
    }
  }, []);

  //Kijelentkezés erről az eszközről
  const logout = async () => {
    const token = localStorage.getItem("token");
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

  //Kijelentkezés minden eszközről
  const logoutEverywhere = async () => {
    const token = localStorage.getItem("token");
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

UserPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};

export default UserPage
