export const badRequest=(res,message,code)=>{
    let c = 400;
    if(code){
        c = code;
    }
    let m = {
        tm:"Yalnyshlyk yuze cykdy",
        en: "Something went wrong"
    }
    if(message){
        m = message;
    }
    res.status(c).json(m);
    res.end();
}

export const responseMessage=(tm,en)=>{
    return{
        tm: tm,
        en: en
    }
}