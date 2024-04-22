import '../App.css';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DeleteTicketButton from '../components/DeleteTicket';


function UserPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, authToken, logout, logoutEverywhere } = authContext;
  const apiUrl = "http://localhost:8000/api/index"; //a felhasználó saját hirdetései tekinthetők meg
  const [bejelentes, setBejelentes] = useState([]); //bejelentések állapotának létrehozása

  //Van-e bejelentkezett felhasználó? Ha igen, akkor betölti az adatait az oldal indulásakor
  useEffect(() => {
    if (authToken) { //
    } else {
      navigate("/login");
    }
  }, [authToken, navigate]);


  const loadBejelentes = async () => {
    //const token = localStorage.getItem("token");
    if (authToken === null) {
      navigate("/login");
      return;
    }
    if (authToken === undefined) {
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBejelentes(data);
      } else if (response.status === 401) {
        logout();
      }
    } catch (error) {
      console.error("Hiba történt a bejelentések betöltése közben:", error);
    }
  };

  useEffect(() => {

    loadBejelentes();
  }, [authToken]);

  // Háttérszín classzok definiálása a különböző hiba állapotokhoz
  const getBackgroundColor = (hibaAllapota) => {
    switch (hibaAllapota) {
      case 'bejelentés alatt': return 'bg-warning';
      case 'folyamatban': return 'bg-primary';
      case 'kész': return 'bg-success';
      case 'elutasítva': return 'bg-danger';
      default: return '';
    }
  };

  //Megjelenítés
  return user ? (
    <div>
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="card col-sm-10 bg-light">
          <div className="card-body">
            <h2 align="center">Profil</h2>
            <h4>Bejelentkezve: {user.name}</h4>
            <h4>Email: {user.email}</h4>
            <br />
            <div className='d-grid gap-2'>
              <button className="btn btn-primary" type="button" onClick={() => logout()}>Kijelentkezés</button>
              <button className="btn btn-primary" type="button" onClick={() => logoutEverywhere()}>Kijelentkezés mindenhonnan</button>
            </div>
          </div>
        </div>
      </div>

      {bejelentes ? (
        <>
          <h1 align="center">Saját bejelentéseim</h1>
          <p align="center">
            <span style={{ color: 'orange' }}><b>Sárga:</b></span> bejelentés alatt, {' '}
            <span style={{ color: 'blue' }}><b>Kék:</b></span> folyamatban, {' '}
            <span style={{ color: 'green' }}><b>Zöld:</b></span> kész, {' '}
            <span style={{ color: 'red' }}><b>Piros:</b></span> elutasítva
          </p>
          {bejelentes.length === 0 ? (
            <p>Adatok betöltése...</p>
          ) : (
            <div className='row'>
              {bejelentes.map((bejelent) => (
                <div className='col-md-3' key={bejelent.id}>
                  <div className={`card mt-3 mb-4 ${getBackgroundColor(bejelent.hibaAllapota)}`}>
                    <img className="card-img-top" src={`data:image/jpeg;base64,${bejelent.hibaKepe}`} alt="hiba képe" />
                    <div className={`card-header `}>
                      <h5 className='card-title'>{bejelent.id}. {bejelent.hibaMegnevezese}</h5>
                    </div>
                    <div className='card-body'>
                      <p className='card-text'>{bejelent.hibaHelye}</p>
                    </div>
                    <div className="card-footer">
                      <div className="d-grid gap-1">
                        {/* Itt még hiányzik a Link importálása */}
                        <Link className="btn btn-info" to={`/show-ticket/${bejelent.id}`}>Bővebben</Link>
                        <DeleteTicketButton id={bejelent.id} onDelete={loadBejelentes} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : <p>Betöltés...</p>}
    </div>
  ) : <h2>Adatok betöltése...</h2>;
};

export default UserPage

//KONTEXTUSBÓL KÉRJÜK LE
//const { tokenFrissites } = props;
//const apiUrl = "http://localhost:8000/api";
// const [user, setUser] = useState(null); //user állapotában tároljuk a tokent, 

/* ÁTKERÜLT az AuthContext.jsx-be
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

//Kijelentkezés erről az eszközről
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

//Kijelentkezés minden eszközről
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

//context miatt nem kell prop
UserPage.propTypes = {
tokenFrissites: PropTypes.func.isRequired,
};
*/


