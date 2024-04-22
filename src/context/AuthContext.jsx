import { createContext, useEffect, useState } from "react";
import { navigate } from "react";
import PropTypes from "prop-types";

//Egy kontextus létrehozása AuthProvider néven, ami vizsgálja ki van bejelentkezve
//így megszűnik a folyamatos "adatok betöltése" a profil oldalon stb
export const AuthContext = createContext(); 

export function AuthProvider(props) { //ami appban authprivider kontextusba van rakva, arra érvényer
    const apiUrl = "http://localhost:8000/api";
    const { children } = props; //lehetséges gyerek komponensek
    const [authToken, setAuthToken] = useState(undefined); //authToken állapotának létrehozása
    const [user, setUser] = useState(null); //user állapotának létrehozása
    const [error, setError] = useState(null); //hibaüzenet létrehozása

    useEffect(() => { //betöltéskor lekéri a tokent és elmenti kontextusba
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    useEffect(() => { //betöltékor ha van token, akkor betölti a felhasználó adatait

        //Felhasználó adatainak letöltése
        //Átkerült a függvény a UserPage.jsx-ból
        const loadUserData = async () => {
            const url = apiUrl + "/user";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
            });
            //Válasz
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else if (response.status === 401) {
                localStorage.removeItem("token");
                setAuthToken(null);
            }
        };

        if (authToken) { //ha van token, akkor lekéri a felhasználó adatait
            loadUserData();
        } else {
            setUser(null);
        }
    }, [authToken])

    const authObj = { //üres auth objektum amibe továbbadom a kontextusba szerzett adatokat
        authToken: authToken,
        user: user,
        error: error,

        //utakon mi történjen, user oldalról hoztuk át a funkciókat
        login: async (email, password) => {
            const url = apiUrl + "/login";
            const formData = { //DTO, data transfer object, (mint Laravelben a Request)
                email: email,
                password: password,
            };
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
                const token = data.token;
                localStorage.setItem("token", token);
                setAuthToken(token);
                navigate("/user");
            } else {
                setError(data.message);
                console.error(data);
            }
    },
        logout: async () => {
            const url = apiUrl + "/logout";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
            });
            //Válasz
            if (response.ok || response.status === 401) {
                localStorage.removeItem("token");
                setAuthToken(null);
                //tokenFrissites();
                navigate("/login");
            } else {
                const data = await response.json();
                setError(data);
                console.error(data);
            }
        },
            logoutEverywhere: async () => {
                const url = apiUrl + "/logout-everywhere";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + authToken,
                    },
                });
                //Válasz
                if (response.ok || response.status === 401) {
                    localStorage.removeItem("token");
                    setAuthToken(null);
                    //tokenFrissites();
                    navigate("/login");
                } else {
                    const data = await response.json();
                    setError(data);
                    console.error(data);
                }
            },
                //register: async (email, password, name) => { // },
                //a regisztráció kezelése a RegisterPage.jsx-ben van
                //a token ellenőrzés ott történik
    };

return <AuthContext.Provider value={authObj}>
    {children}
</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node
};