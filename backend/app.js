require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


app.use(express.json());

module.exports = app;

const User = require("./models/user");
const CatalogItem = require("./models/CatalogItem");

app.post("/register", async (req, res) => {
    try{
        const { firstName, lastName, email, password, mobile_number, address, type } = req.body;
        if (!(email && password && firstName && lastName && mobile_number  && type)) {
            res.status(400).json({ message: "All input is required" });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ message: "User Already Exist. Please Login" });
        }

        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), 
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

app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ message: "All input is required" });
        }
        const user = await User
            .findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {  
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: "User Already Exist. Please Login" });
        }
    }
    catch (error) {
        console.log(error);
    }
}
);

app.post("/insertcatalog", async (req, res) => {
    try {
        const { email, itemName, description, sku, mrp, unitOfMeasure, image } = req.body;
        if (!(email && itemName && description && sku && mrp && unitOfMeasure && image)) {
            res.status(400).json({ message: "All input is required" });
        }
        else{
            const newItem = CatalogItem.create({
                email: email,
                name: itemName,
                description: description,
                sku: sku,
                mrp: mrp,
                unitOfMeasure: unitOfMeasure,
                image: image,
            });
            res.status(201).json({message: "Item added Successfully",item: newItem});
        }

    } catch (error) {
        console.error('Error creating catalog item:', error);
        res.status(500).json({ message: 'Error creating catalog item' });
    }
});

