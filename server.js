const app = require("./app.js");

//Connecting DataBase
require("./data/database.js");

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
