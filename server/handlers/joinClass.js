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
    console.log(req.params._id)
    const _id = req.params._id;
    const query = {_id}
    console.log(query)
    const Email = req.body.email;
    try{
        await client.connect()
        console.log("connected")
        // const newValues = {$set: { {attending.push({req.body.email})} }};
        
        const result2 = await db.collection("Classes").findOne({_id: _id})
        const result = await db.collection("Classes").updateOne({_id: _id}, {$push: { "attending": Email}})
        console.log(result2);
        res.status(200).json({
            status: 200,
            message: "You have joined the class!",
            query: _id,
            data: result
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: 500,
            message: "Class not found"
        })

    }finally{
        
    client.close()
    console.log("Disconnected")
    }
}

module.exports = {joinClass};