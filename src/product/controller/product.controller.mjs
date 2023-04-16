import express from "express";
import { authenticateToken, authenticateTokenOptional } from "../../auth/jwt.service.mjs";
import { addProduct, getAllProducts, getProductOptions } from "../service/product.service.mjs";

const productController = express.Router();

productController.post('/get-all-products',authenticateTokenOptional,getAllProducts);
productController.get('/get-product-options',getProductOptions);
productController.post('/add-product',authenticateToken,addProduct);  


export default productController;