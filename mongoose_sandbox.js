const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sandbox");

let db = mongoose.connection;

db.on("error", function(err){
    console.log("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful")
    //All code which communicates with database

    let Schema = mongoose.Schema;
    let AnimalSchema = new Schema({
        type: {type: String, default: "goldfish"},
        size: String, 
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Angela"}
    });

    AnimalSchema.pre("save", function(next){
        if(this.mass >= 100) {
            this.size = "big";
        } else if(this.mass >= 5 || this.mass < 100) {
            this.size = "medium";
        } else {
            this.size = "small";
        }
        next();
    });

    AnimalSchema.static.findSmall = function(callback){
        return this.find({size: "small"}, callback);
    }

    let Animal = mongoose.model("Animal", AnimalSchema);

    let elephant = new Animal({
        type: "elephant",
        color: "gray",
        mass: 6000,  
        name: "Lawrence"
    })

    let animal = new Animal({});

    let whale = new Animal({
        type: "whale",
        mass: 190500,
        name: "Fig"
    });

let animalData = [
    {
        type: "mouse",
        color: "grey",
        mass: 0.035,
        name: "Marvin"
    },
    {
        type: "nutria",
        color: "brown",
        mass: 6.35,
        name: "Gretchen"
    },
    {
        type: "wolf",
        color: "grey",
        mass: 45,
        name: "iris"
    },
    elephant,
    animal,
    whale
];

    Animal.deleteOne({}, function(err) {
        if(err) console.error(err);
        Animal.create(animalData, function(err, animals){
            if(err) console.log(err);
            Animal.findSmall(function(err, animals) {
                animals.forEach(function(animal){
                    console.log(animal.name + " the " + animal.color + 
                    " " + animal.type + " is a " + animal.size + "-sized animal.x")
                });
                db.close(function(){
                    console.log("db connection closed");
                });
            });
        });
            
    });  
}); 



