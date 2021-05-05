import { motion, Variants } from "framer-motion";
import styles from "../../styles/sidelink.module.css";
import Link from "next/link";
import { LinkType } from "./Sidebar";
import { useState } from 'react';

type SideLinkProps = {
    link: LinkType,
}

const SideLink: React.FC<SideLinkProps> = ({ link }) => {
    const [hovered, setHovered] = useState(false);
    const barVars: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: hovered ? 1 : 0,
            transition: {
                duration: .2,
            }
        }
    }
    const aVars: Variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: hovered ? 12 : 0,
            transition: {
                type: 'spring',
                stiffness: 50,
                damping: 15,
                mass: 1,
            }
        }
    }
    return (
        <motion.li
            key={link.text}
            className={styles.link}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <motion.span 
                className={styles.selectedBar} 
                variants={barVars} 
                initial="initial"
                animate="animate"
            />
            <Link href={link.to}>
                <motion.a
                    variants={aVars}
                    initial="initial"
                    animate="animate"
                >
                    <motion.span
                        className={styles.linkIconWrapper}
                    >
                        { link.icon }
                    </motion.span>
                    <span>{ link.text }</span>
                </motion.a>
            </Link>
        </motion.li>
    );
}

export default SideLink;