import { motion, Variants } from 'framer-motion';
import { Project as ProjectType } from '../pages/progetti';
import styles from "../styles/project.module.css";

type ProjectProps = {
    project: ProjectType,
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const { image, title } = project;
    const projectVar: Variants = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.3
        }
    }
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={projectVar}
            className={styles.project}
            layout
        >
            <img src={image} alt={title}/>
            <span 
                className={styles.tooltip}
            >
                { title.toUpperCase() }
            </span>
        </motion.div>
    );
}

export default Project;