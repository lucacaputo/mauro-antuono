import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "../styles/scrollbar.module.css";
import { clamp } from "../helpers";
import { useEffect } from 'react';

type ScrollBarProps = {
    clampTo: number,
    clampFrom: number,
}

const ScrollBar: React.FC<ScrollBarProps> = ({ clampTo, clampFrom }) => {
    const scroll = useMotionValue(clampFrom);
    const width = useTransform(scroll, x => clamp(x, clampTo, clampFrom));
    useEffect(() => {
        const ratio = window.innerWidth / window.innerHeight;
        const wheel = (evt: WheelEvent) => {
            const { deltaY } = evt;
            scroll.set(width.get() + (deltaY * ratio));
        }
        window.addEventListener('wheel', wheel);
        return () => window.removeEventListener('wheel', wheel);
    }, []);
    return (
        <motion.div 
            className={styles.scrollBar}
            style={{ width }}
        />
    );
}

export default ScrollBar;