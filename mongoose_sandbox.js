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
        size: {type: String, default: "small"},
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Angela"}
    });

    let Animal = mongoose.model("Animal", AnimalSchema);

    let elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,  
        name: "Lawrence"
    })

    let animal = new Animal({});

    let whale = new Animal({
        type: "whale",
        size: "big",
        mass: 190500,
        name: "Fig"
    });

    Animal.deleteOne({}, function(err) {
        if(err) console.error(err);
        elephant.save(function(err){
            if(err) console.error(err);
            animal.save(function(err){
                if(err) console.error(err);
                whale.save(function(err){
                    if(err) console.log(err);
                    Animal.find({size: "big"}, function(err, animals) {
                        animals.forEach(function(animal){
                            console.log(animal.name + " the " + animal.color + 
                            " " + animal.type)
                        });
                        db.close(function(){
                            console.log("db connection closed");
                        });
                    });
                });
            });
        });  
    }); 
});



