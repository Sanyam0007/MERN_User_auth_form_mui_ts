const express = require("express");
const app = express();
const PORT = 4000;
require("./db/db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const loginMiddleware = require('./middleware/middleware')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middleware
app.use(cors());
// app.use(logger())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome on my homepage");
});
//routes
const userRouter = require("./routes/user");

app.use("/", userRouter);

const routes = require("./routes/user");
const User = require("./model/model");

app.listen(PORT, () => {
  console.log("server is runninig");
});
