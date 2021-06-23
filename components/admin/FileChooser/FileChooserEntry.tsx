import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { BaseFile } from "./index";
import { API_BASE } from '../../../helpers/index';
import { AiFillFileImage } from "react-icons/ai";

type FileChooserEntryProps = {
    selectionMode: boolean,
    perRow?: number,
    onSelect: (f: string) => void,
    onRemove: (f: string) => void,
    initialSelect: boolean,
    onClick: () => void,
} & BaseFile;

const FileChooserEntry: React.FC<FileChooserEntryProps> = ({ 
        selectionMode, 
        _id, 
        url, 
        onSelect, 
        onRemove,
        onClick,
        initialSelect,
        perRow=10 
    }) => {
    const [dims, setDims] = useState('0');
    const [selected, setSelected] = useState(initialSelect);
    const [loaded, setLoaded] = useState(false);
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const wrapper = useRef<HTMLDivElement | null>(null);
    const selectorVariants: Variants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                type: 'spring',
                when: 'beforeChildren'
            }
        },
        exit: {
            scale: 0,
            transition: {
                when: 'afterChilldren',
            }
        }
    };
    const selectorCircleVariants: Variants = {
        initial: {
            scale: selected ? 1 : 0,
            x: '-50%',
            y: '-50%',
        },
        animate: {
            scale: selected ? 1 : 0,
            x: '-50%',
            y: '-50%',
        }
    };
    const sel = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelected(s => !s);
    }
    useEffect(() => {
        if (selected) onSelect(_id);
        else onRemove(_id);
        const calcDims = () => {
            const parentW = wrapper.current.parentElement.clientWidth;
            const dims = `calc(${Math.floor(parentW / perRow)}px - 1rem - (1rem / ${perRow}))`;
            setDims(dims);
        }
        calcDims();
        window.addEventListener('resize', calcDims);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', calcDims);
        }
    }, [wrapper.current, selected, perRow]);
    const bgImage = `url(${API_BASE}/${encodeURI(url)}`;
    return (
        <motion.div
            className="file_chooser_entry mx-2  mt-2 mb-auto"
            style={{ width: dims, height: dims, backgroundImage: loaded ? bgImage : 'none', }}
            onClick={onClick}
            ref={wrapper}
            onLayoutAnimationComplete={() => setLoaded(true)}
            layout
        >
            {
                <AnimatePresence exitBeforeEnter>
                    {
                        selectionMode &&
                        <motion.div
                            className="circular_selector"
                            tabIndex={-1}
                            variants={selectorVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onClick={sel}
                        >
                            <motion.div 
                                className="selected_circle"
                                variants={selectorCircleVariants}
                                initial="initial"
                                animate="animate"
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            }
            {
                !loaded &&
                <AiFillFileImage size={40} color="#141414" />
            }
        </motion.div>
    );
}

export default FileChooserEntry;