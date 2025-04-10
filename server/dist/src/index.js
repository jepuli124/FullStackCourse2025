"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const validate_config_1 = require("../middleware/validate-config");
const maps_1 = require("./controllers/maps");
const login_1 = require("./controllers/login");
const markers_1 = require("./controllers/markers");
const tags_1 = require("./controllers/tags");
const router = (0, express_1.Router)();
function setup() {
    console.log("router is up and running");
}
;
router.get('/api/worldMaps/name/:name', maps_1.worldMapByName);
router.get('/api/locationMaps/name/:name', maps_1.locationMapByName);
router.get('/api/map/id/:id', maps_1.mapById);
router.get('/api/worldMaps/id/:id', maps_1.worldMapById);
router.get('/api/locationMaps/id/:id', maps_1.locationMapById);
router.get('/api/worldMaps', maps_1.worldMaps);
router.get('/api/locationMaps', maps_1.locationMaps);
router.get('/api/worldMapsNoImages', maps_1.worldMapsWithoutImages);
router.get('/api/locationMapsNoImages', maps_1.locationMapsWithoutImages);
router.get('/api/worldMaps/tags/:id', maps_1.worldMapByTag);
router.get('/api/locationMaps/tags/:id', maps_1.locationMapByTag);
router.get('/api/maps/markers/:id', markers_1.markersByMapId);
router.get('/api/tags', tags_1.tags);
router.post('/api/uploadMap', multer_config_1.default.single("image"), maps_1.uploadMap);
router.post('/api/uploadLocationMap', multer_config_1.default.single("image"), maps_1.uploadWorldMap);
router.post('/api/uploadWorldMap', multer_config_1.default.single("image"), maps_1.uploadLocationMap);
router.post('/api/marker', markers_1.uploadMarker);
router.get('/api/validateTokenAdmin', validate_config_1.validateTokenAdmin, login_1.validateAdmin);
router.post('/api/register', login_1.register);
router.post('/api/login', login_1.login);
setup();
exports.default = router;
