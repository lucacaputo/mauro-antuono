export const API_BASE = "https://api.mariolongobardi.it";
import useSWR from 'swr';
import { EditProjectFormState } from '../components/admin/ProjectCard';

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

export const fetchHomeSection = async (section: string, callback: Function) => {
    await fetch(`${API_BASE}/homepage`)
        .then(r => r.json())
        .then(r => {
            if (r.hasOwnProperty(section)) callback(r[section]);
            else throw new Error('response doesn\'t container correct fields\n' + JSON.stringify(r));
        })
        .catch(err => console.log(err));
}

export const getScale = (scale: number) => {
    const scales = ['Unifamiliare', 'Stabile residenziale', 'Complesso residenziale', 'Masterplan'];
    return scales[scale - 1] || null;
}

export const toHumanDate = (d: string | Date) => {
    if (!(d instanceof Date)) d = new Date(d);
    return `${d.getDate().toString().padStart(2, '0')}/${d.getMonth().toString().padStart(2, '0')}/${d.getFullYear()}`;
}

export const toDate = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const editProject = async (
    project: EditProjectFormState, 
    callback: () => void, 
    pid: string, 
    errorCallback?: (message: string) => void
) => {
    const res = await fetch(`${API_BASE}/projects/projects`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            ...project,
            _id: pid,
        })
    })
    .then(r => r.json())
    .then(r => {
        if (r.ok) {
            callback();
        } else {
            errorCallback && errorCallback(r.error);
            if (!errorCallback) throw new Error('request failed');
        }
    })
    .catch(console.log);
}
export const deleteProject = async (_id: string, callback: () => void, callbackError?: (msg: string) => void) => {
    await fetch(`${API_BASE}/projects/projects`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({ _id }),
    })
    .then(res => res.json())
    .then(res => {
        if (res.ok) callback()
        else {
            callbackError && callbackError(res.error);
            if (!callbackError) {
                throw new Error('request failed');
            }
        }
    })
    .catch(console.log);
}