# Atmos weather app

Atmos is a responsive weather dashboard for Homework 2. It retrieves forecast data from WeatherAPI.com and presents current conditions, hourly weather, an adjustable multi-day forecast, astronomy, air quality, and alerts.

## Run locally

1. Run `npm install` once.
2. In one terminal, run `npm run compile` to watch Sass changes.
3. In another terminal, run `npm run serve` and open the provided local URL.
4. Choose **API settings**, paste a WeatherAPI.com key, and search by city or ZIP code.

The API key is stored only in browser `localStorage`; no key is committed to this repository. WeatherAPI's plan limits the maximum forecast range, so the app displays the number of days returned by the API.

## Assignment coverage

- Four navigation links plus Login and Signup actions.
- City or ZIP input and selectable 3, 5, 7, 10, or 14 day forecast.
- Sass source in `scss/` compiled to `css/styles.css`.
- WeatherAPI data mapped into location, current conditions, temperature, feels-like, wind, humidity, visibility, hourly conditions, daily high/low, rain chance, UV, daylight, moon data, air quality, and alerts.
- Responsive weather-app styling for mobile and desktop.

## Change log

- **Checkpoint 1:** Set up npm scripts and Sass structure.
- **Checkpoint 2:** Added complete responsive dashboard shell, local API-key handling, WeatherAPI request, loading/error states, and JSON data rendering.
- **Checkpoint 3:** Added README assignment notes and local run instructions.

## Deployment

- GitHub repository: `https://github.com/csalguera/fa26-n423-homework-2`
- Web 4 URL: `ADD_WEB4_URL_HERE`

Replace `ADD_WEB4_URL_HERE` with the published Web 4 URL after uploading the final files.