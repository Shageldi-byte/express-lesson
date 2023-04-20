import express from "express";
import { sendEmail } from "./mailer.service.mjs";

const mailController = express.Router();

mailController.post('/send-mail',sendEmail);

export default mailController;