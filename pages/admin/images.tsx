import FilePicker from "../../components/admin/FilePicker";
import { NextPage } from 'next';
import { API_BASE } from '../../helpers/index';
import FileChooser from "../../components/admin/FileChooser";

const Images: NextPage = () => {
    const upload = (files: File[]) => {
        const body = new FormData();
        files.forEach(f => body.append('images[]', f));
        fetch(`${API_BASE}/projects/images`, {
            method: 'POST',
            body,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            }
        })
        .then(r => r.json())
        .then(r => console.log(r))
        .catch(err => console.log(err));
    }
    return (
        <>
            <FileChooser selectedAction={f => null} staticFetchPath='/projects/images' />
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={upload} 
                    allowedExtensions={['image/jpeg', 'image/png']} 
                    title='Carica le immagini'
                    subtitle='Oppure trascinale nello scatolo ostia'
                />
            </div>
        </>
    );
}

export default Images;