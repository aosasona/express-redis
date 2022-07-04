const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Disconnect from MongoDB
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connect, disconnect };
