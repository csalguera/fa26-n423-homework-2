const form = document.querySelector("#weather-form");
const statusMessage = document.querySelector("#status-message");
const settingsButton = document.querySelector("#settings-button");
const settingsPanel = document.querySelector("#api-settings");
const apiKeyInput = document.querySelector("#api-key-input");
const saveKeyButton = document.querySelector("#save-key-button");
const apiKeyStorage = "atmos-weather-api-key";

const getApiKey = () => localStorage.getItem(apiKeyStorage) || "";
const setStatus = (message, type = "") => {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
};
const formatTime = (value) => value?.split(" ")[1] || value || "--";
const formatDate = (
  value,
  options = { weekday: "short", month: "short", day: "numeric" },
) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-US", options)
    : "--";
const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value ?? "--";
};

const renderCurrent = (data) => {
  const { location, current, forecast } = data;
  const today = forecast.forecastday[0];
  const astronomy = today.astro;
  setText(
    "#location-name",
    `${location.name}, ${location.region || location.country}`,
  );
  setText(
    "#local-time",
    `${formatDate(location.localtime.split(" ")[0], { weekday: "long", month: "long", day: "numeric" })} · ${formatTime(location.localtime)}`,
  );
  setText("#current-temp", Math.round(current.temp_f));
  setText("#current-condition", current.condition.text);
  setText("#feels-like", Math.round(current.feelslike_f));
  setText("#today-high", Math.round(today.day.maxtemp_f));
  setText("#today-low", Math.round(today.day.mintemp_f));
  setText(
    "#wind-value",
    `${Math.round(current.wind_mph)} mph ${current.wind_dir}`,
  );
  setText("#humidity-value", `${current.humidity}%`);
  setText("#visibility-value", `${current.vis_miles} mi`);
  document.querySelector("#current-icon").innerHTML =
    `<img src="https:${current.condition.icon}" alt="" />`;
  setText("#sunrise", formatTime(astronomy.sunrise));
  setText("#sunset", formatTime(astronomy.sunset));
  setText("#moon-phase", astronomy.moon_phase);
  setText("#moonrise", formatTime(astronomy.moonrise));
  setText(
    "#daylight-note",
    `${astronomy.sunshine || "Daylight"} of sunshine expected today.`,
  );
};

const renderHourly = (data) => {
  const hours = data.forecast.forecastday
    .flatMap((day) => day.hour)
    .filter(
      (hour) =>
        new Date(hour.time).getTime() >=
        new Date(data.location.localtime).getTime(),
    )
    .slice(0, 12);
  setText("#hourly-meta", `${hours.length} hour view`);
  document.querySelector("#hourly-list").innerHTML = hours
    .map(
      (hour, index) =>
        `<div class="hour-item ${index === 0 ? "is-current" : ""}"><span>${index === 0 ? "Now" : formatTime(hour.time)}</span><img src="https:${hour.condition.icon}" alt="${hour.condition.text}" /><strong>${Math.round(hour.temp_f)}°</strong><small>${Math.round(hour.chance_of_rain)}% rain</small></div>`,
    )
    .join("");
};

const renderForecast = (data) => {
  const days = data.forecast.forecastday;
  setText("#forecast-meta", `${days.length} day view`);
  document.querySelector("#forecast-list").innerHTML = days
    .map(
      (day, index) =>
        `<article class="forecast-card ${index === 0 ? "is-today" : ""}"><div class="forecast-date"><strong>${index === 0 ? "Today" : formatDate(day.date, { weekday: "short" })}</strong><span>${formatDate(day.date, { month: "short", day: "numeric" })}</span></div><img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" /><div class="forecast-temp"><strong>${Math.round(day.day.maxtemp_f)}°</strong><span>${Math.round(day.day.mintemp_f)}°</span></div><p>${day.day.condition.text}</p><div class="forecast-facts"><span>Rain <b>${day.day.daily_chance_of_rain}%</b></span><span>Wind <b>${Math.round(day.day.maxwind_mph)} mph</b></span><span>UV <b>${day.day.uv}</b></span></div></article>`,
    )
    .join("");
};

const renderInsights = (data) => {
  const air = data.current.air_quality;
  const airValue = air?.["us-epa-index"];
  const labels = [
    "",
    "Good",
    "Moderate",
    "Unhealthy for sensitive groups",
    "Unhealthy",
    "Very unhealthy",
    "Hazardous",
  ];
  setText("#air-quality", airValue ? `${airValue} / 6` : "Unavailable");
  setText(
    "#air-quality-label",
    airValue
      ? labels[airValue]
      : "Air quality is not included in this API response.",
  );
  document.querySelector("#air-quality").className =
    `insight-value air-${airValue || "none"}`;
  const alert = data.alerts?.alert?.[0];
  setText("#alert-title", alert?.event || "No active alerts");
  setText(
    "#alert-description",
    alert?.desc || "There are no active weather alerts for this location.",
  );
};

const loadWeather = async (location, days) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    settingsPanel.hidden = false;
    setStatus(
      "Add your WeatherAPI.com key in API settings before searching.",
      "is-error",
    );
    apiKeyInput.focus();
    return;
  }
  setStatus("Finding the latest forecast...", "is-loading");
  try {
    const endpoint = new URL("https://api.weatherapi.com/v1/forecast.json");
    endpoint.search = new URLSearchParams({
      key: apiKey,
      q: location,
      days,
      aqi: "yes",
      alerts: "yes",
    });
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data.error?.message || "WeatherAPI could not find that location.",
      );
    renderCurrent(data);
    renderHourly(data);
    renderForecast(data);
    renderInsights(data);
    setStatus(
      `Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · ${data.location.name}`,
      "is-success",
    );
  } catch (error) {
    setStatus(error.message, "is-error");
  }
};

settingsButton.addEventListener("click", () => {
  settingsPanel.hidden = !settingsPanel.hidden;
  if (!settingsPanel.hidden) apiKeyInput.focus();
});
saveKeyButton.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key)
    return setStatus("Enter a WeatherAPI.com key to save it.", "is-error");
  localStorage.setItem(apiKeyStorage, key);
  settingsPanel.hidden = true;
  setStatus("Key saved locally. Search to load the forecast.", "is-success");
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  loadWeather(formData.get("location"), formData.get("days"));
});
if (getApiKey()) apiKeyInput.value = getApiKey();
