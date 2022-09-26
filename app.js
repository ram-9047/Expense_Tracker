const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const app = express();
const port = 3030 || process.env.PORT;
const expenseRoutes = require("./routes/index");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", expenseRoutes);

// app.use(expenseRoutes);

//-------database connection setup
sequelize
  .sync()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`server started at port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err, "error in connecting to db");
  });
