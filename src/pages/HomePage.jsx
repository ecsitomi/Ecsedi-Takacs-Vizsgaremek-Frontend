import '../App.css';
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    // useEffect callback
  }, []);

  return (<>
    <div className="container">
          <video className="fullscreen-video" autoPlay muted loop>
            <source src="https://v1.cdnpk.net/videvo_files/video/free/video0488/large_preview/_import_629ee34561aa87.39478399.mp4" type="video/mp4" />
          </video>
      <div className="content">
        <div className="text">
          <br></br>
          <h3 className="animate__animated animate__heartBeat">Ön bejelenti</h3>
          <h3 className="animate__animated animate__backInUp">Mi megoldjuk</h3>
          <br></br>
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
