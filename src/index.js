const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

//SetUp seperate place for all env variable

require("dotenv").config();

const geocode = require("./utils/geocode");
const getId = require("./utils/weather");

// Port at which server is running
const PORT = 3001 | process.env.PORT;

// Define paths for express configuration
const publicPathDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine & views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhishek kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must have to provide address",
    });
  }
  getId(req.query.address, (error, id) => {
    if (error) {
      res.send({ error });
    } else {
      const API_KEY = process.env.WEATHER_API_KEY
      res.send({ id, API_KEY });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abhishek kumar",
  });
});

// should be in last of mention url
app.get("/help/*", (req, res) => {
  res.render("help", {
    title: "404",
    messege: "Help article not found.",
    name: "Abhishek Kumar",
  });
});

// no match url (always be in last of all get call)
// '*' called as wild card character
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    messege: "Page not Found",
    name: "Abhishek Kumar",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
