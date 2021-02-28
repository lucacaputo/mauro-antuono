import Head from 'next/head'
import { NextPage } from "next";
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/competenze.module.css";

const Competenze: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
    }, [parent]);

    const compVar: Variants = {
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
            className={styles.competenze}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={compVar}
        >
            <Head>
                <title>Mario Longobardi | Competenze</title>
            </Head>
            <p>
                AutoCAD<br />
                Revit<br />
                Photoshop<br /><br />
                <strong className={styles.black}>Strumenti e Tecnologie</strong><br />
                Lumion, ArchiCAD, Maxon Cinema 4D, Adobe Illustrator, Adobe Indesign, pacchetto Office<br /><br />
                <strong className={styles.black}>Competenze interpersonali</strong><br />
                Lavoro in team<br /><br />
                <strong className={styles.black}>Lingue</strong><br />
                Lingua italiana<br />
                Linua inglese
            </p>
        </motion.div>,
        parent
    ) : null
}

export default Competenze;
