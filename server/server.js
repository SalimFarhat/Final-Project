const express = require("express");
const morgan = require("morgan");
require("dotenv").config()

const { auth } = require('express-openid-connect');


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };


const {getAllClasses} = require("./handlers/getAllClasses")
const {getOneClass} = require("./handlers/getOneClass")
const {getAllClients} = require("./handlers/getAllClients")
const {getOneClient} = require("./handlers/getOneClient")
const {makeClass} = require("./handlers/makeClass");
const {makeClient} = require("./handlers/makeClient");
const {deleteClass} = require("./handlers/deleteClass")
const {deleteClient} = require("./handlers/deleteClient")
const {updateClass} = require("./handlers/updateClass")
const {signInUser} = require("./handlers/signIn")
// const {removeClient} = require("./handlers/removeClient")
const {joinClass} = require("./handlers/joinClass")
const {leaveClass} = require("./handlers/leaveClass")

express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))
    .use(auth(config))



    .get(`/classes`, getAllClasses)
    .get(`/class/:_id`, getOneClass)
    .get(`/clients`, getAllClients)
    .get(`/client/:_id`, getOneClient)

    .post(`/add-class`, makeClass)
    .post(`/add-client`, makeClient)
    .post(`/signin`, signInUser)
    .get(`/test`, (req, res) => {
        console.log("We are here!")
        console.log(req.body);
        console.log(req.query);
        res.send("Read this!")
    })

    .delete(`/class/:_id`, deleteClass)
    .delete(`/client/:_id`, deleteClient)
    
    .patch(`/mod-class/:_id`, updateClass)
    // .patch(`/remove-client`,removeClient)
    .patch(`/leave-class/:_id`, leaveClass)

    .put(`/join-class/:_id`, joinClass)
    

    .get(`/auth`, (req,res) => {
        console.log(req.oidc.isAuthenticated())

    })


    .get(`/`, (req, res) => {
        console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
        res.send("Let's see what this leads me to!")
    })

    // .get('/', (req, res) => {
    //     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    //   });





    .get(`*`, (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is quite obviously the wrong page! It does not exist!",
        });
    })

    .listen(8000, () => {console.log(`Listening on port 8000`)});






// app.get('/', (req, res) => {
//    res.send('Hello World I am going to succeed. I will not slack!');
// })

// app.get('/greeting', (req, res) => {
//     res.send('Hello World I am going to succeed. I will not slack! Also this will work!');
//  })

