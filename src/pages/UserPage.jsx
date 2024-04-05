import '../App.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
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
    }
  };

  //Van-e bejelentkezett felhasználó? Ha igen, akkor betölti az adatait az oldal indulásakor
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserData();
    } else {
      setUser(null);
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
      navigate("/login");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  //Megjelenítés
  return user ? (
    <div>
      <p>Bejelentkezve: {user.name}</p>
      <button type="button" onClick={() => logout()}>Kijelentkezés</button>
      <button type="button" onClick={() => logoutEverywhere()}>Kijelentkezés mindenhonnan</button>
    </div>
  ) : (
    <h2>Adatok betöltése...</h2>
  );
}

export default UserPage
