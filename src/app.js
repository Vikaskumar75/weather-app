const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handle bars and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vikas Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vikas Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is help message",
    name: "Vikas Kumar",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Please provide address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.send({
        status: false,
        error,
      });

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          status: false,
          error,
        });
      }

      res.send({
        forecast: data,
        address: address,
        location: location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vikas Kumar",
    error: "Help articel not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vikas Kumar",
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Sever is listening on port: 3000");
});
