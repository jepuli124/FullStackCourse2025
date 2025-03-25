"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// all code in this file is from cource's source code 
dotenv_1.default.config(); // .env file handling library
const app = (0, express_1.default)(); //express initization
const port = process.env.PORT;
const mongoDB = "mongodb://127.0.0.1:27017/maps";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "apua lol"));
app.use(express_1.default.json()); //parses the incoming post body
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", index_1.default);
if (process.env.NODE_ENV === 'development') { //dev mode
    const corsOptions = {
        origin: 'http://localhost:1234',
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
}
else if (process.env.NODE_ENV === 'production') { // client mode
    app.use(express_1.default.static(path_1.default.resolve('../..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve('../..', 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => {
    console.log(`hello world ${port}`);
});
