"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarker = exports.editMarker = exports.uploadMarker = exports.markersByMapId = void 0;
const Marker_1 = require("../models/Marker");
const markersByMapId = async (req, res) => {
    try {
        const markers = await Marker_1.Marker.find({ mapThisBelongsTo: req.params["id"] });
        if (!markers) {
            return res.status(404).json({ msg: "Markers not found" });
        }
        return res.status(200).json(markers);
    }
    catch (error) {
        console.log(`Error while fetching tags: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.markersByMapId = markersByMapId;
const uploadMarker = async (req, res) => {
    try {
        let newMarker = new Marker_1.Marker({
            name: req.body.name,
            x: req.body.x,
            y: req.body.y,
            color: req.body.color,
            symbol: req.body.symbol,
            mapThisBelongsTo: req.body.mapThisBelongsTo,
            linkToAnotherMap: req.body.linkToAnotherMap
        });
        await newMarker.save();
        return res.status(201).json({ msg: `successful operation in upload map marker` });
    }
    catch (error) {
        console.log(`Error while uploading location map: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.uploadMarker = uploadMarker;
const editMarker = async (req, res) => {
    try {
        const marker = await Marker_1.Marker.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            x: req.body.x,
            y: req.body.y,
            color: req.body.color,
            symbol: req.body.symbol,
            mapThisBelongsTo: req.body.mapThisBelongsTo,
            linkToAnotherMap: req.body.linkToAnotherMap
        });
        return res.status(201).json({ msg: `successful operation in updating marker` });
    }
    catch (error) {
        console.log(`Error while uploading location map: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.editMarker = editMarker;
const deleteMarker = async (req, res) => {
    try {
        await Marker_1.Marker.deleteOne({ _id: req.params.id });
        return res.status(201).json({ msg: `successfully deleted marker` });
    }
    catch (error) {
        console.log(`Error while uploading location map: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteMarker = deleteMarker;
