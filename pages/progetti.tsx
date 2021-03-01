import Head from 'next/head'
import { NextPage } from "next"
import styles from "../styles/progetti.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectComponent from "../components/Project";

const ordering = {
    CHRONOLOGICAL: 0,
    ALPHABETICAL: 1,
}

type Project = {
    image: string,
    title: string,
}
type ProjectObjectArray = { [year: string]: Project[] };

const projects: ProjectObjectArray = {
    "2019": [
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
    ],
    "2020": [
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
    ],
    "2021": [
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
        {
            image: "/images/dummy_project.png",
            title: "first project"
        },
    ]
}

const Progetti: NextPage = () => {

    const [order, setOrder] = useState(ordering.CHRONOLOGICAL);

    return (
        <motion.div className={styles.progetti}>

            <Head>
                <title>Mario Longobardi | Progetti</title>
            </Head>
            
        </motion.div>
    );
}

export default Progetti;
