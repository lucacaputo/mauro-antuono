import { motion, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import Plus from "./Plus";
import styles from "../styles/projectlinks.module.css";

type ProjectLinkProps = {
    links: {
        text: string,
        action: () => void,
        orderNum: number,
    }[],
    currentOrdering: number,
}

const ProjectLinks: React.FC<ProjectLinkProps> = ({ links, currentOrdering }) => {

    const [parent, setParent] = useState<Element | null>(null);
    useEffect(() => {
        setParent(document.querySelector("#appendProjectLinks"));
    }, [parent]);
    
    const ulVar: Variants = {
        initial: {
            scale: .9,
            opacity: 0,
        },
        loaded: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: .9,
        }
    }

    return parent !== null ? createPortal(
        <motion.ul
            variants={ulVar}
            initial="initial"
            animate="loaded"
            exit="exit"
            className="projectLinks"
        >
            {
                links.map(link => (
                    <motion.li 
                        key={link.text}
                        onClick={link.action}
                    >
                        <span>
                            { link.text }
                        </span>
                        <Plus isToggled={link.orderNum === currentOrdering} />
                    </motion.li>
                ))
            }
        </motion.ul>,
        parent
    ) : null;
}

export default ProjectLinks;