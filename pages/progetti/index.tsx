import Head from 'next/head'
import { GetStaticProps, NextPage } from "next"
import styles from "../../styles/progetti.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectLinks from '../../components/ProjectLinks';
import ProjectColumn from "../../components/ProjectColumn";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_BASE, getScale } from '../../helpers';
import { ProjectCardProps } from '../../components/admin/ProjectCard';
import { useIsMobile } from '../../context/ClientAppContext';
import Project from '../../components/Project';

export const ordering = {
    CHRONOLOGICAL: 0,
    LOCATION: 1,
    SCALE: 2,
}

export type Scale = 1 | 2 | 3 | 4;

export type Project = ProjectCardProps;
type ProjectWithYear = Project & { year: string };

const Progetti: NextPage<{ projects: Project[], ok: boolean }> = ({ projects, ok }) => {
    const router = useRouter();
    const [order, setOrder] = useState(ordering.CHRONOLOGICAL);
    const mobile = useIsMobile();
    useEffect(() => {
        if (router.query.o) {
            setOrder(parseInt(router.query.o as string));
        }
    }, [router.query]);
    const { data, isValidating, error } = useSWR<{ ok: boolean, projects: Project[] }, any>(`${API_BASE}/projects/projects`, { initialData: { ok, projects } });
    const loading = (!data && !error) || isValidating;
    const sortedProjects: ProjectWithYear[] = mobile
        ? data.projects.map(p => ({ ...p, year: new Date(p.data).getFullYear().toString() }))
        : [];
    sortedProjects.sort((a, b) => {
        const da = new Date(a.data);
        const db = new Date(b.data);
        return da.getTime() > db.getTime() ? -1 : 1
    });
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
        const prjs: ProjectWithYear[] = loading 
        ? []
        : data.ok 
            ? data.projects.map(p => ({ ...p, year: new Date(p.data).getFullYear().toString() }))
            : [];
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
    const isScale = order === ordering.SCALE;
    return (
        <motion.div className={styles.progetti}>
            <Head>
                <title>Mario Longobardi | Progetti</title>
            </Head>
            <ProjectLinks links={sideLinks} currentOrdering={order} />
            <AnimatePresence>
            {
                router.route === "/progetti" && !mobile &&
                renderObject().map((p, i) => (
                    <ProjectColumn order={order} key={`col-${i}`} title={isScale ? getScale(parseInt(p[0])) : p[0]} projects={p[1]} />
                ))
            }
            </AnimatePresence>
            {
                mobile &&
                <div className={styles.mobileProjectWrapper}>
                    {
                        sortedProjects.map(p => (
                            <Project key={p._id} project={p} order={order} />
                        ))
                    }
                </div>
            }
        </motion.div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`${API_BASE}/projects/projects`)
        .then(r => r.json())
        .catch(err => console.log(err));
    if (!data.ok) console.log(data)
    return {
        props: {
            projects: data.projects,
            ok: data.ok,
        },
        revalidate: 60 * 60 * 24,
    }
}

export default Progetti;
