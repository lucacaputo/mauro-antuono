import FilePicker from "../../components/admin/FilePicker";
import FileChooser, { BaseFile } from "../../components/admin/FileChooser";
import { NextPage } from 'next';
import { API_BASE } from '../../helpers/index';
import useSWR from 'swr';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ImagesResponse = {
    ok: boolean,
    images: Array<{
        name: string,
        md5: string,
        __v: number,
    } & BaseFile>
};

const Images: NextPage = () => {
    const upload = async (files: File[]) => {
        const body = new FormData();
        files.forEach(f => body.append('images[]', f));
        await fetch(`${API_BASE}/projects/images`, {
            method: 'POST',
            body,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            }
        })
        .then(r => r.json())
        .then(r => {
            console.log(r);
            if (r.messages.length > 0) {
                (r.messages as string[]).forEach(m => toast(m, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }));
            }
            mutate();
        })
        .catch(err => console.log(err));
        return Promise.resolve();
    }
    const del = async (ids: string[]) => {
        const res = await fetch(`${API_BASE}/projects/images`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({ ids }),
        })
            .then(r => r.json())
            .catch(err => {
                toast(err, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        console.log(res);
        mutate();
    }
    const { data, error, mutate } = useSWR<ImagesResponse, any>(
        `${API_BASE}/projects/images`, 
        (input: RequestInfo, init: RequestInit) => fetch(input, init).then(r => r.json())
    );
    if (error) toast(error);
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={upload} 
                    allowedExtensions={['image/jpeg', 'image/png']} 
                    title='Carica le immagini'
                    subtitle='Oppure trascinale nello scatolo ostia'
                />
                <div className="mt-3">
                    <FileChooser 
                        actionText="Elimina" 
                        files={data?.images ?? []} 
                        withSelectedAction={del} 
                        responsive={[
                            {
                                breakpoint: 767,
                                perRow: 5,
                            },
                            {
                                breakpoint: 991,
                                perRow: 10,
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default Images;