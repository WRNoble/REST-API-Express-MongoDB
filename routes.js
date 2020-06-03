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
router.get("/:qID", function(req, res){
    res.json({
        response: "You sent me a GET request for a specific ID-" + req.params.qID
    });
})

//POST /questions/:id/answers
router.post("/:qID/answers", function(req, res){
    res.json({
        response: "You sent me a POST request to /answers",
        questionId: req.params.qID,
        body: req.body
    });
})

//PUT /question/:qID/answers/:aID
router.put("/:qID/answers/:aID", function(req, res){
    res.json({
        response: "You sent me a PUT request to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
})

//DELETE /question/:qID/answers/:aID
router.delete("/:qID/answers/:aID", function(req, res){
    res.json({
        response: "You sent me a DELETE request to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
    });
})

//POST /question/:qID/answers/:aID/vote-up
//POST /question/:qID/answers/:aID/vote-down
//vote 
router.post("/:qID/answers/:aID/vote-:dir", function(req, res){
    res.json({
        response: "You sent me a POST request to /vote-" + req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
})


module.exports = router;