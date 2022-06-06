
const { v4: uuidv4 } = require("uuid");
const {compareDates} = require("../utils/helpers")

const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

// const _id = "1212";
// const emailTest = validateEmail(_id);
// console.log(emailTest)

const makeClient = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    const { _id, name} = req.body;
    const emailTest = validateEmail(_id);
    try{
        await client.connect()
        console.log("Connected")
        if(!emailTest){
            res.status(404).json({
                status: 404,
                result: "Please enter a valid email"
            })
        }else{
            const newClient = {}
            newClient._id = req.body._id;
            newClient.email = req.body._id;
            newClient.name = req.body.name;
            const result = await db.collection("Clients").insertOne(newClient);
            res.status(200).json({
                status: 200,
                message: "client successfully added",
                data: result,
            })

        }

    }catch(err){
        console.log(err);
        res.status(404).json({

        })
    }
    client.close()
    console.log("Disconnected")

}



module.exports = {
    makeClient,
};