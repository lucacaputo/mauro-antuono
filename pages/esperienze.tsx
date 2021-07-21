import Head from 'next/head'
import { NextPage } from "next"
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/esperienze.module.css";
import { fetchHomeSection } from '../helpers/index';

const Esperienze: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        fetchHomeSection('esperienze', setContent);
        setParent(document.querySelector("#infoCont"));
    }, [parent, content]);

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
            <p dangerouslySetInnerHTML={{
                __html: content
            }} />
        </motion.div>,
        parent
    ) : null
}

export default Esperienze;
