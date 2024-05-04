require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


app.use(express.json());

module.exports = app;

const User = require("./models/user");

app.post("/register", async (req, res) => {
    try{
        const { firstName, lastName, email, password, mobile_number, address, type } = req.body;
        if (!(email && password && firstName && lastName && mobile_number  && type)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
            mobile_number: mobile_number,
            address: address ?? "",
            type: type
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "5h",}
        );
        
        user.token = token;
        
        res.status(201).json(user);

    } 
    catch (error) {
        console.log(error);
    }   
});

app.get("/employeedata", async (req, res) => {
    try{
        const employees = await User.find({});
        res.status(200).json(employees);
    } 
    catch (error) {
        console.log(error);
    }   
}); 

