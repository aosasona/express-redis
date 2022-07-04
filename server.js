const http = require("http");

// Load environment variables from .env file -  important to do this before the app object is imported
require("dotenv").config();

const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, async () => {
  console.log(
    `🚀 Server started on port ${port} in ${process.env.NODE_ENV} mode`
  );

  // Connect to MongoDB
  try {
    await require("./utils/mongo.util").connect();
  } catch (err) {
    console.error("Unable to connect to MongoDB: " + err.message);
    process.exit(1);
  }

  // Connect to Redis
  try {
    await require("./utils/redis.util").connect();
    console.log("Redis connected...");
  } catch (err) {
    console.error("Unable to connect to Redis: " + err.message);
    process.exit(1);
  }
});
