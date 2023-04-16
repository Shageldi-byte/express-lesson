import axios from "axios";
import format from "pg-format";
import jsdom from "jsdom";
import { downloadFile } from "../core/utils.mjs";
import { db } from "../database/connection.mjs";
import { addNewsQuery } from "../database/query.mjs";
import { badRequest } from "../exception/app.exception.mjs";

const { JSDOM } = jsdom; 


export async function parseTmCars(req,res){
    await axios.get(`https://tmcars.info/tm/posts/habarlar?offset=40&max=40`)
    .then(async response=>{
        let result=[];
        const dom = new JSDOM(response.data); 
        
        let pageCount = dom.window.document.getElementsByClassName('page-link');
        let count = pageCount[pageCount.length-2].textContent;

       
        console.log(count);
        result=getItems(dom)
        let page = 0;
        for(let i=1;i<=4;i++){
            page+=40;
            await axios.get(`https://tmcars.info/tm/posts/habarlar?offset=${page}&max=40`)
            .then(response2=>{
                const d2 = new JSDOM(response2.data); 
                result=[
                    ...result,
                    ...getItems(d2)
                ]
            })
            .catch(err=>{
                console.log(err);
            })
        }

        let insertValues = [];

        insertValues=result.map(item=> [item.image,item.title,item.description,item.time]);

        await db.query(format(addNewsQuery,insertValues))
        .then(resultInsert=>{

        })
        
        

        res.send({
            size:result.length,
            result
        });
    })
    .catch(err=>{
        console.log(err);
        badRequest(res,err);
    })
}

function getItems(dom){
    let result=[];
    let list = dom.window.document.getElementsByClassName('blog-list');
        for(let i=0;i<list.length;i++){
            let image = list[i].getElementsByClassName('cover-image')[0].src;
            downloadFile(image,`public/news/${image.split('/').reverse()[0]}`)
            let title = list[i].getElementsByClassName('text-dark')[0].textContent;
            let description = list[i].getElementsByTagName('p')[0].textContent;
            let time = list[i].getElementsByTagName('time')[0].textContent;
            result.push({
                image,
                title,
                description,
                time
            })
        }
        return result;
}