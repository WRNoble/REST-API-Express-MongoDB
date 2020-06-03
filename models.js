const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answer: [AnswerSchema]
});