import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "../styles/infocont.module.css";
import { useRouter } from "next/router"

type InfoContainerProps = {
    isVisible: boolean,
}

const InfoContainer: React.FC<InfoContainerProps> = ({ isVisible }) => {
    const contVar: Variants = {
        invisible: {
            y: "100vh",
            opacity: 0,
        },
        visible: {
            y: "0vh",
            opacity: 1,
            transition: {
                duration: .3
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
            transition: {
                duration: .2,
            }
        }
    }
    const { route } = useRouter();
    return (
        <AnimatePresence>
            {
                isVisible && (
                    <motion.div 
                        id="infoCont"
                        initial="invisible"
                        animate="visible"
                        exit="exit"
                        variants={contVar}
                        className={styles.infocont}
                        style={{
                            display: route === "/progetti" ? "flex" : "block" 
                        }}
                    />
                )
            }
        </AnimatePresence>
    );
}

export default InfoContainer;