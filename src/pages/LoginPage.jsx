import '../App.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

//Bejelentkezés oldal
function LoginPage(props) { 
  const { tokenFrissites } = props;
  const apiUrl = "http://localhost:8000/api";
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  

  //Bejelentkezés logika
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

  //Gomb megnyomására mi történjen
  const handleFormSubmit = (event) => {
    event.preventDefault(); //ne frissítse az oldalt
    const user = { //létrehoz egy új usert
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    login(user); //az új usert bejelentkezteti
  };

  //Űrlap megjelenítése
  return (
    <form style={{ marginTop: "5px"}} onSubmit={handleFormSubmit}>
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

LoginPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};

export default LoginPage
