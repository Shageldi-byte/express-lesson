import express from "express";
import { getMe, login } from "./auth.service.mjs";
import { authenticateToken } from "./jwt.service.mjs";

const authController = express.Router();

authController.post('/login',login);
authController.get('/get-me',authenticateToken,getMe);

export default authController;