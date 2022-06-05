
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

const validClasses = ["cycling", "crossfit", "yoga", "weights", "HIIT"]
const validDifficulty = ["1", "2", "3"]
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

const makeClass = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("BootCampGym")
    const { classType, difficulty, year, month, day, time } = req.body;
    // console.log(req.body.classType.toString())
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
        }else if(newDate.getDate() > parseInt(req.body.day)){
            console.log("Day has already passed")
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
        if(validDifficult && validClass && validDate){
            let newID = uuidv4();
            const newClass = {}
            newClass._id = newID;
            newClass.classType = req.body.classType;
            newClass.difficulty = req.body.difficulty;
            newClass.year = req.body.year;
            newClass.month = req.body.month;
            newClass.day = req.body.day;
            newClass.time = req.body.time + ":00";
            newClass.attending = [];
            const result = await db.collection("Classes").insertOne(newClass);
            res.status(200).json({
                status: 200,
                message: "class successfully added",
                data: result,
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "Bad date, class type, or difficulty"
            })
        }

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 400,
            data: err,
        })
    }
    client.close()
    console.log("Disconnected")

}

module.exports = {
    makeClass,
};