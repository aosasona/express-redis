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

// Routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World",
  });
});
app.use("/users", require("./routes/users.route"));

module.exports = app;
