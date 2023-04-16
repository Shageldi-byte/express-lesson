import { responseGenerator, successResponse } from "../../core/app.response.mjs";
import { db } from "../../database/connection.mjs";
import { addCategoryQuery, deleteCategoryQuery, getAllCategoryQuery, updateCategoryQuery } from "../../database/query.mjs";
import { badRequest } from "../../exception/app.exception.mjs";

export const getAllCategory=(req,res)=>{
    db.query(getAllCategoryQuery)
    .then(result=>{
        res.json(result.rows);
    })
    .catch(err=>{
        res.send('Something went wrong');
    })
}

export const addCategory=(req,res)=>{
    console.log(req.isSuccess);
    const {
        name_tm,
        name_ru
    } = req.body;
    db.query(addCategoryQuery,[name_tm,name_ru])
    .then(result=>{
        if(result.rows.length){
            res.json(result.rows[0]);
        } else {
            res.send('Can not add category');
        }
    })
    .catch(err=>{res.send('Something went wrong');})
}

export const deleteCategory = (req,res)=>{
    const id = req.params.id;
    
    db.query(deleteCategoryQuery,[id])
    .then(result=>{
        res.json(successResponse());
    })
    .catch(err=>{
        badRequest(res);
    });
}

export const updateCategory = (req, res) => {
    const id = req.params.id;
    const {
        name_tm,
        name_ru
    } = req.body;

    db.query(updateCategoryQuery,[name_tm, name_ru,id])
    .then(result=>{
        if(result.rows.length){
            res.json(responseGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}