# Weather Station

A responsive weather dashboard built with HTML, CSS and JavaScript. It gets live current conditions from the free Open-Meteo geocoding and forecast APIs; no API key is required.

## Run locally
1. Extract the project folder.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Deploy on Render (Static Site)
1. Push these files to a GitHub repository.
2. In Render, choose **New + → Static Site**.
3. Connect your GitHub repository.
4. Set **Build Command** to blank (or `echo "No build required"` if Render requires a value).
5. Set **Publish Directory** to `.`.
6. Click **Create Static Site**.

Every push to the connected GitHub branch can trigger an automatic redeploy.

## Data source
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

The browser needs an internet connection to retrieve live weather data.
