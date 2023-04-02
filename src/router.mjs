import express from "express";
import productController from "./product/controller/product.controller.mjs";
import userController from "./user/controller/user.controller.mjs";

const router = express.Router();
router.use('/product',productController);
router.use('/user',userController);

export default router;
