import '../App.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

//Regisztrációs oldal
function RegisterPage(props) {
  const navigate = useNavigate();
  //Ha be vagyunk jelentkezve akkor nem jelenik meg a regisztrációs oldal
  const authContext = useContext(AuthContext);
  if (authContext.authToken) {
    navigate("/user");
  }
  //Ha nincs bejelentkezve senki akkor lehet regisztrálni is
  const { tokenFrissites } = props;
  const apiUrl = "http://localhost:8000/api";
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  //Regisztrációs logika
  const register = async (userReg) => {
    const url = apiUrl + "/register";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userReg),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    //Válasz
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Sikeres regiszráció!");
      tokenFrissites();
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  //Eseménykezelő
  const handleFormSubmit = (event) => {
    event.preventDefault(); //ne frissítse az oldalt
    const newUser = { //új user létrehozása
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
    };
    register(newUser); //az új usert regisztrálja
  };

  //Űrlap megjelenítése
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Regisztráció</h2>
      <div className='mb-3'>
        <label className='form-label' htmlFor="name">Teljes név</label>
        <input className='form-control' type="text" id="name" placeholder="Teljes név" ref={nameRef} />
      </div>
      <div className='mb-3'>
        <label className='form-label' htmlFor="email">E-mail:</label>
        <input className='form-control' type="email" id="email" placeholder="E-mail" ref={emailRef} />
      </div>
      <div className='mb-3'>
        <label className='form-label' htmlFor="password">Jelszó</label>
        <input className='form-control' type="password" id="password" placeholder="Jelszó" ref={passwordRef} />
      </div>
      <button className="btn btn-primary" type="submit">Regisztráció</button>
    </form>
  );
}

RegisterPage.propTypes = {
  tokenFrissites: PropTypes.func.isRequired,
};

export default RegisterPage
