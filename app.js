require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let workoutLog = require("./controllers/log-controller");
let user = require("./controllers/user-controller");

sequelize.sync();
// sequelize.sinc({force:true});

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/api", user);
app.use("/api/log", workoutLog);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
