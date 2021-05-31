import FilePicker from "../../components/admin/FilePicker";
import { NextPage } from 'next';

const Images: NextPage = () => {
    return (
        <>
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={f => null} 
                    allowedExtensions={['image/jpeg', 'image/png']} 
                    title='Carica le immagini'
                    subtitle='Oppure trascinale nello scatolo ostia'
                />
            </div>
        </>
    );
}

export default Images;