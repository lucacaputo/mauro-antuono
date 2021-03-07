import { Project as ProjectType } from "../pages/progetti";
import Project from "./Project";
import styles from "../styles/projectcolumn.module.css";
import { createPortal } from "react-dom"
import { useState, useEffect } from 'react';
import { motion, Variants } from "framer-motion";

type ColumnProps = {
    title: string,
    projects: ProjectType[]
}

const ProjectColumn: React.FC<ColumnProps> = ({ title, projects }) => {

    const [parent, setParent] = useState<Element | null>(null);
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
    }, [parent, projects]);

    const colVar: Variants = {
        initial: {
            y: -25,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                when: "beforeChildren"
            }
        },
        exit: {
            y: 25,
            opacity: 0,
            transition: {
                when: "afterChildren"
            }
        },
    }
    
    return parent !== null ? createPortal(
        <motion.div 
            className={styles.col}
            variants={colVar}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
        >
            {
                projects.map((el, i) => (
                    <Project project={el} key={`prj-${title}-${i}`} />
                ))
            }
            <div className={styles.title}>
                {title}
            </div>
        </motion.div>,
        parent
    ) : null;
}

export default ProjectColumn;