import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "../../../styles/navmobile.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Dropdown from "./Dropdown";

const links: {
    to: string,
    text: string,
}[] = [
    {
        to: '/esperienze',
        text: 'Esperienze',
    },
    {
        to: '/formazione',
        text: 'Formazione',
    },
    {
        to: '/competenze',
        text: 'Competenze',
    },
    {
        to: '/interessi',
        text: 'Interessi',
    },
    {
        to: '/contatti',
        text: 'Contatti',
    },
];

const Navbar: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(s => !s);
    const close = () => setOpen(false);
    const navVars: Variants = {
        initial: {
            transform: isOpen ? 'translateY(-100%)' : 'translateY(0%)'
        },
        animate: {
            transform: isOpen ? 'translateY(-100%)' : 'translateY(0%)',
            transition: {
                type: 'spring',
                when: isOpen ? 'beforeChildren' : 'afterChildren',
                stiffness: 300,
                damping: 40,
                mass: 1
            }
        }
    }
    const linkVars: Variants = {
        initial: {
            y: 'calc(100% + 10px)',
        },
        animate: {
            y: isOpen ? '0%' : 'calc(100% + 10px)',
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40,
            }
        }
    }
    const toggVars: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
    }
    return (
        <>
            <motion.nav
                className={styles.mobNav}
                style={{ color: '#f6f6f6' }}
                variants={navVars}
                initial="initial"
                animate="animate"
            >
                <ul className={styles.mobnavUl}>
                    <li>
                        <motion.div
                            variants={linkVars}
                        >
                            <Link href="/">
                                <a onClick={close}>Home</a>
                            </Link>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div
                            variants={linkVars}
                        >
                            <Dropdown title="Info">
                                <ul className={styles.dropdownUl}>
                                    {
                                        links.map(l => (
                                            <li
                                                key={`mob-${l.text}`}
                                            >
                                                <Link href={l.to}>
                                                    <a onClick={close}> {l.text} </a>
                                                </Link>
                                            </li>       
                                        ))
                                    }
                                </ul>
                            </Dropdown>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div
                            variants={linkVars}
                        >
                            <Link href="/progetti">
                                <a onClick={close}>Progetti</a>
                            </Link>
                        </motion.div>
                    </li>
                </ul>
            </motion.nav>
            <motion.button
                className={styles.mobNavToggler}
                onClick={toggle}
            >
                <AnimatePresence>
                    {
                        !isOpen ?
                        <motion.div
                            variants={toggVars}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key="mob-open"
                            layout
                        >
                            <AiOutlineMenu size={18} color="#f6f6f6" className={styles.mobNavTogglerIcon} />
                        </motion.div>
                        : <motion.div
                            variants={toggVars}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key="mob-close"
                            layout
                        >
                            <AiOutlineClose size={18} color="#f6f6f6" className={styles.mobNavTogglerIcon} />
                        </motion.div>   
                    }
                </AnimatePresence>
            </motion.button>
        </>
    );
}

export default Navbar;