const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const joinClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    try{
        await client.connect()
        console.log("connected")
    }catch(err){

    }finally{
        
    client.close()
    console.log("Disconnected")
    }
}

module.exports = {joinClass};