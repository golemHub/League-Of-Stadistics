const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use(require("./routes/index"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.status(404).render('404');
  });
  
module.exports = app;