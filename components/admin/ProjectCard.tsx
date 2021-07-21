import { API_BASE, getScale, toDate, toHumanDate } from "../../helpers";
import Modal from "react-modal";
import { useState } from "react";
import React from "react";
import FileChooser from "./FileChooser";
import { ImageObject, PdfObject } from "../../pages/admin/projects";

export type ProjectCardProps = {
    data: string,
    img_details: {
        md5: string,
        name: string,
        url: string,
        __v: number,
        _id: string,
    }[],
    immagini: string[],
    luogo: string,
    pdf_details: {
        md5: string,
        name: string,
        thumbnail: string,
        url: string,
        __v: number,
        _id: string,
    }[],
    pdfs: string[],
    scala: number,
    thumbnail: string,
    titolo: string,
    __v: number,
    _id: string,
    allImages: ImageObject[],
    allPdfs: PdfObject[],
}
export type EditProjectFormState = {
    titolo: string,
    luogo: string,
    scala: number,
    data: Date,
    immagini: string[],
    pdfs: string[],
}

Modal.setAppElement('body');
type ModalTypes = 'more' | 'modify';
type ModalState = { isOpen: boolean, type: ModalTypes };

const ProjectCard: React.FC<ProjectCardProps> = props => {
    const initialFormState = {
        titolo: props.titolo,
        luogo: props.luogo,
        scala: props.scala,
        data: new Date(props.data),
        immagini: [...props.immagini],
        pdfs: [...props.pdfs],
    }
    const { allImages, allPdfs } = props;
    const [{isOpen, type}, setOpen] = useState<ModalState>({
        isOpen: false,
        type: 'modify',
    });
    const [editFormState, setEditFormState] = useState<EditProjectFormState>(initialFormState);
    const open = (mode: ModalTypes) => setOpen({ isOpen: true, type: mode });
    const close = () => {
        setOpen(s => ({ ...s, isOpen: false }));
        setEditFormState(initialFormState);
    };
    const changeText = (e: React.ChangeEvent) => setEditFormState(s => ({
        ...s,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
    const changeDate = (e: React.ChangeEvent) => setEditFormState(s => ({
        ...s,
        data: new Date((e.target as HTMLInputElement).value),
    }));
    return (
        <>
            <div className="card w-100">
                <img
                    src={API_BASE + '/' + props.img_details.find(x => x._id === props.thumbnail).url.replace(/\\/gm, '/')}
                    alt="Project thumbnail"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{props.titolo}</h5>
                    <p className="card-text">
                        <strong>Scala</strong>: {getScale(props.scala) || '-'} <br />
                        <strong>Data</strong>: {toHumanDate(props.data)} <br />
                        <strong>Luogo</strong>: {props.luogo}
                    </p>
                    <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={() => open('more')}
                    >
                        Altro
                    </button> &nbsp;
                    <button
                        className="btn btn-warning btn-sm"
                        type="button"
                        onClick={() => open('modify')}
                    >
                        Modifica
                    </button> &nbsp;
                    <button
                        className="btn btn-danger btn-sm"
                        type="button"
                    >
                        Elimina
                    </button>
                </div>
            </div>
            <Modal 
                isOpen={isOpen} 
                closeTimeoutMS={300}
                shouldCloseOnEsc
                onRequestClose={close}
            >
                <div className="container">
                    {
                        type === 'more' &&
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <h3>Immagini</h3>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    props.img_details.map(im => (
                                        <div key={`im-detail-${im._id}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                            <img 
                                                src={`${API_BASE}/${im.url.replace(/\\/gm, '/')}`} 
                                                alt={`${props.titolo} project image`} 
                                                className="w-100 d-block"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h3>PDFs</h3>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    props.pdf_details.map(pd => (
                                        <div key={`pd-detail${pd._id}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                            <img 
                                                src={`${API_BASE}/${pd.thumbnail.replace(/\\/gm, '/')}`} 
                                                alt={`${props.titolo} pdf thumbnail`} 
                                                className="w-100 d-block" 
                                            />
                                            <a 
                                                target="_blank" 
                                                href={`${API_BASE}/${pd.url.replace(/\\/gm, '/')}`} 
                                                className="mb-1 btn btn-sm btn-primary"
                                            >
                                                Vedi        
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }
                    {
                        type === 'modify' &&
                        <>
                            <form>
                                <div className="form-row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Titolo</label>
                                            <input value={editFormState.titolo} onChange={changeText} type="text" name="titolo" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Luogo</label>
                                            <input value={editFormState.luogo} onChange={changeText} type="text" name="luogo" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Scala</label>
                                            <select onChange={changeText} value={editFormState.scala} name="scala" className="form-control">
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
                                            <input value={toDate(editFormState.data)} onChange={changeDate} type="date" name="data" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Immagini</label>
                                            <FileChooser 
                                                files={allImages}
                                                withSelectedAction={null}
                                                initialSelectionMode
                                                initialSelection={props.img_details.map(i => i._id)}
                                                onSelect={id => setEditFormState(s => ({
                                                    ...s,
                                                    immagini: [...s.immagini, id],
                                                }))}
                                                onRemove={id => setEditFormState(s => ({
                                                    ...s,
                                                    immagini: s.immagini.filter(im => im !== id)
                                                }))}
                                                disableActionButton
                                                actionText="Scegli"
                                                style={{
                                                    height: 140
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>PDFs</label>
                                            <FileChooser 
                                                files={allPdfs.map(p => ({ ...p, url: p.thumbnail }))}
                                                withSelectedAction={null}
                                                initialSelectionMode
                                                initialSelection={props.pdf_details.map(pdf => pdf._id)}
                                                onSelect={id => setEditFormState(s => ({
                                                    ...s,
                                                    pdfs: [...s.pdfs, id],
                                                }))}
                                                onRemove={id => setEditFormState(s => ({
                                                    ...s,
                                                    pdfs: s.pdfs.filter(pd => pd !== id)
                                                }))}
                                                disableActionButton
                                                actionText="Scegli"
                                                style={{
                                                    height: 140
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group text-center">
                                            <button className="btn btn-warning btn-md">
                                                Modifica Progetto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    }
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={close}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 25,
                        transform: 'translateX(-50%)',
                        zIndex: 1
                    }}
                >
                    CHIUDI
                </button>
            </Modal>
        </>
    );
}

export default ProjectCard;