"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenAdmin = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(" ")[1]; //reading the token from authorization
    if (!token)
        return res.status(401).json({ message: "Missing token" });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET); //verification
        req.body.user = verified;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Auth error token" });
    }
};
exports.validateToken = validateToken;
const validateTokenAdmin = (req, res, next) => {
    const token = req.header('authorization')?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Missing token" });
    try {
        const arrayToken = token.split('.'); //https://medium.com/@feldjesus/how-to-decode-a-jwt-token-175305335024 
        const tokenPayload = JSON.parse(atob(arrayToken[1])); // parse process of the token
        if (tokenPayload.isAdmin !== true) {
            return res.status(403).json({ message: "Access denied." });
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.body.user = verified;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Missing token" });
    }
};
exports.validateTokenAdmin = validateTokenAdmin;
