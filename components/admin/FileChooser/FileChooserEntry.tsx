import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { BaseFile } from "./index";
import { API_BASE } from '../../../helpers/index';

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
    return (
        <AnimatePresence>
            {
                <motion.div
                    className="file_chooser_entry m-2"
                    style={{ width: dims, height: dims, backgroundImage: `url(${API_BASE}/${url})` }}
                    onClick={onClick}
                    ref={wrapper}
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
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default FileChooserEntry;