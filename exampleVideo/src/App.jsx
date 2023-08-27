import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState([]);
  /**
   * Ejemplo del uso de la API para reproducción de video:
   */

  const name = "yami-shibai-11";
  const episode = "8";

  const api = `http://localhost:5000/api/watching/${name}/${episode}`;

  useEffect(() => {
    const getLinks = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((data) => setApiData(data));
    };
    getLinks();
  }, []);

  return (
    <div>
      {apiData.length !== 0 ? (
        apiData.alter_links.map((li, index) => (
          <div key={index}>
            <h2>Reproductor de Video</h2>
            <iframe src={li} width={1024} height={576} />
            <h1>Recuerde cerrar las herramientas de desarrollador</h1>
          </div>
        ))
      ) : (
        <h1>Recuerde cerrar las herramientas de desarrollador</h1>
      )}
    </div>
  );
}

export default App;
