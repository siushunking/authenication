const https = require('https')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const secretRoute = require("./routes").secret;
const PORT = 3000
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/user", authRoute);
  app.use(
    "/api/courses",
    passport.authenticate("jwt", { session: false }),
    secretRoute
  );

app.listen(PORT, 
    console.log(`listen on ${PORT}`))

