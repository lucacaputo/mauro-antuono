import { NextPage } from "next";
import FilePicker from "../../components/admin/FilePicker";

const Pdfs: NextPage = () => {
    
    return (
        <>
            <div className="container mainContainer" style={{ perspective: 200 }}>
                <FilePicker allowedExtensions={['application/pdf']} />
            </div>
        </>
    );
}

export default Pdfs;
