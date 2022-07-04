const router = require("express").Router();

app.get("/users", async (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
