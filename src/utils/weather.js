const axios = require("axios");

const getId = async (address, callback) => {
  console.log(address);
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(address) +
    "&APPID=" +
    process.env.WEATHER_API_KEY;

  try {
    const body = await axios.get(url);
    callback(undefined, body.data.id);
  } catch (e) {
    // console.log(e);
    callback("Location not found. Try with another Location !!", undefined);
  }
};

module.exports = getId;
