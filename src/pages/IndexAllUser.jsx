import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AllUsers(props) {
    const { tokenFrissites } = props;
    const apiUrl = "http://localhost:8000/api";
    const navigate = useNavigate();
    const [felhasznalok, setFelhasznalok] = useState([]);

    const loadFelhasznalok = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(apiUrl + "/indexAllUser", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
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
        tokenFrissites();
    }, [tokenFrissites]);
    
    return (
        <div>
            {felhasznalok ? (
                <>
                    <h2>Összes Felhasznaló</h2>
                    {felhasznalok.length === 0 ? (
                        <p>Még nincs regisztrált felhasználó.</p>
                    ) : (
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Név</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {felhasznalok.map((felhasznalo) => (
                                    <tr key={felhasznalo.id}>
                                        <td>{felhasznalo.id}</td>
                                        <td>{felhasznalo.name}</td>
                                        <td>{felhasznalo.email}</td>
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

AllUsers.propTypes = {
    tokenFrissites: PropTypes.func.isRequired,
};

export default AllUsers;
