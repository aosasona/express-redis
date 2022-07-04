const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

// Middleware
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by"); // For security reasons

module.exports = app;
