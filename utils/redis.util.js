const redis = require("redis");

// Create redis client

const client = redis.createClient(
  process.env.NODE_ENV === "production"
    ? {
        url: process.env.REDIS_URL, // Redis URL in production - you may have to change this to use host, port, username, password, etc. depending on your Redis setup
      }
    : {
        // Leaving this empty will use the default port (6379) on localhost
      }
);

module.exports = client;
