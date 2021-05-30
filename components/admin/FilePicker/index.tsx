import { motion, useAnimation } from "framer-motion";
import React, { useState, useRef } from "react";
import FileList from "./FileList";

type FilePickerProps = {
    allowedExtensions: string[],
};

const FilePicker: React.FC<FilePickerProps> = ({ allowedExtensions }) => {
    const [content, setContent] = useState<File[]>([]);
    const countRef = useRef(0);
    const dropzone = useRef<HTMLDivElement | null>(null);

    const dropzoneAnimationControls = useAnimation();
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
        console.log(countRef.current)
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
    return (
        <>
            <h2 className="text-center pt-4">Carica i PDF</h2>
            <h4 className="text-center mb-5">Oppure trascinali nello scatolo ostia</h4>
            <motion.div 
                className="picker_dropzone"
                animate={dropzoneAnimationControls}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
                ref={dropzone}
            >
                <FileList files={
                    content.map(c => [
                        c,
                        () => setContent(con => con.filter(el => el.name !== c.name))
                    ])
                }  />
            </motion.div>
            <label htmlFor="FilePicker" className="mt-3 btn btn-primary btn-lg">Scegli</label>
            <input 
                type="file" 
                name="FilePicker" 
                id="FilePicker" 
                className="d-none" 
                accept="application/pdf"
                multiple
                onChange={e => loadFiles([...e.currentTarget.files])}
            />
        </>
    );
}

export default FilePicker;