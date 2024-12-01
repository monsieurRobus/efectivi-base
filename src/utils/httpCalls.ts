import { getCookie } from "./tools";


export const httpGet = async (url: string) => {
    const response = await fetch(url);
    return response.json();
}

export const httpPostLogin = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const httpPost = async (url: string, data: any) => {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}