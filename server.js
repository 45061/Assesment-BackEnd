const app = require("./src/app");
const { connect } = require("./src/db");

const port = process.env.PORT || process.env.APP_PORT;

connect();

app.listen(port, () => {
  console.log(`App running in ${port}`);
});
