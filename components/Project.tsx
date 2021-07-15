import { motion } from 'framer-motion';
import { Project as ProjectType } from '../pages/progetti';
import styles from "../styles/project.module.css";
import Tooltip from '@material-ui/core/Tooltip';

type ProjectProps = {
    project: ProjectType,
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const { image, title } = project;
    return (
        <Tooltip title={title} placement="top" arrow>
            <motion.div
                className={styles.project}
                layout
            >
                <img src={image} alt={title}/>
            </motion.div>
        </Tooltip>
    );
}

export default Project;