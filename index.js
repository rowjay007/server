//Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");

//DB Setup
mongoose.connect("mongodb://localhost:auth/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect("mongodb://localhost:auth/auth", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// import express from "express";
// import http from "http";
// import bodyParser from "body-parser";
// import morgan from "morgan";

const app = express();
//App Setup

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
