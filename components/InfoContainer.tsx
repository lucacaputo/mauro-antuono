import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/router";
import styles from "../styles/infocont.module.css";

type InfoContainerProps = {
    isVisible: boolean,
}

const InfoContainer: React.FC<InfoContainerProps> = ({ isVisible }) => {
    const router = useRouter();
    const contVar: Variants = {
        invisible: {
            y: "100vh",
            opacity: 0,
        },
        visible: {
            y: "0vh",
            opacity: 1,
            transition: {
                duration: .3,
                when: "beforeChildren",
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
            transition: {
                duration: .2,
                when: "afterChildren"
            }
        }
    }
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
                            border: router.route === '/progetti' ? 'none' : null,
                            padding: router.route === '/progetti' ? 0 : null,
                        }}
                    />
                )
            }
        </AnimatePresence>
    );
}

export default InfoContainer;