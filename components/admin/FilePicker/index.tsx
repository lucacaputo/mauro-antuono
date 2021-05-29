import { motion, useAnimation } from "framer-motion";
import React, { useState, useRef } from "react";

type FilePickerProps = {
    allowedExtensions: string[],
};

const FilePicker: React.FC<FilePickerProps> = ({ allowedExtensions }) => {
    const [content, setContent] = useState([]);
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

    const dragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        playAnimation();
    }
    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const dragLeave = (e: React.DragEvent) => {
        console.log('exit')
        e.preventDefault();
        e.stopPropagation();
        reverseAnimation();
    }
    const drop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        files = files.filter(f => allowedExtensions.includes(f.type));
        const names = content.map(n => n.name);
        files = files.filter(f => !names.includes(f.name));
        reverseAnimation();
        setContent(prev => [...prev, ...files]);
    }
    return (
        <motion.div 
            className="picker_dropzone"
            ref={dropzone}
            animate={dropzoneAnimationControls}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
            onDrop={drop}
        >
            {
                content.map(f => <span style={{ display: 'block' }} key={f.name}>{f.name}</span>)
            }
        </motion.div>
    );
}

export default FilePicker;