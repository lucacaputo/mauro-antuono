import { useState } from "react";
import FileChooserEntry from './FileChooserEntry';
import { AnimatePresence, motion, Variants } from "framer-motion";

export type BaseFile = {
    url: string,
    _id: string,
}

interface FileChooserProps<T extends BaseFile> {
    files: T[],
    withSelectedAction: (selection: string[]) => void,
    actionText: string,
}

function FileChooser<T extends BaseFile>(props: FileChooserProps<T>): React.ReactElement<FileChooserProps<T>> {
    const { files, withSelectedAction, actionText } = props;
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
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
    return (
        <>
            <div
                className="fileChooserWrapper p-2"
            >
                {
                    files &&
                    files.map(f => (
                        <FileChooserEntry 
                            onSelect={f => setSelectedFiles(p => [...p, f])} 
                            onRemove={f => setSelectedFiles(p => p.filter(el => el !== f))}
                            key={f._id} 
                            {...f} 
                            selectionMode={selectionMode}
                            initialSelect={selectedFiles.includes(f._id)}
                            onClick={toggleSelection}
                        />
                    ))
                }
            </div>
            <div className="overflow-hidden d-flex w-100 justify-content-center align-items-center py-3">
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
            </div>
        </>
    );
}

export default FileChooser;