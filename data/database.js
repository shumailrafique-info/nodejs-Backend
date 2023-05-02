const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    { dbName: "TodoApp" }
  )
  .then((data) => {
    console.log(
      `Connection to Database Successfull at ${data.connection.host}`
    );
  })
  .catch((e) => console.log(e));
