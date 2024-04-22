import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//import PropTypes from 'prop-types';

function AllUsers() {
    //const { tokenFrissites } = props;
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;
    const apiUrl = "http://localhost:8000/api";
    const navigate = useNavigate();
    const [felhasznalok, setFelhasznalok] = useState([]);

    const loadFelhasznalok = async () => {
        //const token = localStorage.getItem("token");
        if (!authToken) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(apiUrl + "/indexAllUser", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + authToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setFelhasznalok(data);
            } else if (response.status === 401) {
                logout();
            }
        } catch (error) {
            console.error("Hiba történt a bejelentések betöltése közben:", error);
        }
    };

    useEffect(() => {
        loadFelhasznalok();
        //tokenFrissites();
    }, []);

    function bootstrapClass(felhasznalo) { //nagyon csúnyán jelenik meg
        if (felhasznalo.adminE === "admin") {
            return <span className="badge badge-pill badge-primary">admin</span>;
        } else {
            return <span className="badge badge-pill badge-info">felhasználó</span>;
        }
    }
    
    return (
        <div>
            {felhasznalok ? (
                <>
                    <h2>Összes Felhasznaló</h2>
                    {felhasznalok.length == 0 ? (
                        <p>Adatok betöltése...</p>
                    ) : (
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Név</th>
                                    <th>Email</th>
                                    <th>Rang</th>
                                    <th>Műveletek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {felhasznalok.map((felhasznalo) => (
                                    <tr key={felhasznalo.id}>
                                        <td>{felhasznalo.id}</td>
                                        <td>{felhasznalo.name}</td>
                                        <td>{felhasznalo.email}</td>
                                        {/*<td>{bootstrapClass(felhasznalo)}</td>*/}
                                        <td>{felhasznalo.adminE}</td>
                                        <td>Hamarosan....</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            ) : <p>Betöltés...</p>}
        </div>
    );    
};

/*
AllUsers.propTypes = {
    tokenFrissites: PropTypes.func.isRequired,
};
*/

export default AllUsers;
