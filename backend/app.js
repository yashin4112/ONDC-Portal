require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


app.use(express.json());

module.exports = app;

const CatalogModel = require("./models/CatalogModel");
const PaymentModel = require("./models/PaymentModel");
const UserModel = require("./models/UserModel");

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

        const user = await UserModel.create({
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
        const user = await UserModel.findOne({ email });
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
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
    }
}
);

app.post("/insertcatalog", async (req, res) => {
    try {
        const { email, itemName, description, sku, mrp, unitOfMeasure, image, categoryId } = req.body;
        const seller = await UserModel.findOne({ email: email, type: 'seller' });
        if (!seller) {
            return res.status(404).json({ message: 'Invalid Seller Email / Only Seller can add Items' });
        }
        else{
            if (!(email && itemName && description && sku && mrp && unitOfMeasure && categoryId)) {
                res.status(400).json({ message: "All input is required" });
            }
            else{
                const newItem = CatalogModel.create({
                    email: email,
                    name: itemName,
                    description: description,
                    sku: sku,
                    mrp: mrp,
                    unitOfMeasure: unitOfMeasure,
                    categoryId: categoryId
                });
                res.status(201).json({message: "Item added Successfully",item: newItem});
            }
        }

    } catch (error) {
        console.error('Error creating catalog item:', error);
        res.status(500).json({ message: 'Error creating catalog item' });
    }
});

app.get("/getcatalog", async (req, res) => {    
    try {
        const catalogItems = await CatalogModel.find();
        catalogItems ? res.status(200).json(catalogItems) : res.status(404).json({ message: 'No Items Found' });
    } catch (error) {
        console.error('Error getting catalog items:', error);
        res.status(500).json({ message: 'Error getting catalog items' });
    }
});

app.get("/category/:categoryId", async (req, res) => {
    try {
        const items = await CatalogModel.find({ categoryId: req.params.categoryId });
        items.length > 0 ? res.status(200).json(items) : res.status(404).json({ message: 'No Items Found' });
    } catch (error) {
        console.error('Error getting catalog items:', error);
        res.redirect();
    }   
});

app.post("/insertcard", async (req, res) => {
    try {
        const { cardNo, cardHolder, expiryDate, cvv, balance } = req.body;
        if (!cardNo || !cardHolder || !expiryDate || !cvv || !balance) {
            return res.status(404).json({ message: 'All input are required' });
        }
        else{
            const newCard = PaymentModel.create({
                card_number: cardNo,
                card_holder: cardHolder,
                expiry_date: expiryDate,
                cvv: cvv,
                balance: balance
            });
            res.status(201).json({message: "Card added Successfully",item: newCard});
        }
        
    } catch (error) {
        console.error('Error creating Card :', error);
        res.status(500).json({ message: 'Error creating card item' });
    }
});

app.post("/makepayment", async (req, res) => {
    try {
        const { cardNo, cardHolder, expiryDate, cvv, amount } = req.body;
        if (!cardNo || !cardHolder || !expiryDate || !cvv || !amount) {
            return res.status(404).json({ message: 'All input are required' });
        }
        else{
            const items = await PaymentModel.find({ card_number: cardNo });
            if (items.length > 0 ) {
                if(cardHolder == items[0].card_holder){
                    if (expiryDate == items[0].expiry_date) {
                        if(cvv == items[0].cvv){
                            if(amount < items[0].balance){
                                await PaymentModel.updateOne({ card_number: cardNo }, { balance: items[0].balance - amount });
                                res.status(201).json({ message: "Payment Successfull"});
                            }
                            else{
                                res.status(400).json({ message: "Insufficiant Balance" });
                            }
                        }
                        else{
                            res.status(400).json({ message: "CVV is Wrong" });
                        }
                    } else {
                        res.status(400).json({ message: "Expiry Date is Wrong" });
                    }
                }
                else{
                    res.status(400).json({ message: "Card holder name does not match" });
                }
            } else {
                res.status(400).json({ message: "Card not found" });
            }
        }

    } catch (error) {
        console.error('Error creating Card :', error);
        res.status(500).json({ message: 'Error creating card item' });
    }
});

app.post("/search", async (req, res) => {
    try {
        const { itemName } = req.body;
        if (!itemName) {
            return res.status(404).json({ message: 'All input are required' });
        }
        else{
            const data = await CatalogModel.find({ name: itemName})
            data.length > 0 ? res.status(201).json(data) : res.status(404).json({message: "no data found"})
        }
        
    } catch (error) {
        console.error('Error creating Card :', error);
        res.status(500).json({ message: 'Error creating card item' });
    }
});