import { NextPage } from "next";
import AddProjectForm, { FormType } from "../../components/admin/AddProjectForm";
import useSWR from "swr";
import { API_BASE } from '../../helpers/index';
import { ToastContainer, toast } from "react-toastify";
import ProjectCard from "../../components/admin/ProjectCard";

interface API<T> {
    [k: string]: T[],
}

type APIResponse<T> = { ok: boolean } & API<T>

export type ImageObject = {
    md5: string,
    name: string,
    url: string,
    __v: number,
    _id: string,
}

export type PdfObject = {
    md5: string,
    name: string,
    thumbnail: string,
    url: string,
    __v: number,
    _id: string,
}

type ProjectsApiResponse = {
    data: string,
    img_details: ImageObject[],
    immagini: string[],
    luogo: string,
    pdf_details: PdfObject[],
    pdfs: string[],
    scala: number,
    thumbnail: string,
    titolo: string,
    __v: number,
    _id: string
}

const Projects: NextPage = () => {
    const { data, error, isValidating, mutate } = useSWR<APIResponse<ProjectsApiResponse>, any>(`${API_BASE}/projects/projects`);
    const { data: pdfData, error: pdfError, isValidating: pdfValidating } = useSWR<APIResponse<PdfObject>, any>(`${API_BASE}/projects/pdfs`);
    const { data: imageData, error: imageError, isValidating: imageValidating } = useSWR<APIResponse<ImageObject>, any>(`${API_BASE}/projects/images`);
    const loading = (!data && !error) || isValidating;
    const submit = (data: FormType) => {
        fetch(`${API_BASE}/projects/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })
        .then(r => r.json())
        .then(r => {
            if (r.ok) {
                console.log('done', r.project);
                mutate();
            } else {
                toast.error(r.error, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Something went wrong, retry', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
    return (
        <>
            <div className="container mainContainer">
                <h2 className="text-center py-5">Progetti</h2>
                <AddProjectForm onSubmit={submit} />
                {
                    !loading && data.projects.length > 0 && 
                    <div className="mt-4">
                        <div className="row">
                            {
                                data.projects.map(p => (
                                    <div className="col-lg-4 col-md-6 col-12 mb-2" key={p._id}>
                                        <ProjectCard allImages={imageData?.images} allPdfs={pdfData?.pdfs} {...p} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default Projects;