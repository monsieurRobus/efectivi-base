import { httpGet } from "@/utils/httpCalls";

export const getAllEvents = async ()=>{
    return await httpGet(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/events`);
}

export const getEventById = async (id:string)=>{
    return await httpGet(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/events/${id}?populate=*`);
}