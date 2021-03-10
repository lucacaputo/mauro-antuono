import { motion, Variants } from "framer-motion";
import styles from "../styles/scrollarrow.module.css";

type ScrollArrowProps = {
    onClick: () => void,
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ onClick }) => {
    const arrVars: Variants = {
        initial: {
            x: "-50%",
            y: -25,
            opacity: 0,
        },
        enter: {
            x: "-50%",
            y: 0,
            opacity: 1,
        },
        exit: {
            x: "-50%",
            y: 25,
            opacity: 0,
        }
    };
    return (
        <motion.div
            className={styles.arrow}
            variants={arrVars}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={onClick}
        >
            <svg
                width={50}
                height={65}
                viewBox="0 0 50 150"
                
            >
                <motion.line
                    x1="25"
                    y1="0"
                    x2="25"
                    y2="148"
                    strokeWidth={2}
                    stroke="#000"
                    strokeDasharray={1000}
                    initial={{
                        strokeDashoffset: 1000,
                    }}
                    animate={{
                        strokeDashoffset: [1000, 0, -1000],
                        transition: {
                            repeat: Infinity,
                            duration: 2,
                            times: [0, .4, 1]
                        }
                    }}
                />
                <svg
                    x="0"
                    y="129"
                >
                    <path
                        width={50}
                        height={20}
                        d="M 0 0 L 25 20 L 50 0"
                        stroke="#000"
                        strokeWidth={2}
                        fill="transparent"
                    />
                </svg>
            </svg>
        </motion.div>
    );
}

export default ScrollArrow;