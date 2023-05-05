import axios from "axios";
import format from "pg-format";
import jsdom from "jsdom";
import { downloadFile } from "../core/utils.mjs";
import { db } from "../database/connection.mjs";
import { addNewsQuery } from "../database/query.mjs";
import { badRequest } from "../exception/app.exception.mjs";

const { JSDOM } = jsdom; 

const sites = [
    'site:100haryt.com',
    'site:salamnews.tm',
    'site:ynamdar.com',
    'site:gerekli.tm',
    'site:bazar.com.tm',
    'site:saray.tm',
    'site:tmcars.info',
]


export async function searchFromGoogle(req,res){
    const text = req.query.text;
    const start = req.query.start;
    const searchText = `https://www.google.com/search?q=${text} ${sites.join(' OR ')}&start=${start}&sxsrf=APwXEdffmnglt--dOy-jMjwoyHMtOeZWQQ:1683308673695&ei=gUBVZJiHKqut0PEPkK2OkAI&sa=N&ved=2ahUKEwjYy6u83d7-AhWrFjQIHZCWAyIQ8tMDegQIBBAE&cshid=1683308681943278&biw=1536&bih=746&dpr=1.25`;

    const searchResult = await axios.get(searchText);
    //BVG0Nb
    const dom = new JSDOM(searchResult.data); 
    let list = dom.window.document.getElementsByClassName('BVG0Nb');
    let images=[];
    for(let i=0; i<list.length; i++){
        let image = list[i].href.split('imgurl=')[1].split('&imgrefurl=')[0];
        images.push(image);
    }
    let links = dom.window.document.getElementsByClassName('Gx5Zad');
    let items = [];
    for(let i=0; i<links.length; i++){
        let link = links[i].getElementsByTagName('a')[0].href.replace('/url?q=','');
        let title = '';
        let desc = '';
        let more = '';

        try{
          more = links[i].getElementsByClassName('s3v9rd')[1].textContent;
        } catch(err){}

        try{
           title =  links[i].getElementsByTagName('h3')[0].textContent;
           
        } catch(err){}
        try{
           desc =  links[i].getElementsByClassName('lRVwie')[0].textContent;
        }catch(err){}
        console.log(title);
        items.push({
            link,
            title,
            desc,
            more
        })
    }

    res.json({
        images,
        items
    });
}


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