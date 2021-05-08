import { motion, Variants } from "framer-motion";
import { useState } from "react";
import styles from "../../styles/sidebar.module.css";
import Link from "next/link";
import SideLink from "./SideLink";
import { useAppContext } from "../../context/AppContext";

export type LinkType = {
    text: string,
    to: string,
    icon: React.ReactNode,
}
type SideProps = {
    links: LinkType[],
    position?: 'left' | 'right',
    startCollapsed?: boolean,
}

const Sidebar: React.FC<SideProps> = ({ links, position='left', startCollapsed=false }) => {
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
                damping: 75,
                stiffness: 500,
                mass: 1, 
            }
        }
    }
    const { username } = useAppContext()[0];
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
                <h2>welcome, {username}</h2>
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
            <ul className={styles.links}>
                {
                    links.map(el => <SideLink link={el} key={el.text} />)
                }
            </ul>
        </motion.nav>
    );
}

export default Sidebar;