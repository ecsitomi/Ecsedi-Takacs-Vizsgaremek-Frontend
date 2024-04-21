import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateTicketPage() {
    const apiUrl = "http://localhost:8000/api";
    const { authToken } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //Referenciák létrehozása
    const hibaMegnevezeseRef = useRef(null);
    const hibaLeirasaRef = useRef(null);
    const hibaHelyeRef = useRef(null);
    const hibaKepeRef = useRef(null);

    //nem elérhető az oldal ha nem vagy bejelentkezve
    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    //beküldésre mi történjen
    const handleSubmit = (event) => {
        event.preventDefault(); //ne frissüljön az oldal

        //referenciák
        const hibaMegnevezese = hibaMegnevezeseRef.current.value;
        const hibaLeirasa = hibaLeirasaRef.current.value;
        const hibaHelye = hibaHelyeRef.current.value;
        const hibaKepe = hibaKepeRef.current.value;
        const user_id = user.id;

        //létrehozás funkcóió meghívása
        createTicket(hibaMegnevezese, hibaLeirasa, hibaHelye, hibaKepe, user_id);
    };

    //új bejelentés létrehozása
    const createTicket = async (hibaMegnevezese, hibaLeirasa, hibaHelye, hibaKepe, user_id) => {
        const url = apiUrl + "/store";
        const ticketDTO = { //referenciák értékei változóba került korábban, most ezeket a változókat gyűjtjük össze és adjuk át "JSON" formátumban
            //referenciák
            hibaMegnevezese: hibaMegnevezese,
            hibaLeirasa: hibaLeirasa,
            hibaHelye: hibaHelye,
            hibaKepe: hibaKepe,
            user_id: user_id,
        };
        console.log(ticketDTO);
        //válasz
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(ticketDTO),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
        }); //ha sikeres a válasz
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
        hibaKepeRef.current.value = "";
    };

    //megjelenítése
    return (
        <form onSubmit={handleSubmit}>
            <h2>Új bejelentés elküldése</h2>
            <div className="mb-3">
                <label htmlFor="hibaMegnevezese" className="form-label">Hiba Megnevezése*</label>
                <input className="form-control" type="text" id="hibaMegnevezese" ref={hibaMegnevezeseRef} required />
            </div>
            <div className="mb-3">
                <label htmlFor="hibaLeirasa" className="form-label">Hiba Leírás*</label>
                <textarea className="form-control" id="hibaLeirasa" ref={hibaLeirasaRef} style={{ resize: "none" }} required ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="hibaHelye" className="form-label">Hiba Helye*</label>
                <input className="form-control" type="text" id="hibaHelye" ref={hibaHelyeRef} required />
            </div>
            <div className="mb-3"> {/* KÉPFELTÖLTÉS - Ezt még át kell írni!! */}
                <label htmlFor="hibaKepe" className="form-label">Hiba Képe</label>
                <input className="form-control" type="text" id="hibaKepe" ref={hibaKepeRef} />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">Elküldés</button>
            </div>
        </form>
    );
}

export default CreateTicketPage;
