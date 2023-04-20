import authController from "./auth/auth.controller.mjs";
import bannerController from "./banner/banner.controller.mjs";
import brandController from "./brand/brand.controller.mjs";
import categoryController from "./category/controller/category.controller.mjs";
import express from "express";
import homeController from "./home/home.controller.mjs";
import mailController from "./mailer/mailer.controller.mjs";
import multipleController from "./multiple/multiple.controller.mjs";
import parseController from "./parse/parse.controller.mjs";
import productController from "./product/controller/product.controller.mjs";
import userController from "./user/controller/user.controller.mjs";

const router = express.Router();
router.use('/product',productController);
router.use('/user',userController);
router.use('/category',categoryController);
router.use('/multiple',multipleController);
router.use('/brand',brandController);
router.use('/banner',bannerController);
router.use('/home',homeController);
router.use('/auth',authController);
router.use('/parse',parseController);
router.use('/mailer',mailController);

export default router;
