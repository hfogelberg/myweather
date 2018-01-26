console.log("ENV: " + process.env.NODE_ENV);
let isLocal = false;
if (process.env.NODE_ENV === "development") {
  isLocal = true;
}

const API_ROOT_URL = isLocal
  ? "http://localhost:3000/api"
  : "https://myweather.henrikfogelberg.com/api";

// const API_ROOT_URL = "http://localhost:3000/api";

module.exports = {
  API_ROOT_URL
};
