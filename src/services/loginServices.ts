import { httpPostLogin } from "../utils/httpCalls"

export interface LoginCredentials {
    email: string;
    password: string;
    remember: boolean;
}

export const loginService = async ({email,password,remember}:LoginCredentials)=>{
    const value = {
        identifier: email,
        password: password,
        remember: remember
    }

    return await httpPostLogin(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/auth/local`,value);
    
} 