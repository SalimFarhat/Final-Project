
const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const deleteClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const _id = req.params._id;
    const db = client.db("BootCampGym");
    try{
        await client.connect()
        console.log("connected")
        const result = await db.collection("Classes").deleteOne({_id});
        res.status(200).json({
            status: 200,
            data: result,
            message: "class has been deleted"
        })


    }catch(err){
        console.log(err);
        res.status(404).json({
            status: 404,
            data: "class not found"
        })
    }
    client.close()
    console.log("Disconnected")
}

module.exports = {deleteClass};