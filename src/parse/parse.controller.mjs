import express from "express";
import { parseTmCars } from "./parse.service.mjs";

const parseController = express.Router();

parseController.get('/get-news-from-tmcars',parseTmCars);

export default parseController;