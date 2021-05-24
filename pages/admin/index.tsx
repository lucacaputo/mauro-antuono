import { NextPage } from "next";
import useSWR from "swr";
import { API_BASE, useAuth, submitHomeChanges, alternativeFetcher } from '../../helpers/index';
import { useRouter } from "next/router";
import SectionEditor from "../../components/admin/Editor";
import { useRef } from 'react';

const Admin: NextPage = () => {
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
                <button 
                    className="btn d-block btn-success btn-md mx-auto"
                    onClick={onSubmit}
                >
                    Save
                </button>
            </div>
        </>
    );
}

export default Admin;
