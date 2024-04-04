import '../App.css';
import { useRef } from 'react';

//Bejelentkezés oldal
function LoginPage() { 
  const apiUrl = "http://localhost:8000/api";
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="loginEmail">E-mail:</label>
        <input type="email" id="loginEmail" placeholder="E-mail" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="loginPassword">Jelszó</label>
        <input type="password" id="loginPassword" placeholder="Jelszó" ref={passwordRef} />
      </div>
      <button type="submit">Bejelentkezés</button>
    </form>
  );
}

export default LoginPage
