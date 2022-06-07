const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// : [ "apples", "oranges" ] }

const leaveClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    const _id = req.params._id;
    const query = {_id}
    console.log(query)
    const Email = req.body.email;

    try{
        await client.connect()
        console.log("connected")
        
        const result2 = await db.collection("Classes").findOne({_id: _id})
        const result = await db.collection("Classes").updateOne({_id: _id}, {$pull: { "attending": Email}})

        res.status(200).json({
            status: 200,
            message: "You have left the class!",
            query: _id,
            data: result
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: 500,
            data: err,
        })

    }finally{
        client.close()
        console.log("Disconnected")
    }

}


module.exports = {leaveClass};