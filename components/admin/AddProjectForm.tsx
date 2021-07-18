import { API_BASE, toDate } from '../../helpers/index';
import useSWR from "swr";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from 'react';
import FileChooser from './FileChooser';

type AddProjectFormProps = {
    onSubmit: (state: FormType) => void,
} & object;
export type FormType = {
    titolo: string,
    luogo: string,
    scala: number,
    data: Date,
    immagini: string[],
    pdfs: string[],
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onSubmit }) => {
    const [isToggled, setToggled] = useState(false);
    const [formState, setFormState] = useState<FormType>({
        titolo: '',
        luogo: '',
        scala: 1,
        data: new Date(),
        immagini: [],
        pdfs: [],
    });
    const changeText = (e: React.ChangeEvent) => setFormState(s => ({
        ...s,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
    const changeDate = (e: React.ChangeEvent) => setFormState(s => ({
        ...s,
        data: new Date((e.target as HTMLInputElement).value),
    }));
    const open = () => setToggled(true);
    const close = () => setToggled(false);
    const { data: imageData, error: imageError, isValidating: imageValidating } = useSWR(`${API_BASE}/projects/images`);
    const { data: pdfData, error: pdfError, isValidating: pdfValidating } = useSWR(`${API_BASE}/projects/pdfs`);
    const imgLoading = (!imageData && !imageError) || imageValidating;
    const pdfLoading = (!pdfData && !pdfError) || pdfValidating;
    const contVars: Variants = {
        initial: { y: "-70%", opacity: 0, x: "-50%" },
        animate: { y: "-50%", opacity: 1, x: "-50%" },
        exit: { y: "-30%", opacity: 0, x: "-50%", transition: { when: "afterChildren" } },
    }
    const buttonVars: Variants = {
        initial: { y: 60, opacity: 0, rotate: "-360deg" },
        animate: { y: 0, opacity: 1, rotate: "0deg", transition: { delay: .2 } },
        exit: { y: 60, opacity: 0, rotate: "-360deg" },
    }
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    }
    return (
        <>
            <motion.button
                className="addProjectToggler"
                onClick={open}
                whileHover={{ scale: 1.1 }}
            >
                <AiOutlinePlus size={30} color="#eee" />
            </motion.button>
            <AnimatePresence>
                {
                    isToggled &&
                    <motion.div
                        className="newProjectFormContainer"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={contVars}
                    >
                        <motion.button
                            onClick={close}
                            variants={buttonVars}
                        >
                            <AiFillCloseCircle size={40} color="#141414" />
                        </motion.button>
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>Titolo</label>
                                        <input value={formState.titolo} onChange={changeText} type="text" name="titolo" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>Luogo</label>
                                        <input value={formState.luogo} onChange={changeText} type="text" name="luogo" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>Scala</label>
                                        <select onChange={changeText} value={formState.scala} name="scala" className="form-control">
                                            <option value="1">Unifamiliare</option>
                                            <option value="2">Stabile residenziale</option>
                                            <option value="3">Complesso residenziale</option>
                                            <option value="4">Masterplan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>Data</label>
                                        <input value={toDate(formState.data)} onChange={changeDate} type="date" name="data" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Immagini</label>
                                        {
                                            imgLoading ?
                                            <p>Loading...</p> :
                                            <FileChooser 
                                                files={imageData.images}
                                                withSelectedAction={null}
                                                onSelect={id => setFormState(s => ({
                                                    ...s,
                                                    immagini: [...s.immagini, id],
                                                }))}
                                                onRemove={id => setFormState(s => ({
                                                    ...s,
                                                    immagini: s.immagini.filter(im => im !== id)
                                                }))}
                                                disableActionButton
                                                actionText="Scegli"
                                                style={{
                                                    height: 100
                                                }}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>PDFs</label>
                                        {
                                            pdfLoading ?
                                            <p>Loading...</p> :
                                            <FileChooser 
                                                files={pdfData.pdfs.map(p => ({ ...p, url: p.thumbnail }))}
                                                withSelectedAction={null}
                                                onSelect={id => setFormState(s => ({
                                                    ...s,
                                                    pdfs: [...s.pdfs, id],
                                                }))}
                                                onRemove={id => setFormState(s => ({
                                                    ...s,
                                                    pdfs: s.pdfs.filter(pd => pd !== id)
                                                }))}
                                                disableActionButton
                                                actionText="Scegli"
                                                style={{
                                                    height: 100
                                                }}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group text-center">
                                        <button className="btn btn-success btn-md">
                                            Crea Progetto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
}

export default AddProjectForm;