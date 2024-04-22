import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function DeleteTicketButton({ id, onDelete }) {
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;
    const apiUrl = "http://localhost:8000/api/destroy/"+id; //backend út a törlésre

    const handleDelete = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + authToken,
                    Accept: "application/json",
                },
            });
    
            if (response.ok) {
                alert("Sikeres törlés!");
                onDelete(); // Oldal frissítése a törlés után
            } else {
                const data = await response.json();
                console.error(data);
            }
            
        } catch (error) {
            console.error("Hiba történt a törlés közben:", error);
        }
    };
    


    return (
        <button className="btn btn-danger" onClick={handleDelete}>Törlés</button>
    );
}

export default DeleteTicketButton;
