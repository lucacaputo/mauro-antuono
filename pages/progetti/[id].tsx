import { motion, Variants } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import styles from "../../styles/progettosingolo.module.css";
import { API_BASE, getScale, toHumanDate } from "../../helpers";
import Carousel from "../../components/ProjectCarousel";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { useIsMobile } from '../../context/ClientAppContext';

type ProjectProps = {
    project: {
        data: string,
        immagini: {
            md5: string,
            name: string,
            url: string,
            __v: number,
            _id: string,
        }[],
        luogo: string,
        pdfs: {
            md5: string,
            name: string,
            thumbnail: string,
            url: string,
            __v: number,
            _id: string,
        }[],
        scala: number,
        thumbnail: string,
        titolo: string,
        __v: number,
        _id: string,
    }
}

const Progetto: NextPage<ProjectProps> = ({ project }) => {
    const router = useRouter();
    const [parent, setParent] = useState<HTMLDivElement | null>(null);
    const mobile = useIsMobile();
    const wrapperVariants: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
            },
        },
        exit: {
            opacity: 0,
            transition: {
                when: 'afterChildren'
            }
        }
    };
    const projectVariants: Variants = {
        initial: {
            y: 50,
            scale: .8,
            opacity: 0,
        },
        animate: {
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 280,
                damping: 40,
            },
        },
        exit: {
            y: 50,
            scale: .8,
            opacity: 0,
            transition: {
                type: 'spring',
                stiffness: 280,
                damping: 40,
            }, 
        }
    };
    const closerVariants: Variants = {
        initial: {
            y: '-100%',
            opacity: 0,
            x: '-50%',
            rotate: -50
        },
        animate: {
            opacity: 1,
            y: '0%',
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 38,
            }
        },
        exit: {
            opacity: 0,
            y: '-100%',
            rotate: -50,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 38,
            }
        }
    }
    const backOnClick = () => router.push('/progetti?o='+router.query.o)
    const preventBack = (e: React.MouseEvent) => e.stopPropagation();
    useEffect(() => {
        setParent(document.querySelector('#projectIdContainer') as HTMLDivElement);
    }, [parent]);
    return parent !== null
        ? createPortal(
            <motion.div
                className={styles.projectWrapper}
                variants={wrapperVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={backOnClick}
            >
                {
                    mobile &&
                    <motion.button
                        className={styles.closer}
                        variants={closerVariants}
                    >
                        <AiOutlineClose size={23} color="#f6f6f6" />
                    </motion.button>
                }
                <motion.div
                    className={styles.project}
                    variants={projectVariants}
                    onClick={preventBack}
                >
                    <Carousel slides={project.immagini} />
                    <div className={styles.projectBody}>
                        <h3>PDFs</h3>
                        <div className={styles.projectPdfs}>
                            {
                                project.pdfs.map(p => (
                                    <div className={styles.pdf} key={p._id}>
                                        <img src={API_BASE + '/' + p.thumbnail} alt={`project ${project.titolo} pdf thumbnail`} />
                                        <motion.a 
                                            target="_blank" 
                                            href={API_BASE + '/' + p.url} 
                                            className={styles.btn}
                                            initial={{ x: '-50%', scale: 1 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            Vedi
                                        </motion.a>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>Dettagli</h3>
                        <p>
                            <strong>Titolo</strong>: {project.titolo} <br />
                            <strong>Scala</strong>: {getScale(project.scala)} <br />
                            <strong>Data</strong>: {toHumanDate(project.data)} <br />
                            <strong>Luogo</strong>: {project.luogo}
                        </p>
                    </div>
                </motion.div>
            </motion.div>,
            parent
        )
        : null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params;
    const data = await fetch(`${API_BASE}/projects/${id}`).then(r => r.json());
    return {
        props: {
            project: data.project
        }
    }
}

export default Progetto;