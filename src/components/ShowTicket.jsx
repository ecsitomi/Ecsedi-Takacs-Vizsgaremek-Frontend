import '../App.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
import DeleteTicketButton from '../components/DeleteTicket';


function ShowTicket() {
    //const { id } = props; //bejelentés azonosítója
    const { id } = useParams();
    const authContext = useContext(AuthContext);
    const { authToken, user } = authContext;
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
    }, [id]); //id változásakor frissítse az oldalt - nemigazán működik :(

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

    // Átirányítás az IndexAll oldalra
    const visszaAzOsszesBejelentesre = () => {
        navigate('/all-tickets');
    };

    //ITT KEZDŐDIK A MÓDOSÍTÁS!!

    //Referenciák létrehozása
    const hibaMegnevezeseRef = useRef(null);
    const hibaLeirasaRef = useRef(null);
    const hibaHelyeRef = useRef(null);
    const hibaKepeLinkRef = useRef(null);
    const hibaAllapotaRef = useRef(null);

    //beküldésre mi történjen
    const handleSubmit = (event) => {
        event.preventDefault(); //ne frissüljön az oldal

        //referenciák
        let hibaMegnevezese = hibaMegnevezeseRef.current.value;
        let hibaLeirasa = hibaLeirasaRef.current.value;
        let hibaHelye = hibaHelyeRef.current.value;
        let hibaAllapota = hibaAllapotaRef.current.value;
        let hibaKepeLink = hibaKepeLinkRef.current.files[0];

        //ha a mezők üresek, akkor a régi adatokat használja
        if (hibaMegnevezese === "") {
            hibaMegnevezese = bejelentes.hibaMegnevezese;
        }
        if (hibaLeirasa === "") {
            hibaLeirasa = bejelentes.hibaLeirasa;
        }
        if (hibaHelye === "") {
            hibaHelye = bejelentes.hibaHelye;
        }

        //update funkcóió meghívása
        updateTicket(hibaMegnevezese, hibaLeirasa, hibaHelye, hibaAllapota, hibaKepeLink);
        clearForm();
        loadBejelentes();
    };
    //módosítás logika
    const updateTicket = async (hibaMegnevezese, hibaLeirasa, hibaHelye, hibaAllapota, hibaKepeLink) => {
        const updateUrl = "http://localhost:8000/api/update/" + id; //adott bejelentés módosítása útvonal

        const formData = new FormData();
        formData.append("_method", "PATCH"); //laravel hülyeség a kép miatt
        formData.append("hibaMegnevezese", hibaMegnevezese);
        formData.append("hibaLeirasa", hibaLeirasa);
        formData.append("hibaHelye", hibaHelye);
        formData.append("hibaAllapota", hibaAllapota);
        if (hibaKepeLink) {
            formData.append("hibaKepeLink", hibaKepeLink);
        }
        //Fel
        const response = await fetch(updateUrl, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
        });
        if (response.ok) {
            alert("Sikeres felvétel");
            clearForm(); //tisztitsa ki a formot
        } else { //ha nem sikeres a válasz
            const data = await response.json();
            console.error(data);
            alert(data.message);
        }
    };

    //form tisztítása
    const clearForm = () => {
        hibaMegnevezeseRef.current.value = "";
        hibaLeirasaRef.current.value = "";
        hibaHelyeRef.current.value = "";
        hibaKepeLinkRef.current.value = "";
        //hibaAllapotaRef.current.value = bejelentes.hibaAllapota;  //ezt ne változtassuk mert akkor mindig az utolsó állapot marad
    };

    //MEGJELENÍTÉS
    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-6">
                    {bejelentes ? (
                        <> {/* Adatok lekérése */}
                            <div className={`card mt-3 mb-4 ${getBackgroundColor(bejelentes.hibaAllapota)}`}>
                                <div className="card-header"><h4>Bejelentés részletei</h4></div>
                                <img className="card-img-top" src={`data:image/jpeg;base64,${bejelentes.hibaKepe}`} /> {/* base64ből beolvasott képek */}
                                <div className='card-body'>
                                    <h5 className='card-title'><b>Hiba:</b> {bejelentes.hibaMegnevezese}</h5>
                                    <p className='card-text'><b>Leírás:</b> {bejelentes.hibaLeirasa}</p>
                                    <p className='card-text'><b>Hol:</b> {bejelentes.hibaHelye}</p>
                                    <p className='card-text'><b>Állapot:</b> {bejelentes.hibaAllapota}</p>
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
                <div className="col-sm-6"> {/* Adatok módosítása */}
                    <div className="card mt-3 mb-4 bg-light">
                        <div className="card-header"><h4>Bejelentés módosítása</h4></div>
                        <form onSubmit={handleSubmit}>
                            <h2>Új bejelentés elküldése</h2>
                            <div className="mb-3">
                                <label htmlFor="hibaMegnevezese" className="form-label">Hiba Megnevezése*</label>
                                <input className="form-control" type="text" id="hibaMegnevezese" ref={hibaMegnevezeseRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hibaLeirasa" className="form-label">Hiba Leírás*</label>
                                <textarea className="form-control" id="hibaLeirasa" ref={hibaLeirasaRef} style={{ resize: "none" }} ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hibaHelye" className="form-label">Hiba Helye*</label>
                                <input className="form-control" type="text" id="hibaHelye" ref={hibaHelyeRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hibaKepeLink" className="form-label">Hiba Képe</label>
                                <input type="file" id="hibaKepeLink" ref={hibaKepeLinkRef} className="form-control" accept="image/*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hibaAllapota" className="form-label">Hiba állapota</label>
                                <select id="hibaAllapota" className="form-select" ref={hibaAllapotaRef}>
                                    <option value="bejelentés alatt">Bejelentés alatt</option>
                                    <option value="folyamatban">Folyamatban</option>
                                    <option value="kész">Kész</option>
                                    <option value="elutasítva">Elutasítva</option>
                                </select>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Elküldés</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

ShowTicket.propTypes = {
    id: PropTypes.string,
};

export default ShowTicket;

//Ui.: elnézést, hogy nem raktam ki komponensbe, elfogyott az idő :/
