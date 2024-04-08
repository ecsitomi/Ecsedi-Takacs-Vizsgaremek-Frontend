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

    // Háttérszín classzok definiálása a különböző hiba állapotokhoz
    const getBackgroundColor = (hibaAllapota) => {
        switch (hibaAllapota) {
            case 'bejelentés alatt': return 'bg-warning';
            case 'folyamatban': return 'bg-primary';
            case 'kész': return 'bg-success';
            default: return '';
        }
    };
    
    return (
        <div>
            {bejelentesek ? (
                <>
                    <h2>Összes Bejelentés</h2>
                    {bejelentesek.length === 0 ? (
                        <p>Még nincs beküldött bejelentés.</p>
                    ) : (
                        <div className='row'>
                            {bejelentesek.map((bejelentes) => (
                                <div className='col-md-4' key={bejelentes.id}>
                                    <div className={`card mt-3 mb-4 ${getBackgroundColor(bejelentes.hibaAllapota)}`}>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{bejelentes.hibaMegnevezese}</h5>
                                            <p className='card-text'>{bejelentes.hibaLeirasa}</p>
                                            <p className='card-text'>{bejelentes.hibaHelye}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : <p>Betöltés...</p>}
        </div>
    );    
};

MyTicket.propTypes = {
    tokenFrissites: PropTypes.func.isRequired,
};

export default MyTicket;
