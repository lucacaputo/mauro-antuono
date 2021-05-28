import Head from 'next/head'
import { createPortal } from "react-dom";
import { NextPage } from "next"
import { useEffect, useState } from 'react';
import { motion, Variants } from "framer-motion";
import styles from "../styles/contatti.module.css";
import { fetchHomeSection } from '../helpers';

const Contatti: NextPage = () => {

    const [parent, setParent] = useState<null | Element>(null);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        setParent(document.querySelector("#infoCont"));
        fetchHomeSection('contatti', setContent);
    }, [parent, content]);

    const contVar: Variants = {
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
            className={styles.contatti}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={contVar}
        >
            <Head>
                <title>Mario Longobardi | Contatti</title>
            </Head>
            {/* {<table
                cellSpacing="30"
                className={styles.table}
            >
                <tbody>
                    <tr>
                        <td>
                            E-mail:
                        </td>
                        <td>
                            <a href="mailto:longobardi.mario@outlook.it">longobardi.mario@outlook.it</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tel:
                        </td>
                        <td>
                            <a href="tel:+39 340 9229533">+39 340 9229533</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Instagram:
                        </td>
                        <td>
                            <a href="https://www.instagram.com/mariolongobardi_/" target="_blank" rel="noopener noreferrer">@mariolongobardi_</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            LinkedIn:
                        </td>
                        <td>
                            <a href="https://www.linkedin.com/in/mario-antonio-longobardi-b8746a187/" target="_blank" rel="noopener noreferrer">Mario Antonio Longobardi</a>
                        </td>
                    </tr>
                </tbody>
            </table>} */}
            <p dangerouslySetInnerHTML={{
                __html: `${content}`
            }} />
        </motion.div>,
        parent
    ) : null
}

export default Contatti;
