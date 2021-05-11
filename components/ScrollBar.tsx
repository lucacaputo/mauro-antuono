import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "../styles/scrollbar.module.css";
import { clamp } from "../helpers";
import { useEffect } from 'react';

type ScrollBarProps = {
    clampTo: number,
    clampFrom: number,
    initialScroll: number,
}

const ScrollBar: React.FC<ScrollBarProps> = ({ clampTo, clampFrom, initialScroll }) => {
    const scroll = useMotionValue(initialScroll);
    const width = useTransform(scroll, x => clamp(x, clampTo, clampFrom));
    useEffect(() => {
        const wheel = (evt: WheelEvent) => {
            const { deltaY } = evt;
            scroll.set(width.get() + deltaY );
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