import '../App.css';
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    // useEffect callback
  }, []);

  return (
    <>
      <div className="container">
          <video className="fullscreen-video" autoPlay muted loop>
            <source src="https://static.videezy.com/system/resources/previews/000/054/799/original/Shake-hand-close-up.mp4" type="video/mp4" />
          </video>
        <div className="content">
          <div className="text">
            <br />
            <h3 className="animate__animated animate__heartBeat">Ön bejelenti</h3>
            <h3 className="animate__animated animate__backInUp">Mi megoldjuk</h3>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
