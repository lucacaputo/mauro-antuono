export const API_BASE = "http://localhost:8080";
import useSWR from 'swr';

export const clamp = (num: number, hi: number, lo: number) => {
    if (num > hi) return hi;
    if (num < lo) return lo;
    return num;
}

export const alternativeFetcher = (res: RequestInfo, init?: RequestInit) => fetch(res, {
    ...init,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    }
}).then(r => {
    if (r.status === 404) throw new Error('User not found');
    if (r.status === 500) throw new Error('Server error');
    return r.json();
});

export const useAuth = () => {
    const { data, error, isValidating, mutate } = useSWR(
        `${API_BASE}/auth/checkLogin`,
        alternativeFetcher,
        { revalidateOnFocus: false },
    );
    return  {
        loading: (!error && !data) || isValidating,
        error,
        userData: data,
        mutate,
    }
}

export const submitHomeChanges = async (
    data: {
        esperienze: string,
        contatti: string,
        formazione: string,
        interessi: string,
        competenze: string,
        _id?: string,
    }
) => {
    console.log(data);
    return await fetch(`${API_BASE}/homepage`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-type': 'Application/json',
        }
    })
    .then(r => r.json())
    .catch(err => { throw new Error(`fetch failed\n${err}`) })
} 