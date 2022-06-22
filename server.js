const app = require("./src/app");
const { connect } = require("./src/db");

const port = process.env.APP_PORT;
const host = process.env.APP_URL;
connect();

app.listen(port, () => {
  console.log(`App running in ${host}:${port}`);
});
