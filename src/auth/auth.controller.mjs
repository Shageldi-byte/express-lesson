import express from "express";
import { getMe, login, signIn, signUp } from "./auth.service.mjs";
import { authenticateToken } from "./jwt.service.mjs";

const authController = express.Router();

authController.post('/login',login);

authController.post('/sign-up',signUp);
authController.post('/sign-in',signIn);
authController.get('/get-me',authenticateToken,getMe);

export default authController;