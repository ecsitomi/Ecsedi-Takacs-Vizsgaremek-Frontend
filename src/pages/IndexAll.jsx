import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types';

function AllTicket() {
    //const { tokenFrissites } = props;
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;
    const apiUrl = "http://localhost:8000/api";
    const navigate = useNavigate();
    const [bejelentesek, setBejelentesek] = useState([]); //bejelentések állapotának létrehozása

    const loadBejelentesek = async () => {
        //const token = localStorage.getItem("token");
        if (!authToken) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(apiUrl + "/indexAll", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + authToken,
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
        //tokenFrissites();
    }, []);

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
    
    return (
        <div>
            {bejelentesek ? (
                <>
                    <h2>Összes Bejelentés</h2>
                    {bejelentesek.length === 0 ? (
                        <p>Adatok betöltése...</p>
                    ) : (
                        <div className='row'>
                            {bejelentesek.map((bejelentes) => (
                                <div className='col-md-4' key={bejelentes.id}>
                                    <div className={`card mt-3 mb-4 ${getBackgroundColor(bejelentes.hibaAllapota)}`}>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{bejelentes.hibaMegnevezese}</h5>
                                            <p className='card-text'>{bejelentes.hibaLeirasa}</p>
                                            <p className='card-text'>{bejelentes.hibaHelye}</p>
                                            <img class="card-img-top" src={`data:image/jpeg;base64,${bejelentes.hibaKepe}`} /> {/* base64ből beolvasott képek */}

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

/*
AllTicket.propTypes = {
    tokenFrissites: PropTypes.func.isRequired,
};
*/

export default AllTicket;
