const $ = (id) => document.getElementById(id);

const weatherDescriptions = {
  0: ["Clear Sky", "☀️"], 1: ["Mainly Clear", "🌤️"], 2: ["Partly Cloudy", "⛅"],
  3: ["Cloudy", "☁️"], 45: ["Foggy", "🌫️"], 48: ["Rime Fog", "🌫️"],
  51: ["Light Drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Heavy Drizzle", "🌧️"],
  56: ["Freezing Drizzle", "🌧️"], 57: ["Freezing Drizzle", "🌧️"],
  61: ["Light Rain", "🌦️"], 63: ["Rainy", "🌧️"], 65: ["Heavy Rain", "🌧️"],
  66: ["Freezing Rain", "🌧️"], 67: ["Freezing Rain", "🌧️"],
  71: ["Light Snow", "🌨️"], 73: ["Snowy", "🌨️"], 75: ["Heavy Snow", "❄️"],
  77: ["Snow Grains", "❄️"], 80: ["Rain Showers", "🌦️"], 81: ["Rain Showers", "🌧️"],
  82: ["Heavy Rain Showers", "⛈️"], 85: ["Snow Showers", "🌨️"], 86: ["Heavy Snow Showers", "❄️"],
  95: ["Thunderstorm", "⛈️"], 96: ["Thunderstorm with Hail", "⛈️"], 99: ["Thunderstorm with Hail", "⛈️"]
};

function showMessage(text = "") { $("message").textContent = text; }

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"
  });
}

async function loadWeather(city = "Pune") {
  showMessage("");
  $("station-status").textContent = "Connecting to station...";
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!geoResponse.ok) throw new Error("Could not search for this city.");
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) throw new Error("City not found. Check the spelling and try again.");

    const place = geoData.results[0];
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
    );
    if (!weatherResponse.ok) throw new Error("Weather data is temporarily unavailable.");
    const data = await weatherResponse.json();
    const current = data.current;
    const [description, icon] = weatherDescriptions[current.weather_code] || ["Unknown", "🌡️"];

    $("city-name").textContent = `${place.name}${place.admin1 ? ", " + place.admin1 : ""}`;
    $("local-date").textContent = formatDate(current.time);
    $("temperature").textContent = Math.round(current.temperature_2m * 10) / 10;
    $("humidity").textContent = current.relative_humidity_2m;
    $("conditions").textContent = description;
    $("condition-icon").textContent = icon;
    $("wind-speed").textContent = Math.round(current.wind_speed_10m * 10) / 10;
    $("feels-like").textContent = `Feels like ${Math.round(current.apparent_temperature * 10) / 10}°C`;
    $("wind-direction").textContent = `Wind direction: ${Math.round(current.wind_direction_10m)}°`;
    $("station-status").textContent = "Station online";
    $("updated-at").textContent = `Last updated: ${new Date().toLocaleTimeString("en-IN")}`;
  } catch (error) {
    $("station-status").textContent = "Station offline";
    showMessage(error.message || "Something went wrong. Please try again.");
  }
}

$("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = $("city-input").value.trim();
  if (city) loadWeather(city);
});

loadWeather("Pune");
