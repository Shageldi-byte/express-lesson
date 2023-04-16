export function successResponse(tm,en){
    let message = {
        tm: 'Ustinlikli tamamlandy',
        en: 'Successfully completed'
    }
    if(tm){
        message.tm = tm;
    }
    if(en){
        message.en = en;
    }
    return message;
}

export function responseGenerator(body,message,error){
    let m = successResponse('Ustinlikli tamamlandy','Successfully completed');
    if(message){
        m = message;
    }
    let err = false;
    if(error){
        err = error;
    }
    return{
        error: err,
        message: m,
        body: body
    }
}