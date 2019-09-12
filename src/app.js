const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const htmlFilePath = path.join(__dirname, "../public");

const app = express();

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(htmlFilePath));
app.get("", (req, res) => {
  res.render("index", {
    title: "shetil",
    name: "sunil"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Please provide address for query"
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        } else {
          forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
              res.send({ error });
            } else {
              res.send({
                weather: forecastData,
                location: location
              });
            }
          });
        }
      }
    );
  }
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "bambru",
    name: "sunil"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "bambru",
    name: "sunil"
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
