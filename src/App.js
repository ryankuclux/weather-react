import { useState } from "react"; // Import Hook useState dari React
import axios from "axios"; // Import library axios untuk melakukan HTTP Request

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [notFound, setNotFound] = useState(false);

  const apiKey = "550508a0b82edb5b945601fee93cdae8"; //API Key untuk OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`; // URL API

  // Fungsi untuk mencari lokasi ketika tombol "Enter" ditekan
  const searchLocation = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(url); // Menunggu hasil dari permintaan axios.get(url)
        setData(response.data); // Menyimpan data dari response API ke state 'data'
        setNotFound(false);
        setLocation("");
        console.log(response.data); // Menyimpan data ke konsol untuk debugging
      } catch (error) {
        setData({}); // Mengosongkan data jika terjadi kesalahan
        setNotFound(true);
        setLocation("");
        console.error("Error:", error); // Mencetak pesan kesalahan ke konsol untuk debugging
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Mengatur state 'location' saat input berubah
          onKeyDown={searchLocation} // Memanggil fungsi 'searchLocation' saat tombol ditekan
          placeholder="Enter location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
          <p>{data.name ? data.name : null} {data.sys ? data.sys.country : null}</p> {/* Menampilkan nama lokasi dan negara jika ada */}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null} {/* Menampilkan suhu jika ada */}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null} {/* Menampilkan deskripsi cuaca jika ada */}
          </div>
        </div>
 
        {/* Menampilkan detail cuaca jika lokasi ditemukan dan tidak ada kesalahan */}
        {data.name !== undefined && !notFound && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °C</p> : null} {/* Menampilkan suhu yang terasa jika ada */}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity} %</p> : null} {/* Menampilkan kelembaban jika ada */}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} KMH</p> : null} {/* Menampilkan kecepatan angin jika ada */}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        {/* Menampilkan pesan kesalahan jika lokasi tidak ditemukan */}
        {notFound && (
          <div className="error">
            <p>City not found. Please enter a valid location.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;