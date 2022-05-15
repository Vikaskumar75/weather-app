const request = require("postman-request");

const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapBoxAccessToken =
  "pk.eyJ1IjoidmlrYXNrdW1hcjc1IiwiYSI6ImNsMzF2dzlxcjBkc3EzZGtjNHhscWVra3oifQ.2uE-Htb_Ro8aFJb2vEAdxw";

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const mapBoxUrl = `${baseURL}${encodedAddress}.json?limit=1&access_token=${mapBoxAccessToken}`;

  request(
    { url: mapBoxUrl, json: true },
    (error, { statusCode, body } = {}) => {
      if (statusCode !== 200) {
        callback(
          "Bad request to mapbox service! Status code: " + response.statusCode
        );
      } else if (error) {
        callback("Unable to connect to mapbox service!");
      } else if (body.features.length === 0) {
        callback("Unable to find location");
      } else {
        const { place_name: location, center } = body.features[0];
        const latitude = center[1];
        const longitude = center[0];
        callback(undefined, {
          location,
          latitude,
          longitude,
        });
      }
    }
  );
};

module.exports = geocode;
