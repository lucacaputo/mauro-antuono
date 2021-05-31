import { motion, useAnimation, AnimatePresence, Variants } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect } from "react";

type FileEntryProps = {
    name: string,
    onDelete: () => void,
}

const FileEntry: React.FC<FileEntryProps> = ({ name, onDelete }) => {
    const [isPresent, setPresent] = useState(true);
    const [lock, setLock] = useState(false);
    const hoverAnimationControls = useAnimation();
    const deleteAnimationControls = useAnimation();
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const playTrashAnimation = () => hoverAnimationControls.start({
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 350,
            damping: 15,
            mass: 2,
        }
    });
    useEffect(() => {
        return () => clearTimeout(timeout);
    }, []);
    const reverseTrashAnimation = () => !lock && hoverAnimationControls.start({
        y: -35,
        opacity: 0,
    });
    const entryVariants: Variants = {
        initial: {
            x: -50,
            opacity: 1,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: .3,
            }
        },
        exit: {
            x: 50,
            opacity: 0,
            transition: {
                duration: .3,
            }
        }
    }
    const del = async () => {
        setLock(true);
        await deleteAnimationControls.start({
            scale: 21,
            opacity: 0,
            transition: {
                duration: .6,
            }
        });
        setPresent(false);
        timeout = setTimeout(onDelete, 300);
    }
    return (
        <AnimatePresence>
            {
                isPresent &&
                <motion.div 
                    className="file_entry"
                    onHoverStart={playTrashAnimation}
                    onHoverEnd={reverseTrashAnimation}
                    variants={entryVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                    layout
                >
                    <motion.button
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 'calc(50% - 26px)',
                            zIndex: 2,
                            maxHeight: '100%',
                            display: 'block',
                            border: 'none',
                            background: 'transparent',
                        }}
                        initial={{
                            y: -35,
                            opacity: 0,
                        }}
                        animate={hoverAnimationControls}
                        onClick={del}
                    >
                        <motion.svg
                            viewBox="0 0 40 40"
                            x={0}
                            y={0}
                            height={40}
                            width={40}
                            xmlns="http://www.w3.org/2000/svg"
                            animate={deleteAnimationControls}
                            initial={{ scale: 1, opacity: 1, }}
                        >
                            <motion.circle 
                                cx={20} 
                                cy={20} 
                                fill="rgba(234, 65, 65, .9)" 
                                stroke="none"
                                r={15}
                            />
                        </motion.svg>
                        <AiFillDelete 
                            size="20px" 
                            color="#fff"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                                zIndex: 2,
                            }} 
                        /> 
                    </motion.button>
                    <span>
                        {name}
                    </span>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default FileEntry;