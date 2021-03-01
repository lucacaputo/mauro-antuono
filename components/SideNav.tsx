import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "../styles/sidenav.module.css";
import Link from "next/link";
import Plus from "./Plus";
import { useRouter } from "next/router"

type SideNavProps = {
    isVisible: boolean;
}

const links = [
    {
        text: "Esperienze",
        to: "/esperienze",
    },
    {
        text: "Formazione",
        to: "/formazione",
    },
    {
        text: "Competenze",
        to: "/competenze",
    },
    {
        text: "Interessi",
        to: "/interessi",
    },
    {
        text: "Contatti",
        to: "/contatti",
    },
];

const SideNav: React.FC<SideNavProps> = ({ isVisible }) => {
    const sideVar: Variants = {
        initial: {
            y: "100vh",
            opacity: 0,
            scale: 1.2
        },
        loaded: {
            y: "0vh",
            opacity: 1,
            scale: 1,
            transition: {
                duration: .5,
            }
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            transition: {
                duration: .3,
            }
        }
    }
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
    const { route } = useRouter();
    return (
        <AnimatePresence>
            {
                isVisible && (
                    <motion.nav
                        className={styles.sidenav}
                        initial="initial"
                        animate="loaded"
                        exit="exit"
                        variants={sideVar}
                    >
                        <AnimatePresence exitBeforeEnter>
                            {
                                route !== "/progetti" && (
                                    <motion.ul
                                        variants={ulVar}
                                        initial="initial"
                                        animate="loaded"
                                        exit="exit"
                                        key="std"
                                    >
                                        {
                                            links.map(l => (
                                                <motion.li key={`sidenav-${l.to}`}>
                                                    <Link href={l.to}>
                                                        <a className={styles.link}>
                                                            <span>{l.text}</span>
                                                            <Plus isToggled={route === l.to} />
                                                        </a>
                                                    </Link>
                                                </motion.li>
                                            ))
                                        }
                                    </motion.ul>
                                )
                            }
                            {
                                route === "/progetti" && (
                                    <motion.ul 
                                        key="prj"
                                        id="appendProjectLinks"
                                        variants={ulVar}
                                        initial="initial"
                                        animate="loaded"
                                        exit="exit"
                                    />
                                )
                            }
                        </AnimatePresence>
                    </motion.nav>
                )
            }
        </AnimatePresence>
    );
}

export default SideNav;