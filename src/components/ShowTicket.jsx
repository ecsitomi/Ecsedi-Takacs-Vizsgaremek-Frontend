import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import DeleteTicketButton from '../components/DeleteTicket';
import { Link } from 'react-router-dom';

function ShowTicket() {
    //const { id } = props; //bejelentés azonosítója
    const { id } = useParams();
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;
    const apiUrl = "http://localhost:8000/api/hibak/" + id; //adott bejelentés lekérdezése
    const [bejelentes, setBejelentes] = useState(null); //bejelentés állapotának létrehozása
    const navigate = useNavigate();

    const loadBejelentes = async () => {
        if (authToken === null) {
            navigate("/login");
            return;
        }
        if (authToken === undefined) {
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + authToken,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setBejelentes(data);
            } else if (response.status === 401) {
                navigate("/all-tickets");
            }
        } catch (error) {
            console.error("Hiba történt a bejelentés betöltése közben:", error);
        }
    };

    useEffect(() => {
        loadBejelentes();
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

    const visszaAzOsszesBejelentesre = () => {
        // Átirányítás az IndexAll oldalra
        navigate('/all-tickets');
    };

    return (
        <div>
            {bejelentes ? (
                <>
                    <h2>Bejelentés részletei</h2>
                    <div className={`card mt-3 mb-4 ${getBackgroundColor(bejelentes.hibaAllapota)}`}>
                        <div className='card-body'>
                            <h5 className='card-title'>{bejelentes.hibaMegnevezese}</h5>
                            <p className='card-text'>{bejelentes.hibaLeirasa}</p>
                            <p className='card-text'>{bejelentes.hibaHelye}</p>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${bejelentes.hibaKepe}`} /> {/* base64ből beolvasott képek */}
                        </div>
                        <div className="card-footer">
                            <div className="d-grid gap-1">
                                <DeleteTicketButton id={bejelentes.id} onDelete={visszaAzOsszesBejelentesre} />
                                <Link className="btn btn-info" to={'/all-tickets/'}>Vissza</Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : <p>Betöltés...</p>}
        </div>
    );
}

ShowTicket.propTypes = {
    id: PropTypes.string,
};

export default ShowTicket;
