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

const getOneClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    const _id = req.params._id;
    console.log(_id)
    try{
        await client.connect()
        console.log("Connected")
        const result = await db.collection("Classes").findOne({_id: _id})
        res.status(200).json({
            status: 200,
            message: "Here are your class details",
            data: result,
        })

    }catch(err){
        console.log(err.stack);
        res.status(500).json({
            status: 500,
            data: err
        })
    }
    client.close();
    console.log("Disconnected")
}

module.exports = {
    getOneClass,
};