const mongoose = require("mongoose");

let connection;

async function connect() {
  if (connection) return;

  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/assesment";

  connection = mongoose.connection;

  connection.once("open", () =>
    console.log("Connection established succesfully")
  );
  connection.on("disconected", () => console.log("Succesfully desconected"));
  connection.on("error", (err) => console.log("Something went wrong", err));

  await mongoose.connect(mongoUri);
}

async function disconnected() {
  if (!connection) return;
  await mongoose.disconnect();
}

async function cleanup() {
  for (const collections in connection.collections) {
    await connection.collections[collections].deleteMany({});
  }
}

module.exports = { connect, disconnected, cleanup };
