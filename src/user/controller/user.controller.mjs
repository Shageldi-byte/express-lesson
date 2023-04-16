import express from "express";
import {addUser, getAllUsers} from "../service/user.service.mjs";
import AppJoiMiddleware from "../../core/joi.middleware.mjs";
import {userSchema} from "../../schema/app.schema.mjs";

const userController = express.Router();
userController.post('/add-user',AppJoiMiddleware(userSchema),addUser);

export default userController;