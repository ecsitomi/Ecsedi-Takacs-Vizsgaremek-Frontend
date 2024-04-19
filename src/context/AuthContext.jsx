import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

//Egy kontextus létrehozása AuthProvider néven, ami vizsgálja ki van bejelentkezve
//így megszűnik a folyamatos "adatok betöltése" a profil oldalon
export const AuthContext = createContext();

export function AuthProvider(props) {
    const apiUrl = "http://localhost:8000/api";
    const { children } = props; //lehetséges gyerek komponensek
    const [authToken, setAuthToken] = useState(null); //authToken állapotának létrehozása
    const [user, setUser] = useState(null); //user állapotának létrehozása
    const [error, setError] = useState(null); //hibaüzenet létrehozása

    useEffect(() => { //betöltéskor lekéri a tokent és elmenti kontextusba
        const toke = localStorage.getItem("token");
        if (toke) {
            setAuthToken(toke);
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
        login: async () => { },
        logout: async () => {
            const url = apiUrl + "/logout";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            //Válasz
            if (response.ok || response.status === 401) {
                localStorage.removeItem("token");
                setAuthToken(null);
                //tokenFrissites();
                //navigate("/login");
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
                    Authorization: "Bearer " + token,
                },
            });
            //Válasz
            if (response.ok || response.status === 401) {
                localStorage.removeItem("token");
                setAuthToken(null);
                //tokenFrissites();
                //navigate("/login");
            } else {
                const data = await response.json();
                setError(data);
                console.error(data);
            }
        },
            register: async () => { },
    };

return <AuthContext.Provider value={authObj}>
    {children}
</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node
};