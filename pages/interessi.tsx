import Head from 'next/head'
import { NextPage } from "next";
import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/interessi.module.css";
import { fetchHomeSection } from '../helpers';

const Interessi: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
        fetchHomeSection('interessi', setContent);
    }, [parent, content]);

    const intVar: Variants = {
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
            className={styles.interessi}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={intVar}
        >
            <Head>
                <title>Mario Longobardi | Interessi</title>
            </Head>
            <p dangerouslySetInnerHTML={{
                __html: `${content}`
            }} />
        </motion.div>,
        parent
    ) : null
}

export default Interessi;
