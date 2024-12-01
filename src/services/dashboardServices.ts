import { httpGet } from "../utils/httpCalls";

export const getDashboardData = async ()=>{
    return await httpGet(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/base-dashboard`);
}