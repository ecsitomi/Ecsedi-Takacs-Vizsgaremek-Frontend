import '../App.css';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types'

//Bejelentkezés oldal
function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, authToken } = authContext;
  
  //Gomb megnyomására mi történjen
  const handleFormSubmit = (event) => {
    event.preventDefault(); //ne frissítse az oldalt
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login(email, password, navigate); //az új usert bejelentkezteti
  };
  
  //Navigálás
  useEffect(() => {
    if (authToken) {
      navigate("/user");
    }
  },
  [authToken, navigate]);
  
  //Űrlap megjelenítése
  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className='mb-3'>Bejelentkezés</h2>
      <div className='mb-3'>
        <label className='form-label' htmlFor="loginEmail">E-mail:</label>
        <input className='form-control' type="email" id="loginEmail" placeholder="E-mail" ref={emailRef} />
      </div>
      <div className='mb-3'>
        <label className='form-label' htmlFor="loginPassword">Jelszó</label>
        <input className='form-control' type="password" id="loginPassword" placeholder="Jelszó" ref={passwordRef} />
      </div>
      <button className="btn btn-primary" type="submit">Bejelentkezés</button>
    </form>
  );
}

export default LoginPage

/* KONTEXTUS MIATT NEM HASZNÁLJUK
//Bejelentkezés logika
const apiUrl = "http://localhost:8000/api";
const { tokenFrissites } = props;
const login = async (formData) => {
  const url = apiUrl + "/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  
  //Válasz
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    localStorage.setItem("token", data.token);
    tokenFrissites();
    navigate("/user");
  } else {
    alert(data.message);
  }
};

LoginPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};
*/

