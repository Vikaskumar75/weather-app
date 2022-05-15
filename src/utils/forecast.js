const request = require("postman-request");

const baseURL = "http://api.weatherstack.com/current";
const accessKey = "44d7a43b6648b48650f182a682187630";

const forecast = (latitude, longitude, callback) => {
  const url = `${baseURL}?access_key=${accessKey}&query=${latitude},${longitude}&limit=1`;

  request({ url, json: true }, (error, { statusCode, body } = {}) => {
    if (statusCode !== 200) {
      callback(
        "Bad request to mapbox service! Status code: " + response.statusCode
      );
    } else if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to fetch weather at the moment ☹️");
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} deegrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
