const express = require("express");
const morgan = require("morgan");



express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))

    .get(`/`, (req, res) => {
        res.send("Let's see what this leads me to!")
    })







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

