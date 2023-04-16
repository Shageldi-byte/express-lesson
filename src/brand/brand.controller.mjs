import express from 'express';
import {addBrand, getAllBrands} from "./brand.service.mjs";
import multer from 'multer';

export let supportedExtensions = ['png', 'jpg', 'gif'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split('.').reverse()[0];
        req.extension = extension;
        // if(supportedExtensions.indexOf(extension)!=-1) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
        // } else {
        //     cb(new Error('I don\'t have a clue!'))
        // }
    }
})

const upload = multer({ storage: storage })

const brandController = express.Router();

brandController.post('/add-brand',upload.any(),addBrand);
brandController.get('/get-brands',getAllBrands);
export default brandController;