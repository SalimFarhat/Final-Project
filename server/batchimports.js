const classes = require("./data/classes2.json")
const clients = require("./data/clients.json")

const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI} = process.env;
// console.log(MONGO_URI);
// console.log(process.env);



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    try{
        await client.connect();
        console.log("connected");
        const result = await db.collection("Classes").insertMany(classes)
        // const result2 = await db.collection("Clients").insertMany(clients)
        console.log(result);
        // console.log(result2);

    }catch(err){
        console.log(err.stack)
    }
    client.close()
    console.log("disconnected")
}

// batchImport();