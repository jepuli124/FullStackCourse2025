"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.validateAdmin = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateAdmin = async (req, res) => {
    try {
        res.status(200).json({ message: "proceed" });
    }
    catch (error) {
        console.log(`Error while get a card: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
    return;
};
exports.validateAdmin = validateAdmin;
const register = async (req, res) => {
    try {
        const listOfUsers = await User_1.User.find();
        for (let index = 0; index < listOfUsers.length; index++) { // checking that username is unique, not necessary but I thought it was a nice feature 
            if (req.body.name == listOfUsers[index].username) {
                console.log("Username already registered", req.body.name, listOfUsers[index].username);
                res.status(403).json({ msg: "Username already registered" });
                return;
            }
            ;
        }
        const salt = bcrypt_1.default.genSaltSync(10, 'b'); // password encryption process, taken from course's source codes. 
        let password = bcrypt_1.default.hashSync(req.body.password, salt);
        let admin = false;
        if (req.body.isAdmin) { //req.body.isAdmin is either "on" or null, so this changes it to boolean
            admin = true;
        }
        const newUser = new User_1.User({
            username: req.body.name,
            password: password,
            admin: admin
        });
        await newUser.save();
        const payLoadInfo = await User_1.User.findOne({ username: req.body.name }); //need to fetch the new user to take the id to the JWTplayload 
        if (!payLoadInfo) {
            res.status(500).json({ message: "error in registry, refetching the saved user" });
            return;
        }
        const payload = {
            username: payLoadInfo.username,
            userId: payLoadInfo._id,
            isAdmin: admin,
            message: "I dont know what should be stored here, so I wrote this" // not necessary, just funi
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: "100m" }); // creation of the token
        res.status(200).json({ messsage: "registery successful", token: token });
    }
    catch (error) {
        console.log(`Error in registery: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
    return;
};
exports.register = register;
const login = async (req, res) => {
    try {
        const listOfUsers = await User_1.User.find();
        for (let index = 0; index < listOfUsers.length; index++) { // checking if that user exist and has the password equal the saved one.
            if (req.body.name == listOfUsers[index].username && bcrypt_1.default.compareSync(req.body.password, listOfUsers[index].password)) {
                const payload = {
                    username: listOfUsers[index].username,
                    userId: listOfUsers[index]._id,
                    isAdmin: listOfUsers[index].admin,
                    message: "I dont know what should be stored here, so I wrote this"
                };
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: "100m" });
                res.status(200).json({ message: "Login succsesful", token: token });
                return; //apparently crusial for preventing http_headers error
            }
            ;
        }
        res.status(403).json({ message: `login failed ` });
    }
    catch (error) {
        console.log(`Error while login: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
    return;
};
exports.login = login;
