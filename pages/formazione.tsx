import Head from 'next/head'
import { NextPage } from "next";
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/formazione.module.css";
import { fetchHomeSection } from '../helpers';

const Formazione: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
        fetchHomeSection('formazione', setContent);
    }, [parent, content]);

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
            <p dangerouslySetInnerHTML={{
                __html: content
            }} />
        </motion.div>,
        parent
    ) : null
}

export default Formazione;
