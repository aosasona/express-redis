const router = require("express").Router();
const User = require("../models/user.model");
const {
  randEmail,
  randUserName,
  randFullName,
  randPassword,
} = require("@ngneat/falso");

const client = require("../utils/redis.util");

router.get("/", async (req, res) => {
  try {
    let users;

    // Check if cache is available
    const checkCache = await client.exists("users");
    if (checkCache) {
      const rawData = await client.get("users");
      users = JSON.parse(rawData);

      console.log(typeof users);
      return res
        .status(200)
        .json({ success: true, source: "cache", data: users });
    }

    // Fetch from DB
    users = await User.find().select(["-password", "-__v"]);

    // Set cache for 5 minutes
    const stringifiedData = JSON.stringify(users);

    await client.setEx("users", 300, stringifiedData);

    return res
      .status(200)
      .json({ success: true, source: "database", data: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/seed", async (req, res) => {
  try {
    const users = [];
    for (let i = 0; i < 500; i++) {
      users.push({
        name: randFullName(),
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
      });
    }
    await User.insertMany(users);
    return res.status(201).json({ success: true, message: "Seeded 500 users" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
