
const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const signInUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    const {email} = req.body;

    try{
        await client.connect()
        const result = await db.collection("Clients").findOne({email: email})
        if(!result){
            res.status(404).json({
                status: 404,
                data: "User Not found",
            })
        }
        res.status(200).json({
            status: 200,
            data: result,
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


// function getByEmail(email, callback) {
//     const client = new MongoClient(MONGO_URI, options);
  
//     client.connect(function (err) {
//       if (err) return callback(err);
  
//       const db = client.db('BootCampGym');
//       const users = db.collection('Clients');
  
//       users.findOne({ email: email }, function (err, user) {
//         client.close();
  
//         if (err) return callback(err);
//         if (!user) return callback(null, null);
  
//         return callback(null, {
//           user_id: user._id.toString(),
//           email: user.email,
//           name: user.name
//         });
//       });
//     });
//   }
  


module.exports = {signInUser};