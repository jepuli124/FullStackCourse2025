import {Request, Response, Router} from "express"
import path from "path";
import upload from '../middleware/multer-config'
import { validateToken, validateTokenAdmin } from '../middleware/validate-config'
import { worldMapByName, locationMapByName, worldMapById, locationMapById, worldMapsWithoutImages, locationMapsWithoutImages, worldMapByTag, locationMapByTag, tags, uploadWorldMap, uploadLocationMap, uploadMap, worldMaps, locationMaps, mapById } from "./controllers/maps"
import { login, register, validateAdmin } from "./controllers/login";


const router: Router = Router()

function setup(){
    console.log("router is up and running")
    };

router.get('/api/worldMaps/name/:name', worldMapByName);

router.get('/api/locationMaps/name/:name', locationMapByName);

router.get('/api/map/id/:id', mapById);

router.get('/api/worldMaps/id/:id', worldMapById);

router.get('/api/locationMaps/id/:id', locationMapById);

router.get('/api/worldMaps', worldMaps);

router.get('/api/locationMaps', locationMaps);

router.get('/api/worldMapsNoImages', worldMapsWithoutImages);

router.get('/api/locationMapsNoImages', locationMapsWithoutImages);

router.get('/api/worldMaps/tags', worldMapByTag);

router.get('/api/locationMaps/tags', locationMapByTag);

router.get('/api/tags', tags);

router.post('/api/uploadMap', upload.single("image"), uploadMap);

router.post('/api/uploadLocationMap', upload.single("image"), uploadWorldMap);

router.post('/api/uploadWorldMap', upload.single("image"), uploadLocationMap);

router.get('/api/validateTokenAdmin', validateTokenAdmin, validateAdmin);

router.post('/api/register', register);

router.post('/api/login', login);

setup()

export default router