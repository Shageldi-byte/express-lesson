import express from 'express';
import {addMultipleCategories, getMultipleQuery, getWithAwait} from "./multiple.service.mjs";

const multipleQueryRouter = express.Router();

multipleQueryRouter.get('/multiple-query',getMultipleQuery);
multipleQueryRouter.get('/get-async',getWithAwait);
multipleQueryRouter.post('/add-multiple-category',addMultipleCategories)

export default multipleQueryRouter;