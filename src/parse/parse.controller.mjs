import express from "express";
import { parseTmCars, searchFromGoogle } from "./parse.service.mjs";

const parseController = express.Router();

parseController.get('/get-news-from-tmcars',parseTmCars);
parseController.get('/search-from-google',searchFromGoogle);
export default parseController;