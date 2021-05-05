import { motion, Variants } from "framer-motion";
import { useState } from "react";
import styles from "../../styles/sidebar.module.css";
import Link from "next/link";

type LinkType = {
    text: string,
    to: string,
}
type SideProps = {
    links: LinkType[],
    position?: 'left' | 'right',
    startCollapsed?: boolean,
    titleText: string,
}

const Sidebar: React.FC<SideProps> = ({ links, titleText, position='left', startCollapsed=false }) => {
    const [collapsed, setCollapsed] = useState(startCollapsed);
    const toggle = () => setCollapsed(c => !c);
    const sideVars: Variants = {
        initial: {
            width: collapsed ? 70 : 300,
        },
        animate: {
            width: collapsed ? 70 : 300,
            transition: {
                type: 'spring',
                damping: 125,
                stiffness: 500,
                mass: 1, 
            }
        }
    }
    return (
        <motion.nav 
            className={styles.nvbr}
            variants={sideVars}
            initial="initial"
            animate="animate"
            style={{ left: position === 'left' ? 0 : 'unset', right: position === 'right' ? 0 : 'unset' }}
        >
            <div className={styles.navHeaderWrapper}>
                <div className={styles.navHeader}>
                    <Link href="/admin">
                        <a className={styles.ml}>ML</a>
                    </Link>
                </div>
                <h2>{titleText}</h2>
            </div>
            <div className={styles.collapserWrapper}>
                <div 
                    className={styles.switch}
                    style={{ justifyContent: collapsed ? 'flex-end' : 'flex-start' }}
                    onClick={toggle}
               >
                    <motion.div 
                        className={styles.handle}
                        transition={{
                            type: 'spring',
                            stiffness: 700,
                            damping: 30,
                        }}
                        layout 
                    />
                </div>
            </div>
        </motion.nav>
    );
}

export default Sidebar;