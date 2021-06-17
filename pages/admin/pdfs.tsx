import { NextPage } from "next";
import FilePicker from "../../components/admin/FilePicker";
import { API_BASE } from '../../helpers/index';
import useSWR from 'swr';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FileChooser from "../../components/admin/FileChooser";

export type PDFResponse = {
    ok: boolean,
    error?: any,
    pdfs?: {
        md5: string,
        thumbnail: string,
        url: string,
        name: string,
        __v: number,
        _id: string,
    }[],
}

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
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                mutate();
            } else {
                console.log(data);
            }
        })
        .catch(err => {
            console.log('error', err);
        })
    }
    const { data, error, mutate, isValidating } = useSWR<PDFResponse, any>(`${API_BASE}/projects/pdfs`, (inp: RequestInfo, init: RequestInit) => fetch(inp, init).then(r => r.json()));
    const loading = (!data && !error) || isValidating;
    return (
        <>
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={upload} 
                    allowedExtensions={['application/pdf']} 
                    title="Carica i PDF"
                    subtitle="Oppure trascinali nello scatolo ostia"
                />
                <div className="mt-3">
                    {
                        loading &&
                        <div style={{ paddingLeft: 75 }} className="d-flex justify-content-center align-items-center">
                            <AiOutlineLoading3Quarters size={25} color="#141414" className="loader" />
                        </div>
                    }
                    {
                        !loading &&
                        <FileChooser 
                            files={data.pdfs!.map(e => ({ ...e, url: e.thumbnail }))}
                            withSelectedAction={null}
                            actionText="fottiti"
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default Pdfs;
