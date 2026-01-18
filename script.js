async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '4f69d7c33bb922d32ca516cd7d893035';

  if (!city) {
    document.getElementById('weatherResult').innerHTML = `<p>Please enter a city!</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById('weatherResult').innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        <p>🌥️ Condition: ${data.weather[0].description}</p>
        <p>🕒 Local Time: ${new Date().toLocaleTimeString()}</p>
      `;
    } else {
      document.getElementById('weatherResult').innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p>Error fetching data</p>`;
  }
}

document.getElementById('cityInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    getWeather();
  }
});
