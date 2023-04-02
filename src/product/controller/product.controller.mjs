import express from "express";
import { addProduct, getAllProducts } from "../service/product.service.mjs";

const productController = express.Router();

productController.get('/get-all-products',getAllProducts);
productController.post('/add-product',addProduct);  

export default productController;