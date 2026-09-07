# Atmos weather app

Atmos is a responsive weather dashboard for Homework 2. It retrieves forecast data from WeatherAPI.com and presents current conditions, hourly weather, an adjustable multi-day forecast, astronomy, air quality, and alerts.

## Run locally

1. Run `npm install` once.
2. In one terminal, run `npm run compile` to watch Sass changes.
3. In another terminal, run `npm run serve` and open the provided local URL.
4. Add your WeatherAPI.com key to `js/config.js`, then open the app. The default forecast loads automatically; users can search by city or ZIP code afterward.

The key is read from browser configuration because this is a vanilla JavaScript app. Any key shipped to a browser can be inspected by users, so use a server-side proxy for a production deployment. WeatherAPI's plan limits the maximum forecast range, so the app displays the number of days returned by the API.

## Assignment coverage

- Four navigation links plus Login and Signup actions.
- City or ZIP input and selectable 3, 5, 7, 10, or 14 day forecast.
- Sass source in `scss/` compiled to `css/styles.css`.
- WeatherAPI data mapped into location, current conditions, temperature, feels-like, wind, humidity, visibility, hourly conditions, daily high/low, rain chance, UV, daylight, moon data, air quality, and alerts.
- Responsive weather-app styling for mobile and desktop.

## Change log

- **Checkpoint 1:** Set up npm scripts and Sass structure.
- **Checkpoint 2:** Added complete responsive dashboard shell, WeatherAPI request, loading/error states, and JSON data rendering.
- **Checkpoint 3:** Added README assignment notes and local run instructions.
- **Checkpoint 4:** Removed user API settings and switched to automatic startup configuration.

## Deployment

- GitHub repository: `https://github.com/csalguera/fa26-n423-homework-2`
- Web 4 host: `in-info-web4.luddy.indianapolis.iu.edu`
- Web 4 URL pattern: `https://in-info-web4.luddy.indianapolis.iu.edu/~YOUR_USERNAME/YOUR_PROJECT_NAME/`

The local `sftp.json` template is configured for Web 4 over SFTP. Before uploading:

1. Replace `username` and `project_name` in `sftp.json` with your IU username and project folder name.
2. Use the VS Code SFTP extension's upload-folder command from the project root.
3. Enter your IU password directly in the terminal or extension prompt; do not commit it.
4. Open the URL above with your actual username and project name, then replace this README URL pattern with the final published URL.

The upload excludes `node_modules`, Sass source, and package metadata because Web 4 only needs the compiled static site files: `index.html`, `css/`, and `js/`.
