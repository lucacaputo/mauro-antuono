import { NextPage } from "next";
import FileChooser from "../../components/admin/FileChooser";
import FilePicker from "../../components/admin/FilePicker";

const Pdfs: NextPage = () => {
    
    return (
        <>
            <FileChooser selectedAction={s => null} staticFetchPath="/projects/pdfs" />
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
