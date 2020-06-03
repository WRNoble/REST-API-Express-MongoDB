const express = require('express');
const app = express();
const routes = require("./routes");
const logger = require("morgan");
const jsonParser = require("body-parser").json; 

app.use(logger("dev"));
app.use(jsonParser())

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/qa");

let db = mongoose.connection;

db.on("error", function(err){
    console.log("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful")
});

app.use("/questions", routes)

//catch 404 errors
app.use(function(req, res, next){
    let err = new Error("not found");
    err.status = 404;
    next(err);
})

//error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

app.listen(4000, ()=> console.log("listening"));