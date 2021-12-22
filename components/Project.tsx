import { Project as ProjectType } from '../pages/progetti';
import styles from "../styles/project.module.css";
import Tooltip from '@material-ui/core/Tooltip';
import { API_BASE } from '../helpers';
import Link from "next/link";

type ProjectProps = {
    project: ProjectType,
    order: number,
}

const Project: React.FC<ProjectProps> = ({ project, order }) => {
    const { titolo, thumbnail, _id } = project;
    const thumbUrl = project.img_details.find(d => d._id === thumbnail).url || null;
    return (
        // <Tooltip title={titolo} placement="top" arrow>
            <div
                className={styles.project}
            >
                <Link href={`progetti/${_id}?o=${order}`}>
                    <a>
                        <img src={`${API_BASE}/${thumbUrl.replace(/\\/gm, '/')}`} alt={`preview ${titolo}`}/>
                    </a>
                </Link>
            </div>
        // </Tooltip>
    );
}

export default Project;