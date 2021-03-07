import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import styles from "../styles/scrollbar.module.css";
import { clamp } from "../helpers";
import { useRouter } from "next/router";



const ScrollBar: React.FC = ({  }) => {
    const scrollRef = useRef(0);
    const y = useMotionValue(0);
    const [[min, max], setBounds] = useState([0, 0]);
    const [height, setHeight] = useState(0);
    const { route } = useRouter();
    useEffect(() => {
        setHeight(window.innerHeight);
        if (route === "/") setBounds([0, height/3]);
        if (route === "/esperienze") setBounds([height/3, height/3 * 2]);
        if (route === "/progetti") setBounds([height/3 * 2, height]);
        const onWheel = (e: WheelEvent) => {
            const { deltaY } = e;
            scrollRef.current = clamp(scrollRef.current + deltaY, max-40, min);
            y.set(scrollRef.current);
        }
        window.addEventListener("wheel", onWheel);
        return () => window.removeEventListener("wheel", onWheel);
    }, [route]);
    return (
        <motion.svg
            width={8}
            height={40}
            viewBox="0 0 8 40"
            preserveAspectRatio="none"
            style={{ y }}
            className={styles.scrollBar}
        >
            <rect 
                x="1"
                y="2"
                width="6"
                height="36"
                rx="3"
                ry="3"
                fill="#141414"
                stroke="none"
            />
        </motion.svg>
    );
}

export default ScrollBar;