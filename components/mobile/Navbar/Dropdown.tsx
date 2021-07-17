import { motion, useAnimation, Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import styles from "../../../styles/navdropdown.module.css";

type DropdownProps = {
    title: string,
}

const Dropdown: React.FC<DropdownProps> = ({ children, title }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(s => !s);
    const animateHeight = useAnimation();
    useEffect(() => {
        animateHeight.start({
            height: isOpen ? ref.current.clientHeight : 0,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 40,
            }
        });
    }, [isOpen, animateHeight]);
    const togglerVariants: Variants = {
        initial: {
            rotateX: isOpen ? 0 : 180,
        },
        animate: {
            rotateX: isOpen ? 180 : 0,
        }
    }
    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownTitle}>
                <span> {title} </span> 
                <motion.span
                    variants={togglerVariants}
                    initial="initial"
                    animate="animate"
                    style={{ display: 'flex' }}
                >
                    <AiOutlineDown onClick={toggle} size={20} style={{ color: 'inherit' }} />
                </motion.span>
            </div>
            <motion.div 
                className={styles.dropdownVariableHeight}
                initial={{ height: 0 }}
                animate={animateHeight}
            >
                <div className={styles.heightContainer} ref={ref}>
                    { children }
                </div>
            </motion.div>
        </div>
    );
}

export default Dropdown;