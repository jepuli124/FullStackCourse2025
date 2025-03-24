"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLocationMap = exports.uploadWorldMap = exports.uploadMap = exports.tags = exports.locationMapByTag = exports.worldMapByTag = exports.locationMapsWithoutImages = exports.worldMapsWithoutImages = exports.locationMapById = exports.worldMapById = exports.locationMapByName = exports.worldMapByName = void 0;
const Maps_1 = require("../models/Maps");
const Image_1 = require("../models/Image");
const Tags_1 = require("../models/Tags");
async function saveTagIfNew(tag) {
    if (await Tags_1.Tag.findOne({ name: tag.name }) == null) { // if tag doesn't exist yet, save it as new, findOne function returns null if nothing was found. find function would return a empty list. this is more optimal.
        await tag.save();
    }
}
;
const worldMapByName = async (req, res) => {
    try {
        const worldMap = await Maps_1.WorldMap.findOne({ name: req.params["name"] });
        if (worldMap?.imageId !== undefined) {
            const mapImage = await Image_1.Image.findOne({ id: worldMap?.imageId });
            return res.status(200).json({ worldMap: worldMap, mapImage: mapImage });
        }
        return res.status(200).json({ worldMap: worldMap });
    }
    catch (error) {
        console.log(`Error while fetching a world map by name: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.worldMapByName = worldMapByName;
const locationMapByName = async (req, res) => {
    try {
        const locationMap = await Maps_1.LocationMap.findOne({ name: req.params["name"] });
        if (locationMap?.imageId !== undefined) {
            const mapImage = await Image_1.Image.findOne({ id: locationMap?.imageId });
            return res.status(200).json({ locationMap: locationMap, mapImage: mapImage });
        }
        return res.status(200).json({ locationMap: locationMap });
    }
    catch (error) {
        console.log(`Error while fetching a location map by name: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.locationMapByName = locationMapByName;
const worldMapById = async (req, res) => {
    try {
        const worldMap = await Maps_1.WorldMap.findById(req.params["id"]);
        if (worldMap?.imageId !== undefined) {
            const mapImage = await Image_1.Image.findById(worldMap?.imageId);
            return res.status(200).json({ worldMap: worldMap, mapImage: mapImage?.path });
        }
        return res.status(200).json({ worldMap: worldMap });
    }
    catch (error) {
        console.log(`Error while fetching a world map by id: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.worldMapById = worldMapById;
const locationMapById = async (req, res) => {
    try {
        const locationMap = await Maps_1.LocationMap.findOne({ id: req.params["id"] });
        if (locationMap?.imageId !== undefined) {
            const mapImage = await Image_1.Image.findOne({ id: locationMap?.imageId });
            return res.status(200).json({ locationMap: locationMap, mapImage: mapImage });
        }
        return res.status(200).json({ locationMap: locationMap, mapImage: undefined });
    }
    catch (error) {
        console.log(`Error while fetching a location map by id: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.locationMapById = locationMapById;
const worldMapsWithoutImages = async (req, res) => {
    try {
        const worldMaps = await Maps_1.WorldMap.find();
        if (!worldMaps) {
            return res.status(404).json({ message: "No world maps found" });
        }
        return res.status(200).json(worldMaps);
    }
    catch (error) {
        console.log(`Error while fetching world maps: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.worldMapsWithoutImages = worldMapsWithoutImages;
const locationMapsWithoutImages = async (req, res) => {
    try {
        const locationMaps = await Maps_1.LocationMap.find();
        if (!locationMaps) {
            return res.status(404).json({ message: "No location maps found" });
        }
        return res.status(200).json(locationMaps);
    }
    catch (error) {
        console.log(`Error while fetching location maps: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.locationMapsWithoutImages = locationMapsWithoutImages;
const worldMapByTag = async (req, res) => {
    try {
        const worldMaps = await Maps_1.WorldMap.find();
        let returnMaps = [];
        if (!worldMaps) {
            return res.status(404).json({ message: "No world maps found" });
        }
        for (let index = 0; index < worldMaps.length; index++) { //beautiful and inefficient 3 for loop
            for (let index2 = 0; index2 < worldMaps[index].tags.length; index2++) {
                for (let counter = 0; counter < req.body.tags.length; counter++) {
                    if (req.body.tags[counter] == worldMaps[index].tags[index2].name) {
                        returnMaps.push(worldMaps[index]);
                        break;
                    }
                }
            }
        }
        return res.status(200).json(returnMaps);
    }
    catch (error) {
        console.log(`Error while fetching world maps by tags: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.worldMapByTag = worldMapByTag;
const locationMapByTag = async (req, res) => {
    try {
        const locationMaps = await Maps_1.LocationMap.find();
        let returnMaps = [];
        if (!locationMaps) {
            return res.status(404).json({ message: "No world maps found" });
        }
        for (let index = 0; index < locationMaps.length; index++) { //beautiful and inefficient 3 for loop
            for (let index2 = 0; index2 < locationMaps[index].tags.length; index2++) {
                for (let counter = 0; counter < req.body.tags.length; counter++) {
                    if (req.body.tags[counter] == locationMaps[index].tags[index2].name) {
                        returnMaps.push(locationMaps[index]);
                        break;
                    }
                }
            }
        }
        return res.status(200).json(returnMaps);
    }
    catch (error) {
        console.log(`Error while fetching location maps by tags: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.locationMapByTag = locationMapByTag;
const tags = async (req, res) => {
    try {
        const tags = await Tags_1.Tag.find();
        return res.status(200).json(tags);
    }
    catch (error) {
        console.log(`Error while fetching tags: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.tags = tags;
const uploadMap = async (req, res) => {
    if (req.body.worldMap) {
        return (0, exports.uploadWorldMap)(req, res);
    }
    else {
        return (0, exports.uploadLocationMap)(req, res);
    }
};
exports.uploadMap = uploadMap;
const uploadWorldMap = async (req, res) => {
    try {
        let newMap = new Maps_1.WorldMap({
            name: req.body.name,
            description: req.body.description,
            tags: []
        });
        if (req.file) {
            const newImage = new Image_1.Image({
                filename: req.file.filename,
                path: `images/${req.file.filename}`
            });
            await newImage.save();
            if (newImage.id !== undefined) {
                newMap.imageId = newImage?.id; //? causes the ts stop worrying if newImage.id is undefined
            }
        }
        if (req.body.campain !== undefined) {
            newMap.campain = req.body.campain;
        }
        if (req.body.tagcheckbox !== undefined) {
            console.log(req.body.tagcheckbox[0][0]);
            if (req.body.tagcheckbox[0][0] !== undefined) {
                for (let index = 0; index < req.body.tagcheckbox.length; index++) {
                    const newTag = new Tags_1.Tag({
                        name: req.body.tagcheckbox[index]
                    });
                    newMap.tags.push(newTag);
                }
            }
            else {
                console.log("got Here");
                const newTag = new Tags_1.Tag({
                    name: req.body.tagcheckbox
                });
                newMap.tags.push(newTag);
            }
        }
        let tagBuffer = ""; // the tags are parsed and seperated by whitespaces 
        for (let index = 0; index < req.body.tags.length; index++) {
            if (req.body.tags[index] == ' ') {
                const newTag = new Tags_1.Tag({
                    name: tagBuffer
                });
                newMap.tags.push(newTag);
                saveTagIfNew(newTag);
                tagBuffer = "";
            }
            else {
                tagBuffer += req.body.tags[index];
            }
        }
        if (tagBuffer.length >= 1) { // if there is a tag in the buffer, this saves it  
            const newTag = new Tags_1.Tag({
                name: tagBuffer
            });
            newMap.tags.push(newTag);
            saveTagIfNew(newTag);
        }
        console.log("New world map", newMap);
        await newMap.save();
        return res.status(201).json({ msg: `successful operation in upload world map` });
    }
    catch (error) {
        console.log(`Error while uploading world map: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.uploadWorldMap = uploadWorldMap;
const uploadLocationMap = async (req, res) => {
    try {
        let newMap = new Maps_1.LocationMap({
            name: req.body.name,
            description: req.body.description,
            tags: []
        });
        if (req.file) {
            const newImage = new Image_1.Image({
                filename: req.file.filename,
                path: `images/${req.file.filename}`
            });
            await newImage.save();
            if (newImage.id !== undefined) {
                newMap.imageId = newImage?.id; //? causes the ts stop worrying if newImage.id is undefined
            }
        }
        if (req.body.worldMapIDThisBelongsTo !== undefined) {
            newMap.worldMapIDThisBelongsTo = req.body.worldMapIDThisBelongsTo;
        }
        if (req.body.campain !== undefined) {
            newMap.campain = req.body.campain;
        }
        if (req.body.tagcheckbox !== undefined) {
            if (req.body.tagcheckboxHasMultiple == true) {
                for (let index = 0; index < req.body.tagcheckbox.length; index++) {
                    const newTag = new Tags_1.Tag({
                        name: req.body.tagcheckbox[index]
                    });
                    newMap.tags.push(newTag);
                }
            }
            else {
                const newTag = new Tags_1.Tag({
                    name: req.body.tagcheckbox
                });
                newMap.tags.push(newTag);
            }
        }
        let tagBuffer = ""; // the tags are parsed and seperated by whitespaces 
        for (let index = 0; index < req.body.tags.length; index++) {
            if (req.body.tags[index] == ' ') {
                const newTag = new Tags_1.Tag({
                    name: tagBuffer
                });
                newMap.tags.push(newTag);
                saveTagIfNew(newTag);
                tagBuffer = "";
            }
            else {
                tagBuffer += req.body.tags[index];
            }
        }
        if (tagBuffer.length >= 1) { // if there is a tag in the buffer, this saves it  
            const newTag = new Tags_1.Tag({
                name: tagBuffer
            });
            newMap.tags.push(newTag);
            saveTagIfNew(newTag);
        }
        console.log("New location map", newMap);
        await newMap.save();
        res.status(201).json({ msg: `successful operation in upload location map` }); // calling it a day :)
    }
    catch (error) {
        console.log(`Error while uploading location map: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.uploadLocationMap = uploadLocationMap;
