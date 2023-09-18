const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

mongoose
  .connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("data base connecte");
    server.listen(PORT, () => {
      console.log("listening on PORT : ", PORT);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api/employee", require("./routes/employeeRoutes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));