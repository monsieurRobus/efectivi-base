import { httpPostLogin } from "../utils/httpCalls"

export const login = async ({email,password,remember})=>{
    const value = {
        identifier: email,
        password: password,
        remember: remember
    }

    return await httpPostLogin(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/auth/local`,value);
    
} 