import express from "express";
import { addProduct, getAllProducts, getProductOptions } from "../service/product.service.mjs";

const productController = express.Router();

productController.post('/get-all-products',getAllProducts);
productController.get('/get-product-options',getProductOptions);
productController.post('/add-product',addProduct);  


export default productController;