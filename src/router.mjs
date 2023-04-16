import categoryController from "./category/controller/category.controller.mjs";
import express from "express";
import productController from "./product/controller/product.controller.mjs";
import userController from "./user/controller/user.controller.mjs";
import multipleController from "./multiple/multiple.controller.mjs";
import brandController from "./brand/brand.controller.mjs";
import bannerController from "./banner/banner.controller.mjs";
import homeController from "./home/home.controller.mjs";

const router = express.Router();
router.use('/product',productController);
router.use('/user',userController);
router.use('/category',categoryController);
router.use('/multiple',multipleController);
router.use('/brand',brandController);
router.use('/banner',bannerController);
router.use('/home',homeController);

export default router;
