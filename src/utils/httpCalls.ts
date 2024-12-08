import { getCookie } from "./tools";


export const httpGet = async (url: string) => {
    const token = getCookie('token');
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 2b2d2fb43d34cd963a0d17d1c0e03568cdf78c3b6164875d382af43443a49aefe77fea4f11db04a01301619d6e8446a9569b03a9d9e97306d751a766fa4bc2bdbb5e60b3eca78b669142f50a9286c9066cc40ebc230afe88bb43c54e60191a2a29f1092af764aab277cdc2d4f03dba9d167944efd0551caa3c0d8a706fc6ed98`
            },
        }
    );
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

export const httpPatch = async (url: string, data: any) => {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)}
    );
    return response.json();

}

export const httpPut = async (url: string, data: any) => {
    const token = getCookie('token');
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}