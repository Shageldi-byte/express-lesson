import express from "express";
import { getAllUsers } from "../service/user.service.mjs";

const userController = express.Router();
userController.get('/get-all-users',getAllUsers);

export default userController;