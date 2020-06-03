const express = require('express');
const app = express();
const routes = require("./routes");
const logger = require("morgan");
const jsonParser = require("body-parser").json; 

app.use(logger("dev"));
app.use(jsonParser())

app.use("/questions", routes)

app.listen(4000, ()=> console.log("listening"));