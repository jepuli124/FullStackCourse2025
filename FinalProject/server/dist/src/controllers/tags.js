"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const Tags_1 = require("../models/Tags");
const tags = async (req, res) => {
    try {
        const tags = await Tags_1.Tag.find();
        if (!tags) {
            return res.status(404).json({ msg: "Tags not found" });
        }
        return res.status(200).json(tags);
    }
    catch (error) {
        console.log(`Error while fetching tags: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.tags = tags;
