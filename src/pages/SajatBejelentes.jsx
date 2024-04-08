import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function MyTicket(props) {
    const { tokenFrissites } = props;
    const apiUrl = "http://localhost:8000/api";
    const navigate = useNavigate();
    const [bejelentesek, setBejelentesek] = useState([]); //bejelentések állapotának létrehozása

    const loadBejelentesek = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(apiUrl + "/indexAll", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setBejelentesek(data);
            } else if (response.status === 401) {
                logout();
            }
        } catch (error) {
            console.error("Hiba történt a bejelentések betöltése közben:", error);
        }
    };

    useEffect(() => {
        loadBejelentesek();
        tokenFrissites();
    }, [tokenFrissites]);

    return (
        <div>
            {/* itt megjelenítheted a bejelentéseket */}
        </div>
    );
};

MyTicket.propTypes = {
    tokenFrissites: PropTypes.func.isRequired,
};

export default MyTicket;
