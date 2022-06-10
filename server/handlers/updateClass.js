const { MongoClient, ReturnDocument } = require("mongodb");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const validClasses = ["cycling", "crossfit", "yoga", "weights", "HIIT"]
const validDifficulty = ["1", "2", "3"]
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]


const updateClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym");
    const {classType, difficulty, year, month, day, time} = req.body;
    const {_id} = req.params;
    
    console.log(_id);

    let validClass = false;
    let validDifficult = false;
    let validDate = false;
    let validYear = false;
    let validMonth = false;
    let validDay = false;
    let validTime = false;
    let monthToNum = 0;
    let counter = 0;
    months.forEach((e) =>{
        if(e.toLowerCase() === req.body.month.toLowerCase()){
            validMonth = true
            monthToNum = counter;
        }
        counter++
    })
    const newDate = new Date();

    
    if(newDate.getFullYear() > req.body.year){
        console.log("Date provided is in the past");    
    }else if(newDate.getFullYear().toString() === req.body.year && newDate.getMonth() > monthToNum){

        console.log("Month provided is not valid")
        validMonth = false;
    }
    else{
        validYear = true;
        if(parseInt(req.body.day) > 31 || parseInt(req.body.day) <= 0){
            console.log("enter a correct day")
        }else if(parseInt(req.body.day) > 30 && (monthToNum === 3 || monthToNum === 5 || monthToNum === 8 || monthToNum === 10)){
            console.log("This month does not have 31 days")
        }else if(parseInt(req.body.day) > 28 && monthToNum === 1){
            console.log("It's not feb, and that year is not a leap year")
        }
        else{
            validDay = true;
            if(parseInt(req.body.time) < 8 || parseInt(req.body.time) > 17){
                console.log("Please enter a valid time");
            }else{
                validTime = true;
            }
        }
    }
    if(validYear && validMonth && validDay && validTime){
        validDate = true;
    }
    console.log(validDate);

    
    validClasses.forEach((e) => {
        if(e === req.body.classType){
            validClass = true
        }
    })
    validDifficulty.forEach((e) => {
        if(e === req.body.difficulty){
            validDifficult = true;
        }
    })

    try{
        await client.connect();
        console.log("Connected")
        const foundClass = await db.collection("Classes").findOne({_id: _id})
        if(!foundClass){
            res.status(404).json({
                status: 404,
                message: "Class not found"
            })
        }else if(validClass && validDate && validDifficult){
            const query = {_id: _id};
            console.log(query);
            let updatedValues = {$set: {"classType": req.body.classType, "difficulty": req.body.difficulty, "year": req.body.year, "month": req.body.month, "day": req.body.day, "time": req.body.time}}
            const updateClassSearch = await db.collection("Classes").updateOne(query, updatedValues);
            res.status(200).json({
                status:200,
                message: "We found your class!",
                data: updateClassSearch,
            })

        }

    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 404,
            data: err,
        })

    }
    client.close()
    console.log("Disconnected")
}

module.exports = {updateClass};