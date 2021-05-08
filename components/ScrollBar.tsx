import { motion } from "framer-motion";
import styles from "../styles/scrollbar.module.css";
import { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";
import { clamp } from "../helpers";

type ScrollBarProps = {
    clampTo: number,
}

const ScrollBar: React.FC<ScrollBarProps> = ({ clampTo }) => {
    const scrollRef = useRef<number>(0);
    const router = useRouter();
    useLayoutEffect(() => {
        switch(router.route) {
            case '/':
                scrollRef.current = 0;
                break;
            case '/progetti':
                scrollRef.current = 2 * clampTo;
                break;
            default:
                scrollRef.current = clampTo;
        }
    }, [router.route]);
    return (
        <motion.div 
            className={styles.scrollBar}
        />
    );
}

export default ScrollBar;