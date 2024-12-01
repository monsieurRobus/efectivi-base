export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    console.log('Document cookie:', document.cookie); // Depuración
    const parts = value.split(`; ${name}=`);
    console.log('Parts after split:', parts); // Depuración
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift() || null;
        console.log('Cookie value:', cookieValue); // Depuración
        return cookieValue;
    }
    return null;
}

export const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}