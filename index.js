const app = require("express")();
const express = require("express");

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: 'views/'
}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));

app.get("/", (req, res) => {
  const goodEvilCook = req.cookies['ge'];
  var fFoodCook = req.cookies['ff'];
  const fColor = req.cookies['fc'];
  const insanity = req.cookies['in'];
  if (fFoodCook === '' || fFoodCook === undefined) {
    fFoodCook = 'Food';
  }

  res.render("index", {goodEvilCook, fFoodCook, fColor, insanity} );
})

app.post("/formPost", (req,res) => {

  res.cookie('ge', req.body.goodEvil);
  res.cookie('ff', req.body.favoriteFood);
  res.cookie('fc', req.body.fColor);
  res.cookie('in', req.body.insanity);
  res.redirect("back");
})

app.listen(4000, () => {
  console.log("Listening on port 4000");
})
