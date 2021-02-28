import Head from 'next/head'
import { NextPage } from "next"
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/esperienze.module.css";

const Esperienze: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
    }, [parent]);

    const expVar: Variants = {
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
            className={styles.esperienze}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={expVar}
        >
            <Head>
                <title>Mario Longobardi | Esperienze</title>
            </Head>
            <p>
                <strong className={styles.black}>Stage</strong> <br />
                <a href="https://gptarchitetti.ch/" target="_blank">G.P.T. Associati</a><br />
                Balerna<br />
                set 2017 - ago 2018
            </p>
        </motion.div>,
        parent
    ) : null
}

export default Esperienze;
