// makes random clients and classes
const e = require("express");
const { v4: uuidv4 } = require("uuid");

const randomNames = ["Betty", "Alexia", "Ciaran", "Bob", "Alex", "James", "Logan", "Adam", "Henry", "Victor", "Hugo", "John", "Albert", "Steve", "Richard", "Frank", "Fred", "Diego", "Andy", "Rick", "Mohammad", "Ahmad", "Mustafa", "Ike", "Helem", "Kareem", "Lola", "Samantha", "Kaitlyn", "Sophie", "Mira", "Hiba", "Khadija", "Sarah", "Leyla", "Zeina", "Dina", "Barbara", "Terri", "Zoya", "Maria"]
const randomEmail = ["1@g.com", "2@g.com", "3@g.com", "4@g.com", "5@g.com", "6@g.com", "7@g.com", "8@g.com", "9@g.com", "10@g.com", "11@g.com", "12@g.com", "13@g.com", "14@g.com", "15@g.com", "16@g.com", "17@g.com", "18@g.com", "19@g.com", "20@g.com", "21@g.com", "22@g.com", "23@g.com", "24@g.com", "25@g.com", "26@g.com", "27@g.com", "28@g.com", "29@g.com", "30@g.com", "31@g.com", "32@g.com", "33@g.com", "34@g.com", "36@g.com", "37@g.com", "38@g.com", "39@g.com", "40@g.com", "41@g.com", "42@g.com", "43@g.com", "44@g.com", "45@g.com", "46@g.com", "47@g.com", "48@g.com", "49@g.com", "50@g.com"]
const emails = ["44@g.com", "26@g.com", "29@g.com", "13@g.com", "12@g.com", "5@g.com", "19@g.com", "24@g.com", "37@g.com", "9@g.com", "39@g.com"]
const days = ["15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
const pickName = randomNames[Math.floor(Math.random() * randomNames.length)];
const classTypes = ["cycling", "crossfit", "yoga", "weights", "HIIT"]
const time = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

let classes = [];

// console.log(classes.length)

const createRandomClient = () => {
    const result = {}
    result._id = randomEmail[Math.floor(Math.random() * randomEmail.length)]
    result.email = result._id;
    result.name = pickName;
    console.log(result);

}


const createClient = (email) => {


}

const createClass = () => {
    // let i = 0
    // let num = Math.floor(Math.random() * 3)
    // let attendees = [];
    // while(i <= 0){
    //     attendees.push(emails[Math.floor(Math.random) * emails.length])
    // }
    let newID = uuidv4();    
    const result = {};
    result._id = newID;
    result.classType = classTypes[Math.floor(Math.random() * classTypes.length)]
    if(result.classType === "cycling"){
        result.difficulty = 1;
    }else if(result.classType === "yoga" || result.classType === "weights"){
        result.difficulty = 2;
    }else{
        result.difficulty = 3;
    }
    result.year = 2022;
    result.month = "June";
    result.day = days[Math.floor(Math.random() * days.length)];
    result.time = time[Math.floor(Math.random() * time.length)];
    result.attending = [];
    console.log(result);

}

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
// console.log(months[0])

const compareDates = (date1, date2) => {
    let result = ""
    if(date1.getFullYear() > date2.getFullYear()){
        result = "Date provided is in the past"
    }else if(date1.getMonth() > date2.getMonth()){
        result = "Month is in the past"
    }else if (date1.getDate() > date2.getDate()){
        result = "Day is in the past"
    }else if (date2.getHours() < 8 || date2.getHours() > 17){
        result = "Gym hours are between 8:00 to 17:00 only"
    }else{
        result = "date is good to go"
    }
    return result;

}

// const date1 = new Date();
// const date2 = new Date("JUNE 12,2022 15:00")
// const date3 = new Date()
// console.log(date2.getMonth());
// // console.log(date2.toString());
// if(date3.toString() === "Invalid Date"){
//     console.log("It is invalid");
// }else{
//     console.log("Valid date")
// }
// const check = compareDates(date1, date2);
// console.log(check);

// .getDate is for the day
// .getDay is for the number of the day 0-6 (sun-sat)
// .getMonth is for the month (0-11)
// .getHours() is for the hours. Military time.

module.exports = {compareDates};