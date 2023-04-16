import express from "express";
import { checkAddCategory, isHasSubCategory, logStuff } from "../middleware/category.middleware.mjs";
import { addCategory, deleteCategory, getAllCategory, updateCategory } from "../service/category.service.mjs";

const categoryController = express.Router();



categoryController.get('/get-all-category',getAllCategory);
categoryController.post('/add-category',logStuff,checkAddCategory,addCategory);
categoryController.delete('/delete-category/:id',isHasSubCategory,deleteCategory);
categoryController.put('/update-category/:id',updateCategory);
export default categoryController;