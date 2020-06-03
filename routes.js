const express = require("express");
const router = express.Router();

//GET /questions
router.get("/", function(req, res){
    res.json({response: "You sent me a GET request"});
})

//POST /questions
router.post("/", function(req, res){
    res.json({
        response: "You sent me a POST request",
        body: req.body
    });
})

//GET /questions/"id"
router.get("/:id", function(req, res){
    res.json({
        response: "You sent me a GET request for a specific ID " + req.params.id
    });
})

module.exports = router;