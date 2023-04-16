import express from 'express';
import {addBanner} from "./banner.service.mjs";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/banner')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split('.').reverse()[0];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+"."+extension)
    }
})

const upload = multer({ storage: storage })

const bannerController = express.Router();

bannerController.post('/add-banner',upload.fields([
    {name:'image_tm',maxCount:1},
    {name:'image_ru',maxCount:1},
    {name:'image_en',maxCount:1}
]),addBanner);



export default bannerController;