const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


//this is to remove a client from the class

const removeClient = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");

    try{
        await client.connect()
        console.log("Connected")


    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 404,
            data: err
        })
    }
    client.close()
    console.log("Disconnected")

}