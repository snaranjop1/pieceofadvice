/* Code Review - Daniel Ramirez:
En general me parecio que el proyecto tiene una muy buena intension con el fin de ayudar a muchas personas
con sus diferentes problemas, por otra parte se ve que tuvieron problemas con la distribucion de trabajo en
el proyecto. Aunque el proyecto no se desplego correctamente a la fecha, el codigo en general esta bien estructurado.
Se pudo encontrar unas malas practicas a la hora de utilizar los props dentro del useState, pero de resto me parece que
el repositorio esta bien estructurado y fueron ordenados en el codigo que desarrollaron.
*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/", function(_, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
