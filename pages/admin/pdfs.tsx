import { NextPage } from "next";
import FilePicker from "../../components/admin/FilePicker";
import { API_BASE } from '../../helpers/index';
import useSWR from 'swr';

const Pdfs: NextPage = () => {
    const upload = async (files: File[]) => {
        const body = new FormData();
        files.forEach(f => body.append('pdfs[]', f));
        await fetch(`${API_BASE}/projects/pdfs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            },
            body,
        })
        .then(res => res.text())
        .then(data => {
            console.log('data', data);
            mutate();
        })
        .catch(err => {
            console.log('error', err);
        })
    }
    const { data, error, mutate } = useSWR(`${API_BASE}/projects/pdfs`, (inp: RequestInfo, init: RequestInit) => fetch(inp, init).then(r => r.json()));
    console.log('data from swr', data);
    console.log('error from swr', error);
    return (
        <>
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={upload} 
                    allowedExtensions={['application/pdf']} 
                    title="Carica i PDF"
                    subtitle="Oppure trascinali nello scatolo ostia"
                />
            </div>
        </>
    );
}

export default Pdfs;
