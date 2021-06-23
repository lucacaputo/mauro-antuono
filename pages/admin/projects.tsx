import { NextPage } from "next";
import AddProjectForm, { FormType } from "../../components/admin/AddProjectForm";
import useSWR from "swr";
import { API_BASE } from '../../helpers/index';
import { ToastContainer, toast } from "react-toastify";

const Projects: NextPage = () => {
    const { data, error, isValidating, mutate } = useSWR(`${API_BASE}/projects/projects`);
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
    console.log(data);
    return (
        <>
            <div className="container mainContainer">
                <h2 className="text-center py-5">Progetti</h2>
                <AddProjectForm onSubmit={submit} />
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