import Head from 'next/head'
import { NextPage } from "next";
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/formazione.module.css";

const Formazione: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
    }, [parent]);

    const formVar: Variants = {
        initial: {
            opacity: 0,
            x: 50,
        },
        enter: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: -50,
        }
    }

    return parent !== null ? createPortal(
        <motion.div
            className={styles.formazione}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={formVar}
        >
            <Head>
                <title>Mario Longobardi | Formazione</title>
            </Head>
            <p>
                <strong className={styles.black}>
                    Scuola universitria professionale della Svizzera Italiana (SUPSI)
                </strong><br />
                Bachelor of Architecture_BArch, Architettura 2018-2021<br /><br />
                <strong className={styles.black}>Liceo scientifico linguistico Paolo Giovio</strong><br />
                Diploma di maturità scientifica 2011-2016
            </p>
        </motion.div>,
        parent
    ) : null
}

export default Formazione;
