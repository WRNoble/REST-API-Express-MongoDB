const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sortAnswers = function(a, b) {
    if(a.votes === b.votes){
        if(a.updatedAt > b.updatedAt){
            return -1;
        } else if(a.updatedAt < b.updatedAt){
            return 1;
        } else {
            return 0;
        }
    }
    return b.votes - a.votes;
}

const AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default:Date.now},
    votes: {type: Number, default: 0}
});

AnswerSchema.methods("update", function(updates, callback){
    Object.assign(this, updates, {updatedAt: new Date()})
    this.parent().save(callback);
});

AnswerSchema.method("vote", function(vote, callback){
    if(vote === "up") {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

const questionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answer: [AnswerSchema]
});

questionSchema.pre("save", function(next){
    this.answers.sort(sortAnswers);
    next();
});

let Questions = mongoose.model("Questions", questionSchema);

module.exports.Question =  Question;
