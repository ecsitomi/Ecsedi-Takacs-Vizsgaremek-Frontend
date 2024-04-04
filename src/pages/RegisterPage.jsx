import '../App.css'
import { useRef } from 'react';

//Regisztrációs oldal
function RegisterPage() {
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
      <div>
        <label htmlFor="name">Teljes név</label>
        <input type="text" id="name" placeholder="Teljes név" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" placeholder="E-mail" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Jelszó</label>
        <input type="password" id="password" placeholder="Jelszó" ref={passwordRef} />
      </div>
      <button type="submit">Regisztráció</button>
    </form>
  );
}

export default RegisterPage
