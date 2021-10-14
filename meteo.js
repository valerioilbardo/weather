// Recuperiamo la posizione dell'utente grazie al metodo getCurrentPosition()
// @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);

/**
 * Callback che viene chiamata quando l'utente conferma di voler essere geolocalizzato.
 * @param {Object} position Posizione dell'utente al momento del caricamento della pagina.
 */
function onPositionSuccess(position) {
  init(position.coords.latitude, position.coords.longitude);
  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayLocation(lat, lon);
  }
}

/**
 * Callback che viene chiamata quando l'utente nega la geolocalizzazione.
 * @param {Object} Informazioni sull'errore verificatosi.
 */
function onPositionError(error) {
  console.error(`Errore: ${error.code} - ${error.message}`);
}

/**
 * Inizializza l'applicazione recuperando le informazioni metereologiche dalle
 * API di Open Weather Map.
 *
 * @param {Number} lat Latitudine dell'utente
 * @param {Number} lon Longitudine dell'utente
 * @returns void
 */
async function init(lat, lon) {
  const apiKey = "cced6d443fe8139085abb9d0c528a0a3"; // API Key fornita da Open Weather Map https://home.openweathermap.org/api_keys
  const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
  const limit = "1"

  const locEndpoint = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;






  // Endpoint di Open Weather Map per recuperare i dati meteo correnti e dei prossimi 7 giorni https://openweathermap.org/api/one-call-api
  const response = await fetch(endpoint); // Al posto di usare then, diciamo di voler aspettare l'esito della promise prima di proseguire.
  const locResponse = await fetch(locEndpoint);
  if (response.status !== 200) { // Controllo che la risorsa è stata recuperata con successo.
    console.error("Spiacente! Impossibile recuperare il meteo per la posizione corrente");
    return;
  }
  const currentLocationWeather = await response.json();
  lat = currentLocationWeather.lat
  lon = currentLocationWeather.lon



  const currentLoc = await locResponse.json();
  console.log(currentLoc)



  if (response.status !== 200) {
    console.error("Spiacente! Impossibile recuperare la città corrente");
    return;


  }


  console.log(currentLocationWeather)// Convertiamo il corpo della risorsa in JSON così da poter utilizzare le informazioni per poterle renderizzare in pagina, mostrando all'utente il meteo per la sua zona.

  // TOCCA A TE
  const currentLocation = currentLoc[0].name;
  var currentIconcode = currentLocationWeather.current.weather[0].icon;
  const currentDateUn = currentLocationWeather.current.dt;
  const currentTemp = currentLocationWeather.current.temp;
  const currentHum = currentLocationWeather.current.humidity;
  const currentDateMil = Math.floor(new Date().getTime(currentDateUn) / 1000.0);
  const currentDate = new Date(currentDateMil);
  document.querySelector(".date").innerHTML = currentDate.toString();
  document.querySelector(".humidity").innerHTML = currentHum.toString();
  document.getElementsById("weatherIconImg").src = `http://openweathermap.org/img/wn/${currentIconcode}@2x.png`
  document.querySelector(".temps").innerHTML = currentTemp.toString();
  document.querySelector(".location").innerHTML = currentLocation.toString()
  console.log(currentIconcode)

}


