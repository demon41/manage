const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users = require("./routers/api/users.js");
const profiles = require("./routers/api/profiles")

// DB config
const db = require("./config/keys.js").mongoURI;
mongoose.connect(db)
        .then(() => {
            console.log("mongoDB Connected")
        })
        .catch(err => {
            console.log(err)
        })

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get("/",(req,res) => {
//     res.send("Hello World !");
// });

app.use("/api/users",users);
app.use("/api/profiles",profiles);
app.use(passport.initialize());
require("./config/passport.js")(passport);

const port = process.env.PORt || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})
