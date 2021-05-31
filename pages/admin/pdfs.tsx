import { NextPage } from "next";
import FilePicker from "../../components/admin/FilePicker";

const Pdfs: NextPage = () => {
    
    return (
        <>
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker 
                    onUpload={f => null} 
                    allowedExtensions={['application/pdf']} 
                    title="Carica i PDF"
                    subtitle="Oppure trascinali nello scatolo ostia"
                />
            </div>
        </>
    );
}

export default Pdfs;