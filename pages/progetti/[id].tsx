import { motion, Variants } from "framer-motion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import styles from "../../styles/progettosingolo.module.css";
import { API_BASE, getScale, toHumanDate } from "../../helpers";
import Carousel from "../../components/ProjectCarousel";

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
    const [parent, setParent] = useState<HTMLDivElement | null>(null);
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
    };
    useEffect(() => {
        setParent(document.querySelector('#projectIdContainer') as HTMLDivElement);
    }, [parent]);
    console.log(project)
    return parent !== null
        ? createPortal(
            <motion.div
                className={styles.projectWrapper}
                variants={wrapperVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className={styles.project}
                    variants={projectVariants}
                >
                    <Carousel slides={project.immagini} initialSlideId={project.thumbnail} />
                    <div className={styles.projectBody}>
                        <h3>PDFs</h3>
                        <div className={styles.projectPdfs}>
                            {
                                project.pdfs.map(p => (
                                    <div className={styles.pdf} key={p._id}>
                                        <img src={API_BASE + '/' + p.thumbnail} alt={`project ${project.titolo} pdf thumbnail`} />
                                        <a target="_blank" href={API_BASE + '/' + p.url} className={styles.btn}>Vedi</a>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    const data = await fetch(`${API_BASE}/projects/${id}`).then(r => r.json());
    return {
        props: {
            project: data.project
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await fetch(`${API_BASE}/projects/projects`).then(r => r.json());
    return {
        paths: ids.projects.map(i => ({ params: { id: i._id } })),
        fallback: false,
    }
}

export default Progetto;