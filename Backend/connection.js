const mongoose = require("mongoose");

async function connectMongoDb(url)
{
    return mongoose.connect(url).then(()=>console.log("Mongodb Connected")).catch(()=>console.log("Mongo error occured"));
}
module.exports={
    connectMongoDb,
};