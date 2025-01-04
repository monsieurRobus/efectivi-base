import { httpGet,httpPost, httpPatch, httpPut } from "@/utils/httpCalls";

export const getAllEvents = async ()=>{
    return await httpGet(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/events`);
}

export const getEventById = async (id:string)=>{
    return await httpGet(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/events/${id}?populate=*`);
}

export const setEventTime = async (id:string, time:string)=>{

    
    const timeParsed = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    timeParsed.setHours(hours);
    timeParsed.setMinutes(minutes);
    timeParsed.setSeconds(0);
    const data = {
        data: {
            Time: timeParsed.toTimeString().substring(0,8)
        }
    }
    return await httpPut(`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API}/events/${id}`,data);
}