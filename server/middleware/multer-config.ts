import multer, {StorageEngine, Multer} from "multer";
import path from 'path'
import {v4 as uuidv4} from 'uuid' //https://www.uuidgenerator.net/dev-corner/typescript


const storage: StorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images')
    },
    filename: function(req, file, cb){
        cb(null, path.parse(file.originalname).name + '_'  + uuidv4() + path.extname(file.originalname))
    }//https://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
    })

    const upload: Multer = multer({ storage: storage})
    export default upload