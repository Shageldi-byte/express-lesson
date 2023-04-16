import express from "express";
import {getHome} from "./home.service.mjs";

const homeController = express.Router();

homeController.get('/get-home',getHome);

export default homeController;