import { motion, useAnimation, AnimatePresence, Variants } from "framer-motion";
import React, { useState, useRef } from "react";
import FileList from "./FileList";

type FilePickerProps = {
    allowedExtensions: string[],
    onUpload: (files: File[]) => void,
    title: string,
    subtitle?: string,
};

const FilePicker: React.FC<FilePickerProps> = ({ allowedExtensions, onUpload, title, subtitle }) => {
    const [content, setContent] = useState<File[]>([]);
    const countRef = useRef(0);
    const dropzoneAnimationControls = useAnimation();
    const uploadButtonVariants: Variants = {
        initial: {
            y: '100%',
        },
        animate: {
            y: '0%',
            transition: {
                type: 'spring',
                damping: 17,
                stiffness: 400,
                when: 'beforeChildren'
            }
        },
        exit: {
            y: '100%',
            opacity: 0,
            transition: {
                when: 'afterChildren',
            }
        }
    }
    const uploadSpanVariants: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        }
    }
    const playAnimation = () => dropzoneAnimationControls.start({
        z: 15,
        boxShadow: '0 0 25px #141414',
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 350,
        }
    });
    const reverseAnimation = () => dropzoneAnimationControls.start({
        boxShadow: '0 0 12px #141414',
        z: 0,
        transition: {
            type: 'spring',
            damping: 6,
            stiffness: 200,
        }
    });
    const loadFiles = (fs: File[]) => {
        let files = fs.filter(f => allowedExtensions.includes(f.type));
        const names = content.map(n => n.name);
        files = files.filter(f => !names.includes(f.name));
        setContent(prev => [...prev, ...files]);
    }
    const dragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        countRef.current++;
        playAnimation();
    }
    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const dragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        countRef.current--;
        if (countRef.current === 0) 
            reverseAnimation();
    }
    const drop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        countRef.current = 0;
        reverseAnimation();
        loadFiles(files);
    }
    const upload = () => onUpload(content);
    const clean = () => setContent([]);
    return (
        <>
            <h2 className="text-center pt-4">{title}</h2>
            {
                subtitle && 
                <h4 className="text-center mb-5">{subtitle}</h4>
            }
            <motion.div 
                className="picker_dropzone"
                animate={dropzoneAnimationControls}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
            >
                <FileList files={
                    content.map(c => [
                        c,
                        () => setContent(con => con.filter(el => el.name !== c.name))
                    ])
                }  />
            </motion.div>
            <div className="d-flex w-100 justify-content-between align-items center mt-3">
                <label htmlFor="FilePicker" className="btn btn-primary btn-lg">Scegli</label>
                <label className="btn btn-lg btn-danger" onClick={clean}>Pulisci</label>
            </div>
            <input 
                type="file" 
                name="FilePicker" 
                id="FilePicker" 
                className="d-none" 
                accept={allowedExtensions.join(',')}
                multiple
                onChange={e => loadFiles([...e.currentTarget.files])}
            />
            <div className="overflow-hidden py-2 text-center mt-3">
                <AnimatePresence>
                    {
                        content.length > 0 &&
                        <motion.button
                            className="btn btn-lg btn-outline-success"
                            type="button"
                            onClick={upload}
                            variants={uploadButtonVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <motion.span
                                variants={uploadSpanVariants}
                            >
                                Carica
                            </motion.span>
                        </motion.button>
                    }
                </AnimatePresence>
            </div>
        </>
    );
}

export default FilePicker;