const http = require("http");

// Load environment variables from .env file -  important to do this before the app object is imported
require("dotenv").config();

const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(
    `🚀 Server started on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
