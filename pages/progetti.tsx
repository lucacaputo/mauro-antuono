import Head from 'next/head'
import { NextPage } from "next"
import styles from "../styles/progetti.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectLinks from '../components/ProjectLinks';
import ProjectColumn from "../components/ProjectColumn";
import { projects } from '../mocks/data';
import { useRouter } from "next/router";

export const ordering = {
    CHRONOLOGICAL: 0,
    LOCATION: 1,
    SCALE: 2,
}

export type Scale = 1 | 2 | 3 | 4;

const getScale = (sc: Scale) => {
    switch(sc) {
        case 1: 
            return "UNIFAMILIARE";
        case 2: 
            return "STABILE RESIDENZIALE";
        case 3: 
            return "COMPLESSO RESIDENZIALE";
        case 4: 
            return "MASTERPLAN";
    }
}

export type Project = {
    image: string,
    title: string,
    pdfLink: string,
    luogo: string,
    data: Date,
    scala: Scale,
    year: string,
    _id: string,
}

const Progetti: NextPage = () => {
    const { route } = useRouter();
    const [order, setOrder] = useState(ordering.CHRONOLOGICAL);
    const [prjs, setPorjects] = useState(projects);
    const getKey = () => {
        switch(order) {
            case ordering.CHRONOLOGICAL:
                return "year";
            case ordering.SCALE:
                return "scala";
            case ordering.LOCATION:
                return "luogo";
        }
    }
    const getPrjsArray = () => {
        const k = getKey();
        let uniqueValues = [...new Set(prjs.map(p => p[k]))] as string[];
        const newObject = uniqueValues.reduce((acc, curr) => {
            acc[curr] = prjs.filter(pr => pr[k] === curr);
            return acc;
        }, {} as { [k: string]: Project[] });
        return newObject;
    }
    const renderObject = () => {
        const p = getPrjsArray();
        const arr: [string, Project[]][] = [];
        for (let k in p) {
            arr.push([k, p[k]]);
        }
        arr.sort((a,b) => a[0] < b[0] ? -1 : 1)
        return arr;
    }
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
            <AnimatePresence>
            {
                route === "/progetti" &&
                renderObject().map((p, i) => (
                    <ProjectColumn key={`col-${i}`} title={p[0]} projects={p[1]} />
                ))
            }
            </AnimatePresence>
        </motion.div>
    );
}

export default Progetti;
