import { motion, Variants } from 'framer-motion';
import styles from "../styles/project.module.css";

type ProjectProps = {
    title: string,
    image: string,
    lid: string,
}

const Project: React.FC<ProjectProps> = ({ title, image, lid }) => {
    const projectVar: Variants = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.3
        }
    }
    const spanVar: Variants = {
        initial: {
            scale: .5,
            opacity: 0,
            x: "-50%",
            y: "0%",
        },
        hover: {
            scale: 1,
            opacity: 1,
            x: "-50%",
            y: "calc(-100% - 10px)",
        }
    }
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={projectVar}
            className={styles.project}
        >
            <img src={image} alt={title}/>
            <motion.span 
                className={styles.tooltip}
                variants={spanVar}
            >
                { title.toUpperCase() }
            </motion.span>
        </motion.div>
    );
}

export default Project;