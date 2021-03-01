import Head from 'next/head'
import { NextPage } from "next"
import styles from "../styles/progetti.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Project from '../components/Project';
import ProjectLinks from '../components/ProjectLinks';

export const ordering = {
    CHRONOLOGICAL: 0,
    LOCATION: 1,
    SCALE: 2,
}
const scales: { [k: string]: Scale } = {
    UNIFAMILIARE: 1,
    STABILE_RESIDENZIALE: 2,
    COMPLESSO_RESIDENZIALE: 3,
    MASTERPLAN: 4,
}

type Scale = 1 | 2 | 3 | 4;
type Location = ""

export type Project = {
    image: string,
    title: string,
    pdfLink: string,
    luogo: string,
    data: Date,
    scala: Scale,
}

type ProjectObjectArray = { [year: string]: Project[] };

const projects: ProjectObjectArray = {
    "2019": [
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
    ],
    "2020": [
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
    ],
    "2021": [
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
        {
            image: "/images/dummy_project.png",
            title: "first project",
            pdfLink: "https://www.google.com",
            luogo: "como",
            scala: scales.UNIFAMILIARE,
            data: new Date()
        },
    ]
}

const Progetti: NextPage = () => {

    const [order, setOrder] = useState(ordering.CHRONOLOGICAL);
    const sideLinks = [
        {
            text: "Data",
            action: () => setOrder(ordering.CHRONOLOGICAL),
            orderNum: ordering.CHRONOLOGICAL,
        },
        {
            text: "Scala",
            action: () => setOrder(ordering.SCALE),
            orderNum: ordering.SCALE,
        },
        {
            text: "Luogo",
            action: () => setOrder(ordering.LOCATION),
            orderNum: ordering.LOCATION,
        }
    ]

    return (
        <motion.div className={styles.progetti}>

            <Head>
                <title>Mario Longobardi | Progetti</title>
            </Head>
            <ProjectLinks links={sideLinks} currentOrdering={order} />
        </motion.div>
    );
}

export default Progetti;
