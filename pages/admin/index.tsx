import { NextPage } from "next";
import useSWR from "swr";
import { API_BASE, useAuth, submitHomeChanges, alternativeFetcher } from '../../helpers/index';
import { useRouter } from "next/router";
import SectionEditor from "../../components/admin/Editor";
import { useRef } from 'react';
import { motion, Variants } from "framer-motion";

const Admin: NextPage = () => {
    const buttonVars: Variants = {
        initial: {
            scale: .8,
            y: 0,
            x: "calc(-50% + 37.5px)",
            boxShadow: '0px 0px 6px #141414',
        },
        animate: {
            scale: 1,
            y: -70,
            x: "calc(-50% + 37.5px)",
            transition: {
                type: 'spring',
                stiffness: 350,
                damping: 15,
            }
        },
        hover: {
            scale: 1.1,
            y: -70,
            x: "calc(-50% + 37.5px)",
            boxShadow: '0px 2px 12px #141414',
            transition: {
                type: 'spring',
                stiffness: 350,
                damping: 20,
            }
        }
    };
    const router = useRouter();
    const { loading, error } = useAuth();
    const texts = useRef({
        esperienze: '',
        formazione: '',
        contatti: '',
        interessi: '',
        competenze: '',
        _id: null,
    });
    const { data: homeData, error: homeError, isValidating, mutate } = useSWR(`${API_BASE}/homepage`, alternativeFetcher);
    if (!isValidating && !homeError) {
        const {__v, ...rest} = homeData;
        texts.current = rest;
    }
    if (loading) return <p style={{ textAlign: 'center', padding: 15, fontSize: 22 }}>Loading...</p>;
    if (error) {
        console.log(error);
        router.push("/admin/login");
        return null;
    }
    const onSubmit = async () => {
        try {
            const result = await submitHomeChanges(texts.current);
            texts.current = result;
            mutate();
        } catch(err) {
            console.log('error!!', err);
        }
    }
    return (
        <>
            <div className="container mainContainer py-5">
                <SectionEditor initial={texts.current.esperienze} onChange={d => texts.current.esperienze = d} title="Esperienze" />
                <SectionEditor initial={texts.current.formazione} onChange={d => texts.current.formazione = d} title="Formazione" />
                <SectionEditor initial={texts.current.interessi} onChange={d => texts.current.interessi = d} title="Interessi" />
                <SectionEditor initial={texts.current.competenze} onChange={d => texts.current.competenze = d} title="Competenze" />
                <SectionEditor initial={texts.current.contatti} onChange={d => texts.current.contatti = d} title="Contatti" />
                <motion.button 
                    variants={buttonVars}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="d-block subBtn"
                    onClick={onSubmit}
                >
                    Save
                </motion.button>
            </div>
        </>
    );
}

export default Admin;
