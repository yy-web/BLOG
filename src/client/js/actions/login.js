import * as switchs from '../constant/login';

export function login(){
    return{
        type:switchs.LOGIN
    }
}

export function reg(message){
    return{
        type:switchs.REG,
        message
    }
}
export function close(message){
    return{
        type:switchs.CLOSE,
        message
    }
}