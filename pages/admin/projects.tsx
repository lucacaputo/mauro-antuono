import { NextPage } from "next";
import AddProjectForm from "../../components/admin/AddProjectForm";
import { useState } from 'react';

const Projects: NextPage = () => {
    return (
        <>
            <div className="container mainContainer">
                <h2 className="text-center py-5">Progetti</h2>
                <AddProjectForm onSubmit={null} />
            </div>
        </>
    );
}

export default Projects;