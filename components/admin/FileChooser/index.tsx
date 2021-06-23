import { useState, useEffect, CSSProperties } from "react";
import FileChooserEntry from './FileChooserEntry';
import { AnimatePresence, motion, Variants } from "framer-motion";

export type BaseFile = {
    url: string,
    _id: string,
}

export type FileChooserBreakpoint = {
    breakpoint: number,
    perRow: number,
}

export interface FileChooserProps<T extends BaseFile> {
    files: T[],
    withSelectedAction: (selection: string[]) => void,
    actionText: string,
    responsive?: FileChooserBreakpoint[],
    style?: CSSProperties,
    onSelect?: (id: string) => void,
    onRemove?: (id: string) => void,
    disableActionButton?: boolean,
}

function FileChooser<T extends BaseFile>(props: FileChooserProps<T>): React.ReactElement<FileChooserProps<T>> {
    const { files, withSelectedAction, actionText, responsive, style, onSelect, onRemove, disableActionButton } = props;
    const [perRow, setPerRow] = useState<number | undefined>(undefined);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    let debounce: ReturnType<typeof setTimeout> | null = null;
    useEffect(() => {
        const resp = () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                if (responsive && responsive.length > 0) {
                    const w = window.innerWidth;
                    responsive.sort((a, b) => {
                        if (Math.abs(a.breakpoint - w) > Math.abs(b.breakpoint - w)) {
                            return 1;
                        } else return -1;
                    });
                    setPerRow(responsive[0].perRow);
                }
            }, 200);
        }
        resp();
        window.addEventListener('resize', resp);
        return () => {
            window.removeEventListener('resize', resp);
            clearTimeout(debounce);
        }
    }, []);
    const toggleSelection = () => setSelectionMode(s => !s);
    const delVariants: Variants = {
        initial: {
            y: '100%',
            opacity: 0,
        },
        animate: {
            y: '0%',
            opacity: 1,
            transition: {
                type: 'spring',
            },
        },
        exit: {
            y: '100%',
            opacity: 0,
        },
    };
    const action = () => {
        withSelectedAction(selectedFiles);
        setSelectedFiles([]);
    }
    const select = (id: string) => {
        setSelectedFiles(p => [...p, id]);
        onSelect && onSelect(id);
    }
    const remove = (id: string) => {
        setSelectedFiles(p => p.filter(el => el !== id));
        onRemove && onRemove(id);
    }
    return (
        <>
            <div className="fileChooserWrapper p-2" style={style}>
                <div className="file_ch">
                    {
                        files &&
                        files.map(f => (
                            <FileChooserEntry 
                                onSelect={select} 
                                onRemove={remove}
                                key={f._id} 
                                {...f} 
                                selectionMode={selectionMode}
                                initialSelect={selectedFiles.includes(f._id)}
                                onClick={toggleSelection}
                                perRow={perRow}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="overflow-hidden d-flex w-100 justify-content-center align-items-center py-3">
                {
                    disableActionButton !== undefined && disableActionButton ?
                    null :
                    <AnimatePresence>
                        {
                            selectionMode && selectedFiles.length > 0 &&
                            <motion.button
                                type="button"
                                className="btn btn-lg btn-outline-danger"
                                onClick={action}
                                variants={delVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {actionText}
                            </motion.button>
                        }
                    </AnimatePresence>
                }
            </div>
        </>
    );
}

export default FileChooser;