import { motion, Variants, AnimatePresence } from "framer-motion";
import styles from "../styles/navbar.module.css";
import Link from "next/link";

type NavProps = {
    isOnTop: boolean,
    linksVisible: boolean,
}

const getNavVariants = (isOnTop: boolean): Variants => ({
    middle: { top: "50%", y: "-50%" },
    onTop: { top: isOnTop ? "0%" : "50%", y: isOnTop ? "0%" : "-50%", }
});
const getH1Variants = (isOnTop: boolean): Variants => ({
    middle: { scale: 1.2 },
    onTop: { scale: isOnTop ? 1 : 1.2 },
});

const Navbar: React.FC<NavProps> = ({ isOnTop, linksVisible }) => {
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
    const navVariants = getNavVariants(isOnTop);
    const h1Variants = getH1Variants(isOnTop);
    return (
        <motion.nav 
            className={styles.navbar}
            animate="onTop"
            variants={navVariants}
            transition={{
                type: "spring",
                duration: .7,
            }}
        >
            <Link href="/">
                <a>
                    <motion.h1
                        variants={h1Variants}
                        transition={{
                            type: "spring",
                            duration: .3,
                            delay: isOnTop ? 0 : .15,
                        }}
                    >
                        Mario Antonio Longobardi
                    </motion.h1>
                </a>
            </Link>
            <AnimatePresence>
                {
                    linksVisible && (
                        <motion.ul 
                            className={styles.navLinks}
                            initial={{
                                opacity: 0,
                                scale: .7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: .7,
                            }}
                        >
                            {
                                links.map(el => (
                                    <motion.li key={`nav-${el.to}`}>
                                        <Link href={el.to}>
                                            <a>{el.text}</a>
                                        </Link>
                                    </motion.li>
                                ))
                            }
                        </motion.ul>
                    )
                }
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;