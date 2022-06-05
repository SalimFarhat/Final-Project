const { v4: uuidv4 } = require("uuid");


const { MongoClient, ReturnDocument } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// const result = await db.collection("Classes").insertMany(classes)
// const result2 = await db.collection("Clients").insertMany(clients)

const getAllClasses = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    try{
        await client.connect()
        console.log("Connected")
        const result = await db.collection("Classes").find().toArray();
        res.status(200).json({
            status: 200,
            message: "Here are all the classes",
            data: result,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            data: err,
        })
    }
    client.close()
    console.log("Disconnected")


}

module.exports = {getAllClasses};